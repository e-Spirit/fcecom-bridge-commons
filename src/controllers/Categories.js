'use strict';

const utils = require('../../src/utils/writer.js');


module.exports = function (service, features) {
  const categoriesGet = async function categoriesGet(req, res, next, parentId, lang, page) {
    try {
      const response = await service.categoriesGet(parentId, lang, page)
      if (response.categories) {
        res.set({'X-Total': response.total, 'X-HasNext': response.hasNext});
        utils.writeJson(res, response.categories);
      }
      else {
        utils.writeJson(res, response);
      }
    }
    catch (err) {
      utils.writeJson(res, err);
    }
  };

  const categoriesCategoryIdsGet = async function categoriesCategoryIdsGet(req, res, next, lang, categoryIds) {
    const  response = await service.categoriesCategoryIdsGet(categoryIds, lang)
    if (response.categories) {
      utils.writeJson(res, response.categories);
    }
    else {
      utils.writeJson(res, response);
    }
  };

  const categoriesCategoryIdsHead = async function categoriesCategoryIdsHead(req, res, next) {
    res.sendStatus(200);
  };

  /* method to support deprecated route */
  const categoriesCategoryIdsGetOld = async function categoriesCategoryIdsGetOld(req, res, next, lang, productIds) {
    await categoriesCategoryIdsGet(req, res, next, lang, productIds);
  };

  const categoryTreeGet = async function categoryTreeGet(req, res, next, parentId, lang) {
    const response = await service.categoryTreeGet(parentId, lang)
    if (response.categorytree) {
      utils.writeJson(res, response.categorytree);
    }
    else {
      utils.writeJson(res, response);
    }
  };

  const categoryTreeHead = function categoryTreeHead(req, res, next) {
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