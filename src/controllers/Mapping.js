'use strict';

const utils = require('../../src/utils/writer.js');
const { handleError } = require('../utils/errorUtils');
const { getString, extractParameters } = require('../utils/parameterExtractor.js');

module.exports = function (service) {
    const lookupUrlGet = async function lookupUrlGet(req, res) {
        try {
            const { url } = extractParameters(req.query);
            const response = await service.lookupUrlGet(getString(url, 'url'));
            utils.writeJson(res, response);
        } catch (err) {
            handleError(res, err);
        }
    };

    const storefrontUrlGet = async function storefrontUrlGet(req, res) {
        try {
            const { type, id, lang } = extractParameters(req.query);
            const response = await service.storefrontUrlGet(getString(type, 'type'), getString(id, 'id'), lang);
            utils.writeJson(res, response);
        } catch (err) {
            handleError(res, err);
        }
    };

    return {
        lookupUrlGet,
        storefrontUrlGet
    };
};
