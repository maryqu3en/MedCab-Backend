const express = require('express');
// const initializeSocket = require('./config/socket.config');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/mongodb');
const prisma = require('./config/prisma');
const { swaggerUi, specs, uiOptions } = require("./docs/swagger");
const { logger } = require('./middleware/logger');
const { errorHandler, notFound } = require('./middleware/error.middleware');

const healthRoutes = require('./routes/health.routes');


const app = express();

app.use(express.json());
app.use(cors(
  {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }));

app.use(logger);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, uiOptions));

app.use('/health', healthRoutes);

app.use(notFound);
app.use(errorHandler);

connectDB();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`server running in http://localhost:${PORT}`);
});

// initializeSocket(server);