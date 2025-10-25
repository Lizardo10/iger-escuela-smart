const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const dbPath = path.join(__dirname, 'backend', 'database.sqlite');
const db = new sqlite3.Database(dbPath);

console.log('🔐 Verificando y corrigiendo contraseñas...');

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

async function fixPasswords() {
  try {
    console.log('📊 Verificando usuarios existentes...');
    
    const users = await getData('SELECT id, email, password_hash FROM users');
    console.log(`✅ Encontrados ${users.length} usuarios`);
    
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log('🔐 Actualizando contraseñas...');
    
    for (const user of users) {
      console.log(`   - ${user.email}`);
      await runSQL('UPDATE users SET password_hash = ? WHERE id = ?', [hashedPassword, user.id]);
    }
    
    console.log('✅ Contraseñas actualizadas exitosamente!');
    console.log('');
    console.log('🔑 CREDENCIALES ACTUALIZADAS:');
    console.log('   👑 Administrador: admin@iger.edu / password123');
    console.log('   👨‍🏫 Maestro:       ana.martinez@iger.edu / password123');
    console.log('   👨‍🎓 Estudiante:    maria.garcia@iger.edu / password123');
    console.log('');
    console.log('🧪 Probando login...');
    
    // Probar login
    const testUser = await getData('SELECT * FROM users WHERE email = ?', ['admin@iger.edu']);
    if (testUser.length > 0) {
      const isValid = await bcrypt.compare(password, testUser[0].password_hash);
      if (isValid) {
        console.log('✅ Login funcionando correctamente!');
      } else {
        console.log('❌ Error en verificación de contraseña');
      }
    } else {
      console.log('❌ Usuario admin no encontrado');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    db.close();
  }
}

fixPasswords();
