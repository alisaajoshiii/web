const { Sequelize } = require('sequelize');
const path = require('path');
const fs = require('fs');

let storagePath = path.join(__dirname, '../database.sqlite');

if (process.env.VERCEL) {
  const tmpPath = '/tmp/database.sqlite';
  if (!fs.existsSync(tmpPath) && fs.existsSync(storagePath)) {
    fs.copyFileSync(storagePath, tmpPath);
  }
  storagePath = tmpPath;
}

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath
});

module.exports = sequelize;
