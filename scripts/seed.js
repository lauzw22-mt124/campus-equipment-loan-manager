require('dotenv').config();
const bcrypt = require('bcryptjs');
const { User, Equipment } = require('../models');
async function seed({ username, password }) {
  if (
    !username ||
    !password ||
    password.length < 12 ||
    password.startsWith('replace-')
  )
    throw new Error(
      'Set ADMIN_USERNAME and an ADMIN_PASSWORD with at least 12 characters.',
    );
  await User.updateOne(
    { username },
    {
      $setOnInsert: {
        username,
        passwordHash: await bcrypt.hash(password, 12),
        displayName: 'Group41 Administrator',
      },
    },
    { upsert: true },
  );
  const samples = [
    [
      'PROJ-001',
      'Epson Portable Projector',
      'projector',
      'Club Room / Cabinet A',
      'available',
    ],
    [
      'MIC-001',
      'Wireless Handheld Microphone',
      'microphone',
      'Maintenance Workbench',
      'maintenance',
    ],
    [
      'TRI-001',
      'Camera Tripod',
      'tripod',
      'Club Room / Cabinet B',
      'available',
    ],
    [
      'MIC-002',
      'Conference Microphone',
      'microphone',
      'Club Room / Cabinet A',
      'available',
    ],
  ];
  for (const [assetCode, name, category, location, status] of samples)
    await Equipment.updateOne(
      { assetCode },
      {
        $setOnInsert: {
          assetCode,
          name,
          category,
          location,
          status,
          description:
            'Fictional equipment record for the course demonstration',
        },
      },
      { upsert: true },
    );
}
if (require.main === module) {
  const db = require('../config/db');
  db.connect(process.env.MONGODB_URI)
    .then(() =>
      seed({
        username: process.env.ADMIN_USERNAME,
        password: process.env.ADMIN_PASSWORD,
      }),
    )
    .then(() =>
      console.log(
        'Seed complete: missing records added; existing passwords and equipment states were preserved.',
      ),
    )
    .catch((err) => {
      console.error(err.message);
      process.exitCode = 1;
    })
    .finally(() => db.disconnect());
}
module.exports = { seed };
