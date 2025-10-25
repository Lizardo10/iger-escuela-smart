const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('🔍 Verificando estructura de la base de datos...');

// Función para obtener datos
function getData(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

async function checkDatabase() {
  try {
    console.log('📊 Verificando tablas existentes...');
    
    const tables = await getData("SELECT name FROM sqlite_master WHERE type='table'");
    console.log(`✅ Encontradas ${tables.length} tablas:`);
    tables.forEach(table => console.log(`   - ${table.name}`));
    
    console.log('');
    console.log('🔍 Verificando estructura de tabla lessons...');
    const lessonsSchema = await getData("PRAGMA table_info(lessons)");
    console.log('Columnas en lessons:');
    lessonsSchema.forEach(col => console.log(`   - ${col.name} (${col.type})`));
    
    console.log('');
    console.log('🔍 Verificando estructura de tabla tasks...');
    const tasksSchema = await getData("PRAGMA table_info(tasks)");
    console.log('Columnas en tasks:');
    tasksSchema.forEach(col => console.log(`   - ${col.name} (${col.type})`));
    
    console.log('');
    console.log('🔍 Verificando estructura de tabla classrooms...');
    const classroomsSchema = await getData("PRAGMA table_info(classrooms)");
    console.log('Columnas en classrooms:');
    classroomsSchema.forEach(col => console.log(`   - ${col.name} (${col.type})`));
    
    console.log('');
    console.log('📋 Verificando datos existentes...');
    const lessons = await getData("SELECT COUNT(*) as count FROM lessons");
    const tasks = await getData("SELECT COUNT(*) as count FROM tasks");
    const classrooms = await getData("SELECT COUNT(*) as count FROM classrooms");
    
    console.log(`   - Lecciones: ${lessons[0].count}`);
    console.log(`   - Tareas: ${tasks[0].count}`);
    console.log(`   - Aulas: ${classrooms[0].count}`);
    
    console.log('');
    console.log('🧪 Probando inserción de lección...');
    try {
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO lessons (id, title, description, teacher_id, classroom_id, subject, grade, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          ['test-lesson-1', 'Lección de Prueba', 'Descripción de prueba', 'teacher-1', 'aula-1a', 'Matemáticas', 'Primer Grado', new Date().toISOString()],
          function(err) {
            if (err) {
              console.log(`❌ Error: ${err.message}`);
              reject(err);
            } else {
              console.log('✅ Lección insertada exitosamente');
              resolve();
            }
          }
        );
      });
    } catch (error) {
      console.log(`❌ Error insertando lección: ${error.message}`);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    db.close();
  }
}

checkDatabase();
