'use strict';

const utils = require('../../src/utils/writer.js');

module.exports = function (service) {
    const lookupUrlGet = async function lookupUrlGet(req, res) {
        try {
            const { url } = req.query;
            const response = await service.lookupUrlGet(url);
            utils.writeJson(res, response);
        } catch (err) {
            utils.writeJson(res, err);
        }
    };

    const storefrontUrlGet = async function storefrontUrlGet(req, res) {
        try {
            const { type, id, lang } = req.query;
            const response = await service.storefrontUrlGet(type, id, lang);
            utils.writeJson(res, response);
        } catch (err) {
            utils.writeJson(res, err);
        }
    };

    return {
        lookupUrlGet,
        storefrontUrlGet
    };
};
