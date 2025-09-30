# 🎓 IGER Escuela Smart - Sistema Educativo Completo

Un sistema educativo moderno y completo desarrollado con React, TypeScript, Node.js y SQLite, diseñado específicamente para la gestión escolar de IGER.

## ✨ Características Principales

### 🔐 Sistema de Autenticación
- **Registro completo** de estudiantes, maestros y administradores
- **Login seguro** con JWT
- **Gestión de roles** y permisos
- **Información de padres/tutores** para estudiantes

### 👥 Gestión de Usuarios
- **Panel de administración** completo
- **Filtros avanzados** por rol, grado y estado
- **Búsqueda** por nombre, email o número de recibo
- **Activar/desactivar** usuarios
- **Vista detallada** de información

### 🏫 Gestión de Aulas
- **Creación de aulas** con asignación de profesores
- **Horarios de clases** configurables
- **Asignación de estudiantes** a aulas específicas
- **Gestión de capacidad** y límites

### 📊 Sistema de Asistencia
- **Registro diario** de asistencia
- **Estados**: Presente, Ausente, Tardanza, Justificado
- **Notas adicionales** para cada registro
- **Estadísticas en tiempo real**
- **Exportación de reportes**

### 💰 Sistema de Pagos
- **Registro de pagos** de mensualidades
- **Múltiples métodos** de pago
- **Estados**: Pendiente, Completado, Cancelado
- **Seguimiento de fechas** de vencimiento
- **Números de recibo** automáticos

### 📈 Reportes e Informes
- **Reportes académicos** individuales
- **Reportes de asistencia** por período
- **Reportes de pagos** con estadísticas
- **Reportes de conducta**
- **Exportación** de reportes

### 📅 Calendario Académico
- **Vista mensual** del calendario escolar
- **Eventos académicos**: Clases, exámenes, eventos, vacaciones
- **Horarios detallados**
- **Asignación a aulas** específicas

### 🎓 Gestión de Grados
- **Creación de grados** escolares (1°, 2°, 3° básico)
- **Gestión de años académicos**
- **Capacidad máxima** de estudiantes
- **Estadísticas de ocupación**

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (v16 o superior)
- npm o yarn
- **No se requiere instalación adicional de base de datos** (SQLite incluido)

### 1. Clonar el Repositorio
```bash
git clone <repository-url>
cd proyecto_analisis
```

### 2. Configurar la Base de Datos SQLite

#### SQLite (Incluido con Node.js)
- **No se requiere instalación adicional**
- La base de datos se crea automáticamente
- Archivo único: `backend/database.sqlite`

### 3. Configurar el Backend

```bash
# Navegar al directorio backend
cd backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp env.example .env

# SQLite no requiere configuración adicional
# El archivo .env ya está configurado para SQLite

# Inicializar la base de datos con datos de prueba
npm run init-db

# Iniciar el servidor
npm run dev
```

### 4. Configurar el Frontend

```bash
# Volver al directorio raíz
cd ..

# Instalar dependencias del frontend
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

## 🎯 Uso del Sistema

### Acceso al Sistema
1. Abrir navegador en `http://localhost:5173`
2. Usar las credenciales de prueba:
   - **Administrador**: `admin@iger.edu`
   - **Maestro**: `ana.martinez@iger.edu`
   - **Estudiante**: `maria.garcia@iger.edu`

### Funcionalidades por Rol

#### 👨‍💼 Administrador
- Gestión completa de usuarios
- Administración de aulas
- Gestión de grados y años académicos
- Sistema de pagos
- Generación de reportes
- Calendario académico

#### 👩‍🏫 Maestro
- Dashboard de gestión
- Toma de asistencia
- Gestión de lecciones
- Vista de estudiantes
- Calendario de clases

#### 👨‍🎓 Estudiante
- Dashboard personalizado
- Acceso a lecciones y tareas
- Chat con tutor IA
- Sistema de logros

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Framework principal
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos y diseño
- **Vite** - Herramienta de construcción
- **Lucide React** - Iconos

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **SQLite3** - Base de datos embebida
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas

### Base de Datos
- **SQLite** - Base de datos embebida
- **Esquema completo** con todas las tablas necesarias
- **Datos de prueba** incluidos
- **Sin configuración adicional** requerida

## 📁 Estructura del Proyecto

```
proyecto_analisis/
├── src/
│   ├── components/
│   │   ├── Auth/           # Componentes de autenticación
│   │   ├── Admin/          # Componentes de administración
│   │   ├── Teacher/        # Componentes de maestros
│   │   ├── Student/        # Componentes de estudiantes
│   │   └── Layout/         # Componentes de layout
│   ├── services/           # Servicios API
│   ├── hooks/              # Hooks personalizados
│   ├── types/              # Definiciones de tipos
│   └── styles/             # Estilos y animaciones
├── backend/
│   ├── server.js           # Servidor principal
│   ├── scripts/            # Scripts de utilidad
│   └── package.json        # Dependencias del backend
├── database/
│   └── schema.sqlite.sql   # Esquema de base de datos SQLite
└── README.md               # Este archivo
```

## 🎨 Características de Diseño

### Animaciones Mejoradas
- **Transiciones suaves** en todos los componentes
- **Efectos de hover** interactivos
- **Animaciones de entrada** escalonadas
- **Efectos de carga** y notificaciones
- **Gradientes animados** de fondo

### Diseño Responsivo
- **Mobile-first** approach
- **Adaptable** a todas las pantallas
- **Navegación intuitiva**
- **Interfaz moderna** y profesional

## 🔧 Scripts Disponibles

### Frontend
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construcción para producción
npm run preview      # Vista previa de producción
npm run lint         # Linter de código
```

### Backend
```bash
npm start            # Servidor de producción
npm run dev          # Servidor de desarrollo
npm run init-db      # Inicializar base de datos
```

## 🚀 Despliegue en Producción

### ⚡ Inicio Rápido - Producción Local

**Windows:**
```bash
start-production.bat
```

**Linux/Mac:**
```bash
./start-production.sh
```

Esto automáticamente:
- ✅ Instala dependencias
- ✅ Inicializa la base de datos
- ✅ Construye el frontend
- ✅ Inicia backend y frontend en modo producción

**URLs:**
- Frontend: http://localhost:4173
- Backend: http://localhost:3001/api

### 🌐 Despliegue en Vercel y Render

Para desplegar en la nube (Vercel + Render), consulta:
📖 **[Guía Completa de Despliegue](./DEPLOY.md)**

La guía incluye:
- Configuración de Vercel (Frontend)
- Configuración de Render (Backend)
- Variables de entorno
- Solución de problemas

## 📊 Datos de Prueba Incluidos

El sistema incluye datos de prueba para demostración:

### Usuarios
- **Administrador**: admin@iger.edu
- **Maestros**: ana.martinez@iger.edu, carlos.lopez@iger.edu
- **Estudiantes**: maria.garcia@iger.edu, carlos.lopez@iger.edu, ana.rodriguez@iger.edu

### Aulas
- Aula 1A - Primer Grado
- Aula 2B - Segundo Grado

### Eventos del Calendario
- Inicio de clases
- Exámenes programados
- Vacaciones de Semana Santa
- Reuniones de padres

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o preguntas sobre el sistema:
- **Email**: soporte@iger.edu
- **Teléfono**: +502 1234-5678

## 🎉 ¡Sistema Completo y Funcional!

Este sistema educativo incluye todas las funcionalidades solicitadas:

✅ **Formulario de registro de usuarios**  
✅ **Identificación de roles** (estudiante, profesor, administrador)  
✅ **Formulario para crear aulas**  
✅ **Asignación de usuarios a clases/grados**  
✅ **Toma de asistencia**  
✅ **Calendario académico**  
✅ **Sistema de pagos** (para el papá de Edvin)  
✅ **Reportes e informes**  
✅ **APIs necesarias**  
✅ **Asignación de profesores a cursos**  
✅ **Base de datos SQL local**  
✅ **Diseño mejorado con animaciones**  

¡El sistema está listo para usar! 🚀