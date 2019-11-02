'use strict';

const path = require('path');

module.exports = {
  swaggerDefinition: {
   info: {
      title: 'QuizMaker',
      version: '1.0.0',
      description: 'Api for QuizMaker application @ written by Ghassen Belkhir @',
      
    },
    host: 'localhost:3000',
    basePath: '/api',
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        description: 'JWT authorization of an API',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
  apis: [path.join(__dirname, 'routes/index.router.js')]
};
