'use strict';

const utils = require('../../src/utils/writer.js');


module.exports = function (service, features) {
  const contentPagesContentIdDelete = async function contentPagesContentIdDelete(req, res, next, contentId, lang) {
    await service.contentPagesContentIdDelete(contentId, lang)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };

  const contentPagesContentIdPut = async function contentPagesContentIdPut(req, res, next, body, lang, contentId) {
    await service.contentPagesContentIdPut(body, lang, contentId)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };

  const contentPagesContentIdsGet = async function contentPagesContentIdsGet(req, res, next, lang, contentIds) {
    await service.contentPagesContentIdsGet(contentIds, lang)
      .then(function (response) {
        utils.writeJson(res, response.contentPages);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };

  const contentPagesGet = async function contentPagesGet(req, res, next, q, lang, page) {
    await service.contentPagesGet(q, lang, page)
      .then(function (response) {
        res.set({ 'X-Total': response.total, 'X-HasNext': response.hasNext });
        utils.writeJson(res, response.contentPages);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };

  const contentPagesHead = function contentPagesHead(req, res, next) {
    if (features.contentPages) {
      res.send(200);
    } else {
      res.send(404);
    }
  };

  const contentPagesPost = async function contentPagesPost(req, res, next, body, lang) {
    await service.contentPagesPost(body, lang)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
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
