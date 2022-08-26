const {format} = require('date-fns');
const {v4:uuid} = require('uuid');
const fs = require('fs');
const fsPromise  = require('fs').promises;
const path = require('path');

const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        var logFolderPath = path.join(__dirname, '..', 'logs');

        if (!fs.existsSync(logFolderPath)) {
            await fsPromise.mkdir(logFolderPath);
        }

        await fsPromise.appendFile(path.join(logFolderPath, logFileName), logItem);
    } catch (err) {
        console.log(err);
    }
};

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'requests.log');

    console.log(`${req.method} ${req.path}`);

    next();
};

module.exports = { logEvents, logger }