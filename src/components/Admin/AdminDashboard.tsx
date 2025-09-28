import React from 'react';
import { Users, BookOpen, Settings, Shield, BarChart3, Database, TestTube } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { User, Classroom } from '../../types';
import { APITest } from '../Test/APITest';
import { LoginDebug } from '../Debug/LoginDebug';

interface AdminDashboardProps {
  user: User;
  classrooms: Classroom[];
  onViewChange: (view: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, classrooms, onViewChange }) => {
  // Estadísticas simuladas
  const totalUsers = 45; // Simulado
  const totalStudents = 32;
  const totalTeachers = 8;
  const systemHealth = 98; // Porcentaje

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-4 sm:p-6 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Panel Administrativo 🛡️</h1>
        <p className="text-purple-100 text-base sm:text-lg">Gestión y configuración del sistema IGER</p>
      </div>

      {/* Estadísticas Principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="bg-gradient-to-br from-blue-400 to-blue-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Usuarios</p>
                <p className="text-2xl font-bold">{totalUsers}</p>
              </div>
              <Users size={32} className="text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-400 to-green-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Estudiantes</p>
                <p className="text-2xl font-bold">{totalStudents}</p>
              </div>
              <Users size={32} className="text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Maestros</p>
                <p className="text-2xl font-bold">{totalTeachers}</p>
              </div>
              <BookOpen size={32} className="text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-400 to-pink-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Sistema</p>
                <p className="text-2xl font-bold">{systemHealth}%</p>
              </div>
              <BarChart3 size={32} className="text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Panel de Control */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                <Users size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Gestión de Usuarios</h3>
                <p className="text-sm text-gray-600">Administrar estudiantes y maestros</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => onViewChange('users')}
              className="w-full"
            >
              Gestionar Usuarios
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white">
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Aulas Virtuales</h3>
                <p className="text-sm text-gray-600">Configurar aulas y horarios</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => onViewChange('classrooms')}
              className="w-full bg-green-500 hover:bg-green-600"
            >
              Gestionar Aulas
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white">
                <Settings size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Configuración</h3>
                <p className="text-sm text-gray-600">APIs, integraciones y seguridad</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => onViewChange('settings')}
              className="w-full bg-purple-500 hover:bg-purple-600"
            >
              Configurar Sistema
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Información del Sistema */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-800">Estado del Sistema</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">API OpenAI</span>
                </div>
                <span className="text-green-600 font-semibold">Activo</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Google Calendar</span>
                </div>
                <span className="text-green-600 font-semibold">Conectado</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium">Base de Datos</span>
                </div>
                <span className="text-green-600 font-semibold">Funcionando</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-medium">Backup Automático</span>
                </div>
                <span className="text-yellow-600 font-semibold">Programado</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-800">Seguridad y Privacidad</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                <Shield size={20} className="text-blue-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-800">Moderación IA Activa</p>
                  <p className="text-sm text-gray-600">Contenido filtrado automáticamente</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-green-50 rounded-lg">
                <Database size={20} className="text-green-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-800">Datos Encriptados</p>
                  <p className="text-sm text-gray-600">Información de estudiantes protegida</p>
                </div>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-400">
                <p className="text-sm text-orange-800">
                  <strong>Importante:</strong> Verificar consentimiento parental para nuevos estudiantes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Aulas */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold text-gray-800">Aulas Registradas</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {classrooms.map((classroom) => (
              <div key={classroom.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h3 className="font-semibold text-gray-800">{classroom.name}</h3>
                  <p className="text-sm text-gray-600">{classroom.students.length} estudiantes activos</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost">Ver Detalles</Button>
                  <Button size="sm">Editar</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prueba de API */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TestTube size={24} className="text-blue-600" />
            <h3 className="text-xl font-semibold">Prueba de API</h3>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Verifica que todas las rutas del backend estén funcionando correctamente.
          </p>
          <Button 
            onClick={() => onViewChange('api-test')}
            className="flex items-center gap-2"
          >
            <TestTube size={16} />
            Ejecutar Pruebas de API
          </Button>
        </CardContent>
      </Card>

      {/* Debug de Login */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield size={24} className="text-red-600" />
            <h3 className="text-xl font-semibold">Debug de Login</h3>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            Prueba el sistema de login para verificar que funcione correctamente.
          </p>
          <Button 
            onClick={() => onViewChange('login-debug')}
            className="flex items-center gap-2"
          >
            <Shield size={16} />
            Probar Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};