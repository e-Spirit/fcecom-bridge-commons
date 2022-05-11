const oas3Tools = require('oas3-tools');
const path = require('path');
const https = require('https');
const fs = require('fs');
const { createRouterConfig } = require('./routerUtils');
const { getConfig } = require('./config');

const BridgeCore = (config) => {
  config = getConfig(config);

  // Configure oas3-tools
  const options = {
    routing: {
      controllers: createRouterConfig(path.join(__dirname, './controllers/'), config.servicesDir, config.features)
    },
    openApiValidator: {
      validateSecurity: {
        handlers: {
          basicAuth: (request) => {
            const auth = `${config.username}:${config.password}`;
            return request.headers.authorization === `Basic ${Buffer.from(auth).toString('base64')}`;
          }
        },
      }
    }
  };

  const expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, './api/openapi.yaml'), options);
  const app = expressAppConfig.getApp();

  if (config.useSsl) {
    https
      .createServer({
          key: fs.readFileSync(path.resolve(config.sslKey)),
          cert: fs.readFileSync(path.resolve(config.sslCert)),
        },
        app).listen(config.port, () => {
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
  }

  return {
    getAppInstance
  };

};

module.exports = BridgeCore;