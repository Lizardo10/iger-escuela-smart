import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';
import { apiService } from '../../services/apiService';

interface CreateTaskModalProps {
  onClose: () => void;
  onSuccess: () => void;
  teacherId: string;
  classrooms: any[];
  lessons: any[];
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ 
  onClose, 
  onSuccess, 
  teacherId, 
  classrooms,
  lessons 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lessonId: lessons[0]?.id || '',
    classroomId: classrooms[0]?.id || '',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    subject: '',
    grade: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const taskData = {
        ...formData,
        teacherId,
        status: 'pending',
        createdAt: new Date().toISOString(),
        dueDate: new Date(formData.dueDate).toISOString()
      };

      const response = await apiService.createTask(taskData);
      
      if (response.data) {
        onSuccess();
        onClose();
      } else {
        alert('Error al crear la tarea: ' + (response.error || 'Error desconocido'));
      }
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Error al crear la tarea');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold">Nueva Tarea</h3>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Título</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                required
                placeholder="Ej: Ejercicios de Álgebra"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Materia</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                required
                placeholder="Ej: Matemáticas"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Grado</label>
              <input
                type="text"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                required
                placeholder="Ej: 10°A"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Descripción</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none h-20 resize-none"
                required
                placeholder="Descripción detallada de la tarea..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold mb-2">Lección Relacionada</label>
              <select
                value={formData.lessonId}
                onChange={(e) => setFormData({ ...formData, lessonId: e.target.value })}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                required
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
                required
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
            
            <div className="flex space-x-3 pt-4">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={onClose} 
                className="flex-1"
                disabled={loading}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="flex-1"
                disabled={loading}
              >
                {loading ? 'Creando...' : 'Crear Tarea'}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default CreateTaskModal;
