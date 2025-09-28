import React, { useState } from 'react';
import { Users, BookOpen, Calendar, Plus, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { User, Lesson, Task, Classroom } from '../../types';

interface TeacherDashboardProps {
  user: User;
  lessons: Lesson[];
  tasks: Task[];
  classrooms: Classroom[];
  onViewChange: (view: string) => void;
  onAddLesson: (lesson: Omit<Lesson, 'id' | 'createdAt'>) => void;
  onAddTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ 
  user, 
  lessons, 
  tasks, 
  classrooms,
  onViewChange,
  onAddLesson,
  onAddTask
}) => {
  const [showAddLesson, setShowAddLesson] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);

  const myClassrooms = classrooms.filter(c => c.teacherId === user.id);
  const totalStudents = myClassrooms.reduce((sum, c) => sum + c.students.length, 0);
  const pendingTasks = tasks.filter(t => t.status === 'pending');
  const completedTasks = tasks.filter(t => t.status === 'completed');

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
                <p className="text-2xl font-bold">{totalStudents}</p>
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
              <Clock size={32} className="text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-400 to-pink-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Completadas</p>
                <p className="text-2xl font-bold">{completedTasks.length}</p>
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
              onClick={() => setShowAddLesson(true)}
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
              onClick={() => setShowAddTask(true)}
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
            {myClassrooms.map((classroom) => (
              <div key={classroom.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800">{classroom.name}</h3>
                  <p className="text-sm text-gray-600">{classroom.students.length} estudiantes</p>
                </div>
                <Button size="sm" onClick={() => onViewChange('students')}>
                  Ver Estudiantes
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold text-gray-800">Actividad Reciente</h2>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>

      {/* Modales para crear lección y tarea */}
      {showAddLesson && (
        <CreateLessonModal 
          onClose={() => setShowAddLesson(false)}
          onSave={onAddLesson}
          classrooms={myClassrooms}
          userId={user.id}
        />
      )}

      {showAddTask && (
        <CreateTaskModal 
          onClose={() => setShowAddTask(false)}
          onSave={onAddTask}
          lessons={lessons}
          classrooms={myClassrooms}
          userId={user.id}
        />
      )}
    </div>
  );
};

// Modal para crear lección
interface CreateLessonModalProps {
  onClose: () => void;
  onSave: (lesson: Omit<Lesson, 'id' | 'createdAt'>) => void;
  classrooms: Classroom[];
  userId: string;
}

const CreateLessonModal: React.FC<CreateLessonModalProps> = ({ onClose, onSave, classrooms, userId }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    classroomId: classrooms[0]?.id || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      resources: [],
      createdBy: userId
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h3 className="text-xl font-bold">Nueva Lección</h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Título</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Descripción</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none h-20 resize-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Aula</label>
              <select
                value={formData.classroomId}
                onChange={(e) => setFormData({ ...formData, classroomId: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              >
                {classrooms.map((classroom) => (
                  <option key={classroom.id} value={classroom.id}>
                    {classroom.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex space-x-3">
              <Button type="button" variant="ghost" onClick={onClose} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                Crear Lección
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// Modal para crear tarea
interface CreateTaskModalProps {
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  lessons: Lesson[];
  classrooms: Classroom[];
  userId: string;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ onClose, onSave, lessons, classrooms, userId }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lessonId: lessons[0]?.id || '',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    classroomId: classrooms[0]?.id || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedClassroom = classrooms.find(c => c.id === formData.classroomId);
    onSave({
      title: formData.title,
      description: formData.description,
      lessonId: formData.lessonId,
      dueDate: new Date(formData.dueDate).toISOString(),
      assignedTo: selectedClassroom?.students || [],
      status: 'pending',
      createdBy: userId
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h3 className="text-xl font-bold">Nueva Tarea</h3>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Título</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Descripción</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none h-20 resize-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Lección</label>
              <select
                value={formData.lessonId}
                onChange={(e) => setFormData({ ...formData, lessonId: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              >
                {lessons.map((lesson) => (
                  <option key={lesson.id} value={lesson.id}>
                    {lesson.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Aula</label>
              <select
                value={formData.classroomId}
                onChange={(e) => setFormData({ ...formData, classroomId: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              >
                {classrooms.map((classroom) => (
                  <option key={classroom.id} value={classroom.id}>
                    {classroom.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Fecha de entrega</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex space-x-3">
              <Button type="button" variant="ghost" onClick={onClose} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                Crear Tarea
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};