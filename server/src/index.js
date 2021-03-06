require('./config/database')();

const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');

const { config } = require('./config');
const logger = require('./helpers/logger');
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler');
const allowCrossDomain = require('./middlewares/alllow-cross-domain');

const app = express();

app
  .use(morgan('dev', { stream: { write: message => logger.info(message) } }))
  .use(allowCrossDomain)
  .use('/api', routes)
  .use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(errorHandler);

app.listen(config.http.port, () => logger.info(`Server is working on port: ${config.http.port}`));

module.exports = app;
