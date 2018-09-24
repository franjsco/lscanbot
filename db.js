const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const appConfig = require('./config.json');

function connectDB() {
  const db = new sqlite3.Database('data.db');
  return db;
}

function initDB() {
  const db = connectDB();
  db.run('CREATE TABLE inventory (mac TEXT, device TEXT, owner TEXT)');
  db.run(`CREATE TABLE scan (uid INT NOT NULL, mac TEXT NOT NULL,
      PRIMARY KEY (uid,mac))`);
}

function checkDB() {
  fs.stat(appConfig.database.filename, (err, stats) => {
    if (err) {
      initDB();
    }
    return stats;
  });
}

function initScan(uid) {
  const db = connectDB();
  db.run('DELETE FROM scan WHERE uid = $uid', { $uid: uid });
}

function addDevices(uid, data) {
  if (data) {
    const db = connectDB();
    data.forEach((element) => {
      db.run('INSERT OR IGNORE INTO scan (uid,mac) VALUES ($uid, $mac)', {
        $uid: uid,
        $mac: element.mac,
      });
    });
  }
}

function getDevices(uid) {
  const db = connectDB();
  const sql = `SELECT
    inventory.device, inventory.owner, inventory.mac
    FROM scan,
    inventory
    WHERE scan.mac = inventory.mac
    AND uid = ?`; // match scan -> inventory (inner join)

  return new Promise((resolve, reject) => {
    db.all(sql, [uid], (err, rows) => {
      if (err) {
        return reject(err);
      }
      return resolve(rows);
    });
  });
}

function getInventory() {
  const db = connectDB();
  const sql = 'SELECT device, owner, mac FROM inventory';

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        return reject(err);
      }
      return resolve(rows);
    });
  });
}

function addDeviceToInventory(data) {
  const db = connectDB();
  db.run('INSERT INTO inventory VALUES ($mac, $device, $owner)', {
    $mac: data.mac,
    $device: data.device,
    $owner: data.owner,
  });
}

function removeDeviceFromInventory(mac) {
  const db = connectDB();
  db.run('DELETE FROM inventory WHERE mac = $mac', { $mac: mac });
}

module.exports.checkDB = checkDB;
module.exports.initScan = initScan;
module.exports.addDevices = addDevices;
module.exports.getDevices = getDevices;
module.exports.getInventory = getInventory;
module.exports.addDeviceToInventory = addDeviceToInventory;
module.exports.removeDeviceFromInventory = removeDeviceFromInventory;
