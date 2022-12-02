'use strict';

const { handleError } = require('../utils/errorUtils');
const { extractParameters, getString, getNumber } = require('../utils/parameterExtractor');
const { writeJson } = require('../utils/writer');

module.exports = function (service) {
    const productsGet = async function productsGet(req, res) {
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
        res.sendStatus(200);
    };

    /* method to support deprecated route */
    const productsProductIdsGetOld = async function productsProductIdsGetOld(req, res) {
        // Remove first element if it is "ids" as this is caused by the legacy route matching
        if (req.params.productIds) {
            req.params.productIds = req.params.productIds.replace(/^ids,?/, '');
        }
        await productsProductIdsGet(req, res);
    };

    return {
        productsGet,
        productsProductIdsGet,
        productsProductIdsGetOld,
        productsProductIdsHead
    };
};
