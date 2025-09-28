-- Base de datos SQLite para IGER Escuela Smart
-- Crear las tablas

-- Tabla de años académicos
CREATE TABLE IF NOT EXISTS academic_years (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    is_active INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de grados
CREATE TABLE IF NOT EXISTS grades (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    level INTEGER NOT NULL,
    description TEXT,
    max_students INTEGER DEFAULT 25,
    academic_year_id TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (academic_year_id) REFERENCES academic_years(id)
);

-- Tabla de usuarios (estudiantes, maestros, administradores)
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT,
    role TEXT NOT NULL CHECK (role IN ('estudiante', 'maestro', 'administrador')),
    avatar TEXT,
    phone TEXT,
    address TEXT,
    birth_date TEXT,
    parent_email TEXT,
    parent_phone TEXT,
    parent_consent INTEGER DEFAULT 0,
    grade_id TEXT,
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (grade_id) REFERENCES grades(id)
);

-- Tabla de aulas/clases
CREATE TABLE IF NOT EXISTS classrooms (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    teacher_id TEXT NOT NULL,
    grade_id TEXT,
    academic_year_id TEXT,
    capacity INTEGER DEFAULT 25,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES users(id),
    FOREIGN KEY (grade_id) REFERENCES grades(id),
    FOREIGN KEY (academic_year_id) REFERENCES academic_years(id)
);

-- Tabla de asignación de estudiantes a aulas
CREATE TABLE IF NOT EXISTS classroom_students (
    id TEXT PRIMARY KEY,
    classroom_id TEXT NOT NULL,
    student_id TEXT NOT NULL,
    assigned_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (classroom_id) REFERENCES classrooms(id),
    FOREIGN KEY (student_id) REFERENCES users(id),
    UNIQUE (classroom_id, student_id)
);

-- Tabla de horarios de clases
CREATE TABLE IF NOT EXISTS class_schedules (
    id TEXT PRIMARY KEY,
    classroom_id TEXT NOT NULL,
    day_of_week TEXT NOT NULL CHECK (day_of_week IN ('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo')),
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    subject TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (classroom_id) REFERENCES classrooms(id)
);

-- Tabla de asistencia
CREATE TABLE IF NOT EXISTS attendance (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL,
    classroom_id TEXT NOT NULL,
    date TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('presente', 'ausente', 'tardanza', 'justificado')),
    notes TEXT,
    recorded_by TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (classroom_id) REFERENCES classrooms(id),
    FOREIGN KEY (recorded_by) REFERENCES users(id),
    UNIQUE (student_id, date)
);

-- Tabla de pagos
CREATE TABLE IF NOT EXISTS payments (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL,
    amount REAL NOT NULL,
    currency TEXT DEFAULT 'GTQ',
    description TEXT NOT NULL,
    payment_method TEXT NOT NULL CHECK (payment_method IN ('efectivo', 'transferencia', 'tarjeta')),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
    due_date TEXT NOT NULL,
    paid_date TEXT,
    receipt_number TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id)
);

-- Tabla de reportes
CREATE TABLE IF NOT EXISTS reports (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('academico', 'asistencia', 'pagos', 'conducta')),
    student_id TEXT,
    classroom_id TEXT,
    grade_id TEXT,
    content TEXT NOT NULL,
    generated_by TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (classroom_id) REFERENCES classrooms(id),
    FOREIGN KEY (grade_id) REFERENCES grades(id),
    FOREIGN KEY (generated_by) REFERENCES users(id)
);

-- Tabla de eventos del calendario académico
CREATE TABLE IF NOT EXISTS calendar_events (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    date TEXT NOT NULL,
    start_time TEXT,
    end_time TEXT,
    type TEXT NOT NULL CHECK (type IN ('clase', 'examen', 'evento', 'vacaciones', 'reunion')),
    classroom_id TEXT,
    is_recurring INTEGER DEFAULT 0,
    recurring_days TEXT,
    color TEXT DEFAULT '#3B82F6',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (classroom_id) REFERENCES classrooms(id)
);

-- Tabla de lecciones
CREATE TABLE IF NOT EXISTS lessons (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    classroom_id TEXT NOT NULL,
    created_by TEXT NOT NULL,
    is_completed INTEGER DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (classroom_id) REFERENCES classrooms(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabla de tareas
CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    lesson_id TEXT,
    due_date TEXT,
    assigned_to TEXT,
    calendar_event_id TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'overdue')),
    created_by TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id),
    FOREIGN KEY (calendar_event_id) REFERENCES calendar_events(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabla de recursos
CREATE TABLE IF NOT EXISTS resources (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('image', 'video', 'document', 'link')),
    url TEXT NOT NULL,
    lesson_id TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);

-- Tabla de sesiones de chat con IA
CREATE TABLE IF NOT EXISTS chat_sessions (
    id TEXT PRIMARY KEY,
    student_id TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    last_activity TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id)
);

-- Tabla de mensajes de chat
CREATE TABLE IF NOT EXISTS chat_messages (
    id TEXT PRIMARY KEY,
    session_id TEXT NOT NULL,
    content TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
    moderated INTEGER DEFAULT 0,
    FOREIGN KEY (session_id) REFERENCES chat_sessions(id)
);

-- Tabla de logros
CREATE TABLE IF NOT EXISTS achievements (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    points INTEGER DEFAULT 0,
    unlocked_at TEXT,
    student_id TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id)
);

-- Insertar datos iniciales
INSERT OR IGNORE INTO academic_years (id, name, start_date, end_date, is_active) VALUES
('year-2024', 'Año Académico 2024', '2024-01-15', '2024-11-30', 1),
('year-2023', 'Año Académico 2023', '2023-01-15', '2023-11-30', 0);

INSERT OR IGNORE INTO grades (id, name, level, description, max_students, academic_year_id) VALUES
('grado-1', 'Primer Grado', 1, 'Primer año de educación básica', 25, 'year-2024'),
('grado-2', 'Segundo Grado', 2, 'Segundo año de educación básica', 25, 'year-2024'),
('grado-3', 'Tercer Grado', 3, 'Tercer año de educación básica', 25, 'year-2024');

INSERT OR IGNORE INTO users (id, name, email, role, avatar, grade_id, parent_email, parent_phone, parent_consent, birth_date, is_active) VALUES
('admin-1', 'Administrador IGER', 'admin@iger.edu', 'administrador', 'avatar-admin', NULL, NULL, NULL, NULL, NULL, 1),
('teacher-1', 'Prof. Ana Martínez', 'ana.martinez@iger.edu', 'maestro', 'avatar-teacher-1', NULL, NULL, '+502 9876-5432', NULL, NULL, 1),
('teacher-2', 'Prof. Carlos López', 'carlos.lopez@iger.edu', 'maestro', 'avatar-teacher-2', NULL, NULL, '+502 5555-1234', NULL, NULL, 1),
('student-1', 'María García López', 'maria.garcia@iger.edu', 'estudiante', 'avatar-student-1', 'grado-1', 'padre.garcia@email.com', '+502 1234-5678', 1, '2018-05-15', 1),
('student-2', 'Carlos López Pérez', 'carlos.lopez@iger.edu', 'estudiante', 'avatar-student-2', 'grado-2', 'madre.lopez@email.com', '+502 5555-1234', 1, '2017-08-22', 1),
('student-3', 'Ana Rodríguez', 'ana.rodriguez@iger.edu', 'estudiante', 'avatar-student-3', 'grado-1', 'padre.rodriguez@email.com', '+502 7777-8888', 1, '2018-03-10', 1);

INSERT OR IGNORE INTO classrooms (id, name, teacher_id, grade_id, academic_year_id, capacity) VALUES
('aula-1a', 'Aula 1A - Primer Grado', 'teacher-1', 'grado-1', 'year-2024', 25),
('aula-2b', 'Aula 2B - Segundo Grado', 'teacher-2', 'grado-2', 'year-2024', 25);

INSERT OR IGNORE INTO classroom_students (id, classroom_id, student_id) VALUES
('cs-1', 'aula-1a', 'student-1'),
('cs-2', 'aula-1a', 'student-3'),
('cs-3', 'aula-2b', 'student-2');

INSERT OR IGNORE INTO class_schedules (id, classroom_id, day_of_week, start_time, end_time, subject) VALUES
('schedule-1', 'aula-1a', 'Lunes', '08:00:00', '09:00:00', 'Matemáticas'),
('schedule-2', 'aula-1a', 'Lunes', '09:00:00', '10:00:00', 'Lenguaje'),
('schedule-3', 'aula-1a', 'Martes', '08:00:00', '09:00:00', 'Ciencias'),
('schedule-4', 'aula-2b', 'Lunes', '10:00:00', '11:00:00', 'Matemáticas'),
('schedule-5', 'aula-2b', 'Martes', '10:00:00', '11:00:00', 'Lenguaje');

INSERT OR IGNORE INTO payments (id, student_id, amount, description, payment_method, status, due_date, paid_date, receipt_number) VALUES
('payment-1', 'student-1', 500.00, 'Mensualidad Enero 2024', 'efectivo', 'completed', '2024-01-31', '2024-01-15', 'REC-001'),
('payment-2', 'student-2', 500.00, 'Mensualidad Enero 2024', 'transferencia', 'pending', '2024-01-31', NULL, NULL),
('payment-3', 'student-3', 500.00, 'Mensualidad Enero 2024', 'tarjeta', 'completed', '2024-01-31', '2024-01-20', 'REC-003');

INSERT OR IGNORE INTO calendar_events (id, title, description, date, start_time, end_time, type, classroom_id, color) VALUES
('event-1', 'Inicio de Clases', 'Primer día del año académico 2024', '2024-01-15', NULL, NULL, 'evento', NULL, '#3B82F6'),
('event-2', 'Examen de Matemáticas', 'Examen parcial de matemáticas para primer grado', '2024-02-15', '09:00:00', '10:00:00', 'examen', 'aula-1a', '#EF4444'),
('event-3', 'Vacaciones de Semana Santa', 'Período de vacaciones de Semana Santa', '2024-03-25', NULL, NULL, 'vacaciones', NULL, '#10B981'),
('event-4', 'Reunión de Padres', 'Reunión mensual con padres de familia', '2024-02-28', '18:00:00', '19:30:00', 'reunion', NULL, '#8B5CF6');

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_grade ON users(grade_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);
CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_due_date ON payments(due_date);
CREATE INDEX IF NOT EXISTS idx_calendar_events_date ON calendar_events(date);
CREATE INDEX IF NOT EXISTS idx_classroom_students_classroom ON classroom_students(classroom_id);
CREATE INDEX IF NOT EXISTS idx_classroom_students_student ON classroom_students(student_id);

