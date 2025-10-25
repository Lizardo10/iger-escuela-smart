import React, { useState } from 'react';
import { Users, BookOpen, Calendar, Plus, TrendingUp, Clock, Home, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { User } from '../../types';
import TeacherCalendar from './TeacherCalendar';
import TeacherChat from './TeacherChat';

interface TeacherDashboardProps {
  user: User;
  logout: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user, logout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-4 sm:p-6 text-white">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">¡Hola, {user.name}! 👩‍🏫</h1>
              <p className="text-green-100 text-base sm:text-lg">Panel de control para gestionar tus clases</p>
            </div>

            {/* Estadísticas */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Card className="bg-gradient-to-br from-blue-400 to-blue-500 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Estudiantes</p>
                      <p className="text-2xl font-bold">45</p>
                    </div>
                    <Users size={32} className="text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-400 to-green-500 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Lecciones</p>
                      <p className="text-2xl font-bold">18</p>
                    </div>
                    <BookOpen size={32} className="text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm">Tareas Pendientes</p>
                      <p className="text-2xl font-bold">7</p>
                    </div>
                    <Clock size={32} className="text-orange-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-400 to-pink-500 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Completadas</p>
                      <p className="text-2xl font-bold">23</p>
                    </div>
                    <TrendingUp size={32} className="text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Acciones Rápidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <h2 className="text-xl font-bold text-gray-800">Crear Nueva Lección</h2>
                  <p className="text-gray-600">Añade contenido educativo para tus estudiantes</p>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-blue-500 hover:bg-blue-600"
                  >
                    <Plus size={16} className="mr-2" />
                    Nueva Lección
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <h2 className="text-xl font-bold text-gray-800">Asignar Tarea</h2>
                  <p className="text-gray-600">Crea tareas y asígnalas automáticamente</p>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-green-500 hover:bg-green-600"
                  >
                    <Plus size={16} className="mr-2" />
                    Nueva Tarea
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Resumen de Clases */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-bold text-gray-800">Mis Aulas</h2>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">10°A - Matemáticas</h3>
                      <p className="text-sm text-gray-600">25 estudiantes</p>
                    </div>
                    <Button size="sm">
                      Ver Estudiantes
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">10°B - Historia</h3>
                      <p className="text-sm text-gray-600">28 estudiantes</p>
                    </div>
                    <Button size="sm">
                      Ver Estudiantes
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-xl font-bold text-gray-800">Actividad Reciente</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <BookOpen size={16} className="text-blue-500 mr-3" />
                      <div>
                        <p className="font-semibold text-sm text-gray-800">Álgebra Avanzada</p>
                        <p className="text-xs text-gray-600">
                          Creada el 15 de enero
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center p-3 bg-green-50 rounded-lg">
                      <BookOpen size={16} className="text-green-500 mr-3" />
                      <div>
                        <p className="font-semibold text-sm text-gray-800">Revolución Mexicana</p>
                        <p className="text-xs text-gray-600">
                          Creada el 12 de enero
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case 'calendar':
        return <TeacherCalendar user={user} />;
      case 'chat':
        return <TeacherChat user={user} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-gray-900">IGER Escuela Smart</h1>
              <nav className="flex space-x-4">
                <Button
                  variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('dashboard')}
                  className="flex items-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Dashboard
                </Button>
                <Button
                  variant={activeTab === 'calendar' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('calendar')}
                  className="flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Calendario
                </Button>
                <Button
                  variant={activeTab === 'chat' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('chat')}
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Chat IA
                </Button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Hola, {user.name}</span>
              <Button onClick={logout} variant="outline">
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
};