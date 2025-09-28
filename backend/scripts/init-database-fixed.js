const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initializeDatabase() {
  let db;
  
  try {
    console.log('🔄 Inicializando base de datos SQLite IGER...');
    
    // Crear conexión a la base de datos SQLite
    const dbPath = path.join(__dirname, '../database.sqlite');
    db = new sqlite3.Database(dbPath);

    console.log('✅ Conectado a SQLite');

    // Leer el archivo de esquema SQLite
    const schemaPath = path.join(__dirname, '../../database/schema.sqlite.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Ejecutar todo el esquema de una vez
    console.log('📝 Ejecutando esquema completo...');
    
    await new Promise((resolve, reject) => {
      db.exec(schema, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    console.log('🎉 Base de datos SQLite inicializada exitosamente!');
    console.log('📊 Datos de prueba insertados');
    console.log('👤 Usuarios de prueba:');
    console.log('   - admin@iger.edu (Administrador)');
    console.log('   - ana.martinez@iger.edu (Maestro)');
    console.log('   - maria.garcia@iger.edu (Estudiante)');
    console.log(`📁 Base de datos creada en: ${dbPath}`);

  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
    process.exit(1);
  } finally {
    if (db) {
      db.close();
    }
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase;

