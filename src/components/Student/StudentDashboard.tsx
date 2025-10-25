import React, { useState } from 'react';
import { BookOpen, Calendar, Trophy, MessageCircle, Clock, Star, Upload, Home } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { User } from '../../types';
import StudentCalendar from './StudentCalendar';
import StudentTaskUpload from './StudentTaskUpload';

interface StudentDashboardProps {
  user: User;
  logout: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, logout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Header de Bienvenida */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-4 sm:p-6 text-white">
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">¡Hola, {user.name}! 👋</h1>
              <p className="text-blue-100 text-base sm:text-lg">¿Listo para aprender algo nuevo hoy?</p>
            </div>

            {/* Estadísticas Principales */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Card className="bg-gradient-to-br from-green-400 to-green-500 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Lecciones</p>
                      <p className="text-2xl font-bold">12</p>
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
                      <p className="text-2xl font-bold">3</p>
                    </div>
                    <Calendar size={32} className="text-orange-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-400 to-pink-500 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Puntos</p>
                      <p className="text-2xl font-bold">450</p>
                    </div>
                    <Star size={32} className="text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-indigo-400 to-blue-500 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Logros</p>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                    <Trophy size={32} className="text-blue-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contenido Principal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Lecciones Recientes */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">Mis Lecciones</h2>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4">
                    <div className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white mr-3 sm:mr-4 flex-shrink-0">
                        <BookOpen size={16} className="sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800">Matemáticas - Álgebra</h3>
                        <p className="text-sm text-gray-600">Ecuaciones cuadráticas y factorización</p>
                      </div>
                      <Button size="sm">
                        Ver
                      </Button>
                    </div>
                    <div className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-xl flex items-center justify-center text-white mr-3 sm:mr-4 flex-shrink-0">
                        <BookOpen size={16} className="sm:w-5 sm:h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-800">Historia - Revolución Mexicana</h3>
                        <p className="text-sm text-gray-600">Causas y consecuencias del movimiento</p>
                      </div>
                      <Button size="sm">
                        Ver
                      </Button>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="w-full"
                    >
                      Ver todas las lecciones →
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Panel Lateral */}
              <div className="space-y-4 sm:space-y-6">
                {/* Tareas Próximas */}
                <Card>
                  <CardHeader>
                    <h3 className="text-base sm:text-lg font-bold text-gray-800">Tareas Próximas</h3>
                  </CardHeader>
                  <CardContent className="space-y-2 sm:space-y-3">
                    <div className="flex items-center p-2 sm:p-3 bg-yellow-50 rounded-lg">
                      <Clock size={14} className="text-orange-500 mr-2 sm:mr-3 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-xs sm:text-sm text-gray-800 truncate">Proyecto de Ciencias</p>
                        <p className="text-xs text-gray-600">25 de enero</p>
                      </div>
                    </div>
                    <div className="flex items-center p-2 sm:p-3 bg-yellow-50 rounded-lg">
                      <Clock size={14} className="text-orange-500 mr-2 sm:mr-3 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-xs sm:text-sm text-gray-800 truncate">Ensayo de Historia</p>
                        <p className="text-xs text-gray-600">20 de enero</p>
                      </div>
                    </div>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="w-full text-xs sm:text-sm"
                      onClick={() => setActiveTab('tasks')}
                    >
                      Ver todas
                    </Button>
                  </CardContent>
                </Card>

                {/* Tutor IA */}
                <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                  <CardContent className="p-3 sm:p-4 text-center">
                    <MessageCircle size={32} className="sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-purple-100" />
                    <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base">¿Tienes preguntas?</h3>
                    <p className="text-xs sm:text-sm text-purple-100 mb-3 sm:mb-4">
                      Pregúntale a tu tutor IA, está aquí para ayudarte
                    </p>
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="text-white border-white hover:bg-white hover:text-purple-600 text-xs sm:text-sm"
                    >
                      Chatear ahora
                    </Button>
                  </CardContent>
                </Card>

                {/* Logros Recientes */}
                <Card>
                  <CardHeader>
                    <h3 className="text-base sm:text-lg font-bold text-gray-800">Logros Recientes</h3>
                  </CardHeader>
                  <CardContent className="space-y-2 sm:space-y-3">
                    <div className="flex items-center p-2 sm:p-3 bg-green-50 rounded-lg">
                      <Trophy size={16} className="text-yellow-500 mr-2 sm:mr-3 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-xs sm:text-sm text-gray-800 truncate">Primera Tarea Completada</p>
                        <p className="text-xs text-gray-600">50 puntos</p>
                      </div>
                    </div>
                    <div className="flex items-center p-2 sm:p-3 bg-green-50 rounded-lg">
                      <Trophy size={16} className="text-yellow-500 mr-2 sm:mr-3 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-xs sm:text-sm text-gray-800 truncate">Estudiante Constante</p>
                        <p className="text-xs text-gray-600">100 puntos</p>
                      </div>
                    </div>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="w-full text-xs sm:text-sm"
                    >
                      Ver todos
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        );
      case 'tasks':
        return <StudentTaskUpload user={user} />;
      case 'calendar':
        return <StudentCalendar user={user} />;
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
                  variant={activeTab === 'tasks' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('tasks')}
                  className="flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Mis Tareas
                </Button>
                <Button
                  variant={activeTab === 'calendar' ? 'default' : 'ghost'}
                  onClick={() => setActiveTab('calendar')}
                  className="flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Mi Calendario
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