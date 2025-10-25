import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Logo } from '../ui/Logo';
import { User } from '../../types';
import { StudentCalendar } from './StudentCalendar';
import { StudentTaskUpload } from './StudentTaskUpload';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  BarChart3,
  Trophy,
  Target,
  Clock,
  CheckCircle,
  TrendingUp,
  Award,
  Star,
  MessageCircle,
  Upload,
  FileText,
  Bell,
  LogOut,
  User as UserIcon
} from 'lucide-react';

interface StudentDashboardProps {
  user: User;
  onLogout: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Header de Bienvenida */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">¡Hola, {user.name}! 👋</h1>
        <p className="text-blue-100 text-lg">¿Listo para aprender algo nuevo hoy?</p>
      </div>

      {/* Estadísticas Principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-400 to-green-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Tareas Asignadas</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <BookOpen size={32} className="text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Tareas Enviadas</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <Upload size={32} className="text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-400 to-pink-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Calificadas</p>
                <p className="text-2xl font-bold">1</p>
              </div>
              <CheckCircle size={32} className="text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-400 to-blue-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Promedio</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
              <TrendingUp size={32} className="text-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acciones Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold flex items-center">
              <Upload className="w-5 h-5 mr-2 text-blue-500" />
              Enviar Tarea
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Envía tus tareas asignadas por los maestros</p>
            <Button 
              onClick={() => setActiveTab('tasks')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Ver Mis Tareas
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-green-500" />
              Mi Calendario
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Organiza tus clases y actividades</p>
            <Button 
              onClick={() => setActiveTab('calendar')}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Ver Calendario
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Tutor IA */}
      <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
        <CardContent className="p-6 text-center">
          <MessageCircle size={48} className="mx-auto mb-4 text-purple-100" />
          <h3 className="font-bold mb-2 text-xl">¿Tienes preguntas?</h3>
          <p className="text-purple-100 mb-4">
            Pregúntale a tu tutor IA, está aquí para ayudarte con tus estudios
          </p>
          <Button 
            variant="ghost"
            className="text-white border-white hover:bg-white hover:text-purple-600"
            onClick={() => setActiveTab('chat')}
          >
            Chatear con Tutor IA
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderChat = () => (
    <div className="text-center py-12">
      <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-600">Chat IA para Estudiantes</h3>
      <p className="text-gray-500">Próximamente disponible</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Logo size="sm" />
              <h1 className="ml-3 text-xl font-semibold text-gray-900">IGER Escuela Smart</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  <UserIcon className="w-4 h-4 text-gray-500" />
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-1 z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <p className="text-xs text-blue-600 font-medium">Estudiante</p>
                    </div>
                    <button
                      onClick={onLogout}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: '📊 Resumen', icon: BarChart3 },
              { id: 'tasks', label: '📝 Mis Tareas', icon: Upload },
              { id: 'calendar', label: '📅 Mi Calendario', icon: Calendar },
              { id: 'chat', label: '💬 Chat IA', icon: MessageCircle }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'tasks' && <StudentTaskUpload user={user} />}
        {activeTab === 'calendar' && <StudentCalendar user={user} />}
        {activeTab === 'chat' && renderChat()}
      </div>
    </div>
  );
};