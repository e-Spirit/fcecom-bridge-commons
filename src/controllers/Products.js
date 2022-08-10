'use strict';

const utils = require('../../src/utils/writer.js');

module.exports = function (service) {
    const productsGet = async function productsGet(req, res) {
        try {
            const { categoryId, q, lang, page } = req.query;
            const response = await service.productsGet(categoryId, q, lang, page);
            res.set({ 'X-Total': response.total, 'X-HasNext': response.hasNext });
            utils.writeJson(res, response.products);
        } catch (err) {
            utils.writeJson(res, err);
        }
    };

    const productsProductIdsGet = async function productsProductIdsGet(req, res) {
        if (req.method === 'HEAD') {
            productsProductIdsHead(req, res);
        } else {
            try {
                const { lang } = req.query;
                const productIds = req.params['productIds'].split(',');
                const response = await service.productsProductIdsGet(productIds, lang);
                utils.writeJson(res, response.products);
            } catch (err) {
                utils.writeJson(res, err);
            }
        }
    };

    const productsProductIdsHead = async function productsProductIdsHead(req, res) {
        res.sendStatus(200);
    };

    /* method to support deprecated route */
    const productsProductIdsGetOld = async function productsProductIdsGetOld(req, res) {
        await productsProductIdsGet(req, res);
    };

    return {
        productsGet,
        productsProductIdsGet,
        productsProductIdsGetOld,
        productsProductIdsHead
    };
};
