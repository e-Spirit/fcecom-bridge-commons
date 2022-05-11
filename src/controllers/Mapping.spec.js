const { generateRequestMock, generateResponseMock } = require('../../src/utils/testUtils');
const Mapping = require('../../src/controllers/Mapping');
const writer = require('../../src/utils/writer');

jest.mock('../../src/utils/writer.js');

describe('Mapping', () => {

  const service = {
    lookupUrlGet: jest.fn(),
    storefrontUrlGet: jest.fn()
  };
  const controller = Mapping(service);
  
  const testUrl = 'https://mycommerce.com/catalog/p/pretty-vast-highway?lang=en';
  const testId = 'pretty-vast-highway';
  const testLang = 'en';
  const testType = 'product';
  describe('lookupUrlGet', () => {
    it('calls lookupUrlGet method from service', async () => {
      const resMock = generateResponseMock();
      const reqMock = generateRequestMock();

      service.lookupUrlGet.mockResolvedValue({ type: testType, id: testId, lang: testLang });

      await controller.lookupUrlGet(reqMock, resMock, undefined, { url: testUrl });

      expect(service.lookupUrlGet.mock.calls.length).toBe(1);
      expect(service.lookupUrlGet.mock.calls[0][0]).toEqual({ url: testUrl });
      expect(writer.writeJson).toHaveBeenCalledTimes(1);
    });
  });
  describe('storefrontUrlGet', () => {
    it('calls storefrontUrlGet method from service', async () => {
      const resMock = generateResponseMock();
      const reqMock = generateRequestMock();

      service.storefrontUrlGet.mockResolvedValue({ url: testUrl });

      await controller.storefrontUrlGet(reqMock, resMock, undefined, testType, testId, 'en');

      expect(service.storefrontUrlGet.mock.calls.length).toBe(1);
      expect(service.storefrontUrlGet.mock.calls[0][0]).toBe(testType);
      expect(service.storefrontUrlGet.mock.calls[0][1]).toBe(testId);
      expect(service.storefrontUrlGet.mock.calls[0][2]).toBe('en');
      expect(writer.writeJson).toHaveBeenCalledTimes(1);
    });
  });
});
