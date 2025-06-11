import chalk from 'chalk';

function logInfo(message) {
  console.log(`${chalk.blue('[INFO]')} ${message}`);
}

function logEvent(message) {
  console.log(`${chalk.magenta('[EVENT]')} ${message}`);
}

function logSend(message) {
  console.log(`${chalk.green('[SEND]')} ${message}`);
}

function logError(message, error) {
  console.error(`${chalk.red('[ERROR]')} ${message}`);
  console.error(chalk.redBright(JSON.stringify(error?.response?.data || error?.message || error, null, 2)));
}

export { logInfo, logEvent, logSend, logError };
