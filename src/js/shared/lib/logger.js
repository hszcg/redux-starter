/* eslint-disable no-console */
const outputConsole = window.console;
const consoleLog = console.log.bind(outputConsole);
const consoleDebug = console.debug.bind(outputConsole);
const consoleError = console.error.bind(outputConsole);
const consoleWarn = console.warn.bind(outputConsole);
const consoleTrace = console.trace.bind(outputConsole);
/* eslint-enable no-console */

const Logger = {
  info: consoleLog,
  debug: consoleDebug,
  error: consoleError,
  warn: consoleWarn,
  trace: consoleTrace
};

// trick to cheat eslint rule import/no-mutable-exports
const exportLogger = Logger;

export default exportLogger;


