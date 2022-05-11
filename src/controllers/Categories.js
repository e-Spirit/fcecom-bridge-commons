'use strict';

const utils = require('../../src/utils/writer.js');


module.exports = function (service, features) {
  const categoriesGet = async function categoriesGet(req, res, next, parentId, lang, page) {
    await service.categoriesGet(parentId, lang, page)
      .then(function (response) {
        res.set({ 'X-Total': response.total, 'X-HasNext': response.hasNext });
        utils.writeJson(res, response.categories);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };

  const categoriesCategoryIdsGet = async function categoriesCategoryIdsGet(req, res, next, lang, categoryIds) {
    await service.categoriesCategoryIdsGet(categoryIds, lang)
      .then(function (response) {
        utils.writeJson(res, response.categories);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };

  const categoriesCategoryIdsHead = async function categoriesCategoryIdsHead(req, res, next) {
    res.send(200);
  };

  /* method to support deprecated route */
  const categoriesCategoryIdsGetOld = async function categoriesCategoryIdsGetOld(req, res, next, lang, productIds) {
    await categoriesCategoryIdsGet(req, res, next, lang, productIds);
  };

  const categoryTreeGet = async function categoryTreeGet(req, res, next, parentId, lang) {
    await service.categoryTreeGet(parentId, lang)
      .then(function (response) {
        utils.writeJson(res, response.categorytree);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };

  const categoryTreeHead = function categoryTreeHead(req, res, next) {
    if (features.categoryTree) {
      res.send(200);
    } else {
      res.send(404);
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