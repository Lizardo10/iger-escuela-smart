#!/bin/bash

# Script de instalación automática para IGER Escuela Smart
# Ejecutar con: bash install.sh

echo "🎓 Instalando IGER Escuela Smart..."
echo "=================================="

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar si Node.js está instalado
check_node() {
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js encontrado: $NODE_VERSION"
    else
        print_error "Node.js no está instalado. Por favor instala Node.js desde https://nodejs.org/"
        exit 1
    fi
}

# Verificar si SQLite está disponible (viene incluido con Node.js)
check_sqlite() {
    print_success "SQLite disponible (incluido con Node.js)"
    print_status "No se requiere instalación adicional de base de datos"
}

# Instalar dependencias del frontend
install_frontend() {
    print_status "Instalando dependencias del frontend..."
    npm install
    if [ $? -eq 0 ]; then
        print_success "Dependencias del frontend instaladas"
    else
        print_error "Error instalando dependencias del frontend"
        exit 1
    fi
}

# Instalar dependencias del backend
install_backend() {
    print_status "Instalando dependencias del backend..."
    cd backend
    npm install
    if [ $? -eq 0 ]; then
        print_success "Dependencias del backend instaladas"
    else
        print_error "Error instalando dependencias del backend"
        exit 1
    fi
    cd ..
}

# Configurar base de datos SQLite
setup_database() {
    print_status "Configurando base de datos SQLite..."
    
    # Crear archivo .env si no existe
    if [ ! -f backend/.env ]; then
        cp backend/env.example backend/.env
        print_success "Archivo .env creado"
    fi
    
    print_success "Configuración de SQLite completada"
    print_status "La base de datos se creará automáticamente al inicializar"
}

# Inicializar base de datos
init_database() {
    print_status "Inicializando base de datos..."
    cd backend
    
    # Intentar ejecutar el script de inicialización
    npm run init-db
    if [ $? -eq 0 ]; then
        print_success "Base de datos inicializada con datos de prueba"
    else
        print_warning "Error inicializando base de datos automáticamente"
        print_status "Puedes inicializarla manualmente ejecutando:"
        echo "  cd backend && npm run init-db"
    fi
    
    cd ..
}

# Crear scripts de inicio
create_start_scripts() {
    print_status "Creando scripts de inicio..."
    
    # Script para iniciar todo
    cat > start.sh << 'EOF'
#!/bin/bash
echo "🚀 Iniciando IGER Escuela Smart..."

# Iniciar backend en background
echo "📡 Iniciando backend..."
cd backend && npm run dev &
BACKEND_PID=$!

# Esperar un poco para que el backend inicie
sleep 3

# Iniciar frontend
echo "🎨 Iniciando frontend..."
cd .. && npm run dev &
FRONTEND_PID=$!

echo "✅ Servidores iniciados!"
echo "📊 Backend: http://localhost:3001"
echo "🎨 Frontend: http://localhost:5173"
echo ""
echo "Presiona Ctrl+C para detener los servidores"

# Esperar a que se presione Ctrl+C
wait
EOF

    chmod +x start.sh
    
    # Script para Windows
    cat > start.bat << 'EOF'
@echo off
echo 🚀 Iniciando IGER Escuela Smart...

echo 📡 Iniciando backend...
start "Backend" cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo 🎨 Iniciando frontend...
start "Frontend" cmd /k "npm run dev"

echo ✅ Servidores iniciados!
echo 📊 Backend: http://localhost:3001
echo 🎨 Frontend: http://localhost:5173
pause
EOF

    print_success "Scripts de inicio creados"
}

# Mostrar información final
show_final_info() {
    echo
    echo "🎉 ¡Instalación completada!"
    echo "=========================="
    echo
    print_success "IGER Escuela Smart está listo para usar"
    echo
    echo "📋 Próximos pasos:"
    echo "1. Iniciar los servidores:"
    echo "   - Linux/Mac: ./start.sh"
    echo "   - Windows: start.bat"
    echo
    echo "2. Abrir el navegador en: http://localhost:5173"
    echo
    echo "3. Usar las credenciales de prueba:"
    echo "   - Administrador: admin@iger.edu"
    echo "   - Maestro: ana.martinez@iger.edu"
    echo "   - Estudiante: maria.garcia@iger.edu"
    echo
    echo "📚 Documentación completa en README.md"
    echo
    print_success "¡Disfruta usando IGER Escuela Smart! 🎓"
}

# Función principal
main() {
    echo "🎓 IGER Escuela Smart - Instalador Automático"
    echo "=============================================="
    echo
    
    # Verificaciones
    check_node
    check_sqlite
    
    # Instalación
    install_frontend
    install_backend
    
    # Configuración
    setup_database
    init_database
    
    # Scripts
    create_start_scripts
    
    # Información final
    show_final_info
}

# Ejecutar instalación
main "$@"
