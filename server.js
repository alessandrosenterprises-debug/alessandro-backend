import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { initializeDatabase } from './src/db/database.js';
import { setupWebSocket } from './src/websocket/server.js';
import { authRoutes } from './src/routes/auth.js';
import { customerRoutes } from './src/routes/customers.js';
import { productRoutes } from './src/routes/products.js';
import { promotionRoutes } from './src/routes/promotions.js';
import { notificationRoutes } from './src/routes/notifications.js';
import { webhookRoutes } from './src/routes/webhooks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Initialize database
try {
  await initializeDatabase();
  console.log('✅ Database initialized');
} catch (error) {
  console.error('❌ Database initialization failed:', error);
  process.exit(1);
}

// Setup WebSocket
setupWebSocket(wss);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin/customers', customerRoutes);
app.use('/api/admin/products', productRoutes);
app.use('/api/admin/promotions', promotionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/webhooks', webhookRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

server.listen(PORT, () => {
  console.log(`\n🚀 Backend Server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${NODE_ENV}`);
  console.log(`🔌 WebSocket: ws://localhost:${PORT}\n`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export { app, server, wss };
