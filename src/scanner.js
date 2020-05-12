const arpScanner = require('arpscan/promise');
const appConfig = require('../config.json');
const db = require('./db');

function scanNetwork(userId) {
  db.initScan(userId);
  return (
    arpScanner(appConfig.scanner)
      .then(data => { 
        db.addDevices(userId, data)
        return userId 
      })
      .then(getDevicesNetwork)
      .catch((err) => { return err})
  );
}

function getDevicesNetwork(userId) {
  return (db.getDevices(userId)
    .then(data => {return data})
    .catch(err => {return err})
  );
}

function getInventoryNetwork() {
  return (
    db.getInventory()
      .then(data => {return data})
      .catch(err => {return err})
  );
}

// wrapper DB
function initScannerDB() {
  db.checkDB();
}

function addDeviceToTrack(data) {
  const devArg = {
    device: data[0],
    owner: data[1],
    mac: data[2].toUpperCase(),
  };
  db.addDeviceToInventory(devArg);
}

function removeDeviceToTrack(mac) {
  db.removeDeviceFromInventory(mac);
}

module.exports.initScannerDB = initScannerDB;
module.exports.scanNetwork = scanNetwork;
module.exports.getInventoryNetwork = getInventoryNetwork;
module.exports.addDeviceToTrack = addDeviceToTrack;
module.exports.removeDeviceToTrack = removeDeviceToTrack;
