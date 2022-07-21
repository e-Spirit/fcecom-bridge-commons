'use strict';

const utils = require('../../src/utils/writer.js');

module.exports = function (service, features) {
    const categoriesGet = async function categoriesGet(req, res) {
        try {
            const { parentId, lang, page } = req.query;
            const response = await service.categoriesGet(parentId, lang, page);
            if (response.categories) {
                res.set({ 'X-Total': response.total, 'X-HasNext': response.hasNext });
                utils.writeJson(res, response.categories);
            } else {
                utils.writeJson(res, response);
            }
        } catch (err) {
            utils.writeJson(res, err);
        }
    };

    const categoriesCategoryIdsGet = async function categoriesCategoryIdsGet(req, res) {
        if (req.method === 'HEAD') {
            categoriesCategoryIdsHead(req, res);
        } else {
            try {
                const { lang } = req.query;
                const categoryIds = req.params['categoryIds'].split(',');
                const response = await service.categoriesCategoryIdsGet(categoryIds, lang);
                if (response.categories) {
                    utils.writeJson(res, response.categories);
                } else {
                    utils.writeJson(res, response);
                }
            } catch (err) {
                utils.writeJson(res, err);
            }
        }
    };

    const categoriesCategoryIdsHead = async function categoriesCategoryIdsHead(req, res) {
        res.sendStatus(200);
    };

    /* method to support deprecated route */
    const categoriesCategoryIdsGetOld = async function categoriesCategoryIdsGetOld(req, res) {
        await categoriesCategoryIdsGet(req, res);
    };

    const categoryTreeGet = async function categoryTreeGet(req, res) {
        if (req.method === 'HEAD') {
            categoryTreeHead(req, res);
        } else {
            try {
                const { parentId, lang } = req.query;
                const response = await service.categoryTreeGet(parentId, lang);
                if (response.categorytree) {
                    utils.writeJson(res, response.categorytree);
                } else {
                    utils.writeJson(res, response);
                }
            } catch (err) {
                utils.writeJson(res, err);
            }
        }
    };

    const categoryTreeHead = function categoryTreeHead(req, res) {
        console.log('HEAD');
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
