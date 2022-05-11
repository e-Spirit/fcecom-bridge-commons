const { generateRequestMock, generateResponseMock } = require('../../src/utils/testUtils');
const Products = require('../../src/controllers/Products');
const writer = require('../../src/utils/writer');

jest.mock('../../src/utils/writer.js');

describe('Products', () => {

  const service = {
    productsGet: jest.fn(),
    productsProductIdsGet: jest.fn()
  };
  const controller = Products(service);

  const testProducts = ['develop', 'recall-walk-great'];
  const testLang = 'en';
  describe('productsGet', () => {
    it('calls productsGet method from service', async () => {
      const resMock = generateResponseMock();
      const reqMock = generateRequestMock();

      service.productsGet.mockResolvedValue({
        products: ['pretty-vast-highway', ...testProducts, 'particular', 'paid'],
        total: 5,
        hasNext: false,
      });
      const testCategoryId = 'slide-stems-touch';
      const testQuery = 'touch';


      await controller.productsGet(reqMock, resMock, undefined, testCategoryId, testQuery, testLang, 1);

      expect(service.productsGet.mock.calls.length).toBe(1);
      expect(service.productsGet.mock.calls[0][0]).toEqual(testCategoryId);
      expect(service.productsGet.mock.calls[0][1]).toEqual(testQuery);
      expect(service.productsGet.mock.calls[0][2]).toEqual(testLang);
      expect(service.productsGet.mock.calls[0][3]).toEqual(1);
      expect(writer.writeJson).toHaveBeenCalledTimes(1);
    });
  });
  describe('productsProductIdsGet', () => {
    it('calls productsProductIdsGet method from service', async () => {
      const resMock = generateResponseMock();
      const reqMock = generateRequestMock();

      service.productsProductIdsGet.mockResolvedValue({
        products: testProducts,
        total: 2,
        hasNext: false,
      });

      await controller.productsProductIdsGet(reqMock, resMock, undefined, testLang, testProducts);

      expect(service.productsProductIdsGet.mock.calls.length).toBe(1);
      expect(service.productsProductIdsGet.mock.calls[0][0]).toEqual(testProducts);
      expect(service.productsProductIdsGet.mock.calls[0][1]).toEqual(testLang);
      expect(writer.writeJson).toHaveBeenCalledTimes(1);
    });
  });
  describe('productsProductIdsGetOld (deprecated)', () => {
    it('calls productsProductIdsGet method from service', async () => {
      const resMock = generateResponseMock();
      const reqMock = generateRequestMock();

      service.productsProductIdsGet.mockResolvedValue({
        products: testProducts,
        total: 2,
        hasNext: false,
      });

      await controller.productsProductIdsGetOld(reqMock, resMock, undefined, testLang, testProducts);

      expect(service.productsProductIdsGet.mock.calls.length).toBe(1);
      expect(service.productsProductIdsGet.mock.calls[0][0]).toEqual(testProducts);
      expect(service.productsProductIdsGet.mock.calls[0][1]).toEqual(testLang);
      expect(writer.writeJson).toHaveBeenCalledTimes(1);
    });
  });
  describe('productsProductIdsHead', () => {
    it('fills the res with a 200 code', async () => {
      const resMock = generateResponseMock();
      const reqMock = generateRequestMock();

      await controller.productsProductIdsHead(reqMock, resMock, undefined);

      expect(resMock.send.mock.calls.length).toBe(1);
      expect(resMock.send.mock.calls[0][0]).toBe(200);
    });
  });
});
