# 📖 GUÍA MANUAL PASO A PASO

## 🎯 Despliegue Completo Manual - Sin Scripts

Esta guía te lleva paso a paso para desplegar tu aplicación **sin usar scripts automáticos**.

---

## ✅ REQUISITOS PREVIOS

Antes de empezar, asegúrate de tener:

- [ ] Cuenta en [GitHub](https://github.com) (gratis)
- [ ] Cuenta en [Vercel](https://vercel.com) (gratis)
- [ ] Cuenta en [Render](https://render.com) (gratis)
- [ ] Node.js instalado (verifica con `node --version`)
- [ ] Git instalado (verifica con `git --version`)

---

## 📋 PARTE 1: PREPARAR EL PROYECTO

### Paso 1: Instalar Dependencias

Abre la terminal en la carpeta del proyecto y ejecuta:

```bash
# Instalar dependencias del frontend
npm install
```

Luego instala las del backend:

```bash
# Ir a la carpeta backend
cd backend

# Instalar dependencias
npm install

# Volver a la raíz
cd ..
```

✅ **Verificar:** Deberías ver las carpetas `node_modules` en ambos lugares.

---

### Paso 2: Construir el Frontend

Construye el proyecto para producción:

```bash
npm run build
```

✅ **Verificar:** Deberías ver la carpeta `dist` con archivos dentro.

---

### Paso 3: Probar Localmente (Opcional)

Prueba que todo funcione antes de desplegar:

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
npm run preview
```

**Abrir:** http://localhost:4173

**Login:** admin@iger.edu.gt / admin123

Si funciona, ¡estás listo para desplegar! Presiona `Ctrl+C` en ambas terminales.

---

## 📋 PARTE 2: SUBIR A GITHUB

### Paso 4: Crear Repositorio en GitHub

1. Ve a [GitHub](https://github.com)
2. Click en **"New repository"** (botón verde)
3. Nombre: `iger-escuela-smart` (o el que prefieras)
4. Descripción: "Sistema de gestión educativa"
5. **Público** o **Privado** (tu elección)
6. **NO** marques "Add a README file"
7. Click **"Create repository"**

✅ **Copiar** la URL que aparece (ej: `https://github.com/tu-usuario/iger-escuela-smart.git`)

---

### Paso 5: Subir el Código

En la terminal (en la carpeta de tu proyecto):

```bash
# Inicializar Git (si no lo has hecho)
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Proyecto listo para producción"

# Conectar con GitHub (usa TU URL)
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git

# Subir el código
git branch -M main
git push -u origin main
```

✅ **Verificar:** Recarga la página de GitHub, deberías ver todos los archivos.

---

## 📋 PARTE 3: DESPLEGAR BACKEND EN RENDER

### Paso 6: Crear Web Service en Render

1. Ve a [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** (arriba a la derecha)
3. Selecciona **"Web Service"**

---

### Paso 7: Conectar Repositorio

1. Click **"Connect a repository"**
2. Autoriza a Render para acceder a GitHub (primera vez)
3. Busca y selecciona tu repositorio `iger-escuela-smart`
4. Click **"Connect"**

---

### Paso 8: Configurar el Servicio

Llena el formulario con estos datos:

**🔹 Información Básica**
- **Name:** `iger-backend` (o el nombre que prefieras)
- **Region:** `Oregon (US West)` (o la más cercana a ti)
- **Branch:** `main`
- **Root Directory:** `backend` ⚠️ **MUY IMPORTANTE**

**🔹 Runtime**
- **Runtime:** `Node`

**🔹 Build & Deploy**
- **Build Command:**
  ```
  npm install && node scripts/init-database-fixed.js
  ```

- **Start Command:**
  ```
  npm start
  ```

**🔹 Plan**
- **Instance Type:** `Free` (o el que prefieras)

---

### Paso 9: Configurar Variables de Entorno

Scroll hasta **"Environment Variables"** y agrega estas 4 variables:

Click **"Add Environment Variable"** para cada una:

**Variable 1:**
- **Key:** `NODE_ENV`
- **Value:** `production`

**Variable 2:**
- **Key:** `PORT`
- **Value:** `10000`

**Variable 3:**
- **Key:** `JWT_SECRET`
- **Value:** Genera una clave segura (ver abajo) ⬇️

**Variable 4:**
- **Key:** `CORS_ORIGIN`
- **Value:** `https://placeholder.vercel.app` (lo cambiaremos después)

---

#### 🔐 Generar JWT_SECRET Seguro

Usa uno de estos métodos:

**Opción 1 - Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Opción 2 - PowerShell:**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 64 | % {[char]$_})
```

**Opción 3 - Online:**
- Ve a: https://randomkeygen.com/
- Copia cualquier "CodeIgniter Encryption Keys"

**Opción 4 - Inventar:**
- Una cadena larga y aleatoria (mínimo 32 caracteres)
- Ejemplo: `mi_super_clave_secreta_2024_iger_prod_xyz123abc456`

⚠️ **IMPORTANTE:** Guarda esta clave en un lugar seguro, la necesitarás.

---

### Paso 10: Crear el Servicio

1. Click **"Create Web Service"** (abajo)
2. Espera 5-10 minutos mientras Render despliega
3. Verás logs en pantalla
4. Cuando termine, verás "Live" con un ✅

---

### Paso 11: Copiar URL del Backend

1. En la parte superior verás la URL de tu backend
2. Formato: `https://iger-backend-XXXX.onrender.com`
3. **COPIA ESTA URL** - la necesitarás para Vercel

✅ **Verificar:** Abre esta URL en el navegador:
```
https://tu-backend.onrender.com/api/health
```

Deberías ver:
```json
{
  "status": "OK",
  "message": "IGER Backend API funcionando correctamente con SQLite"
}
```

⚠️ **NOTA:** La primera vez puede tardar 30-50 segundos (plan gratuito).

---

## 📋 PARTE 4: DESPLEGAR FRONTEND EN VERCEL

### Paso 12: Crear Proyecto en Vercel

1. Ve a [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** (arriba a la derecha)
3. Selecciona **"Project"**

---

### Paso 13: Importar Repositorio

1. Click **"Import Git Repository"**
2. Si no has conectado GitHub, click **"Continue with GitHub"**
3. Autoriza a Vercel (primera vez)
4. Busca tu repositorio `iger-escuela-smart`
5. Click **"Import"**

---

### Paso 14: Configurar el Proyecto

**🔹 Configure Project:**

- **Framework Preset:** `Vite` (debería detectarlo automáticamente)
- **Root Directory:** `./` (raíz del proyecto)
- **Build Command:** `npm run build` (ya está)
- **Output Directory:** `dist` (ya está)
- **Install Command:** `npm install` (ya está)

**Deja todo como está,** Vercel detecta la configuración automáticamente.

---

### Paso 15: Configurar Variable de Entorno

**⚠️ IMPORTANTE:** Aquí necesitas la URL de tu backend en Render.

1. Click en **"Environment Variables"** (expandir)

2. Agrega esta variable:
   - **Key:** `VITE_API_URL`
   - **Value:** `https://tu-backend.onrender.com/api`
   
   ⚠️ **Reemplaza** `tu-backend.onrender.com` con tu URL real de Render
   
   ✅ **Ejemplo completo:** `https://iger-backend-abc123.onrender.com/api`

3. **Environment:** Deja `Production` seleccionado

4. Click **"Add"**

---

### Paso 16: Desplegar

1. Click **"Deploy"** (abajo)
2. Espera 2-3 minutos mientras Vercel construye y despliega
3. Verás el progreso en pantalla
4. Cuando termine, verás "Congratulations!" 🎉

---

### Paso 17: Copiar URL del Frontend

1. Verás tu URL de Vercel
2. Formato: `https://tu-proyecto-XXXX.vercel.app`
3. Click en **"Visit"** o **"Continue to Dashboard"**
4. **COPIA ESTA URL**

---

## 📋 PARTE 5: CONECTAR FRONTEND Y BACKEND

### Paso 18: Actualizar CORS en Render

Ahora que tienes la URL de Vercel, actualiza el backend:

1. Ve a [Render Dashboard](https://dashboard.render.com)
2. Click en tu servicio `iger-backend`
3. Click en **"Environment"** (menú izquierdo)
4. Busca la variable **`CORS_ORIGIN`**
5. Click en el lápiz ✏️ para editar
6. Cambia el valor a tu URL de Vercel:
   ```
   https://tu-proyecto-abc123.vercel.app
   ```
   ⚠️ **Sin `/` al final**
   
7. Click **"Save Changes"**
8. Render hará **auto-redeploy** (2-3 minutos)

---

## 📋 PARTE 6: VERIFICACIÓN FINAL

### Paso 19: Verificar Backend

Abre en el navegador:
```
https://tu-backend.onrender.com/api/health
```

Deberías ver:
```json
{
  "status": "OK",
  "message": "IGER Backend API funcionando correctamente con SQLite"
}
```

✅ Si ves esto, el backend funciona.

---

### Paso 20: Verificar Frontend

1. Abre tu URL de Vercel:
   ```
   https://tu-proyecto.vercel.app
   ```

2. Deberías ver la página de login

3. Abre la consola del navegador (F12)

4. **NO deberías ver errores de CORS**

✅ Si ves la página de login sin errores, el frontend funciona.

---

### Paso 21: Probar Login

Intenta iniciar sesión:

**Administrador:**
- Email: `admin@iger.edu.gt`
- Password: `admin123`

**Si puedes entrar y ves el dashboard:**
🎉 **¡FELICIDADES! TODO FUNCIONA**

---

## 🎉 ¡DESPLIEGUE COMPLETADO!

### 📝 Guarda esta información:

**Frontend (Vercel):**
- URL: `https://tu-proyecto.vercel.app`
- Dashboard: https://vercel.com/dashboard

**Backend (Render):**
- URL: `https://tu-backend.onrender.com`
- Dashboard: https://dashboard.render.com

**Credenciales de Prueba:**
```
Admin:      admin@iger.edu.gt / admin123
Profesor:   profesor@iger.edu.gt / prof123
Estudiante: estudiante@iger.edu.gt / est123
```

**Variables Importantes:**
- JWT_SECRET: [la que generaste - guárdala]
- VITE_API_URL: `https://tu-backend.onrender.com/api`
- CORS_ORIGIN: `https://tu-proyecto.vercel.app`

---

## 🔄 REDESPLEGAR DESPUÉS DE CAMBIOS

### Cambios en el Código:

```bash
# Hacer cambios en tu código
# Luego:
git add .
git commit -m "Descripción de cambios"
git push
```

**Vercel** y **Render** redesplegarán **automáticamente**. 🚀

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### ❌ Error: "CORS policy has blocked"

**Solución:**
1. Ve a Render → Environment
2. Verifica que `CORS_ORIGIN` sea exactamente tu URL de Vercel
3. **Sin** `/` al final
4. Guarda y espera el redeploy

---

### ❌ Backend no responde (primera petición)

**Solución:**
- En Render Free, el servicio se apaga después de inactividad
- La primera petición tarda 30-50 segundos en despertar
- **Espera un poco y recarga**

---

### ❌ Error 500 en login

**Solución:**
1. Verifica que `JWT_SECRET` esté configurado en Render
2. Ve a Render → Logs y revisa los errores
3. Verifica que la base de datos se inicializó:
   - Render → Logs → Busca "Conectado a la base de datos"

---

### ❌ Página en blanco en Vercel

**Solución:**
1. Vercel → Tu proyecto → Deployments
2. Click en el último deployment
3. Revisa los logs del build
4. Verifica que `VITE_API_URL` esté configurado

---

### ❌ "Cannot find module" en Render

**Solución:**
1. Verifica que `Root Directory` sea `backend`
2. Verifica que el Build Command sea correcto
3. Trigger Manual Deploy en Render

---

## 📊 MONITOREO

### Vercel

**Ver Logs:**
1. Dashboard → Tu proyecto
2. Deployments → Click en el deployment
3. View Function Logs

**Analytics:**
1. Dashboard → Tu proyecto
2. Analytics

---

### Render

**Ver Logs:**
1. Dashboard → Tu servicio
2. Logs (en tiempo real)

**Metrics:**
1. Dashboard → Tu servicio
2. Metrics

---

## 🎯 PRÓXIMOS PASOS

1. ✅ Cambia las credenciales de admin en producción
2. ✅ Configura un dominio personalizado (opcional)
3. ✅ Activa Analytics en Vercel
4. ✅ Configura alertas en Render
5. ✅ Considera migrar a plan pagado para 24/7

---

## 📚 RECURSOS ADICIONALES

- [Documentación Vercel](https://vercel.com/docs)
- [Documentación Render](https://render.com/docs)
- [Guía de Vite](https://vitejs.dev/guide/)

---

## ✅ CHECKLIST FINAL

Antes de dar por terminado, verifica:

- [ ] Backend responde en `/api/health`
- [ ] Frontend carga correctamente
- [ ] Login funciona con las 3 cuentas
- [ ] No hay errores de CORS en consola
- [ ] Dashboard muestra datos
- [ ] Navegación entre secciones funciona
- [ ] Has guardado todas las URLs y credenciales

---

**¡FELICIDADES!** 🎉

Tu aplicación **IGER Escuela Smart** está en producción y funcionando.

---

**Fecha:** 30 de Septiembre, 2025
**Versión:** Manual Completo 1.0
**Tiempo estimado:** 30-45 minutos
