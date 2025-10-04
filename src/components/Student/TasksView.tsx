import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { User as UserType, Task } from '../../types';

interface TasksViewProps {
  user: UserType;
  tasks: Task[];
  onViewChange: (view: string) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({ user, tasks, onViewChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    if (selectedFilter === 'pending') return task.status === 'pending';
    if (selectedFilter === 'completed') return task.status === 'completed';
    return true;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} />;
      case 'pending': return <AlertCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && selectedFilter === 'pending';
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-4 sm:p-6 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Mis Tareas 📝</h1>
        <p className="text-yellow-100 text-base sm:text-lg">Mantén el control de todas tus tareas y proyectos</p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={selectedFilter === 'all' ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => setSelectedFilter('all')}
        >
          Todas ({tasks.length})
        </Button>
        <Button 
          variant={selectedFilter === 'pending' ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => setSelectedFilter('pending')}
        >
          Pendientes ({tasks.filter(t => t.status === 'pending').length})
        </Button>
        <Button 
          variant={selectedFilter === 'completed' ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => setSelectedFilter('completed')}
        >
          Completadas ({tasks.filter(t => t.status === 'completed').length})
        </Button>
      </div>

      {/* Lista de Tareas */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className={`transition-all ${isOverdue(task.dueDate) ? 'border-red-300 bg-red-50' : ''}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                      {getStatusIcon(task.status)}
                      <span className="capitalize">{task.status}</span>
                    </div>
                    {isOverdue(task.dueDate) && (
                      <span className="text-red-600 text-xs font-medium bg-red-100 px-2 py-1 rounded-full">
                        Vencida
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-bold text-gray-800 mb-2">{task.title}</h3>
                  <p className="text-gray-600 mb-3">{task.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>Entrega: {new Date(task.dueDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen size={14} />
                      <span>Lección: {task.lessonId}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2 ml-4">
                  <Button 
                    size="sm"
                    onClick={() => {
                      if (task.status === 'pending') {
                        alert(`Marcando tarea como completada: ${task.title}`);
                        // Aquí se actualizaría el estado de la tarea
                      } else {
                        alert(`Revisando tarea: ${task.title}`);
                      }
                    }}
                  >
                    {task.status === 'pending' ? 'Completar' : 'Ver Detalles'}
                  </Button>
                  <Button variant="ghost" size="sm">
                    Subir Archivo
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estado vacío */}
      {filteredTasks.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              {selectedFilter === 'all' ? 'No hay tareas asignadas' : 
               selectedFilter === 'pending' ? '¡Excelente! No tienes tareas pendientes' :
               'No has completado tareas aún'}
            </h3>
            <p className="text-gray-500">
              {selectedFilter === 'all' ? 'Las tareas aparecerán aquí cuando te sean asignadas.' :
               selectedFilter === 'pending' ? 'Mantén el buen trabajo.' :
               'Completa algunas tareas para verlas aquí.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
