const express      = require('express');
const cors         = require('cors');
const helmet       = require('helmet');
const morgan       = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit    = require('express-rate-limit');
const path         = require('path');

const authRoutes        = require('./routes/auth.routes');
const doctorRoutes      = require('./routes/doctor.routes');
const appointmentRoutes = require('./routes/appointment.routes');
const recordRoutes      = require('./routes/record.routes');
const hospitalRoutes    = require('./routes/hospital.routes');
const riskRoutes        = require('./routes/risk.routes');
const errorHandler      = require('./middleware/error');

const app = express();

// ── Security
app.use(helmet());
app.use(mongoSanitize());

// ── Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 200,
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api', limiter);

// ── CORS — allow any localhost port in dev, specific origin in prod
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    // In development, allow any localhost
    if (origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
      return callback(null, true);
    }
    // In production, use CLIENT_URL env var
    if (process.env.CLIENT_URL && origin === process.env.CLIENT_URL) {
      return callback(null, true);
    }
    callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true
}));

// ── Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── Logger (dev only)
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// ── Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// ── Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'SehatSathi API is healthy 🏥', timestamp: new Date() });
});

// ── API Routes
app.use('/api/auth',         authRoutes);
app.use('/api/doctors',      doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/records',      recordRoutes);
app.use('/api/hospitals',    hospitalRoutes);
app.use('/api/risk',         riskRoutes);

// ── 404 fallback
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ── Global error handler
app.use(errorHandler);

module.exports = app;
