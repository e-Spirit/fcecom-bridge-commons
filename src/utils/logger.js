const LogLevel = {
  DEBUG: 0, /* all http status codes will be printed */
  INFO:  100, /* all info messages and success messages will be printed */
  WARNING: 300, /* all redirects will be printed */
  ERROR: 400, /* all error codes will be printed */
  NONE: 900, /* none http status codes will be printed */
}

const createLogger = (logLevel) => {
  let loggerLevel = LogLevel[logLevel]
  if(loggerLevel === undefined) {
    loggerLevel = LogLevel.INFO
  }

  const logDebug = (...data) => {
    if (loggerLevel <= LogLevel.DEBUG) {
      console.debug(data)
    }
  }
  const logInfo = (...data) => {
    if (loggerLevel <= LogLevel.INFO) {
      console.info(data)
    }
  }
  const logWarning = (...data) => {
    if (loggerLevel <= LogLevel.WARNING) {
      console.warn(data)
    }
  }
  const logError = (...data) => {
    if (loggerLevel <= LogLevel.ERROR) {
      console.error(data)
    }
  }

  return {
    logDebug,
    logInfo,
    logWarning,
    logError,
  }
}

module.exports = {
  createLogger,
  LogLevel
}