'use strict';

const { handleError } = require('../utils/errorUtils');
const { extractParameters, getString, getNumber } = require('../utils/parameterExtractor');
const { writeJson } = require('../utils/writer');
const { getLogger } = require('../index');
const { PACKAGE_NAME } = require('../utils/logger');

module.exports = function (service) {
    const logger = getLogger();
    const LOGGING_NAME = 'Products';

    const productsGet = async function productsGet(req, res) {
        logger.logDebug(
            PACKAGE_NAME,
            LOGGING_NAME,
            `Received ${req.method} request on /products with parameters ${JSON.stringify({ ...req.query })}`
        );
        try {
            let { categoryId, q, lang, page } = extractParameters(req.query);
            page = page && getNumber(page, 'page');
            const response = await service.productsGet(categoryId, q, lang, page);
            res.set({ 'X-Total': response.total, 'X-HasNext': response.hasNext });
            writeJson(res, response.products);
        } catch (err) {
            handleError(res, err);
        }
    };

    const productsProductIdsGet = async function productsProductIdsGet(req, res) {
        if (req.method === 'HEAD') {
            productsProductIdsHead(req, res);
        } else {
            logger.logDebug(
                PACKAGE_NAME,
                LOGGING_NAME,
                `Received ${req.method} request on /products/ids with parameters ${JSON.stringify({ ...req.query, ...req.params })}`
            );
            try {
                const { lang } = extractParameters(req.query);
                const productIds = getString(req.params['productIds'], 'productIds').split(',');
                const response = await service.productsProductIdsGet(productIds, lang);
                writeJson(res, response.products);
            } catch (err) {
                handleError(res, err);
            }
        }
    };

    const productsProductIdsHead = async function productsProductIdsHead(req, res) {
        logger.logDebug(PACKAGE_NAME, LOGGING_NAME, `Received ${req.method} request on /products/ids`);
        res.sendStatus(200);
    };

    return {
        productsGet,
        productsProductIdsGet,
        productsProductIdsHead
    };
};
