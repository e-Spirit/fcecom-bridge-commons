'use strict';

const utils = require('../../src/utils/writer.js');

module.exports = function (service, features) {
    const contentPagesContentIdDelete = async function contentPagesContentIdDelete(req, res) {
        try {
            const { contentId } = req.params;
            const { lang } = req.query;
            const response = await service.contentPagesContentIdDelete(contentId, lang);
            utils.writeJson(res, response);
        } catch (err) {
            utils.writeJson(res, err);
        }
    };

    const contentPagesContentIdPut = async function contentPagesContentIdPut(req, res) {
        try {
            const { contentId } = req.params;
            const { lang } = req.query;
            const { body } = req;
            const response = await service.contentPagesContentIdPut(body, lang, contentId);
            utils.writeJson(res, response);
        } catch (err) {
            utils.writeJson(res, err);
        }
    };

    const contentPagesContentIdsGet = async function contentPagesContentIdsGet(req, res) {
        try {
            const contentIds = req.params['contentIds'].split(',');
            const { lang } = req.query;
            const response = await service.contentPagesContentIdsGet(contentIds, lang);
            utils.writeJson(res, response.contentPages);
        } catch (err) {
            utils.writeJson(res, err);
        }
    };

    const contentPagesGet = async function contentPagesGet(req, res) {
        if (req.method === 'HEAD') {
            contentPagesHead(req, res);
        } else {
            try {
                const { q, lang, page } = req.query;
                const response = await service.contentPagesGet(q, lang, page);
                res.set({ 'X-Total': response.total, 'X-HasNext': response.hasNext });
                utils.writeJson(res, response.contentPages);
            } catch (err) {
                utils.writeJson(res, response);
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
            const { lang } = req.query;
            const { body } = req;
            const response = await service.contentPagesPost(body, lang);
            utils.writeJson(res, response);
        } catch (err) {
            utils.writeJson(res, err);
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
