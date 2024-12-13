const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MedCab API",
      version: "1.0.0",
      description: "API documentation for the MedCab backend",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },
  apis: ["./routes/*.routes.js"],
};

const specs = swaggerJsDoc(options);

const uiOptions = {
  customCss: `
    .swagger-ui .topbar { display: none; }
    .swagger-ui .info h1 { 
      color: #4CAF50; 
      font-family: 'Arial', sans-serif; 
      font-size: 2.5rem; 
      text-align: center; 
      margin-bottom: 1rem; 
    }
    .swagger-ui .info p { 
      font-family: 'Arial', sans-serif; 
      font-size: 1.2rem; 
      text-align: center; 
      margin-bottom: 2rem; 
    }
    .swagger-ui .btn { 
      background-color: #6200ea; 
      color: #fff; 
      border-radius: 8px; 
      padding: 0.5rem 1rem; 
      font-size: 1rem; 
    }
    .swagger-ui .btn:hover { 
      background-color: #3700b3; 
    }
    .swagger-ui .scheme-container { 
      background-color: #f4f4f4; 
      padding: 1rem; 
      border-radius: 8px; 
      margin-bottom: 2rem; 
    }
    .swagger-ui .opblock-summary { 
      background-color: #e0e0e0; 
      border-radius: 8px; 
      margin-bottom: 1rem; 
    }
    .swagger-ui .opblock-summary:hover { 
      background-color: #d0d0d0; 
    }
    .swagger-ui .opblock-summary-method { 
      border-radius: 8px 0 0 8px; 
    }
    .swagger-ui .opblock-summary-description { 
      font-size: 1.1rem; 
    }
    .swagger-ui .opblock-body pre { 
      background-color: #f4f4f4; 
      padding: 1rem; 
      border-radius: 8px; 
    }
  `,
  customSiteTitle: "MedCab API Docs",
  // customfavIcon: "https://example.com/favicon.ico", // Replace with your favicon URL
};

module.exports = uiOptions;

module.exports = { swaggerUi, specs, uiOptions };