'use strict';

const utils = require('../../src/utils/writer.js');
const { handleError } = require('../utils/errorUtils');
const { extractParameters, getString, getNumber } = require('../utils/parameterExtractor.js');

module.exports = function (service, features) {
    const categoriesGet = async function categoriesGet(req, res) {
        try {
            let { parentId, lang, page } = extractParameters(req.query);
            page = page && getNumber(page, 'page');
            const response = await service.categoriesGet(parentId, lang, page);
            if (response.categories) {
                res.set({ 'X-Total': response.total, 'X-HasNext': response.hasNext });
                utils.writeJson(res, response.categories);
            } else {
                utils.writeJson(res, response);
            }
        } catch (err) {
            handleError(res, err);
        }
    };

    const categoriesCategoryIdsGet = async function categoriesCategoryIdsGet(req, res) {
        if (req.method === 'HEAD') {
            categoriesCategoryIdsHead(req, res);
        } else {
            try {
                const { lang } = extractParameters(req.query);
                const categoryIds = getString(req.params['categoryIds'], 'categoryIds').split(',');
                const response = await service.categoriesCategoryIdsGet(categoryIds, lang);
                if (response.categories) {
                    utils.writeJson(res, response.categories);
                } else {
                    utils.writeJson(res, response);
                }
            } catch (err) {
                handleError(res, err);
            }
        }
    };

    const categoriesCategoryIdsHead = async function categoriesCategoryIdsHead(req, res) {
        res.sendStatus(200);
    };

    /* method to support deprecated route */
    const categoriesCategoryIdsGetOld = async function categoriesCategoryIdsGetOld(req, res) {
        // Remove first element if it is "ids" as this is caused by the legacy route matching
        if (req.params.categoryIds) {
            req.params.categoryIds = req.params.categoryIds.replace(/^ids,?/, '');
        }
        await categoriesCategoryIdsGet(req, res);
    };

    const categoryTreeGet = async function categoryTreeGet(req, res) {
        if (req.method === 'HEAD') {
            categoryTreeHead(req, res);
        } else {
            try {
                const { parentId, lang } = extractParameters(req.query);
                const response = await service.categoryTreeGet(parentId, lang);
                if (response.categorytree) {
                    utils.writeJson(res, response.categorytree);
                } else {
                    utils.writeJson(res, response);
                }
            } catch (err) {
                handleError(res, err);
            }
        }
    };

    const categoryTreeHead = function categoryTreeHead(req, res) {
        if (features.categoryTree) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    };

    return {
        categoriesGet,
        categoriesCategoryIdsGet,
        categoriesCategoryIdsGetOld,
        categoriesCategoryIdsHead,
        categoryTreeGet,
        categoryTreeHead
    };
};
