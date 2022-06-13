const logger = require('./logger');

describe('logger', () => {
  describe('createLogger', () => {
    describe('logDebug', () => {
      it('should print the message in console.debug', () => {
        console.debug = jest.fn();
        const testLogger = logger.createLogger('DEBUG');

        testLogger.logDebug("test");

        expect(console.debug).toHaveBeenCalled();
      });
      it('should not print the message in console.debug on higher logLevels', () => {
        console.debug = jest.fn();
        const testLogger = logger.createLogger('INFO');

        testLogger.logDebug("test");

        expect(console.debug).not.toHaveBeenCalled();
      });
    });
    describe('logInfo', () => {
      it('should print the message in console.info', () => {
        console.info = jest.fn();
        const testLogger = logger.createLogger('INFO');

        testLogger.logInfo("test");

        expect(console.info).toHaveBeenCalled();
      });
      it('should not print the message in console.info on higher logLevels', () => {
        console.info = jest.fn();
        const testLogger = logger.createLogger('WARNING');

        testLogger.logInfo("test");

        expect(console.info).not.toHaveBeenCalled();
      });
    });
    describe('logWarning', () => {
      it('should print the message in console.warn', () => {
        console.warn = jest.fn();
        const testLogger = logger.createLogger('WARNING');

        testLogger.logWarning("test");

        expect(console.warn).toHaveBeenCalled();
      });
      it('should not print the message in console.warn on higher logLevels', () => {
        console.warn = jest.fn();
        const testLogger = logger.createLogger('ERROR');

        testLogger.logWarning("test");

        expect(console.warn).not.toHaveBeenCalled();
      });
    });
    describe('logError', () => {
      it('should print the message in console.error', () => {
        console.error = jest.fn();
        const testLogger = logger.createLogger('ERROR');

        testLogger.logError("test");

        expect(console.error).toHaveBeenCalled();
      });
      it('should not print the message in console.error  on higher logLevels', () => {
        console.warn = jest.fn();
        const testLogger = logger.createLogger('NONE');

        testLogger.logError("test");

        expect(console.warn).not.toHaveBeenCalled();
      });
    });
  });
});
