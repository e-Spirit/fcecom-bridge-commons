
const path = require('path');
const fs = require('fs');

/**
 * Reads the services from the given directory.
 *
 * @param {string} dir Path to the directory that contains the services.
 * @return {*} An object containing all services and their actions.
 */
const getServicesFromDir = (dir) => {
    const services = {};

    fs.readdirSync(dir).forEach((fileName) => {

        if (fileName.endsWith('js') && !fileName.endsWith('.spec.js')) {
            const service = require(path.join(dir, fileName));
            const serviceName = /(.*).js/.exec(fileName) ? /(.*).js/.exec(fileName)[1] : null;
            if (serviceName) {
                services[serviceName] = service;
            }
        }
    });
    return services;
};

/**
 * Creates a controller configuration for the router to be used by oas3-tools.
 * 
 * @param {string} controllerPath The path to the controller file to require.
 * @param {string} servicesDir The path to the directory that contains the services.
 * @param {[featureName: string]: boolean} features Object that defines the optional features supported by the bridge.
 * @return {object} An object representing the controller. Will be empty if an error occured.
 */
const getController = (controllerPath, servicesDir, features) => {
    const controller = require(controllerPath);
    const controllerName = path.basename(controllerPath).replace('.js', '');
    const services = getServicesFromDir(servicesDir);
    const service = services[`${controllerName}Service`];
    if (!service) {
        console.error(`Failed to get service for controller '${controllerName}`);
        return {};
    }
    const actions = controller(service, features);
    const result = {};
    Object.keys(actions).forEach((key) => {
        result[`${controllerName}_${key}`] = actions[key];
    });
    return result;
};


/**
 * Creates a controller configuration for the router to be used by oas3-tools.
 * 
 * @param {string} controllerDir The path to the controller directory.
 * @param {string} servicesDir The path to the directory that contains the services.
 * @param {[featureName: string]: boolean} features Object that defines the optional features supported by the bridge.
 * @return {*} An object representing the controller.
 */
const createRouterConfig = (controllerDir, servicesDir, features) => {
    const result = {};
    fs.readdirSync(controllerDir).forEach((fileName) => {
        if (fileName.endsWith('js') && !fileName.includes('.spec.')) {
            Object.assign(result, { ...getController(path.join(controllerDir, fileName), servicesDir, features) });
        }
    });

    return result;
};

module.exports = {
    createRouterConfig
};