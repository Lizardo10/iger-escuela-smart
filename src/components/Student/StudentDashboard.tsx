import React from 'react';
import { BookOpen, Calendar, Trophy, MessageCircle, Clock, Star } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { User, Lesson, Task, Achievement } from '../../types';

interface StudentDashboardProps {
  user: User;
  lessons: Lesson[];
  tasks: Task[];
  achievements: Achievement[];
  onViewChange: (view: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ 
  user, 
  lessons, 
  tasks, 
  achievements, 
  onViewChange 
}) => {
  const completedAchievements = achievements.filter(a => a.unlockedAt);
  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const totalPoints = completedAchievements.reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header de Bienvenida */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">¡Hola, {user.name}! 👋</h1>
        <p className="text-blue-100 text-lg">¿Listo para aprender algo nuevo hoy?</p>
      </div>

      {/* Estadísticas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-400 to-green-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Lecciones</p>
                <p className="text-2xl font-bold">{lessons.length}</p>
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
                <p className="text-2xl font-bold">{pendingTasks.length}</p>
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
                <p className="text-2xl font-bold">{totalPoints}</p>
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
                <p className="text-2xl font-bold">{completedAchievements.length}</p>
              </div>
              <Trophy size={32} className="text-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contenido Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lecciones Recientes */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold text-gray-800">Mis Lecciones</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              {lessons.slice(0, 3).map((lesson) => (
                <div key={lesson.id} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white mr-4">
                    <BookOpen size={20} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{lesson.title}</h3>
                    <p className="text-sm text-gray-600">{lesson.description}</p>
                  </div>
                  <Button size="sm" onClick={() => onViewChange('lessons')}>
                    Ver
                  </Button>
                </div>
              ))}
              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => onViewChange('lessons')}
              >
                Ver todas las lecciones →
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Panel Lateral */}
        <div className="space-y-6">
          {/* Tareas Próximas */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold text-gray-800">Tareas Próximas</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingTasks.slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-center p-3 bg-yellow-50 rounded-lg">
                  <Clock size={16} className="text-orange-500 mr-3" />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-800">{task.title}</p>
                    <p className="text-xs text-gray-600">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              <Button 
                variant="secondary" 
                size="sm" 
                className="w-full"
                onClick={() => onViewChange('tasks')}
              >
                Ver todas
              </Button>
            </CardContent>
          </Card>

          {/* Tutor IA */}
          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <CardContent className="p-4 text-center">
              <MessageCircle size={48} className="mx-auto mb-3 text-purple-100" />
              <h3 className="font-bold mb-2">¿Tienes preguntas?</h3>
              <p className="text-sm text-purple-100 mb-4">
                Pregúntale a tu tutor IA, está aquí para ayudarte
              </p>
              <Button 
                variant="ghost"
                className="text-white border-white hover:bg-white hover:text-purple-600"
                onClick={() => onViewChange('chat')}
              >
                Chatear ahora
              </Button>
            </CardContent>
          </Card>

          {/* Logros Recientes */}
          {completedAchievements.length > 0 && (
            <Card>
              <CardHeader>
                <h3 className="text-lg font-bold text-gray-800">Logros Recientes</h3>
              </CardHeader>
              <CardContent>
                {completedAchievements.slice(0, 2).map((achievement) => (
                  <div key={achievement.id} className="flex items-center p-3 bg-green-50 rounded-lg mb-3">
                    <Trophy size={20} className="text-yellow-500 mr-3" />
                    <div>
                      <p className="font-semibold text-sm text-gray-800">{achievement.title}</p>
                      <p className="text-xs text-gray-600">{achievement.points} puntos</p>
                    </div>
                  </div>
                ))}
                <Button 
                  variant="secondary" 
                  size="sm" 
                  className="w-full"
                  onClick={() => onViewChange('achievements')}
                >
                  Ver todos
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};