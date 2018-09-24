const TeleBot = require('telebot');
const appConfig = require('./config.json');
const scanner = require('./scanner.js');
const utils = require('./utils.js');
const logger = require('./logger.js');

const bot = new TeleBot(appConfig.app.token);

bot.on('/start', (msg) => {
  bot.sendMessage(msg.from.id, utils.templateStart(), { parseMode: 'Markdown' });
  if (utils.isAuthorizedUser(msg.from.id)) {
    bot.event('/help', msg);
  } else {
    bot.sendMessage(msg.from.id, utils.templateUnauthorizedUser(), { parseMode: 'Markdown' });
  }
});

bot.on('/help', (msg) => {
  if (utils.isAuthorizedUser(msg.from.id)) {
    bot.sendMessage(msg.from.id, utils.templateHelp(), { parseMode: 'Markdown' });
  }
});

bot.on('/scan', (msg) => {
  if (utils.isAuthorizedUser(msg.from.id)) {
    scanner.scanNetwork(msg.from.id)
      .then(() => {
        scanner.getDevicesNetwork(msg.from.id)
          .then((devices) => {
            bot.sendMessage(msg.from.id, utils.templateDevicesList(devices), { parseMode: 'Markdown' });
          })
          .catch((err) => {
            msg.reply.text('Error, check the error.log');
            logger.logError(err);
          });
      })
      .catch((err) => {
        msg.reply.text('Error, check the error.log');
        logger.logError(err);
      });
  }
});

bot.on('/inventory', (msg) => {
  if (utils.isAuthorizedUser(msg.from.id)) {
    scanner.getInventoryNetwork()
      .then((inventory) => {
        bot.sendMessage(msg.from.id, utils.templateInventoryList(inventory), { parseMode: 'Markdown' });
      })
      .catch((err) => {
        msg.reply.text('Error, check the error.log');
        logger.logError(err);
      });
  }
});

bot.on(/^\/add (.+)$/, (msg, props) => {
  if (utils.isAuthorizedUser(msg.from.id)) {
    const textArgs = props.match[1];
    const arrArgs = textArgs.split(';').map(item => item.trim());
    scanner.addDeviceToTrack(arrArgs);
  }
});

bot.on(/^\/remove (.+)$/, (msg, props) => {
  if (utils.isAuthorizedUser(msg.from.id)) {
    const textArgs = props.match[1];
    const arrArgs = textArgs.split(';').map(item => item.trim());
    scanner.removeDeviceToTrack(arrArgs[0]);
  }
});

bot.on('/getUID', (msg) => {
  msg.reply.text(`⚠️ UID: ${msg.from.id}`);
});

scanner.initScannerDB();

// bot start
bot.start();
