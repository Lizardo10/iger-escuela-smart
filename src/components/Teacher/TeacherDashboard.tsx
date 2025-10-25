import React, { useState, useEffect } from 'react';
import { Users, BookOpen, Calendar, Plus, TrendingUp, Clock, Home, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { User } from '../../types';
import TeacherCalendar from './TeacherCalendar';
import TeacherChat from './TeacherChat';
import CreateLessonModal from './CreateLessonModal';
import CreateTaskModal from './CreateTaskModal';
import { apiService } from '../../services/apiService';

interface TeacherDashboardProps {
  user: User;
  logout: () => void;
}

interface DashboardStats {
  totalStudents: number;
  totalLessons: number;
  pendingTasks: number;
  completedTasks: number;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user, logout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalLessons: 0,
    pendingTasks: 0,
    completedTasks: 0
  });
  const [lessons, setLessons] = useState<any[]>([]);
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateLesson, setShowCreateLesson] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Cargar estadísticas del dashboard
      const statsResponse = await apiService.getDashboardStats(user.id, 'maestro');
      if (statsResponse.data) {
        setStats(statsResponse.data);
      }

      // Cargar lecciones del maestro
      const lessonsResponse = await apiService.getLessons({ teacherId: user.id });
      if (lessonsResponse.data) {
        setLessons(lessonsResponse.data);
      }

      // Cargar aulas del maestro
      const classroomsResponse = await apiService.getClassrooms();
      if (classroomsResponse.data) {
        setClassrooms(classroomsResponse.data);
      }
    } catch (error) {
      console.error('Error cargando datos del dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLesson = async () => {
    setShowCreateLesson(true);
  };

  const handleCreateTask = async () => {
    setShowCreateTask(true);
  };

  const handleLessonCreated = () => {
    loadDashboardData(); // Recargar datos
  };

  const handleTaskCreated = () => {
    loadDashboardData(); // Recargar datos
  };

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
                      <p className="text-2xl font-bold">
                        {loading ? '...' : stats.totalStudents}
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
                      <p className="text-green-100 text-sm">Lecciones</p>
                      <p className="text-2xl font-bold">
                        {loading ? '...' : stats.totalLessons}
                      </p>
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
                      <p className="text-2xl font-bold">
                        {loading ? '...' : stats.pendingTasks}
                      </p>
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
                      <p className="text-2xl font-bold">
                        {loading ? '...' : stats.completedTasks}
                      </p>
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
                    onClick={handleCreateLesson}
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
                    onClick={handleCreateTask}
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
                  {loading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                      <p className="text-gray-600 mt-2">Cargando aulas...</p>
                    </div>
                  ) : classrooms.length > 0 ? (
                    classrooms.map((classroom) => (
                      <div key={classroom.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-800">{classroom.name}</h3>
                          <p className="text-sm text-gray-600">{classroom.studentCount || 0} estudiantes</p>
                        </div>
                        <Button size="sm">
                          Ver Estudiantes
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-600">No tienes aulas asignadas</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h2 className="text-xl font-bold text-gray-800">Actividad Reciente</h2>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
                      <p className="text-gray-600 mt-2">Cargando actividad...</p>
                    </div>
                  ) : lessons.length > 0 ? (
                    <div className="space-y-3">
                      {lessons.slice(0, 4).map((lesson) => (
                        <div key={lesson.id} className="flex items-center p-3 bg-blue-50 rounded-lg">
                          <BookOpen size={16} className="text-blue-500 mr-3" />
                          <div>
                            <p className="font-semibold text-sm text-gray-800">{lesson.title}</p>
                            <p className="text-xs text-gray-600">
                              Creada el {new Date(lesson.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-600">No hay actividad reciente</p>
                    </div>
                  )}
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

      {/* Modals */}
      {showCreateLesson && (
        <CreateLessonModal
          onClose={() => setShowCreateLesson(false)}
          onSuccess={handleLessonCreated}
          teacherId={user.id}
          classrooms={classrooms}
        />
      )}

      {showCreateTask && (
        <CreateTaskModal
          onClose={() => setShowCreateTask(false)}
          onSuccess={handleTaskCreated}
          teacherId={user.id}
          classrooms={classrooms}
          lessons={lessons}
        />
      )}
    </div>
  );
};