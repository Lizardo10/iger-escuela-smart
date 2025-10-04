import React, { useState } from 'react';
import { Users, Search, Filter, Mail, Phone, Calendar, Award } from 'lucide-react';
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

  // Obtener todos los estudiantes de las aulas del maestro
  const allStudents = classrooms
    .filter(c => c.teacherId === user.id)
    .flatMap(c => c.students);

  const filteredStudents = allStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClassroom = selectedClassroom === 'all' || 
                            classrooms.find(c => c.students.includes(student))?.id === selectedClassroom;
    return matchesSearch && matchesClassroom;
  });

  const getStudentClassroom = (student: any) => {
    return classrooms.find(c => c.students.includes(student));
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-4 sm:p-6 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Mis Estudiantes 👥</h1>
        <p className="text-green-100 text-base sm:text-lg">Gestiona y supervisa a todos tus estudiantes</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-400 to-blue-500 text-white">
          <CardContent className="p-4 text-center">
            <Users size={32} className="mx-auto mb-2" />
            <p className="text-2xl font-bold">{allStudents.length}</p>
            <p className="text-blue-100 text-sm">Total Estudiantes</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-400 to-green-500 text-white">
          <CardContent className="p-4 text-center">
            <Award size={32} className="mx-auto mb-2" />
            <p className="text-2xl font-bold">{classrooms.length}</p>
            <p className="text-green-100 text-sm">Aulas Asignadas</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-400 to-purple-500 text-white">
          <CardContent className="p-4 text-center">
            <Calendar size={32} className="mx-auto mb-2" />
            <p className="text-2xl font-bold">{Math.round(allStudents.length / classrooms.length)}</p>
            <p className="text-purple-100 text-sm">Promedio por Aula</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-400 to-orange-500 text-white">
          <CardContent className="p-4 text-center">
            <Users size={32} className="mx-auto mb-2" />
            <p className="text-2xl font-bold">95%</p>
            <p className="text-orange-100 text-sm">Asistencia Promedio</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros y Búsqueda */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nombre o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="md:w-64">
              <select
                value={selectedClassroom}
                onChange={(e) => setSelectedClassroom(e.target.value)}
                className="w-full p-2 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              >
                <option value="all">Todas las aulas</option>
                {classrooms.map(classroom => (
                  <option key={classroom.id} value={classroom.id}>
                    {classroom.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Estudiantes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStudents.map((student) => {
          const classroom = getStudentClassroom(student);
          return (
            <Card key={student.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {student.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{student.name}</h3>
                    <p className="text-sm text-gray-600">{classroom?.name}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Mail size={14} />
                    <span className="truncate">{student.email}</span>
                  </div>
                  {student.phone && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Phone size={14} />
                      <span>{student.phone}</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => {
                      alert(`Ver perfil de ${student.name}`);
                    }}
                  >
                    Ver Perfil
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      alert(`Contactar a ${student.name}`);
                    }}
                  >
                    Contactar
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Estado vacío */}
      {filteredStudents.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Users size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              {searchTerm || selectedClassroom !== 'all' ? 'No se encontraron estudiantes' : 'No tienes estudiantes asignados'}
            </h3>
            <p className="text-gray-500">
              {searchTerm || selectedClassroom !== 'all' ? 
                'Intenta ajustar los filtros de búsqueda.' : 
                'Los estudiantes aparecerán aquí cuando sean asignados a tus aulas.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
