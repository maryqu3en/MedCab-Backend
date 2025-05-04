const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MedCab API",
      version: "1.0.0",
      description: "MedCab – Empowering Medical Communication.\n\nExplore all endpoints used in the backend.",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local server",
      },
      {
        url: "https://medcab-backend.onrender.com/",
        description: "Development server",
      },
    ],
  },
  apis: ["./routes/*.routes.js"],
};

const specs = swaggerJsDoc(options);

const palette = {
  primary: "#64537d",        // smoky
  secondary: "#736c8a",      // rum
  accent: "#5c747a",         // nevada
  background: "#ebebeb",     // gallery
  text: "#3a3f50",           // bright-gray
};

const uiOptions = {
  customCss: `
    body {
      background-color: ${palette.background};
    }

    .swagger-ui .topbar { 
      display: none; 
    }

    .swagger-ui .info h1 { 
      color: ${palette.primary}; 
      font-family: 'Segoe UI', sans-serif; 
      font-size: 2.75rem; 
      text-align: center; 
      margin-bottom: 1rem; 
    }

    .swagger-ui .info p { 
      font-family: 'Segoe UI', sans-serif; 
      font-size: 1.15rem; 
      color: ${palette.text}; 
      text-align: center; 
      margin-bottom: 2rem; 
    }

    .swagger-ui .btn {
      background-color: ${palette.primary}; 
      color: #fff; 
      border-radius: 8px; 
      padding: 0.5rem 1.2rem; 
      font-size: 1rem; 
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .swagger-ui .btn:hover {
      background-color: ${palette.secondary}; 
    }

    .swagger-ui .scheme-container {
      background-color: #fff; 
      padding: 1rem; 
      border-radius: 8px; 
      margin-bottom: 2rem; 
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
    }

    .swagger-ui .opblock-summary {
      background-color: #f4f4f4; 
      border-radius: 10px; 
      margin-bottom: 1rem; 
    }

    .swagger-ui .opblock-summary:hover {
      background-color: #e6e6e6;
    }

    .swagger-ui .opblock-summary-method {
      border-radius: 10px 0 0 10px;
      font-weight: bold;
    }

    .swagger-ui .opblock-summary-description {
      font-size: 1.05rem;
    }

    .swagger-ui .opblock-body pre {
      background-color: #f9f9f9;
      padding: 1rem; 
      border-radius: 10px;
      color: ${palette.text};
    }

    .swagger-ui .opblock-tag {
      font-size: 1.2rem;
      color: ${palette.accent};
      font-weight: bold;
    }

    .swagger-ui .models {
      background: #f4f4f4;
      padding: 1rem;
      border-radius: 8px;
    }
  `,
  customSiteTitle: "MedCab API Docs",
  // customfavIcon: "https://your-cool-favicon.url",
};

module.exports = { swaggerUi, specs, uiOptions };
