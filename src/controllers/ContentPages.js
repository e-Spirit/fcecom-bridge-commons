'use strict';

const utils = require('../../src/utils/writer.js');


module.exports = function (service, features) {
  const contentPagesContentIdDelete = async function contentPagesContentIdDelete(req, res, next, contentId, lang) {
    try {
      const response = await service.contentPagesContentIdDelete(contentId, lang)
      utils.writeJson(res, response);
    }
    catch (err) {
      utils.writeJson(res, err);
    }
  };

  const contentPagesContentIdPut = async function contentPagesContentIdPut(req, res, next, body, lang, contentId) {
    try {
      const response = await service.contentPagesContentIdPut(body, lang, contentId)
      utils.writeJson(res, response);
    }
    catch (err) {
      utils.writeJson(res, err);
    }
  };

  const contentPagesContentIdsGet = async function contentPagesContentIdsGet(req, res, next, lang, contentIds) {
    try {
      const response = await service.contentPagesContentIdsGet(contentIds, lang)
      utils.writeJson(res, response.contentPages);
    }
    catch (err) {
      utils.writeJson(res, err);
    }
  };

  const contentPagesGet = async function contentPagesGet(req, res, next, q, lang, page) {
    try {
      const response = await service.contentPagesGet(q, lang, page)
      res.set({'X-Total': response.total, 'X-HasNext': response.hasNext});
      utils.writeJson(res, response.contentPages);
    }
    catch (err) {
      utils.writeJson(res, response);
    }
  };

  const contentPagesHead = function contentPagesHead(req, res, next) {
    if (features.contentPages) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  };

  const contentPagesPost = async function contentPagesPost(req, res, next, body, lang) {
    try {
      const response = await service.contentPagesPost(body, lang)
      utils.writeJson(res, response);
    }
    catch (err) {
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
  }
};
