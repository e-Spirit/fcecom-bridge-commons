'use strict';

const utils = require('../../src/utils/writer.js');

module.exports = function (service) {
  const productsGet = async function productsGet(req, res, next, categoryId, q, lang, page) {
    await service.productsGet(categoryId, q, lang, page)
      .then(function (response) {
        res.set({ 'X-Total': response.total, 'X-HasNext': response.hasNext });
        utils.writeJson(res, response.products);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };

  const productsProductIdsGet = async function productsProductIdsGet(req, res, next, lang, productIds) {
    await service.productsProductIdsGet(productIds, lang)
      .then(function (response) {
        utils.writeJson(res, response.products);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };

  const productsProductIdsHead = async function productsProductIdsHead(req, res, next) {
    res.send(200);
  };

  /* method to support deprecated route */
  const productsProductIdsGetOld = async function productsProductIdsGetOld(req, res, next, lang, productIds) {
    await productsProductIdsGet(req, res, next, lang, productIds);
  };

  return {
    productsGet,
    productsProductIdsGet,
    productsProductIdsGetOld,
    productsProductIdsHead
  };
};