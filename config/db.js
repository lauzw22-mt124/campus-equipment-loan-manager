const mongoose = require('mongoose');
const { Equipment, Loan, User } = require('../models');
async function connect(uri) {
  if (!uri) throw new Error('Set MONGODB_URI or use npm run demo.');
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  const hello = await mongoose.connection.db.admin().command({ hello: 1 });
  if (!hello.setName && hello.msg !== 'isdbgrid') {
    await mongoose.disconnect();
    throw new Error(
      'MongoDB must be a replica set or a transaction-capable cluster.',
    );
  }
  await Promise.all([Equipment.init(), Loan.init(), User.init()]);
}
module.exports = { connect, disconnect: () => mongoose.disconnect() };
