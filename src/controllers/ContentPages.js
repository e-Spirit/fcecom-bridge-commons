'use strict';

const { handleError } = require('../utils/errorUtils');
const { extractParameters, getString, getObject, getNumber } = require('../utils/parameterExtractor');
const { writeJson } = require('../utils/writer');

module.exports = function (service, features) {
    const contentPagesContentIdDelete = async function contentPagesContentIdDelete(req, res) {
        try {
            const { contentId } = extractParameters(req.params);
            const { lang } = extractParameters(req.query);
            const response = await service.contentPagesContentIdDelete(getString(contentId, 'contentId'), lang);
            writeJson(res, response);
        } catch (err) {
            handleError(res, err);
        }
    };

    const contentPagesContentIdPut = async function contentPagesContentIdPut(req, res) {
        try {
            const { contentId } = extractParameters(req.params);
            const { lang } = extractParameters(req.query);
            const { body } = req;
            const response = await service.contentPagesContentIdPut(getObject(body, 'body'), lang, getString(contentId, 'contentId'));
            writeJson(res, response);
        } catch (err) {
            handleError(res, err);
        }
    };

    const contentPagesContentIdsGet = async function contentPagesContentIdsGet(req, res) {
        try {
            const contentIds = getString(req.params['contentIds'], 'contentIds').split(',');
            const { lang } = extractParameters(req.query);
            const response = await service.contentPagesContentIdsGet(contentIds, lang);
            writeJson(res, response.contentPages);
        } catch (err) {
            handleError(res, err);
        }
    };

    const contentPagesGet = async function contentPagesGet(req, res) {
        if (req.method === 'HEAD') {
            contentPagesHead(req, res);
        } else {
            try {
                let { q, lang, page } = extractParameters(req.query);
                page = page && getNumber(page, 'page');
                const response = await service.contentPagesGet(q, lang, page);
                res.set({ 'X-Total': response.total, 'X-HasNext': response.hasNext });
                writeJson(res, response.contentPages);
            } catch (err) {
                handleError(res, err);
            }
        }
    };

    const contentPagesHead = function contentPagesHead(req, res) {
        if (features.contentPages) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    };

    const contentPagesPost = async function contentPagesPost(req, res) {
        try {
            const { lang } = extractParameters(req.query);
            const { body } = req;
            const response = await service.contentPagesPost(getObject(body, 'body'), lang);
            writeJson(res, response);
        } catch (err) {
            handleError(res, err);
        }
    };

    return {
        contentPagesContentIdDelete,
        contentPagesContentIdPut,
        contentPagesContentIdsGet,
        contentPagesGet,
        contentPagesHead,
        contentPagesPost
    };
};
