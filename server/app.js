require('./config/config');
require('./models/db');
require('./config/passportConfig');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const rtsIndex = require('./routes/index.router');
var app = express();
const swaggerJSDoc = require('swagger-jsdoc');
// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', rtsIndex);


// -- setup up swagger-jsdoc --
const swaggerDefinition = {
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
  };


  const options = {
    swaggerDefinition,
    apis: [path.resolve(__dirname, 'routes/index.router.js')],
  };
  const swaggerSpec = swaggerJSDoc(options);
  
  // -- routes for docs and generated swagger spec --
  app.get('/docs', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.get('/docs/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});


// start server
app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));
