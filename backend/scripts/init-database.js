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

    // Dividir el esquema en declaraciones individuales
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`📝 Ejecutando ${statements.length} declaraciones SQL...`);

    // Ejecutar cada declaración
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          await new Promise((resolve, reject) => {
            db.run(statement, (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          });
          console.log(`✅ Declaración ${i + 1}/${statements.length} ejecutada`);
        } catch (error) {
          if (!error.message.includes('already exists')) {
            console.error(`❌ Error en declaración ${i + 1}:`, error.message);
          }
        }
      }
    }

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
