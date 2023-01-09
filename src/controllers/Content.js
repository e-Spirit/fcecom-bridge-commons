'use strict';

const { handleError } = require('../utils/errorUtils');
const { extractParameters, getString, getObject, getNumber } = require('../utils/parameterExtractor');
const { writeJson } = require('../utils/writer');

module.exports = function (service, features) {
    const contentContentIdDelete = async function contentContentIdDelete(req, res) {
        try {
            const { contentId } = extractParameters(req.params);
            const response = await service.contentContentIdDelete(getString(contentId, 'contentId'));
            writeJson(res, response);
        } catch (err) {
            handleError(res, err);
        }
    };

    const contentContentIdPut = async function contentContentIdPut(req, res) {
        try {
            const { contentId } = extractParameters(req.params);
            const { body } = req;
            const response = await service.contentContentIdPut(getObject(body, 'body'), getString(contentId, 'contentId'));
            writeJson(res, response);
        } catch (err) {
            handleError(res, err);
        }
    };

    const contentContentIdsGet = async function contentContentIdsGet(req, res) {
        try {
            const contentIds = getString(req.params['contentIds'], 'contentIds').split(',');
            const { lang } = extractParameters(req.query);
            const response = await service.contentContentIdsGet(contentIds, lang);
            writeJson(res, response.content);
        } catch (err) {
            handleError(res, err);
        }
    };

    const contentGet = async function contentGet(req, res) {
        if (req.method === 'HEAD') {
            contentHead(req, res);
        } else {
            try {
                let { q, lang, page } = extractParameters(req.query);
                page = page && getNumber(page, 'page');
                const response = await service.contentGet(q, lang, page);
                res.set({ 'X-Total': response.total, 'X-HasNext': response.hasNext });
                writeJson(res, response.content);
            } catch (err) {
                handleError(res, err);
            }
        }
    };

    const contentHead = function contentHead(req, res) {
        if (features.contentPages) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    };

    const contentPost = async function contentPost(req, res) {
        try {
            const { body } = req;
            const response = await service.contentPost(getObject(body, 'body'));
            writeJson(res, response);
        } catch (err) {
            handleError(res, err);
        }
    };

    return {
        contentContentIdDelete,
        contentContentIdPut,
        contentContentIdsGet,
        contentGet,
        contentHead,
        contentPost
    };
};
