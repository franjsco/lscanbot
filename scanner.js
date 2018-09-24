const arpScanner = require('arpscan/promise');
const appConfig = require('./config.json');
const db = require('./db');

function scannerResults(data) {
  return data;
}

function returnDevices(data) {
  return data;
}

function returnDevicesError(err) {
  return err;
}

function returnInventory(data) {
  return data;
}

function returnInventoryError(err) {
  return err;
}

function scannerError(err) {
  return err;
}

function scanNetwork(userId) {
  db.initScan(userId);
  return (
    arpScanner(appConfig.scanner)
      .then(scannerResults)
      .then(data => db.addDevices(userId, data))
      .catch(scannerError)
  );
}

function getDevicesNetwork(userId) {
  return (db.getDevices(userId)
    .then(returnDevices)
    .catch(returnDevicesError)
  );
}

function getInventoryNetwork() {
  return (
    db.getInventory()
      .then(returnInventory)
      .catch(returnInventoryError)
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
    mac: data[2],
  };
  db.addDeviceToInventory(devArg);
}

function removeDeviceToTrack(mac) {
  db.removeDeviceFromInventory(mac);
}

module.exports.initScannerDB = initScannerDB;
module.exports.scanNetwork = scanNetwork;
module.exports.getDevicesNetwork = getDevicesNetwork;
module.exports.getInventoryNetwork = getInventoryNetwork;
module.exports.addDeviceToTrack = addDeviceToTrack;
module.exports.removeDeviceToTrack = removeDeviceToTrack;
