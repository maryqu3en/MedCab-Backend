const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { swaggerUi, specs, uiOptions } = require("./docs/swagger");
const { logger } = require('./middleware/logger');
const { errorHandler, notFound } = require('./middleware/error.middleware');
const XLSX = require('xlsx');
const { initSocket } = require('./config/socket.config');

const healthRoutes = require('./routes/health.routes');
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const patientRoutes = require('./routes/patient.routes');
const consultationController = require('./routes/consultation.routes');
const medicalRecordController = require('./routes/medicalRecord.routes');
const communicationRoutes = require('./routes/communication.routes');

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));

app.use(logger);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, uiOptions));

app.get('/', (req, res, next) => {
  try {
    res.send('API is running...');
  } catch (error) {
    next(error);
  }
});

app.use('/health', healthRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/consultations', consultationController);
app.use('/api/medical-records', medicalRecordController);
app.use('/api/communications', communicationRoutes);

app.get('/api/medicines', (req, res) => {
  const filePath = path.join(__dirname, 'medicines.xlsx');
  try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to read Excel file', error: error.message });
  }
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});

initSocket(server);