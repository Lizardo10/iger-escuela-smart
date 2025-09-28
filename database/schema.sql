-- Base de datos SQL para IGER Escuela Smart
-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS iger_escuela_smart;
USE iger_escuela_smart;

-- Tabla de años académicos
CREATE TABLE academic_years (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de grados
CREATE TABLE grades (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    level INT NOT NULL,
    description TEXT,
    max_students INT DEFAULT 25,
    academic_year_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (academic_year_id) REFERENCES academic_years(id)
);

-- Tabla de usuarios (estudiantes, maestros, administradores)
CREATE TABLE users (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    role ENUM('estudiante', 'maestro', 'administrador') NOT NULL,
    avatar VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    birth_date DATE,
    parent_email VARCHAR(255),
    parent_phone VARCHAR(20),
    parent_consent BOOLEAN DEFAULT FALSE,
    grade_id VARCHAR(50),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (grade_id) REFERENCES grades(id)
);

-- Tabla de aulas/clases
CREATE TABLE classrooms (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    teacher_id VARCHAR(50) NOT NULL,
    grade_id VARCHAR(50),
    academic_year_id VARCHAR(50),
    capacity INT DEFAULT 25,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES users(id),
    FOREIGN KEY (grade_id) REFERENCES grades(id),
    FOREIGN KEY (academic_year_id) REFERENCES academic_years(id)
);

-- Tabla de asignación de estudiantes a aulas
CREATE TABLE classroom_students (
    id VARCHAR(50) PRIMARY KEY,
    classroom_id VARCHAR(50) NOT NULL,
    student_id VARCHAR(50) NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (classroom_id) REFERENCES classrooms(id),
    FOREIGN KEY (student_id) REFERENCES users(id),
    UNIQUE KEY unique_classroom_student (classroom_id, student_id)
);

-- Tabla de horarios de clases
CREATE TABLE class_schedules (
    id VARCHAR(50) PRIMARY KEY,
    classroom_id VARCHAR(50) NOT NULL,
    day_of_week ENUM('Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo') NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    subject VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (classroom_id) REFERENCES classrooms(id)
);

-- Tabla de asistencia
CREATE TABLE attendance (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    classroom_id VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    status ENUM('presente', 'ausente', 'tardanza', 'justificado') NOT NULL,
    notes TEXT,
    recorded_by VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (classroom_id) REFERENCES classrooms(id),
    FOREIGN KEY (recorded_by) REFERENCES users(id),
    UNIQUE KEY unique_student_date (student_id, date)
);

-- Tabla de pagos
CREATE TABLE payments (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'GTQ',
    description VARCHAR(255) NOT NULL,
    payment_method ENUM('efectivo', 'transferencia', 'tarjeta') NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    due_date DATE NOT NULL,
    paid_date DATE,
    receipt_number VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id)
);

-- Tabla de reportes
CREATE TABLE reports (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type ENUM('academico', 'asistencia', 'pagos', 'conducta') NOT NULL,
    student_id VARCHAR(50),
    classroom_id VARCHAR(50),
    grade_id VARCHAR(50),
    content TEXT NOT NULL,
    generated_by VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (classroom_id) REFERENCES classrooms(id),
    FOREIGN KEY (grade_id) REFERENCES grades(id),
    FOREIGN KEY (generated_by) REFERENCES users(id)
);

-- Tabla de eventos del calendario académico
CREATE TABLE calendar_events (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    type ENUM('clase', 'examen', 'evento', 'vacaciones', 'reunion') NOT NULL,
    classroom_id VARCHAR(50),
    is_recurring BOOLEAN DEFAULT FALSE,
    recurring_days JSON,
    color VARCHAR(20) DEFAULT '#3B82F6',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (classroom_id) REFERENCES classrooms(id)
);

-- Tabla de lecciones
CREATE TABLE lessons (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT,
    classroom_id VARCHAR(50) NOT NULL,
    created_by VARCHAR(50) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (classroom_id) REFERENCES classrooms(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabla de tareas
CREATE TABLE tasks (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    lesson_id VARCHAR(50),
    due_date DATE,
    assigned_to JSON,
    calendar_event_id VARCHAR(50),
    status ENUM('pending', 'completed', 'overdue') DEFAULT 'pending',
    created_by VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id),
    FOREIGN KEY (calendar_event_id) REFERENCES calendar_events(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabla de recursos
CREATE TABLE resources (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type ENUM('image', 'video', 'document', 'link') NOT NULL,
    url VARCHAR(500) NOT NULL,
    lesson_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);

-- Tabla de sesiones de chat con IA
CREATE TABLE chat_sessions (
    id VARCHAR(50) PRIMARY KEY,
    student_id VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id)
);

-- Tabla de mensajes de chat
CREATE TABLE chat_messages (
    id VARCHAR(50) PRIMARY KEY,
    session_id VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    role ENUM('user', 'assistant', 'system') NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    moderated BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (session_id) REFERENCES chat_sessions(id)
);

-- Tabla de logros
CREATE TABLE achievements (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    points INT DEFAULT 0,
    unlocked_at TIMESTAMP,
    student_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id)
);

-- Insertar datos iniciales
INSERT INTO academic_years (id, name, start_date, end_date, is_active) VALUES
('year-2024', 'Año Académico 2024', '2024-01-15', '2024-11-30', TRUE),
('year-2023', 'Año Académico 2023', '2023-01-15', '2023-11-30', FALSE);

INSERT INTO grades (id, name, level, description, max_students, academic_year_id) VALUES
('grado-1', 'Primer Grado', 1, 'Primer año de educación básica', 25, 'year-2024'),
('grado-2', 'Segundo Grado', 2, 'Segundo año de educación básica', 25, 'year-2024'),
('grado-3', 'Tercer Grado', 3, 'Tercer año de educación básica', 25, 'year-2024');

INSERT INTO users (id, name, email, role, avatar, grade_id, parent_email, parent_phone, parent_consent, birth_date, is_active) VALUES
('admin-1', 'Administrador IGER', 'admin@iger.edu', 'administrador', 'avatar-admin', NULL, NULL, NULL, NULL, NULL, TRUE),
('teacher-1', 'Prof. Ana Martínez', 'ana.martinez@iger.edu', 'maestro', 'avatar-teacher-1', NULL, NULL, '+502 9876-5432', NULL, NULL, TRUE),
('teacher-2', 'Prof. Carlos López', 'carlos.lopez@iger.edu', 'maestro', 'avatar-teacher-2', NULL, NULL, '+502 5555-1234', NULL, NULL, TRUE),
('student-1', 'María García López', 'maria.garcia@iger.edu', 'estudiante', 'avatar-student-1', 'grado-1', 'padre.garcia@email.com', '+502 1234-5678', TRUE, '2018-05-15', TRUE),
('student-2', 'Carlos López Pérez', 'carlos.lopez@iger.edu', 'estudiante', 'avatar-student-2', 'grado-2', 'madre.lopez@email.com', '+502 5555-1234', TRUE, '2017-08-22', TRUE),
('student-3', 'Ana Rodríguez', 'ana.rodriguez@iger.edu', 'estudiante', 'avatar-student-3', 'grado-1', 'padre.rodriguez@email.com', '+502 7777-8888', TRUE, '2018-03-10', TRUE);

INSERT INTO classrooms (id, name, teacher_id, grade_id, academic_year_id, capacity) VALUES
('aula-1a', 'Aula 1A - Primer Grado', 'teacher-1', 'grado-1', 'year-2024', 25),
('aula-2b', 'Aula 2B - Segundo Grado', 'teacher-2', 'grado-2', 'year-2024', 25);

INSERT INTO classroom_students (id, classroom_id, student_id) VALUES
('cs-1', 'aula-1a', 'student-1'),
('cs-2', 'aula-1a', 'student-3'),
('cs-3', 'aula-2b', 'student-2');

INSERT INTO class_schedules (id, classroom_id, day_of_week, start_time, end_time, subject) VALUES
('schedule-1', 'aula-1a', 'Lunes', '08:00:00', '09:00:00', 'Matemáticas'),
('schedule-2', 'aula-1a', 'Lunes', '09:00:00', '10:00:00', 'Lenguaje'),
('schedule-3', 'aula-1a', 'Martes', '08:00:00', '09:00:00', 'Ciencias'),
('schedule-4', 'aula-2b', 'Lunes', '10:00:00', '11:00:00', 'Matemáticas'),
('schedule-5', 'aula-2b', 'Martes', '10:00:00', '11:00:00', 'Lenguaje');

INSERT INTO payments (id, student_id, amount, description, payment_method, status, due_date, paid_date, receipt_number) VALUES
('payment-1', 'student-1', 500.00, 'Mensualidad Enero 2024', 'efectivo', 'completed', '2024-01-31', '2024-01-15', 'REC-001'),
('payment-2', 'student-2', 500.00, 'Mensualidad Enero 2024', 'transferencia', 'pending', '2024-01-31', NULL, NULL),
('payment-3', 'student-3', 500.00, 'Mensualidad Enero 2024', 'tarjeta', 'completed', '2024-01-31', '2024-01-20', 'REC-003');

INSERT INTO calendar_events (id, title, description, date, start_time, end_time, type, classroom_id, color) VALUES
('event-1', 'Inicio de Clases', 'Primer día del año académico 2024', '2024-01-15', NULL, NULL, 'evento', NULL, '#3B82F6'),
('event-2', 'Examen de Matemáticas', 'Examen parcial de matemáticas para primer grado', '2024-02-15', '09:00:00', '10:00:00', 'examen', 'aula-1a', '#EF4444'),
('event-3', 'Vacaciones de Semana Santa', 'Período de vacaciones de Semana Santa', '2024-03-25', NULL, NULL, 'vacaciones', NULL, '#10B981'),
('event-4', 'Reunión de Padres', 'Reunión mensual con padres de familia', '2024-02-28', '18:00:00', '19:30:00', 'reunion', NULL, '#8B5CF6');

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_grade ON users(grade_id);
CREATE INDEX idx_attendance_date ON attendance(date);
CREATE INDEX idx_attendance_student ON attendance(student_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_due_date ON payments(due_date);
CREATE INDEX idx_calendar_events_date ON calendar_events(date);
CREATE INDEX idx_classroom_students_classroom ON classroom_students(classroom_id);
CREATE INDEX idx_classroom_students_student ON classroom_students(student_id);
