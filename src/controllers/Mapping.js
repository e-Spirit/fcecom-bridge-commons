'use strict';

const utils = require('../../src/utils/writer.js');

module.exports = function (service) {
  const lookupUrlGet = async function lookupUrlGet(req, res, next, url) {
    try {
    const response = await service.lookupUrlGet(url)
      utils.writeJson(res, response);
    }
    catch {
      utils.writeJson(res, response);
    }
  };

  const storefrontUrlGet = async function storefrontUrlGet(req, res, next, type, id, lang) {
    try {
      const response = await service.storefrontUrlGet(type, id, lang)
      utils.writeJson(res, response);
    }
    catch (err)
    {
      utils.writeJson(res, err);
    }
  };

  return {
    lookupUrlGet,
    storefrontUrlGet
  };
};