const { generateRequestMock, generateResponseMock } = require('../../src/utils/testUtils');
const ContentPages = require('../../src/controllers/ContentPages');
const writer = require('../../src/utils/writer');

jest.mock('../../src/utils/writer.js');

describe('ContentPages', () => {

  const service = {
    contentPagesGet: jest.fn(),
    contentPagesContentIdsGet: jest.fn()
  };
  const controller = ContentPages(service);

  describe('contentPagesGet', () => {
    it('calls contentPagesGet method from service', async () => {
      const resMock = generateResponseMock();
      const reqMock = generateRequestMock();

      service.contentPagesGet.mockResolvedValue({
        contentPages: ['hello-world', 'hello-world-2', 'hello-world-3', 'hello-world-4', 'hello-world-5'],
        total: 5,
        hasNext: false,
      });
      const testQuery = 'world';
      const testLang = 'en';

      await controller.contentPagesGet(reqMock, resMock, undefined, testQuery, testLang, 1);

      expect(service.contentPagesGet.mock.calls.length).toBe(1);
      expect(service.contentPagesGet.mock.calls[0][0]).toEqual(testQuery);
      expect(service.contentPagesGet.mock.calls[0][1]).toEqual(testLang);
      expect(service.contentPagesGet.mock.calls[0][2]).toEqual(1);
      expect(writer.writeJson).toHaveBeenCalledTimes(1);
    });
  });
  describe('contentPagesContentIdsGet', () => {
    it('calls contentPagesContentIdsGet method from service', async () => {
      const resMock = generateResponseMock();
      const reqMock = generateRequestMock();

      const testContentIds = ['hello-world-2', 'hello-world-3'];
      service.contentPagesContentIdsGet.mockResolvedValue({
        contentPages: testContentIds,
        total: 2,
        hasNext: false,
      });
      const testLang = 'en';

      await controller.contentPagesContentIdsGet(reqMock, resMock, undefined, testLang, testContentIds);

      expect(service.contentPagesContentIdsGet.mock.calls.length).toBe(1);
      expect(service.contentPagesContentIdsGet.mock.calls[0][0]).toEqual(testContentIds);
      expect(service.contentPagesContentIdsGet.mock.calls[0][1]).toEqual(testLang);
      expect(writer.writeJson).toHaveBeenCalledTimes(1);
    });

    describe('contentPagesHead', () => {
      it('returns success if contentPages feature is enabled', async () => {
        const resMock = generateResponseMock();
        const reqMock = generateRequestMock();
  
        const controller = ContentPages(service, { contentPages: true });
  
        await controller.contentPagesHead(reqMock, resMock);
  
        expect(resMock.send.mock.calls[0][0]).toEqual(200);
      });
      it('returns an error if contentPages feature is disabled', async () => {
        const resMock = generateResponseMock();
        const reqMock = generateRequestMock();

        const controller = ContentPages(service, { contentPages: false });

        await controller.contentPagesHead(reqMock, resMock);

        expect(resMock.send.mock.calls[0][0]).toEqual(404);
      });
    });
  });
});
