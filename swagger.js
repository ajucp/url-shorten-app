const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'URL Shortener API',
      version: '1.0.0',
      description: 'API documentation for the URL Shortener service',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Change this to your deployed URL
      },
    ],
  },
  apis: ['./routes/*.js'], // Adjust path to match your routes files
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwaggerDocs = (app, port) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
};

module.exports = setupSwaggerDocs;
