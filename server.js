const express = require('express');
// const initializeSocket = require('./config/socket.config');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/mongodb');
const { testPGConnection } = require('./config/postgres');
const { swaggerUi, specs } = require("./docs/swagger");
const { logger } = require('./middleware/logger');
const { errorHandler, notFound } = require('./middleware/error.middleware');


const app = express();

app.use(express.json());
app.use(cors());

app.use(logger);

app.get('/', (req, res) => {
  res.send("Welcome to MedCab, a Medical Care Management System API.");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


app.use(notFound);
app.use(errorHandler);

connectDB();
testPGConnection();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`server running in http://localhost:${PORT}`);
});

// initializeSocket(server);