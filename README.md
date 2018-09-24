# lscanbot

An opensource telegram bot to find devices on your LAN.

The bot is written in Node.js.

## Usage

**lscanbot** scans devices with arp-scan, showing only devices registered in the inventory.

Before scanning, you must insert the devices into the inventory (to track it):
> /add [Device name] ; [Owner] ; [MAC Address]

(use `;` to split arguments)


After that, you can scan:
>/scan



It will send back the devices connected to your network.

## Installation

In order to use this bot is required that the code is hosted on a linux system connected to your LAN (Raspberry Pi would be a good choice)


### Prerequisites
- Node.js
- npm
- GNU/Linux

### Step by step
1. Install **arp-scan** package on your linux system. 
2. Configure arp-scan to use without sudo.
(`chmod u+s`)
3. Clone this repository on your system.
4. Install dependecies with `npm install`.
5. Create new bot with BotFather on Telegram.
6. Insert your **token** (app.token) into `config.json`.
7. Insert your **TelegramID** (app.authorizedUsers) into `config.json`.
8. Insert your **network device** (scanner.interface) into `config.json`.
8. Start with`npm start`.


### License

GPLv3

---
Made with ❤️ by Francesco Esposito ([@f3sposito](https://github.com/f3sposito))