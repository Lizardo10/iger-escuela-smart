import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Users, Plus, Calendar, Clock, BookOpen, Edit, Trash2, UserPlus } from 'lucide-react';
import { Classroom, User, Grade, ScheduleItem } from '../../types';

interface ClassroomManagementProps {
  onClassroomSelect?: (classroom: Classroom) => void;
}

export const ClassroomManagement: React.FC<ClassroomManagementProps> = ({ onClassroomSelect }) => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [teachers, setTeachers] = useState<User[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);
  const [newClassroom, setNewClassroom] = useState({
    name: '',
    teacherId: '',
    gradeId: '',
    schedule: [] as ScheduleItem[]
  });

  // Datos simulados
  useEffect(() => {
    const mockTeachers: User[] = [
      {
        id: 'teacher-1',
        name: 'Prof. Ana Martínez',
        email: 'ana.martinez@iger.edu',
        role: 'maestro',
        avatar: 'avatar-2',
        phone: '+502 9876-5432',
        isActive: true,
        createdAt: '2024-01-10T09:00:00Z',
        updatedAt: '2024-01-10T09:00:00Z'
      },
      {
        id: 'teacher-2',
        name: 'Prof. Carlos López',
        email: 'carlos.lopez@iger.edu',
        role: 'maestro',
        avatar: 'avatar-3',
        phone: '+502 5555-1234',
        isActive: true,
        createdAt: '2024-01-12T10:00:00Z',
        updatedAt: '2024-01-12T10:00:00Z'
      }
    ];

    const mockGrades: Grade[] = [
      { id: 'grado-1', name: 'Primer Grado', level: 1, description: 'Primer año de básico', maxStudents: 25, createdAt: '2024-01-01T00:00:00Z' },
      { id: 'grado-2', name: 'Segundo Grado', level: 2, description: 'Segundo año de básico', maxStudents: 25, createdAt: '2024-01-01T00:00:00Z' },
      { id: 'grado-3', name: 'Tercer Grado', level: 3, description: 'Tercer año de básico', maxStudents: 25, createdAt: '2024-01-01T00:00:00Z' }
    ];

    const mockClassrooms: Classroom[] = [
      {
        id: 'aula-1a',
        name: 'Aula 1A - Primer Grado',
        teacherId: 'teacher-1',
        students: ['student-1', 'student-2', 'student-3'],
        schedule: [
          { day: 'Lunes', startTime: '08:00', endTime: '09:00', subject: 'Matemáticas' },
          { day: 'Lunes', startTime: '09:00', endTime: '10:00', subject: 'Lenguaje' },
          { day: 'Martes', startTime: '08:00', endTime: '09:00', subject: 'Ciencias' },
          { day: 'Miércoles', startTime: '08:00', endTime: '09:00', subject: 'Matemáticas' },
          { day: 'Jueves', startTime: '08:00', endTime: '09:00', subject: 'Lenguaje' },
          { day: 'Viernes', startTime: '08:00', endTime: '09:00', subject: 'Arte' }
        ],
        createdAt: '2024-01-15T10:00:00Z'
      },
      {
        id: 'aula-2b',
        name: 'Aula 2B - Segundo Grado',
        teacherId: 'teacher-2',
        students: ['student-4', 'student-5'],
        schedule: [
          { day: 'Lunes', startTime: '10:00', endTime: '11:00', subject: 'Matemáticas' },
          { day: 'Lunes', startTime: '11:00', endTime: '12:00', subject: 'Lenguaje' },
          { day: 'Martes', startTime: '10:00', endTime: '11:00', subject: 'Ciencias' },
          { day: 'Miércoles', startTime: '10:00', endTime: '11:00', subject: 'Matemáticas' },
          { day: 'Jueves', startTime: '10:00', endTime: '11:00', subject: 'Lenguaje' },
          { day: 'Viernes', startTime: '10:00', endTime: '11:00', subject: 'Educación Física' }
        ],
        createdAt: '2024-01-20T14:30:00Z'
      }
    ];

    setTeachers(mockTeachers);
    setGrades(mockGrades);
    setClassrooms(mockClassrooms);
  }, []);

  const handleCreateClassroom = () => {
    if (!newClassroom.name || !newClassroom.teacherId || !newClassroom.gradeId) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    const classroom: Classroom = {
      id: `aula-${Date.now()}`,
      name: newClassroom.name,
      teacherId: newClassroom.teacherId,
      students: [],
      schedule: newClassroom.schedule,
      createdAt: new Date().toISOString()
    };

    setClassrooms(prev => [...prev, classroom]);
    setNewClassroom({ name: '', teacherId: '', gradeId: '', schedule: [] });
    setShowCreateForm(false);
  };

  const handleDeleteClassroom = (classroomId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta aula?')) {
      setClassrooms(prev => prev.filter(c => c.id !== classroomId));
    }
  };

  const addScheduleItem = () => {
    setNewClassroom(prev => ({
      ...prev,
      schedule: [...prev.schedule, { day: 'Lunes', startTime: '08:00', endTime: '09:00', subject: '' }]
    }));
  };

  const updateScheduleItem = (index: number, field: keyof ScheduleItem, value: string) => {
    setNewClassroom(prev => ({
      ...prev,
      schedule: prev.schedule.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeScheduleItem = (index: number) => {
    setNewClassroom(prev => ({
      ...prev,
      schedule: prev.schedule.filter((_, i) => i !== index)
    }));
  };

  const getTeacherName = (teacherId: string) => {
    return teachers.find(t => t.id === teacherId)?.name || 'Sin asignar';
  };

  const getGradeName = (classroom: Classroom) => {
    // En un sistema real, esto vendría de la relación classroom-grade
    return classroom.name.includes('Primer') ? 'Primer Grado' : 
           classroom.name.includes('Segundo') ? 'Segundo Grado' : 'Tercer Grado';
  };

  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  const subjects = ['Matemáticas', 'Lenguaje', 'Ciencias', 'Arte', 'Educación Física', 'Historia', 'Geografía'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Gestión de Aulas</h2>
          <p className="text-gray-600 mt-1">Administra las aulas y sus horarios</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2"
        >
          <Plus size={20} />
          Nueva Aula
        </Button>
      </div>

      {/* Lista de Aulas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {classrooms.map(classroom => (
          <Card key={classroom.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{classroom.name}</h3>
                  <p className="text-gray-600">{getGradeName(classroom)}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedClassroom(classroom)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteClassroom(classroom.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users size={16} />
                  <span>{classroom.students.length} estudiantes</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <BookOpen size={16} />
                  <span>Profesor: {getTeacherName(classroom.teacherId)}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={16} />
                  <span>Creada: {new Date(classroom.createdAt).toLocaleDateString()}</span>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Horario:</h4>
                  <div className="space-y-1">
                    {classroom.schedule.slice(0, 3).map((item, index) => (
                      <div key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <Clock size={14} />
                        <span>{item.day} {item.startTime}-{item.endTime}: {item.subject}</span>
                      </div>
                    ))}
                    {classroom.schedule.length > 3 && (
                      <p className="text-sm text-gray-500">+{classroom.schedule.length - 3} clases más...</p>
                    )}
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  onClick={() => onClassroomSelect?.(classroom)}
                >
                  Ver Detalles
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Crear Aula */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Crear Nueva Aula</h3>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cerrar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Aula *
                    </label>
                    <input
                      type="text"
                      value={newClassroom.name}
                      onChange={(e) => setNewClassroom(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ej: Aula 1A - Primer Grado"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profesor Asignado *
                    </label>
                    <select
                      value={newClassroom.teacherId}
                      onChange={(e) => setNewClassroom(prev => ({ ...prev, teacherId: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Seleccionar profesor</option>
                      {teachers.map(teacher => (
                        <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grado *
                  </label>
                  <select
                    value={newClassroom.gradeId}
                    onChange={(e) => setNewClassroom(prev => ({ ...prev, gradeId: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar grado</option>
                    {grades.map(grade => (
                      <option key={grade.id} value={grade.id}>{grade.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium text-gray-700">Horario de Clases</h4>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={addScheduleItem}
                      className="flex items-center gap-2"
                    >
                      <Plus size={16} />
                      Agregar Clase
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {newClassroom.schedule.map((item, index) => (
                      <div key={index} className="grid grid-cols-4 gap-2 p-3 border border-gray-200 rounded-lg">
                        <select
                          value={item.day}
                          onChange={(e) => updateScheduleItem(index, 'day', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {days.map(day => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </select>

                        <input
                          type="time"
                          value={item.startTime}
                          onChange={(e) => updateScheduleItem(index, 'startTime', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />

                        <input
                          type="time"
                          value={item.endTime}
                          onChange={(e) => updateScheduleItem(index, 'endTime', e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />

                        <div className="flex gap-1">
                          <select
                            value={item.subject}
                            onChange={(e) => updateScheduleItem(index, 'subject', e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Materia</option>
                            {subjects.map(subject => (
                              <option key={subject} value={subject}>{subject}</option>
                            ))}
                          </select>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeScheduleItem(index)}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleCreateClassroom} className="flex-1">
                    Crear Aula
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de Detalles del Aula */}
      {selectedClassroom && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Detalles del Aula: {selectedClassroom.name}</h3>
                <Button variant="outline" onClick={() => setSelectedClassroom(null)}>
                  Cerrar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Información General</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Profesor</label>
                      <p className="text-gray-800">{getTeacherName(selectedClassroom.teacherId)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Estudiantes</label>
                      <p className="text-gray-800">{selectedClassroom.students.length} estudiantes</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Fecha de Creación</label>
                      <p className="text-gray-800">{new Date(selectedClassroom.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Horario Completo</h4>
                  <div className="space-y-2">
                    {selectedClassroom.schedule.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <span className="font-medium text-gray-800">{item.day}</span>
                          <span className="text-gray-600 ml-2">{item.startTime} - {item.endTime}</span>
                        </div>
                        <span className="text-blue-600 font-medium">{item.subject}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
