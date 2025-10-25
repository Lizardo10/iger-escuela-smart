import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Settings, Shield, BarChart3, Database, TestTube, LogOut, Home, Calendar, CreditCard, FileText, GraduationCap, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { User, Classroom } from '../../types';
import { apiService } from '../../services/apiService';

interface AdminDashboardProps {
  user: User;
  classrooms: Classroom[];
  onViewChange: (view: string) => void;
  logout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, classrooms, onViewChange, logout }) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    totalTeachers: 0,
    totalClassrooms: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      
      // Cargar estadísticas del sistema
      const usersResponse = await apiService.getUsers();
      if (usersResponse.data) {
        const users = usersResponse.data;
        setStats({
          totalUsers: users.length,
          totalStudents: users.filter(u => u.role === 'estudiante').length,
          totalTeachers: users.filter(u => u.role === 'maestro').length,
          totalClassrooms: classrooms.length
        });
      }
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con navegación */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Panel Administrativo</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Hola, {user.name}</span>
              <Button onClick={logout} variant="outline" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex space-x-1 pb-4">
            <Button
              onClick={() => onViewChange('dashboard')}
              variant="default"
              size="sm"
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Dashboard
            </Button>
            <Button
              onClick={() => onViewChange('users')}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              Usuarios
            </Button>
            <Button
              onClick={() => onViewChange('classrooms')}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              Aulas
            </Button>
            <Button
              onClick={() => onViewChange('calendar')}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Calendario
            </Button>
            <Button
              onClick={() => onViewChange('payments')}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Pagos
            </Button>
            <Button
              onClick={() => onViewChange('reports')}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Reportes
            </Button>
            <Button
              onClick={() => onViewChange('grades')}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4" />
              Grados
            </Button>
            <Button
              onClick={() => onViewChange('settings')}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Configuración
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Panel Administrativo 🛡️</h1>
            <p className="text-purple-100 text-lg">Gestión y configuración del sistema IGER</p>
          </div>

          {/* Estadísticas Principales */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-400 to-blue-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Total Usuarios</p>
                    <p className="text-2xl font-bold">
                      {loading ? '...' : stats.totalUsers}
                    </p>
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
                    <p className="text-2xl font-bold">
                      {loading ? '...' : stats.totalStudents}
                    </p>
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
                    <p className="text-2xl font-bold">
                      {loading ? '...' : stats.totalTeachers}
                    </p>
                  </div>
                  <BookOpen size={32} className="text-orange-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-400 to-pink-500 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Aulas</p>
                    <p className="text-2xl font-bold">
                      {loading ? '...' : stats.totalClassrooms}
                    </p>
                  </div>
                  <BookOpen size={32} className="text-purple-200" />
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
      </div>
    </div>
  );
};