const express = require('express');
const path = require('path');
// const initializeSocket = require('./config/socket.config');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/mongodb');
const { testPGConnection } = require('./config/postgres');
const { swaggerUi, specs, uiOptions } = require("./docs/swagger");
const { logger } = require('./middleware/logger');
const { errorHandler, notFound } = require('./middleware/error.middleware');


const app = express();

app.use(express.json());
app.use(cors());

app.use(logger);

app.set("view engine", "pug");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, uiOptions));

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

app.use(notFound);
app.use(errorHandler);

connectDB();
testPGConnection();

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`server running in http://localhost:${PORT}`);
});

// initializeSocket(server);