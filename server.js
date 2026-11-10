require('dotenv').config();
const MongoStore = require('connect-mongo');
const { connect, disconnect } = require('./config/db');
const { createApp } = require('./app');
async function start() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32 || secret.startsWith('replace-'))
    throw new Error(
      'Set a random SESSION_SECRET with at least 32 characters. See README.md.',
    );
  await connect(process.env.MONGODB_URI);
  const store = MongoStore.create({
    client: require('mongoose').connection.getClient(),
    collectionName: 'sessions',
  });
  const app = createApp({
    secret,
    store,
    production: process.env.NODE_ENV === 'production',
    apiAuthRequired: process.env.API_AUTH_REQUIRED === 'true',
    trustProxy: process.env.TRUST_PROXY === 'true',
  });
  const server = app.listen(
    Number(process.env.PORT || 8099),
    process.env.HOST || '127.0.0.1',
    () =>
      console.log(
        `Group41 server: http://${process.env.HOST || '127.0.0.1'}:${process.env.PORT || 8099}`,
      ),
  );
  for (const signal of ['SIGINT', 'SIGTERM'])
    process.once(signal, () =>
      server.close(async () => {
        await disconnect();
        process.exit(0);
      }),
    );
}
start().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
