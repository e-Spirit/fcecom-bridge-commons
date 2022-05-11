const { createRouterConfig } = require('./routerUtils');
const fs = require('fs');
const path = require('path');

jest.mock('fs');

describe('RouterUtils', () => {
  describe('createRouterConfig', () => {
      const OTHER_FILE = 'OTHERFILE.txt';
      const SPEC_FILE = 'SPECFILE.spec.js';

      it('creates the router configuration to use for oas3-tools', async () => {
        const controllerDir = 'CONTROLLERDIR';
        const servicesDir = 'SERVICESDIR';
        const controllerName = 'CONTROLLERNAME'
        const controllerFileName = `${controllerName}.js`;
        const serviceName = `${controllerName}Service`;
        const serviceFileName = `${serviceName}.js`;
        const unusedServiceFileName = 'OTHERService.js';
        const methodName = 'GET';
        const methodFn = jest.fn();

        fs.readdirSync
            .mockReturnValueOnce([ controllerFileName, OTHER_FILE, SPEC_FILE])
            .mockReturnValueOnce([ serviceFileName, unusedServiceFileName, OTHER_FILE, SPEC_FILE]);
        const controllerMock = jest.fn();
        controllerMock.mockReturnValueOnce({
            [methodName]: methodFn
        });
        jest.doMock(path.join(controllerDir, controllerFileName), () => controllerMock, { virtual: true });
        const serviceMock = {};
        jest.doMock(path.join(servicesDir, serviceFileName), () => {
            return serviceMock;
        }, { virtual: true });
        jest.doMock(path.join(servicesDir, unusedServiceFileName), () => {
            return { };
        }, { virtual: true });


        const result = createRouterConfig(controllerDir, servicesDir);

        expect(fs.readdirSync.mock.calls[0][0]).toEqual(controllerDir);
        expect(fs.readdirSync.mock.calls[1][0]).toEqual(servicesDir);
        // Check if service is passed correctly
        expect(controllerMock.mock.calls[0][0] === serviceMock).toEqual(true);
        // Check if object is created correctly
        expect(result[`${controllerName}_${methodName}`]).toEqual(methodFn);
    });
    it('ignores controllers that have no matching service', async () => {
        const controllerDir = 'CONTROLLERDIR';
        const servicesDir = 'SERVICESDIR';
        const controllerName = 'CONTROLLERNAME'
        const controllerFileName = `${controllerName}.js`;
        const unusedServiceFileName = 'OTHERService.js';
        const methodName = 'GET';
        const methodFn = jest.fn();

        fs.readdirSync
            .mockReturnValueOnce([ controllerFileName, OTHER_FILE, SPEC_FILE])
            .mockReturnValueOnce([ unusedServiceFileName, OTHER_FILE, SPEC_FILE]);
        const controllerMock = jest.fn();
        controllerMock.mockReturnValueOnce({
            [methodName]: methodFn
        });
        jest.doMock(path.join(controllerDir, controllerFileName), () => controllerMock, { virtual: true });
        jest.doMock(path.join(servicesDir, unusedServiceFileName), () => {
            return { };
        }, { virtual: true });


        const result = createRouterConfig(controllerDir, servicesDir);

        expect(fs.readdirSync.mock.calls[0][0]).toEqual(controllerDir);
        expect(fs.readdirSync.mock.calls[1][0]).toEqual(servicesDir);
        // Check that controller has not been invoked
        expect(controllerMock.mock.calls.length).toEqual(0);
        // Check if object is created correctly
        expect(Object.keys(result).length).toEqual(0);
    });
  });
});
