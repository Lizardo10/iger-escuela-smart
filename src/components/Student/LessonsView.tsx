import React from 'react';
import { BookOpen, Clock, User, Play } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { User as UserType, Lesson } from '../../types';

interface LessonsViewProps {
  user: UserType;
  lessons: Lesson[];
  onViewChange: (view: string) => void;
}

export const LessonsView: React.FC<LessonsViewProps> = ({ user, lessons, onViewChange }) => {
  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-4 sm:p-6 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Mis Lecciones 📚</h1>
        <p className="text-blue-100 text-base sm:text-lg">Explora todo el contenido educativo disponible</p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" size="sm">Todas</Button>
        <Button variant="ghost" size="sm">En Progreso</Button>
        <Button variant="ghost" size="sm">Completadas</Button>
        <Button variant="ghost" size="sm">Nuevas</Button>
      </div>

      {/* Lista de Lecciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {lessons.map((lesson) => (
          <Card key={lesson.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{lesson.title}</h3>
                  <p className="text-sm text-gray-600">Por {lesson.createdBy}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 line-clamp-3">{lesson.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>45 min</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User size={14} />
                  <span>Nivel: Intermedio</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full" onClick={() => {
                  // Simular inicio de lección
                  alert(`Iniciando lección: ${lesson.title}`);
                }}>
                  <Play size={16} className="mr-2" />
                  Comenzar Lección
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  Ver Detalles
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estado vacío */}
      {lessons.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-600 mb-2">No hay lecciones disponibles</h3>
            <p className="text-gray-500">Las lecciones aparecerán aquí cuando estén disponibles.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
