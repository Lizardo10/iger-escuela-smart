import React, { useState } from 'react';
import { Users, Search, Filter, Mail, Phone, Calendar, Award, Eye, MessageCircle, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { User as UserType, Classroom } from '../../types';

interface StudentsViewProps {
  user: UserType;
  classrooms: Classroom[];
  onViewChange: (view: string) => void;
}

export const StudentsView: React.FC<StudentsViewProps> = ({ user, classrooms, onViewChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClassroom, setSelectedClassroom] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Datos simulados de estudiantes para mejor visualización
  const mockStudents = [
    {
      id: '1',
      name: 'María García López',
      email: 'maria.garcia@iger.edu',
      phone: '+502 1234-5678',
      avatar: 'avatar-1',
      grade: '2do Grado',
      classroom: 'Aula 2A',
      attendance: 95,
      lastActivity: 'Hace 2 horas',
      status: 'active'
    },
    {
      id: '2',
      name: 'Carlos Pérez Martínez',
      email: 'carlos.perez@iger.edu',
      phone: '+502 9876-5432',
      avatar: 'avatar-2',
      grade: '2do Grado',
      classroom: 'Aula 2A',
      attendance: 88,
      lastActivity: 'Hace 1 día',
      status: 'active'
    },
    {
      id: '3',
      name: 'Ana Sofía Rodríguez',
      email: 'ana.rodriguez@iger.edu',
      phone: '+502 5555-1234',
      avatar: 'avatar-3',
      grade: '3er Grado',
      classroom: 'Aula 3B',
      attendance: 92,
      lastActivity: 'Hace 3 horas',
      status: 'active'
    },
    {
      id: '4',
      name: 'Diego Alejandro Cruz',
      email: 'diego.cruz@iger.edu',
      phone: '+502 7777-8888',
      avatar: 'avatar-4',
      grade: '3er Grado',
      classroom: 'Aula 3B',
      attendance: 78,
      lastActivity: 'Hace 2 días',
      status: 'inactive'
    }
  ];

  // Obtener todas las aulas del maestro
  const myClassrooms = classrooms.filter(c => c.teacherId === user.id);
  
  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClassroom = selectedClassroom === 'all' || 
                            student.classroom === myClassrooms.find(c => c.id === selectedClassroom)?.name;
    return matchesSearch && matchesClassroom;
  });

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-600 bg-green-100';
    if (attendance >= 75) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Header Mejorado */}
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">Mis Estudiantes 👥</h1>
              <p className="text-emerald-100 text-lg">Gestiona y supervisa a todos tus estudiantes</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button 
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                variant="ghost"
                className="text-white border-white hover:bg-white hover:text-emerald-600"
              >
                {viewMode === 'grid' ? 'Vista Lista' : 'Vista Cuadrícula'}
              </Button>
            </div>
          </div>
        </div>

        {/* Estadísticas Mejoradas */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Estudiantes</p>
                  <p className="text-3xl font-bold">{mockStudents.length}</p>
                </div>
                <Users size={40} className="text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Aulas Activas</p>
                  <p className="text-3xl font-bold">{myClassrooms.length}</p>
                </div>
                <BookOpen size={40} className="text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Asistencia Promedio</p>
                  <p className="text-3xl font-bold">{Math.round(mockStudents.reduce((sum, s) => sum + s.attendance, 0) / mockStudents.length)}%</p>
                </div>
                <Calendar size={40} className="text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Estudiantes Activos</p>
                  <p className="text-3xl font-bold">{mockStudents.filter(s => s.status === 'active').length}</p>
                </div>
                <Award size={40} className="text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros Mejorados */}
        <Card className="shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por nombre o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>
              <div className="lg:w-64">
                <select
                  value={selectedClassroom}
                  onChange={(e) => setSelectedClassroom(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="all">Todas las aulas</option>
                  {myClassrooms.map(classroom => (
                    <option key={classroom.id} value={classroom.id}>
                      {classroom.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Estudiantes Mejorada */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${getStatusColor(student.status)}`}>
                        {student.status === 'active' ? '✓' : '○'}
                      </div>
                    </div>

                    {/* Información */}
                    <div className="space-y-2">
                      <h3 className="font-bold text-gray-800 text-lg">{student.name}</h3>
                      <p className="text-sm text-gray-600">{student.grade}</p>
                      <p className="text-sm text-gray-500">{student.classroom}</p>
                    </div>

                    {/* Estadísticas */}
                    <div className="w-full space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Asistencia</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAttendanceColor(student.attendance)}`}>
                          {student.attendance}%
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Última actividad: {student.lastActivity}
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="flex space-x-2 w-full">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => alert(`Ver perfil de ${student.name}`)}
                      >
                        <Eye size={14} className="mr-1" />
                        Ver
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => alert(`Contactar a ${student.name}`)}
                      >
                        <MessageCircle size={14} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="shadow-lg">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estudiante</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aula</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asistencia</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                              {student.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-medium text-gray-800">{student.name}</div>
                              <div className="text-sm text-gray-500">{student.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {student.classroom}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAttendanceColor(student.attendance)}`}>
                            {student.attendance}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                            {student.status === 'active' ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                          <Button size="sm" onClick={() => alert(`Ver perfil de ${student.name}`)}>
                            <Eye size={14} className="mr-1" />
                            Ver
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => alert(`Contactar a ${student.name}`)}>
                            <MessageCircle size={14} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Estado vacío */}
        {filteredStudents.length === 0 && (
          <Card className="text-center py-16 shadow-lg">
            <CardContent>
              <Users size={64} className="mx-auto text-gray-400 mb-6" />
              <h3 className="text-2xl font-bold text-gray-600 mb-4">
                {searchTerm || selectedClassroom !== 'all' ? 'No se encontraron estudiantes' : 'No tienes estudiantes asignados'}
              </h3>
              <p className="text-gray-500 text-lg max-w-md mx-auto">
                {searchTerm || selectedClassroom !== 'all' ? 
                  'Intenta ajustar los filtros de búsqueda para encontrar estudiantes.' : 
                  'Los estudiantes aparecerán aquí cuando sean asignados a tus aulas.'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
