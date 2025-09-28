import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { CheckCircle, XCircle, Clock, AlertCircle, Calendar, Users, Save, Download } from 'lucide-react';
import { Attendance, User, Classroom } from '../../types';

interface AttendanceSystemProps {
  classroom: Classroom;
  currentUser: User;
}

export const AttendanceSystem: React.FC<AttendanceSystemProps> = ({ classroom, currentUser }) => {
  const [students, setStudents] = useState<User[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<Attendance[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentAttendance, setCurrentAttendance] = useState<Record<string, Attendance['status']>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Datos simulados de estudiantes
  useEffect(() => {
    const mockStudents: User[] = [
      {
        id: 'student-1',
        name: 'María García López',
        email: 'maria.garcia@iger.edu',
        role: 'estudiante',
        classroomId: classroom.id,
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
        classroomId: classroom.id,
        avatar: 'avatar-2',
        parentConsent: true,
        parentEmail: 'madre.lopez@email.com',
        parentPhone: '+502 5555-1234',
        birthDate: '2017-08-22',
        isActive: true,
        createdAt: '2024-01-20T14:30:00Z',
        updatedAt: '2024-01-20T14:30:00Z'
      },
      {
        id: 'student-3',
        name: 'Ana Rodríguez',
        email: 'ana.rodriguez@iger.edu',
        role: 'estudiante',
        classroomId: classroom.id,
        avatar: 'avatar-3',
        parentConsent: true,
        parentEmail: 'padre.rodriguez@email.com',
        parentPhone: '+502 7777-8888',
        birthDate: '2018-03-10',
        isActive: true,
        createdAt: '2024-01-25T09:15:00Z',
        updatedAt: '2024-01-25T09:15:00Z'
      }
    ];

    setStudents(mockStudents);
    
    // Inicializar asistencia para todos los estudiantes como 'presente'
    const initialAttendance: Record<string, Attendance['status']> = {};
    mockStudents.forEach(student => {
      initialAttendance[student.id] = 'presente';
    });
    setCurrentAttendance(initialAttendance);
  }, [classroom.id]);

  // Cargar registros de asistencia existentes para la fecha seleccionada
  useEffect(() => {
    const existingRecords = attendanceRecords.filter(record => 
      record.date === selectedDate && record.courseId === classroom.id
    );
    
    if (existingRecords.length > 0) {
      const attendanceMap: Record<string, Attendance['status']> = {};
      const notesMap: Record<string, string> = {};
      
      existingRecords.forEach(record => {
        attendanceMap[record.studentId] = record.status;
        if (record.notes) {
          notesMap[record.studentId] = record.notes;
        }
      });
      
      setCurrentAttendance(attendanceMap);
      setNotes(notesMap);
    } else {
      // Si no hay registros, inicializar como presente
      const initialAttendance: Record<string, Attendance['status']> = {};
      students.forEach(student => {
        initialAttendance[student.id] = 'presente';
      });
      setCurrentAttendance(initialAttendance);
      setNotes({});
    }
  }, [selectedDate, students, attendanceRecords, classroom.id]);

  const handleAttendanceChange = (studentId: string, status: Attendance['status']) => {
    setCurrentAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleNoteChange = (studentId: string, note: string) => {
    setNotes(prev => ({
      ...prev,
      [studentId]: note
    }));
  };

  const saveAttendance = async () => {
    setIsLoading(true);
    
    try {
      // Crear registros de asistencia para cada estudiante
      const newRecords: Attendance[] = students.map(student => ({
        id: `attendance-${Date.now()}-${student.id}`,
        studentId: student.id,
        courseId: classroom.id,
        date: selectedDate,
        status: currentAttendance[student.id] || 'presente',
        notes: notes[student.id] || undefined,
        recordedBy: currentUser.id,
        createdAt: new Date().toISOString()
      }));

      // Actualizar el estado local
      setAttendanceRecords(prev => {
        // Eliminar registros existentes para esta fecha
        const filtered = prev.filter(record => 
          !(record.date === selectedDate && record.courseId === classroom.id)
        );
        return [...filtered, ...newRecords];
      });

      // Simular guardado en API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Asistencia guardada exitosamente');
    } catch (error) {
      alert('Error al guardar la asistencia');
    } finally {
      setIsLoading(false);
    }
  };

  const getAttendanceStats = () => {
    const total = students.length;
    const present = Object.values(currentAttendance).filter(status => status === 'presente').length;
    const absent = Object.values(currentAttendance).filter(status => status === 'ausente').length;
    const late = Object.values(currentAttendance).filter(status => status === 'tardanza').length;
    const justified = Object.values(currentAttendance).filter(status => status === 'justificado').length;

    return { total, present, absent, late, justified };
  };

  const getStatusIcon = (status: Attendance['status']) => {
    switch (status) {
      case 'presente': return <CheckCircle className="text-green-500" size={20} />;
      case 'ausente': return <XCircle className="text-red-500" size={20} />;
      case 'tardanza': return <Clock className="text-yellow-500" size={20} />;
      case 'justificado': return <AlertCircle className="text-blue-500" size={20} />;
      default: return <CheckCircle className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status: Attendance['status']) => {
    switch (status) {
      case 'presente': return 'bg-green-100 text-green-800 border-green-200';
      case 'ausente': return 'bg-red-100 text-red-800 border-red-200';
      case 'tardanza': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'justificado': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const stats = getAttendanceStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Toma de Asistencia</h2>
          <p className="text-gray-600 mt-1">{classroom.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Calendar size={20} className="text-gray-600" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button 
            onClick={saveAttendance}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Save size={20} />
            {isLoading ? 'Guardando...' : 'Guardar Asistencia'}
          </Button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="mx-auto text-gray-600 mb-2" size={24} />
            <div className="text-2xl font-bold text-gray-800">{stats.total}</div>
            <div className="text-sm text-gray-600">Total</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="mx-auto text-green-500 mb-2" size={24} />
            <div className="text-2xl font-bold text-green-600">{stats.present}</div>
            <div className="text-sm text-gray-600">Presentes</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <XCircle className="mx-auto text-red-500 mb-2" size={24} />
            <div className="text-2xl font-bold text-red-600">{stats.absent}</div>
            <div className="text-sm text-gray-600">Ausentes</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="mx-auto text-yellow-500 mb-2" size={24} />
            <div className="text-2xl font-bold text-yellow-600">{stats.late}</div>
            <div className="text-sm text-gray-600">Tardanzas</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <AlertCircle className="mx-auto text-blue-500 mb-2" size={24} />
            <div className="text-2xl font-bold text-blue-600">{stats.justified}</div>
            <div className="text-sm text-gray-600">Justificados</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Estudiantes */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Lista de Estudiantes - {new Date(selectedDate).toLocaleDateString()}</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.map(student => (
              <div key={student.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-lg font-semibold">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">{student.name}</h4>
                  <p className="text-sm text-gray-600">{student.email}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={currentAttendance[student.id] === 'presente' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleAttendanceChange(student.id, 'presente')}
                    className={currentAttendance[student.id] === 'presente' ? 'bg-green-500 hover:bg-green-600' : ''}
                  >
                    <CheckCircle size={16} />
                    Presente
                  </Button>
                  
                  <Button
                    variant={currentAttendance[student.id] === 'ausente' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleAttendanceChange(student.id, 'ausente')}
                    className={currentAttendance[student.id] === 'ausente' ? 'bg-red-500 hover:bg-red-600' : ''}
                  >
                    <XCircle size={16} />
                    Ausente
                  </Button>
                  
                  <Button
                    variant={currentAttendance[student.id] === 'tardanza' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleAttendanceChange(student.id, 'tardanza')}
                    className={currentAttendance[student.id] === 'tardanza' ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
                  >
                    <Clock size={16} />
                    Tardanza
                  </Button>
                  
                  <Button
                    variant={currentAttendance[student.id] === 'justificado' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleAttendanceChange(student.id, 'justificado')}
                    className={currentAttendance[student.id] === 'justificado' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                  >
                    <AlertCircle size={16} />
                    Justificado
                  </Button>
                </div>

                <div className="w-64">
                  <input
                    type="text"
                    placeholder="Notas adicionales..."
                    value={notes[student.id] || ''}
                    onChange={(e) => handleNoteChange(student.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Resumen de Asistencia */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Resumen de Asistencia</h3>
            <Button variant="outline" className="flex items-center gap-2">
              <Download size={16} />
              Exportar Reporte
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Por Estado</h4>
              <div className="space-y-2">
                {Object.entries(currentAttendance).map(([studentId, status]) => {
                  const student = students.find(s => s.id === studentId);
                  return (
                    <div key={studentId} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm text-gray-700">{student?.name}</span>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-3">Estadísticas</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Porcentaje de Asistencia:</span>
                  <span className="font-semibold text-green-600">
                    {Math.round((stats.present / stats.total) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estudiantes Presentes:</span>
                  <span className="font-semibold text-green-600">{stats.present}/{stats.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ausencias:</span>
                  <span className="font-semibold text-red-600">{stats.absent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tardanzas:</span>
                  <span className="font-semibold text-yellow-600">{stats.late}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
