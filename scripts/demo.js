const { MongoMemoryReplSet } = require('mongodb-memory-server');
const crypto = require('node:crypto');
const { connect, disconnect } = require('../config/db');
const { seed } = require('./seed');
const { createApp } = require('../app');
async function main() {
  const repl = await MongoMemoryReplSet.create({
    binary: { version: '7.0.24' },
    replSet: { count: 1, storageEngine: 'wiredTiger' },
  });
  await connect(repl.getUri('group41_demo'));
  await seed({ username: 'admin41', password: 'Group41-Demo-2026!' });
  const app = createApp({ secret: crypto.randomBytes(32).toString('hex') });
  const server = app.listen(Number(process.env.PORT || 8099), '127.0.0.1', () =>
    console.log(
      'Demo: http://127.0.0.1:' +
        (process.env.PORT || 8099) +
        '\nAccount: admin41 / Group41-Demo-2026!\nLocal demo only; data is cleared on exit. The first run downloads MongoDB.',
    ),
  );
  let closing = false;
  for (const signal of ['SIGINT', 'SIGTERM'])
    process.once(signal, () => {
      if (closing) return;
      closing = true;
      server.close(async () => {
        await disconnect();
        await repl.stop();
        process.exit(0);
      });
    });
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
