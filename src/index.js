const path = require('path');
const { connector } = require('swagger-routes-express');
const https = require('https');
const fs = require('fs');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { createApi } = require('./routerUtils');
const { getConfig } = require('./config');
const { createLogger } = require('./utils/logger');
const yaml = require('js-yaml');

const BridgeCore = async (config) => {
    config = getConfig(config);

    const onCreateRoute = (method, descriptor) => {
        const [routePath, ...handlers] = descriptor;
        console.log('created route', method, routePath, handlers);
    };

    // Configure oas3-tools
    const options = {
        security: {
            basicAuth: (request, response, next) => {
                const auth = `${config.username}:${config.password}`;
                if (request.headers.authorization === `Basic ${Buffer.from(auth).toString('base64')}`) {
                    return next();
                }

                response.set('WWW-Authenticate', 'Basic realm="401"');
                response.status(401).send('Authentication required.');
            }
        },
        onCreateRoute
    };

    const api = createApi(path.join(__dirname, './controllers/'), config.servicesDir, config.features);

    const app = express();
    const apiDefinition = yaml.load(fs.readFileSync(path.join(__dirname, './api/openapi.yaml')));

    app.use(express.json());
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDefinition));

    const connect = connector(api, apiDefinition, options); // make the connector
    connect(app);

    if (config.useSsl) {
        https
            .createServer(
                {
                    key: fs.readFileSync(path.resolve(config.sslKey)),
                    cert: fs.readFileSync(path.resolve(config.sslCert))
                },
                app
            )
            .listen(config.port, () => {
                console.log('Your server is listening on port %d (https://localhost:%d)', config.port, config.port);
                console.log('Swagger-ui is available on https://localhost:%d/docs', config.port);
            });
    } else {
        app.listen(config.port, () => {
            console.log('Your server is listening on port %d (http://localhost:%d)', config.port, config.port);
            console.log('Swagger-ui is available on http://localhost:%d/docs', config.port);
        });
    }

    const getAppInstance = () => {
        return app;
    };

    return {
        getAppInstance
    };
};

module.exports = {
    BridgeCore,
    createLogger
};
