const { generateRequestMock, generateResponseMock } = require('../../src/utils/testUtils');

const writer = require('../../src/utils/writer');
const Categories = require('../../src/controllers/Categories');

jest.mock('../../src/utils/writer.js');

describe('Categories', () => {
    const service = {
        categoriesGet: jest.fn(),
        categoriesCategoryIdsGet: jest.fn(),
        categoryTreeGet: jest.fn()
    };
    const controller = Categories(service);

    describe('categoriesGet', () => {
        it('calls categoriesGet method from service', async () => {
            const resMock = generateResponseMock();
            const reqMock = generateRequestMock();

            const categories = [1, 2, 3];
            service.categoriesGet.mockResolvedValue({
                categories,
                total: 3,
                hasNext: false
            });

            const testParameterParentId = 'replace-calm-attached';
            const testLang = 'en';
            const testPage = 1;

            reqMock.query = {
                parentId: testParameterParentId,
                lang: testLang,
                page: testPage
            };

            await controller.categoriesGet(reqMock, resMock);

            expect(service.categoriesGet.mock.calls.length).toBe(1);
            expect(service.categoriesGet.mock.calls[0][0]).toEqual(testParameterParentId);
            expect(service.categoriesGet.mock.calls[0][1]).toEqual(testLang);
            expect(service.categoriesGet.mock.calls[0][2]).toEqual(testPage);
            expect(writer.writeJson).toHaveBeenCalledTimes(1);
        });
    });
    describe('categoriesCategoryIdsGet', () => {
        it('calls categoriesCategoryIdsGet method from service', async () => {
            const resMock = generateResponseMock();
            const reqMock = generateRequestMock();

            const testCategoriesParameter = '1,2,3';
            const categories = testCategoriesParameter.split(',');
            service.categoriesCategoryIdsGet.mockResolvedValue({
                categories,
                total: 1,
                hasNext: false
            });
            const testLang = 'en';
            reqMock.query = {
                lang: testLang
            };
            reqMock.params = {
                categoryIds: testCategoriesParameter
            };

            await controller.categoriesCategoryIdsGet(reqMock, resMock);

            expect(service.categoriesCategoryIdsGet.mock.calls.length).toBe(1);
            expect(service.categoriesCategoryIdsGet.mock.calls[0][0]).toEqual(categories);
            expect(service.categoriesCategoryIdsGet.mock.calls[0][1]).toEqual(testLang);
            expect(writer.writeJson).toHaveBeenCalledTimes(1);
        });
    });
    describe('categoriesCategoryIdsGetOld (deprecated)', () => {
        it('calls categoriesCategoryIdsGet method from service', async () => {
            const resMock = generateResponseMock();
            const reqMock = generateRequestMock();

            const testCategoriesParameter = '1,2,3';
            const categories = testCategoriesParameter.split(',');
            service.categoriesCategoryIdsGet.mockResolvedValue({
                categories,
                total: 1,
                hasNext: false
            });
            const testLang = 'en';
            reqMock.query = {
                lang: testLang
            };
            reqMock.params = {
                categoryIds: testCategoriesParameter
            };

            await controller.categoriesCategoryIdsGetOld(reqMock, resMock);

            expect(service.categoriesCategoryIdsGet.mock.calls.length).toBe(1);
            expect(service.categoriesCategoryIdsGet.mock.calls[0][0]).toEqual(categories);
            expect(service.categoriesCategoryIdsGet.mock.calls[0][1]).toEqual(testLang);
            expect(writer.writeJson).toHaveBeenCalledTimes(1);
        });
    });
    describe('categoryTreeGet', () => {
        it('calls categoryTreeGet method from service', async () => {
            const resMock = generateResponseMock();
            const reqMock = generateRequestMock();

            const categoryTree = [];
            service.categoryTreeGet.mockResolvedValue({
                categoryTree
            });
            const testParameterParentId = 'replace-calm-attached';
            const testLang = 'en';
            reqMock.query = {
                parentId: testParameterParentId,
                lang: testLang
            };

            await controller.categoryTreeGet(reqMock, resMock);

            expect(service.categoryTreeGet.mock.calls.length).toBe(1);
            expect(service.categoryTreeGet.mock.calls[0][0]).toEqual(testParameterParentId);
            expect(service.categoryTreeGet.mock.calls[0][1]).toEqual(testLang);
            expect(writer.writeJson).toHaveBeenCalledTimes(1);
        });
    });

    describe('categoryTreeHead', () => {
        it('returns success if contentPages feature is enabled', async () => {
            const resMock = generateResponseMock();
            const reqMock = generateRequestMock();

            const controller = Categories(service, { categoryTree: true });

            await controller.categoryTreeHead(reqMock, resMock);

            expect(resMock.sendStatus.mock.calls[0][0]).toEqual(200);
        });
        it('returns an error if contentPages feature is disabled', async () => {
            const resMock = generateResponseMock();
            const reqMock = generateRequestMock();

            const controller = Categories(service, { categoryTree: false });

            await controller.categoryTreeHead(reqMock, resMock);

            expect(resMock.sendStatus.mock.calls[0][0]).toEqual(404);
        });
    });
});