const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('🔧 Actualizando base de datos...');

// Función para ejecutar comandos SQL
function runSQL(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) {
        console.error('Error ejecutando SQL:', err.message);
        reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

// Función para verificar si una columna existe
function columnExists(tableName, columnName) {
  return new Promise((resolve, reject) => {
    db.all(`PRAGMA table_info(${tableName})`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const exists = rows.some(row => row.name === columnName);
        resolve(exists);
      }
    });
  });
}

async function updateDatabase() {
  try {
    console.log('📊 Verificando estructura de la base de datos...');

    // Verificar y agregar columnas faltantes en users
    const usersColumns = await columnExists('users', 'classroom_id');
    if (!usersColumns) {
      console.log('➕ Agregando columna classroom_id a users...');
      await runSQL('ALTER TABLE users ADD COLUMN classroom_id TEXT');
      await runSQL('CREATE INDEX IF NOT EXISTS idx_users_classroom ON users(classroom_id)');
    }

    // Verificar y agregar columnas faltantes en lessons
    const lessonsTeacherId = await columnExists('lessons', 'teacher_id');
    if (!lessonsTeacherId) {
      console.log('➕ Agregando columna teacher_id a lessons...');
      await runSQL('ALTER TABLE lessons ADD COLUMN teacher_id TEXT');
    }

    const lessonsSubject = await columnExists('lessons', 'subject');
    if (!lessonsSubject) {
      console.log('➕ Agregando columna subject a lessons...');
      await runSQL('ALTER TABLE lessons ADD COLUMN subject TEXT');
    }

    const lessonsGrade = await columnExists('lessons', 'grade');
    if (!lessonsGrade) {
      console.log('➕ Agregando columna grade a lessons...');
      await runSQL('ALTER TABLE lessons ADD COLUMN grade TEXT');
    }

    // Verificar y agregar columnas faltantes en tasks
    const tasksTeacherId = await columnExists('tasks', 'teacher_id');
    if (!tasksTeacherId) {
      console.log('➕ Agregando columna teacher_id a tasks...');
      await runSQL('ALTER TABLE tasks ADD COLUMN teacher_id TEXT');
    }

    const tasksClassroomId = await columnExists('tasks', 'classroom_id');
    if (!tasksClassroomId) {
      console.log('➕ Agregando columna classroom_id a tasks...');
      await runSQL('ALTER TABLE tasks ADD COLUMN classroom_id TEXT');
    }

    const tasksStudentId = await columnExists('tasks', 'student_id');
    if (!tasksStudentId) {
      console.log('➕ Agregando columna student_id a tasks...');
      await runSQL('ALTER TABLE tasks ADD COLUMN student_id TEXT');
    }

    const tasksSubject = await columnExists('tasks', 'subject');
    if (!tasksSubject) {
      console.log('➕ Agregando columna subject a tasks...');
      await runSQL('ALTER TABLE tasks ADD COLUMN subject TEXT');
    }

    const tasksGrade = await columnExists('tasks', 'grade');
    if (!tasksGrade) {
      console.log('➕ Agregando columna grade a tasks...');
      await runSQL('ALTER TABLE tasks ADD COLUMN grade TEXT');
    }

    // Actualizar contraseñas
    console.log('🔐 Actualizando contraseñas...');
    const password = 'password123'; // Contraseña por defecto
    const hashedPassword = await bcrypt.hash(password, 10);

    await runSQL('UPDATE users SET password_hash = ? WHERE email = ?', [hashedPassword, 'admin@iger.edu']);
    await runSQL('UPDATE users SET password_hash = ? WHERE email = ?', [hashedPassword, 'ana.martinez@iger.edu']);
    await runSQL('UPDATE users SET password_hash = ? WHERE email = ?', [hashedPassword, 'maria.garcia@iger.edu']);

    // Asignar classroom_id a estudiantes
    console.log('🏫 Asignando aulas a estudiantes...');
    await runSQL('UPDATE users SET classroom_id = ? WHERE id = ?', ['aula-1a', 'student-1']);
    await runSQL('UPDATE users SET classroom_id = ? WHERE id = ?', ['aula-2b', 'student-2']);
    await runSQL('UPDATE users SET classroom_id = ? WHERE id = ?', ['aula-1a', 'student-3']);

    console.log('✅ Base de datos actualizada exitosamente!');
    console.log('');
    console.log('🔑 CONTRASEÑAS ACTUALIZADAS:');
    console.log('   Administrador: admin@iger.edu / password123');
    console.log('   Maestro:       ana.martinez@iger.edu / password123');
    console.log('   Estudiante:    maria.garcia@iger.edu / password123');
    console.log('');
    console.log('📊 ESTRUCTURA DE BASE DE DATOS CORREGIDA:');
    console.log('   ✅ Columna classroom_id agregada a users');
    console.log('   ✅ Columna teacher_id agregada a lessons');
    console.log('   ✅ Columna teacher_id agregada a tasks');
    console.log('   ✅ Estudiantes asignados a aulas');

  } catch (error) {
    console.error('❌ Error actualizando base de datos:', error);
  } finally {
    db.close();
  }
}

updateDatabase();
