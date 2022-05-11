'use strict';

const utils = require('../../src/utils/writer.js');

module.exports = function (service) {
  const lookupUrlGet = async function lookupUrlGet(req, res, next, url) {
    await service.lookupUrlGet(url)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };

  const storefrontUrlGet = async function storefrontUrlGet(req, res, next, type, id, lang) {
    await service.storefrontUrlGet(type, id, lang)
      .then(function (response) {
        utils.writeJson(res, response);
      })
      .catch(function (response) {
        utils.writeJson(res, response);
      });
  };

  return {
    lookupUrlGet,
    storefrontUrlGet
  };
};