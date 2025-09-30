# 🚀 SCRIPTS DE DESPLIEGUE AUTOMATIZADO

## 📋 Scripts Disponibles

He creado **4 scripts** diferentes para automatizar el despliegue según tus necesidades:

---

## 🎯 OPCIÓN 1: ASISTENTE COMPLETO (RECOMENDADO)

### `deploy-wizard.bat` 
**El más fácil y completo - Te guía paso a paso**

```bash
deploy-wizard.bat
```

**✨ Qué hace:**
- ✅ Verifica e instala dependencias
- ✅ Construye el frontend automáticamente
- ✅ Te ayuda a configurar GitHub
- ✅ Genera JWT_SECRET seguro automáticamente
- ✅ Despliega en Vercel (con CLI)
- ✅ Te guía para configurar Render
- ✅ Crea archivos con todas las configuraciones
- ✅ Abre las URLs en el navegador para verificar
- ✅ Guarda todo en archivos de texto

**📁 Archivos que crea:**
- `JWT_SECRET.txt` - Tu clave secreta generada
- `RENDER_CONFIG.txt` - Config completa para Render
- `VERCEL_VAR.txt` - Variables para Vercel
- `VERCEL_URL.txt` - URL de tu frontend
- `RENDER_URL.txt` - URL de tu backend

**⏱️ Tiempo:** 10-15 minutos (con tu ayuda)

---

## 🚀 OPCIÓN 2: DESPLIEGUE AUTOMÁTICO

### `deploy-auto.bat` / `deploy-auto.sh`
**Automatiza todo lo posible**

**Windows:**
```bash
deploy-auto.bat
```

**Linux/Mac:**
```bash
./deploy-auto.sh
```

**✨ Qué hace:**
- ✅ Instala dependencias
- ✅ Construye el frontend
- ✅ Sube código a GitHub
- ✅ Instala Vercel CLI y Render CLI
- ✅ Intenta desplegar en Vercel automáticamente
- ✅ Te guía para configurar Render
- ✅ Muestra todas las instrucciones necesarias

**⏱️ Tiempo:** 10-15 minutos

---

## 📦 OPCIÓN 3: PREPARACIÓN SIMPLE

### `deploy-simple.bat`
**Solo prepara y sube a GitHub**

```bash
deploy-simple.bat
```

**✨ Qué hace:**
- ✅ Instala dependencias
- ✅ Construye el frontend
- ✅ Sube código a GitHub
- ✅ Crea archivo `NEXT-STEPS.txt` con instrucciones
- ✅ Abre el archivo para que sigas los pasos manualmente

**📁 Crea:** `NEXT-STEPS.txt` con todas las instrucciones

**⏱️ Tiempo:** 5 minutos + configuración manual

---

## 🏃 OPCIÓN 4: PRODUCCIÓN LOCAL

### `start-production.bat` / `start-production.sh`
**No despliega - Solo prueba local**

**Windows:**
```bash
start-production.bat
```

**Linux/Mac:**
```bash
./start-production.sh
```

**✨ Qué hace:**
- ✅ Construye el frontend
- ✅ Inicia backend en puerto 3001
- ✅ Inicia frontend en puerto 4173
- ✅ Todo en modo producción localmente

**📍 URLs:**
- Frontend: http://localhost:4173
- Backend: http://localhost:3001/api

**⏱️ Tiempo:** 2 minutos

---

## 🎯 ¿CUÁL USAR?

### 🌟 Primera vez desplegando
→ **`deploy-wizard.bat`** (Te guía paso a paso)

### 🚀 Ya sabes qué hacer
→ **`deploy-auto.bat`** (Más rápido)

### 📝 Prefieres manual
→ **`deploy-simple.bat`** (Solo prepara)

### 🧪 Solo quieres probar
→ **`start-production.bat`** (Local)

---

## 📖 GUÍA PASO A PASO - WIZARD

### 1. Ejecutar el asistente
```bash
deploy-wizard.bat
```

### 2. Seguir las instrucciones en pantalla

El asistente te preguntará:

**PASO 1:** Preparación
- Instala dependencias automáticamente
- Construye el frontend

**PASO 2:** GitHub
- ¿Ya tienes repositorio?
  - SÍ → Hace push automático
  - NO → Te ayuda a configurarlo

**PASO 3:** Seguridad
- Genera JWT_SECRET aleatorio
- Lo guarda en archivo

**PASO 4:** Vercel
- Opción 1: CLI automático
- Opción 2: Manual con instrucciones

**PASO 5:** Variables Vercel
- Te dice qué configurar

**PASO 6:** Render
- Te da instrucciones paso a paso
- Crea archivo con toda la config
- Abre el archivo automáticamente

**PASO 7:** Actualizar Vercel
- Te dice cómo actualizar la variable
- Crea archivo con el valor exacto

**PASO 8:** Verificación
- Abre las URLs en el navegador
- Muestra credenciales de prueba

### 3. ¡Listo!

Al final tendrás:
- ✅ Frontend en Vercel
- ✅ Backend en Render
- ✅ Variables configuradas
- ✅ Archivos con toda la información

---

## 🔧 REQUISITOS

### Todos los scripts necesitan:
- ✅ Node.js instalado
- ✅ npm instalado
- ✅ Git instalado

### Para `deploy-wizard.bat` y `deploy-auto.bat` también:
- ✅ Cuenta en GitHub
- ✅ Cuenta en Vercel (gratis)
- ✅ Cuenta en Render (gratis)

---

## 📁 ARCHIVOS GENERADOS

Después de ejecutar el wizard, tendrás:

```
proyecto_analisis/
├── JWT_SECRET.txt          # Tu clave secreta
├── RENDER_CONFIG.txt       # Config para Render
├── VERCEL_VAR.txt          # Variable para Vercel
├── VERCEL_URL.txt          # URL del frontend
├── RENDER_URL.txt          # URL del backend
└── NEXT-STEPS.txt          # Próximos pasos (si usas simple)
```

**⚠️ IMPORTANTE:** 
- Guarda `JWT_SECRET.txt` en un lugar seguro
- NO lo subas a GitHub
- Estos archivos están en `.gitignore`

---

## 🐛 SOLUCIÓN DE PROBLEMAS

### ❌ Error: "npm no reconocido"
**Solución:** Instala Node.js desde https://nodejs.org

### ❌ Error: "git no reconocido"
**Solución:** Instala Git desde https://git-scm.com

### ❌ Error: "vercel login failed"
**Solución:** 
1. Ejecuta: `vercel logout`
2. Ejecuta: `vercel login`
3. Sigue las instrucciones

### ❌ Error en build
**Solución:** 
```bash
npm install
npm run build
```

---

## 🔐 CREDENCIALES DE PRUEBA

Después del despliegue, usa estas credenciales:

```
Administrador:
  Email: admin@iger.edu.gt
  Password: admin123

Profesor:
  Email: profesor@iger.edu.gt
  Password: prof123

Estudiante:
  Email: estudiante@iger.edu.gt
  Password: est123
```

---

## 📞 COMANDOS ÚTILES

### Ver logs en Vercel
```bash
vercel logs
```

### Redesplegar en Vercel
```bash
vercel --prod
```

### Ver estado de Git
```bash
git status
```

### Subir cambios
```bash
git add .
git commit -m "Cambios"
git push
```

---

## 🎉 SIGUIENTE PASO

### RECOMENDACIÓN: Usa el wizard

```bash
deploy-wizard.bat
```

Es el más completo y fácil. Te guía en todo el proceso y crea todos los archivos necesarios.

---

**Creado:** 30 de Septiembre, 2025
**Versión:** 1.0
**Estado:** ✅ Listo para usar
