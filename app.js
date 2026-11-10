const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const path = require('node:path');
const mongoose = require('mongoose');
const { Equipment, Loan } = require('./models');
const { loadUser, requireLogin, csrf } = require('./middleware/auth');
const { normalize, fail } = require('./lib/errors');
function createApp({
  secret,
  store,
  production = false,
  apiAuthRequired = false,
  trustProxy = false,
} = {}) {
  if (!secret || secret.length < 32 || secret.startsWith('replace-'))
    throw new Error(
      'SESSION_SECRET must contain at least 32 random characters and cannot use the example value.',
    );
  const app = express();
  app.disable('x-powered-by');
  if (trustProxy) app.set('trust proxy', 1);
  app.locals.apiAuthRequired = apiAuthRequired;
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: { 'upgrade-insecure-requests': production ? [] : null },
      },
      strictTransportSecurity: production ? undefined : false,
    }),
  );
  app.use('/static', express.static(path.join(__dirname, 'public')));
  app.get('/health', (req, res) =>
    res.status(mongoose.connection.readyState === 1 ? 200 : 503).json({
      status: mongoose.connection.readyState === 1 ? 'ok' : 'unavailable',
    }),
  );
  app.use(express.urlencoded({ extended: false, limit: '20kb' }));
  app.use(express.json({ limit: '20kb' }));
  app.use(
    session({
      name: 'group41.sid',
      secret,
      store,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: production,
        maxAge: 4 * 60 * 60 * 1000,
      },
    }),
  );
  app.use(loadUser);
  app.use(csrf);
  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    res.locals.path = req.path;
    res.locals.labels = {
      available: 'Available',
      borrowed: 'Borrowed',
      maintenance: 'Maintenance',
      active: 'Active',
      returned: 'Returned',
      projector: 'Projector',
      microphone: 'Microphone',
      tripod: 'Tripod',
    };
    res.locals.date = (value) =>
      value
        ? new Intl.DateTimeFormat('en-GB', {
            timeZone: 'Asia/Hong_Kong',
            dateStyle: 'medium',
            timeStyle: 'short',
          }).format(new Date(value))
        : '—';
    next();
  });
  app.use(require('./routes/auth'));
  app.use('/api', require('./routes/api'));
  app.use(requireLogin);
  app.get('/', async (req, res) => {
    const counts = Object.fromEntries(
      (
        await Equipment.aggregate([
          { $group: { _id: '$status', count: { $sum: 1 } } },
        ])
      ).map((x) => [x._id, x.count]),
    );
    const recent = await Loan.find()
      .populate('equipmentId')
      .sort({ borrowedAt: -1 })
      .limit(5)
      .lean();
    res.render('dashboard', { title: 'Overview', counts, recent });
  });
  app.use('/equipment', require('./routes/equipment'));
  app.use('/loans', require('./routes/loans'));
  app.use((req, res) => fail(404, 'NOT_FOUND', 'Page or endpoint not found.'));
  app.use((err, req, res, next) => {
    const error =
      err.type === 'entity.parse.failed'
        ? { status: 400, code: 'INVALID_JSON', message: 'Malformed JSON.' }
        : err.type === 'entity.too.large'
          ? {
              status: 413,
              code: 'TOO_LARGE',
              message: 'Request body is too large.',
            }
          : normalize(err);
    if (error.status >= 500)
      console.error('Request failed:', err.name, err.message);
    if (req.path.startsWith('/api/'))
      return res
        .status(error.status)
        .json({ error: { code: error.code, message: error.message } });
    res.status(error.status).render('error', {
      title: 'Unable to complete the action',
      error,
      user: req.user || null,
      csrf: res.locals.csrf || '',
    });
  });
  return app;
}
module.exports = { createApp };
