const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Configuración de CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Database connection
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('✅ Conectado a la base de datos SQLite');
  }
});

// Función helper para ejecutar queries
const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        reject(err);
      } else {
        resolve({ id: this.lastID, changes: this.changes });
      }
    });
  });
};

const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

const dbAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'iger-secret-key-2024';

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de acceso requerido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await dbGet(
      'SELECT * FROM users WHERE email = ? AND is_active = 1',
      [email]
    );

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    // Verificar contraseña
    if (password && user.password_hash && !await bcrypt.compare(password, user.password_hash)) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar token JWT
    const token = jwt.sign(
      { 
        id: user.id, 
        email: user.email, 
        role: user.role,
        name: user.name 
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Remover password_hash de la respuesta
    delete user.password_hash;

    res.json({
      message: 'Login exitoso',
      token,
      user
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role, birthDate, address, phone, parentEmail, parentPhone, parentConsent, gradeId } = req.body;

    // Verificar si el email ya existe
    const existingUser = await dbGet(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUser) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    // Hash de la contraseña
    const passwordHash = password ? await bcrypt.hash(password, 10) : null;

    // Generar ID único
    const userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Insertar usuario
    await dbRun(
      `INSERT INTO users (id, name, email, password_hash, role, avatar, phone, address, birth_date, parent_email, parent_phone, parent_consent, grade_id, is_active) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [userId, name, email, passwordHash, role, `avatar-${Math.floor(Math.random() * 6) + 1}`, phone, address, birthDate, parentEmail, parentPhone, parentConsent, gradeId]
    );

    // Obtener el usuario creado
    const newUser = await dbGet(
      'SELECT id, name, email, role, avatar, phone, address, birth_date, parent_email, parent_phone, parent_consent, grade_id, is_active, created_at FROM users WHERE id = ?',
      [userId]
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: newUser
    });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Users routes
app.get('/api/users', authenticateToken, async (req, res) => {
  try {
    const { role, gradeId, search } = req.query;
    let query = 'SELECT u.*, g.name as grade_name FROM users u LEFT JOIN grades g ON u.grade_id = g.id WHERE u.is_active = 1';
    const params = [];

    if (role && role !== 'todos') {
      query += ' AND u.role = ?';
      params.push(role);
    }

    if (gradeId && gradeId !== 'todos') {
      query += ' AND u.grade_id = ?';
      params.push(gradeId);
    }

    if (search) {
      query += ' AND (u.name LIKE ? OR u.email LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY u.created_at DESC';

    const rows = await dbAll(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/users/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await dbGet(
      'SELECT u.*, g.name as grade_name FROM users u LEFT JOIN grades g ON u.grade_id = g.id WHERE u.id = ?',
      [id]
    );

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Classrooms routes
app.get('/api/classrooms', authenticateToken, async (req, res) => {
  try {
    const rows = await dbAll(`
      SELECT c.*, u.name as teacher_name, g.name as grade_name,
             COUNT(cs.student_id) as student_count
      FROM classrooms c
      LEFT JOIN users u ON c.teacher_id = u.id
      LEFT JOIN grades g ON c.grade_id = g.id
      LEFT JOIN classroom_students cs ON c.id = cs.classroom_id
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo aulas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/classrooms', authenticateToken, async (req, res) => {
  try {
    const { name, teacherId, gradeId, academicYearId, capacity } = req.body;
    const classroomId = `aula-${Date.now()}`;

    await dbRun(
      'INSERT INTO classrooms (id, name, teacher_id, grade_id, academic_year_id, capacity) VALUES (?, ?, ?, ?, ?, ?)',
      [classroomId, name, teacherId, gradeId, academicYearId, capacity || 25]
    );

    res.status(201).json({ message: 'Aula creada exitosamente', id: classroomId });
  } catch (error) {
    console.error('Error creando aula:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Attendance routes
app.get('/api/attendance/:classroomId/:date', authenticateToken, async (req, res) => {
  try {
    const { classroomId, date } = req.params;
    
    const rows = await dbAll(`
      SELECT a.*, u.name as student_name, u.email as student_email
      FROM attendance a
      JOIN users u ON a.student_id = u.id
      WHERE a.classroom_id = ? AND a.date = ?
      ORDER BY u.name
    `, [classroomId, date]);

    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo asistencia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/attendance', authenticateToken, async (req, res) => {
  try {
    const { classroomId, date, attendanceRecords } = req.body;

    // Eliminar registros existentes para esta fecha
    await dbRun(
      'DELETE FROM attendance WHERE classroom_id = ? AND date = ?',
      [classroomId, date]
    );

    // Insertar nuevos registros
    for (const record of attendanceRecords) {
      const attendanceId = `att-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      await dbRun(
        'INSERT INTO attendance (id, student_id, classroom_id, date, status, notes, recorded_by) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [attendanceId, record.studentId, classroomId, date, record.status, record.notes || null, req.user.id]
      );
    }

    res.json({ message: 'Asistencia guardada exitosamente' });
  } catch (error) {
    console.error('Error guardando asistencia:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Payments routes
app.get('/api/payments', authenticateToken, async (req, res) => {
  try {
    const { status, method, search } = req.query;
    let query = `
      SELECT p.*, u.name as student_name, u.email as student_email
      FROM payments p
      JOIN users u ON p.student_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (status && status !== 'todos') {
      query += ' AND p.status = ?';
      params.push(status);
    }

    if (method && method !== 'todos') {
      query += ' AND p.payment_method = ?';
      params.push(method);
    }

    if (search) {
      query += ' AND (u.name LIKE ? OR p.description LIKE ? OR p.receipt_number LIKE ?)';
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ' ORDER BY p.created_at DESC';

    const rows = await dbAll(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo pagos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/payments', authenticateToken, async (req, res) => {
  try {
    const { studentId, amount, description, paymentMethod, dueDate } = req.body;
    const paymentId = `payment-${Date.now()}`;

    await dbRun(
      'INSERT INTO payments (id, student_id, amount, description, payment_method, due_date) VALUES (?, ?, ?, ?, ?, ?)',
      [paymentId, studentId, amount, description, paymentMethod, dueDate]
    );

    res.status(201).json({ message: 'Pago creado exitosamente', id: paymentId });
  } catch (error) {
    console.error('Error creando pago:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.put('/api/payments/:id/status', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updateData = { status };
    if (status === 'completed') {
      updateData.paidDate = new Date().toISOString().split('T')[0];
      updateData.receiptNumber = `REC-${Date.now().toString().slice(-3)}`;
    }

    await dbRun(
      'UPDATE payments SET status = ?, paid_date = ?, receipt_number = ? WHERE id = ?',
      [status, updateData.paidDate, updateData.receiptNumber, id]
    );

    res.json({ message: 'Estado del pago actualizado exitosamente' });
  } catch (error) {
    console.error('Error actualizando pago:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Grades routes
app.get('/api/grades', authenticateToken, async (req, res) => {
  try {
    const rows = await dbAll(`
      SELECT g.*, COUNT(u.id) as student_count
      FROM grades g
      LEFT JOIN users u ON g.id = u.grade_id AND u.role = 'estudiante' AND u.is_active = 1
      GROUP BY g.id
      ORDER BY g.level
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo grados:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Calendar events routes
app.get('/api/calendar/events', authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let query = 'SELECT * FROM calendar_events WHERE 1=1';
    const params = [];

    if (startDate && endDate) {
      query += ' AND date BETWEEN ? AND ?';
      params.push(startDate, endDate);
    }

    query += ' ORDER BY date, start_time';

    const rows = await dbAll(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo eventos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/calendar/events', authenticateToken, async (req, res) => {
  try {
    const { title, description, date, startTime, endTime, type, classroomId, color } = req.body;
    const eventId = `event-${Date.now()}`;

    await dbRun(
      'INSERT INTO calendar_events (id, title, description, date, start_time, end_time, type, classroom_id, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [eventId, title, description, date, startTime, endTime, type, classroomId, color || '#3B82F6']
    );

    res.status(201).json({ message: 'Evento creado exitosamente', id: eventId });
  } catch (error) {
    console.error('Error creando evento:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Reports routes
app.get('/api/reports', authenticateToken, async (req, res) => {
  try {
    const { type, studentId, classroomId, gradeId } = req.query;
    let query = 'SELECT * FROM reports WHERE 1=1';
    const params = [];

    if (type) {
      query += ' AND type = ?';
      params.push(type);
    }

    if (studentId) {
      query += ' AND student_id = ?';
      params.push(studentId);
    }

    if (classroomId) {
      query += ' AND classroom_id = ?';
      params.push(classroomId);
    }

    if (gradeId) {
      query += ' AND grade_id = ?';
      params.push(gradeId);
    }

    query += ' ORDER BY created_at DESC';

    const rows = await dbAll(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error obteniendo reportes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.post('/api/reports', authenticateToken, async (req, res) => {
  try {
    const { title, type, studentId, classroomId, gradeId, content } = req.body;
    const reportId = `report-${Date.now()}`;

    await dbRun(
      'INSERT INTO reports (id, title, type, student_id, classroom_id, grade_id, content, generated_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [reportId, title, type, studentId, classroomId, gradeId, content, req.user.id]
    );

    res.status(201).json({ message: 'Reporte creado exitosamente', id: reportId });
  } catch (error) {
    console.error('Error creando reporte:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'IGER Backend API funcionando correctamente con SQLite' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint no encontrado' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor IGER Backend ejecutándose en puerto ${PORT}`);
  console.log(`📊 Base de datos: SQLite (${dbPath})`);
  console.log(`🔗 API disponible en: http://localhost:${PORT}/api`);
});

module.exports = app;

