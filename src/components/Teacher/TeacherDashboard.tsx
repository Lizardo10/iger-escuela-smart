import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Logo } from '../ui/Logo';
import { User } from '../../types';
import { TeacherCalendar } from './TeacherCalendar';
import { TeacherChat } from './TeacherChat';
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
  User as UserIcon,
  GraduationCap,
  Plus
} from 'lucide-react';

interface TeacherDashboardProps {
  user: User;
  onLogout: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showUserMenu, setShowUserMenu] = useState(false);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Header de Bienvenida */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">¡Hola, {user.name}! 👩‍🏫</h1>
        <p className="text-green-100 text-lg">Panel de control para gestionar tus clases</p>
      </div>

      {/* Estadísticas Principales */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
                <p className="text-green-100 text-sm">Clases Programadas</p>
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
                <p className="text-orange-100 text-sm">Tareas Creadas</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Target size={32} className="text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-400 to-pink-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Promedio General</p>
                <p className="text-2xl font-bold">87%</p>
              </div>
              <TrendingUp size={32} className="text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Acciones Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" />
              Calendario de Clases
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Organiza tus clases y actividades académicas</p>
            <Button 
              onClick={() => setActiveTab('calendar')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Ver Calendario
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-green-500" />
              Chat IA Pedagógico
            </h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Tu asistente especializado en educación</p>
            <Button 
              onClick={() => setActiveTab('chat')}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              Chatear con ProfeIA
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Gestión de Estudiantes */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold flex items-center">
            <Users className="w-5 h-5 mr-2 text-purple-500" />
            Gestión de Estudiantes
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">📚 Matemáticas</h4>
              <p className="text-sm text-blue-700">15 estudiantes</p>
              <p className="text-xs text-blue-600">Promedio: 85%</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">🔬 Ciencias</h4>
              <p className="text-sm text-green-700">18 estudiantes</p>
              <p className="text-xs text-green-600">Promedio: 88%</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">📖 Historia</h4>
              <p className="text-sm text-purple-700">12 estudiantes</p>
              <p className="text-xs text-purple-600">Promedio: 82%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chat IA */}
      <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
        <CardContent className="p-6 text-center">
          <GraduationCap size={48} className="mx-auto mb-4 text-purple-100" />
          <h3 className="font-bold mb-2 text-xl">ProfeIA - Tu Asistente Pedagógico</h3>
          <p className="text-purple-100 mb-4">
            Especializado en estrategias pedagógicas, evaluación y gestión del aula
          </p>
          <Button 
            variant="ghost"
            className="text-white border-white hover:bg-white hover:text-purple-600"
            onClick={() => setActiveTab('chat')}
          >
            Iniciar Conversación
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const renderStudents = () => (
    <div className="text-center py-12">
      <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-600">Gestión de Estudiantes</h3>
      <p className="text-gray-500">Próximamente disponible</p>
    </div>
  );

  const renderTasks = () => (
    <div className="text-center py-12">
      <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-gray-600">Crear Tareas</h3>
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
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
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
                      <p className="text-xs text-green-600 font-medium">Maestro</p>
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
              { id: 'students', label: '👥 Estudiantes', icon: Users },
              { id: 'tasks', label: '📝 Tareas', icon: Target },
              { id: 'calendar', label: '📅 Calendario', icon: Calendar },
              { id: 'chat', label: '💬 Chat IA', icon: MessageCircle }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
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
        {activeTab === 'students' && renderStudents()}
        {activeTab === 'tasks' && renderTasks()}
        {activeTab === 'calendar' && <TeacherCalendar user={user} />}
        {activeTab === 'chat' && <TeacherChat user={user} />}
      </div>
    </div>
  );
};