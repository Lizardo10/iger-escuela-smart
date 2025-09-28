import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { GraduationCap, Plus, Edit, Trash2, Calendar, Users, BookOpen, Eye } from 'lucide-react';
import { Grade, AcademicYear, User, Classroom } from '../../types';

interface GradeManagementProps {
  onGradeSelect?: (grade: Grade) => void;
}

export const GradeManagement: React.FC<GradeManagementProps> = ({ onGradeSelect }) => {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [showCreateGradeForm, setShowCreateGradeForm] = useState(false);
  const [showCreateYearForm, setShowCreateYearForm] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
  const [selectedYear, setSelectedYear] = useState<AcademicYear | null>(null);
  const [newGrade, setNewGrade] = useState({
    name: '',
    level: 1,
    description: '',
    maxStudents: 25
  });
  const [newYear, setNewYear] = useState({
    name: '',
    startDate: '',
    endDate: '',
    isActive: false
  });

  // Datos simulados
  useEffect(() => {
    const mockGrades: Grade[] = [
      {
        id: 'grado-1',
        name: 'Primer Grado',
        level: 1,
        description: 'Primer año de educación básica',
        maxStudents: 25,
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'grado-2',
        name: 'Segundo Grado',
        level: 2,
        description: 'Segundo año de educación básica',
        maxStudents: 25,
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'grado-3',
        name: 'Tercer Grado',
        level: 3,
        description: 'Tercer año de educación básica',
        maxStudents: 25,
        createdAt: '2024-01-01T00:00:00Z'
      }
    ];

    const mockAcademicYears: AcademicYear[] = [
      {
        id: 'year-2024',
        name: 'Año Académico 2024',
        startDate: '2024-01-15',
        endDate: '2024-11-30',
        isActive: true,
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'year-2023',
        name: 'Año Académico 2023',
        startDate: '2023-01-15',
        endDate: '2023-11-30',
        isActive: false,
        createdAt: '2023-01-01T00:00:00Z'
      }
    ];

    const mockStudents: User[] = [
      {
        id: 'student-1',
        name: 'María García López',
        email: 'maria.garcia@iger.edu',
        role: 'estudiante',
        gradeId: 'grado-1',
        avatar: 'avatar-1',
        parentConsent: true,
        parentEmail: 'padre.garcia@email.com',
        parentPhone: '+502 1234-5678',
        birthDate: '2018-05-15',
        isActive: true,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
      },
      {
        id: 'student-2',
        name: 'Carlos López Pérez',
        email: 'carlos.lopez@iger.edu',
        role: 'estudiante',
        gradeId: 'grado-2',
        avatar: 'avatar-2',
        parentConsent: true,
        parentEmail: 'madre.lopez@email.com',
        parentPhone: '+502 5555-1234',
        birthDate: '2017-08-22',
        isActive: true,
        createdAt: '2024-01-20T14:30:00Z',
        updatedAt: '2024-01-20T14:30:00Z'
      }
    ];

    const mockClassrooms: Classroom[] = [
      {
        id: 'aula-1a',
        name: 'Aula 1A - Primer Grado',
        teacherId: 'teacher-1',
        students: ['student-1'],
        schedule: [],
        createdAt: '2024-01-15T10:00:00Z'
      },
      {
        id: 'aula-2b',
        name: 'Aula 2B - Segundo Grado',
        teacherId: 'teacher-2',
        students: ['student-2'],
        schedule: [],
        createdAt: '2024-01-20T14:30:00Z'
      }
    ];

    setGrades(mockGrades);
    setAcademicYears(mockAcademicYears);
    setStudents(mockStudents);
    setClassrooms(mockClassrooms);
  }, []);

  const handleCreateGrade = () => {
    if (!newGrade.name || !newGrade.description) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    const grade: Grade = {
      id: `grado-${Date.now()}`,
      name: newGrade.name,
      level: newGrade.level,
      description: newGrade.description,
      maxStudents: newGrade.maxStudents,
      createdAt: new Date().toISOString()
    };

    setGrades(prev => [...prev, grade]);
    setNewGrade({ name: '', level: 1, description: '', maxStudents: 25 });
    setShowCreateGradeForm(false);
  };

  const handleCreateYear = () => {
    if (!newYear.name || !newYear.startDate || !newYear.endDate) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    const year: AcademicYear = {
      id: `year-${Date.now()}`,
      name: newYear.name,
      startDate: newYear.startDate,
      endDate: newYear.endDate,
      isActive: newYear.isActive,
      createdAt: new Date().toISOString()
    };

    setAcademicYears(prev => [...prev, year]);
    setNewYear({ name: '', startDate: '', endDate: '', isActive: false });
    setShowCreateYearForm(false);
  };

  const handleDeleteGrade = (gradeId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este grado?')) {
      setGrades(prev => prev.filter(grade => grade.id !== gradeId));
    }
  };

  const handleDeleteYear = (yearId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este año académico?')) {
      setAcademicYears(prev => prev.filter(year => year.id !== yearId));
    }
  };

  const toggleYearStatus = (yearId: string) => {
    setAcademicYears(prev => prev.map(year => 
      year.id === yearId 
        ? { ...year, isActive: !year.isActive }
        : { ...year, isActive: false } // Solo un año puede estar activo
    ));
  };

  const getStudentsInGrade = (gradeId: string) => {
    return students.filter(student => student.gradeId === gradeId);
  };

  const getClassroomsInGrade = (gradeId: string) => {
    return classrooms.filter(classroom => 
      classroom.name.toLowerCase().includes(gradeId.split('-')[1])
    );
  };

  const getGradeColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-green-500';
      case 2: return 'bg-blue-500';
      case 3: return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Gestión de Grados y Años Académicos</h2>
          <p className="text-gray-600 mt-1">Administra los grados escolares y períodos académicos</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowCreateYearForm(true)}
            className="flex items-center gap-2"
          >
            <Calendar size={20} />
            Nuevo Año
          </Button>
          <Button 
            onClick={() => setShowCreateGradeForm(true)}
            className="flex items-center gap-2"
          >
            <Plus size={20} />
            Nuevo Grado
          </Button>
        </div>
      </div>

      {/* Años Académicos */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Años Académicos</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {academicYears.map(year => (
              <Card key={year.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-800">{year.name}</h4>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                        year.isActive 
                          ? 'bg-green-100 text-green-800 border-green-200' 
                          : 'bg-gray-100 text-gray-800 border-gray-200'
                      }`}>
                        {year.isActive ? 'Activo' : 'Inactivo'}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedYear(year)}
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleYearStatus(year.id)}
                      >
                        {year.isActive ? 'Desactivar' : 'Activar'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteYear(year.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>Inicio: {new Date(year.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>Fin: {new Date(year.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>Creado: {new Date(year.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grados */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Grados Escolares</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {grades.map(grade => {
              const studentsInGrade = getStudentsInGrade(grade.id);
              const classroomsInGrade = getClassroomsInGrade(grade.id);
              
              return (
                <Card key={grade.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${getGradeColor(grade.level)}`}>
                          <GraduationCap size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{grade.name}</h4>
                          <p className="text-sm text-gray-600">Nivel {grade.level}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedGrade(grade)}
                        >
                          <Eye size={16} />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteGrade(grade.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{grade.description}</p>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Users size={14} />
                          Estudiantes
                        </span>
                        <span className="font-medium">{studentsInGrade.length}/{grade.maxStudents}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <BookOpen size={14} />
                          Aulas
                        </span>
                        <span className="font-medium">{classroomsInGrade.length}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(studentsInGrade.length / grade.maxStudents) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Capacidad: {Math.round((studentsInGrade.length / grade.maxStudents) * 100)}%
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Crear Grado */}
      {showCreateGradeForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Crear Nuevo Grado</h3>
                <Button variant="outline" onClick={() => setShowCreateGradeForm(false)}>
                  Cerrar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del Grado *
                    </label>
                    <input
                      type="text"
                      value={newGrade.name}
                      onChange={(e) => setNewGrade(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ej: Primer Grado"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nivel *
                    </label>
                    <select
                      value={newGrade.level}
                      onChange={(e) => setNewGrade(prev => ({ ...prev, level: parseInt(e.target.value) }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={1}>Nivel 1</option>
                      <option value={2}>Nivel 2</option>
                      <option value={3}>Nivel 3</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción *
                  </label>
                  <textarea
                    value={newGrade.description}
                    onChange={(e) => setNewGrade(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Descripción del grado..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacidad Máxima de Estudiantes
                  </label>
                  <input
                    type="number"
                    value={newGrade.maxStudents}
                    onChange={(e) => setNewGrade(prev => ({ ...prev, maxStudents: parseInt(e.target.value) }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="50"
                  />
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleCreateGrade} className="flex-1">
                    Crear Grado
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowCreateGradeForm(false)}
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

      {/* Modal de Crear Año Académico */}
      {showCreateYearForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Crear Nuevo Año Académico</h3>
                <Button variant="outline" onClick={() => setShowCreateYearForm(false)}>
                  Cerrar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre del Año Académico *
                  </label>
                  <input
                    type="text"
                    value={newYear.name}
                    onChange={(e) => setNewYear(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: Año Académico 2024"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Inicio *
                    </label>
                    <input
                      type="date"
                      value={newYear.startDate}
                      onChange={(e) => setNewYear(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Fin *
                    </label>
                    <input
                      type="date"
                      value={newYear.endDate}
                      onChange={(e) => setNewYear(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={newYear.isActive}
                    onChange={(e) => setNewYear(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isActive" className="text-sm text-gray-700">
                    Marcar como año académico activo
                  </label>
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleCreateYear} className="flex-1">
                    Crear Año Académico
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowCreateYearForm(false)}
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

      {/* Modal de Detalles del Grado */}
      {selectedGrade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Detalles del Grado: {selectedGrade.name}</h3>
                <Button variant="outline" onClick={() => setSelectedGrade(null)}>
                  Cerrar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${getGradeColor(selectedGrade.level)}`}>
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{selectedGrade.name}</h4>
                    <p className="text-gray-600">Nivel {selectedGrade.level}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Descripción</label>
                  <p className="text-gray-800">{selectedGrade.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Capacidad Máxima</label>
                    <p className="text-gray-800">{selectedGrade.maxStudents} estudiantes</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Estudiantes Actuales</label>
                    <p className="text-gray-800">{getStudentsInGrade(selectedGrade.id).length}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Aulas Asignadas</label>
                  <div className="space-y-2 mt-2">
                    {getClassroomsInGrade(selectedGrade.id).map(classroom => (
                      <div key={classroom.id} className="p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-800">{classroom.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Fecha de Creación</label>
                  <p className="text-gray-800">{new Date(selectedGrade.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de Detalles del Año Académico */}
      {selectedYear && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Detalles del Año Académico: {selectedYear.name}</h3>
                <Button variant="outline" onClick={() => setSelectedYear(null)}>
                  Cerrar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{selectedYear.name}</h4>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                      selectedYear.isActive 
                        ? 'bg-green-100 text-green-800 border-green-200' 
                        : 'bg-gray-100 text-gray-800 border-gray-200'
                    }`}>
                      {selectedYear.isActive ? 'Activo' : 'Inactivo'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Fecha de Inicio</label>
                    <p className="text-gray-800">{new Date(selectedYear.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Fecha de Fin</label>
                    <p className="text-gray-800">{new Date(selectedYear.endDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Duración</label>
                  <p className="text-gray-800">
                    {Math.ceil((new Date(selectedYear.endDate).getTime() - new Date(selectedYear.startDate).getTime()) / (1000 * 60 * 60 * 24))} días
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Fecha de Creación</label>
                  <p className="text-gray-800">{new Date(selectedYear.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
