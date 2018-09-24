const appConfig = require('./config.json');

function isAuthorizedUser(userId) {
  return appConfig.app.authorizedUsers.includes(userId);
}

function templateStart() {
  const msg = `* Welcome to ${appConfig.app.name} 📱📡*\n 
A bot to find devices on your network. \n
Made with ❤️ by @f3sposito  `;
  return msg;
}

function templateUnauthorizedUser() {
  const msg = `Unauthorized user. 🤖  \n
Clone the repository https://github.com/f3sposito/lscanbot 
and run the bot on your local network. 😎`;
  return msg;
}

function templateHelp() {
  const msg = `📃 * ${appConfig.app.name} commands*: \n
  /help - view commands.
  /scan - view connected devices.
  /inventory - view the inventory.
  /add - add device to track.
  /remove - remove device to track.`;
  return msg;
}

function templateDevicesList(data) {
  let devices = '📡  Devices available:  \n\n';
  data.forEach((elem) => {
    devices += `----- \n 📱 * ${elem.device} * \n 👉 _ ${elem.owner} _ \n \n `;
  });
  return devices;
}

function templateInventoryList(data) {
  let inventory = '🗃 Inventory: \n \n';
  data.forEach((elem) => {
    inventory += `----- \n 📱 * ${elem.device} * \n 👉 _ ${elem.owner} _ 
 🔗 ${elem.mac} \n \n`;
  });
  return inventory;
}

module.exports.isAuthorizedUser = isAuthorizedUser;
module.exports.templateStart = templateStart;
module.exports.templateHelp = templateHelp;
module.exports.templateUnauthorizedUser = templateUnauthorizedUser;
module.exports.templateDevicesList = templateDevicesList;
module.exports.templateInventoryList = templateInventoryList;
