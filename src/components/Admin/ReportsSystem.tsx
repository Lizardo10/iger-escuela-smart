import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { FileText, Download, Calendar, Users, DollarSign, TrendingUp, BarChart3, PieChart, Filter, Eye } from 'lucide-react';
import { Report, User, Attendance, Payment, Classroom } from '../../types';

interface ReportsSystemProps {
  onReportSelect?: (report: Report) => void;
}

export const ReportsSystem: React.FC<ReportsSystemProps> = ({ onReportSelect }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
  const [paymentData, setPaymentData] = useState<Payment[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [reportType, setReportType] = useState<Report['type']>('academico');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [selectedFilters, setSelectedFilters] = useState({
    studentId: '',
    classroomId: '',
    gradeId: ''
  });

  // Datos simulados
  useEffect(() => {
    const mockStudents: User[] = [
      {
        id: 'student-1',
        name: 'María García López',
        email: 'maria.garcia@iger.edu',
        role: 'estudiante',
        classroomId: 'aula-1a',
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
        classroomId: 'aula-2b',
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

    const mockAttendanceData: Attendance[] = [
      {
        id: 'att-1',
        studentId: 'student-1',
        courseId: 'aula-1a',
        date: '2024-01-15',
        status: 'presente',
        recordedBy: 'teacher-1',
        createdAt: '2024-01-15T08:00:00Z'
      },
      {
        id: 'att-2',
        studentId: 'student-1',
        courseId: 'aula-1a',
        date: '2024-01-16',
        status: 'ausente',
        recordedBy: 'teacher-1',
        createdAt: '2024-01-16T08:00:00Z'
      },
      {
        id: 'att-3',
        studentId: 'student-2',
        courseId: 'aula-2b',
        date: '2024-01-15',
        status: 'presente',
        recordedBy: 'teacher-2',
        createdAt: '2024-01-15T08:00:00Z'
      }
    ];

    const mockPaymentData: Payment[] = [
      {
        id: 'payment-1',
        studentId: 'student-1',
        amount: 500,
        currency: 'GTQ',
        description: 'Mensualidad Enero 2024',
        paymentMethod: 'efectivo',
        status: 'completed',
        dueDate: '2024-01-31',
        paidDate: '2024-01-15',
        receiptNumber: 'REC-001',
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'payment-2',
        studentId: 'student-2',
        amount: 500,
        currency: 'GTQ',
        description: 'Mensualidad Enero 2024',
        paymentMethod: 'transferencia',
        status: 'pending',
        dueDate: '2024-01-31',
        createdAt: '2024-01-01T00:00:00Z'
      }
    ];

    const mockReports: Report[] = [
      {
        id: 'report-1',
        title: 'Reporte de Asistencia - Enero 2024',
        type: 'asistencia',
        classroomId: 'aula-1a',
        content: 'Reporte detallado de asistencia para el mes de enero...',
        generatedBy: 'admin-1',
        createdAt: '2024-01-31T10:00:00Z'
      },
      {
        id: 'report-2',
        title: 'Reporte de Pagos - Enero 2024',
        type: 'pagos',
        content: 'Reporte de pagos recibidos y pendientes...',
        generatedBy: 'admin-1',
        createdAt: '2024-01-31T11:00:00Z'
      },
      {
        id: 'report-3',
        title: 'Reporte Académico - María García',
        type: 'academico',
        studentId: 'student-1',
        content: 'Reporte académico individual del estudiante...',
        generatedBy: 'teacher-1',
        createdAt: '2024-01-30T15:00:00Z'
      }
    ];

    setStudents(mockStudents);
    setClassrooms(mockClassrooms);
    setAttendanceData(mockAttendanceData);
    setPaymentData(mockPaymentData);
    setReports(mockReports);
  }, []);

  const generateReport = async () => {
    if (!dateRange.startDate || !dateRange.endDate) {
      alert('Por favor selecciona un rango de fechas');
      return;
    }

    let reportContent = '';
    let reportTitle = '';

    switch (reportType) {
      case 'asistencia':
        reportTitle = `Reporte de Asistencia - ${new Date(dateRange.startDate).toLocaleDateString()} a ${new Date(dateRange.endDate).toLocaleDateString()}`;
        reportContent = generateAttendanceReport();
        break;
      case 'pagos':
        reportTitle = `Reporte de Pagos - ${new Date(dateRange.startDate).toLocaleDateString()} a ${new Date(dateRange.endDate).toLocaleDateString()}`;
        reportContent = generatePaymentReport();
        break;
      case 'academico':
        reportTitle = `Reporte Académico - ${selectedFilters.studentId ? students.find(s => s.id === selectedFilters.studentId)?.name : 'General'}`;
        reportContent = generateAcademicReport();
        break;
      case 'conducta':
        reportTitle = `Reporte de Conducta - ${new Date(dateRange.startDate).toLocaleDateString()} a ${new Date(dateRange.endDate).toLocaleDateString()}`;
        reportContent = generateConductReport();
        break;
    }

    const newReport: Report = {
      id: `report-${Date.now()}`,
      title: reportTitle,
      type: reportType,
      studentId: selectedFilters.studentId || undefined,
      classroomId: selectedFilters.classroomId || undefined,
      gradeId: selectedFilters.gradeId || undefined,
      content: reportContent,
      generatedBy: 'admin-1', // En producción sería el ID del usuario actual
      createdAt: new Date().toISOString()
    };

    setReports(prev => [newReport, ...prev]);
    setShowCreateForm(false);
  };

  const generateAttendanceReport = () => {
    const filteredAttendance = attendanceData.filter(att => {
      const attDate = new Date(att.date);
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      
      return attDate >= startDate && attDate <= endDate &&
             (!selectedFilters.classroomId || att.courseId === selectedFilters.classroomId);
    });

    const stats = filteredAttendance.reduce((acc, att) => {
      acc[att.status] = (acc[att.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return `
REPORTE DE ASISTENCIA
Período: ${new Date(dateRange.startDate).toLocaleDateString()} - ${new Date(dateRange.endDate).toLocaleDateString()}

ESTADÍSTICAS GENERALES:
- Total de registros: ${filteredAttendance.length}
- Presentes: ${stats.presente || 0}
- Ausentes: ${stats.ausente || 0}
- Tardanzas: ${stats.tardanza || 0}
- Justificados: ${stats.justificado || 0}

PORCENTAJE DE ASISTENCIA: ${Math.round(((stats.presente || 0) / filteredAttendance.length) * 100)}%

DETALLES POR ESTUDIANTE:
${filteredAttendance.map(att => {
  const student = students.find(s => s.id === att.studentId);
  return `- ${student?.name}: ${att.status} (${new Date(att.date).toLocaleDateString()})`;
}).join('\n')}
    `.trim();
  };

  const generatePaymentReport = () => {
    const filteredPayments = paymentData.filter(payment => {
      const paymentDate = new Date(payment.createdAt);
      const startDate = new Date(dateRange.startDate);
      const endDate = new Date(dateRange.endDate);
      
      return paymentDate >= startDate && paymentDate <= endDate;
    });

    const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
    const collectedAmount = filteredPayments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
    const pendingAmount = filteredPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

    return `
REPORTE DE PAGOS
Período: ${new Date(dateRange.startDate).toLocaleDateString()} - ${new Date(dateRange.endDate).toLocaleDateString()}

RESUMEN FINANCIERO:
- Total facturado: Q${totalAmount.toLocaleString()}
- Total recaudado: Q${collectedAmount.toLocaleString()}
- Total pendiente: Q${pendingAmount.toLocaleString()}
- Porcentaje de recaudación: ${Math.round((collectedAmount / totalAmount) * 100)}%

ESTADO DE PAGOS:
- Completados: ${filteredPayments.filter(p => p.status === 'completed').length}
- Pendientes: ${filteredPayments.filter(p => p.status === 'pending').length}
- Cancelados: ${filteredPayments.filter(p => p.status === 'cancelled').length}

DETALLES POR ESTUDIANTE:
${filteredPayments.map(payment => {
  const student = students.find(s => s.id === payment.studentId);
  return `- ${student?.name}: Q${payment.amount} (${payment.status}) - ${payment.description}`;
}).join('\n')}
    `.trim();
  };

  const generateAcademicReport = () => {
    const student = students.find(s => s.id === selectedFilters.studentId);
    if (!student) return 'Estudiante no encontrado';

    const studentAttendance = attendanceData.filter(att => att.studentId === student.id);
    const studentPayments = paymentData.filter(payment => payment.studentId === student.id);

    return `
REPORTE ACADÉMICO INDIVIDUAL
Estudiante: ${student.name}
Grado: ${student.gradeId}
Fecha de generación: ${new Date().toLocaleDateString()}

INFORMACIÓN PERSONAL:
- Email: ${student.email}
- Teléfono del padre/madre: ${student.parentPhone}
- Email del padre/madre: ${student.parentEmail}
- Fecha de nacimiento: ${new Date(student.birthDate!).toLocaleDateString()}

ASISTENCIA:
- Total de días registrados: ${studentAttendance.length}
- Días presentes: ${studentAttendance.filter(att => att.status === 'presente').length}
- Días ausentes: ${studentAttendance.filter(att => att.status === 'ausente').length}
- Tardanzas: ${studentAttendance.filter(att => att.status === 'tardanza').length}
- Porcentaje de asistencia: ${Math.round((studentAttendance.filter(att => att.status === 'presente').length / studentAttendance.length) * 100)}%

PAGOS:
- Total de pagos: ${studentPayments.length}
- Pagos completados: ${studentPayments.filter(p => p.status === 'completed').length}
- Pagos pendientes: ${studentPayments.filter(p => p.status === 'pending').length}
- Total pagado: Q${studentPayments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
    `.trim();
  };

  const generateConductReport = () => {
    return `
REPORTE DE CONDUCTA
Período: ${new Date(dateRange.startDate).toLocaleDateString()} - ${new Date(dateRange.endDate).toLocaleDateString()}

Este reporte incluye información sobre el comportamiento y disciplina de los estudiantes durante el período especificado.

NOTAS DE CONDUCTA:
- Se observó un comportamiento general positivo en el aula
- Los estudiantes mostraron respeto hacia sus compañeros y maestros
- Se registraron algunas incidencias menores que fueron resueltas adecuadamente

RECOMENDACIONES:
- Continuar fomentando el trabajo en equipo
- Reforzar las normas de convivencia en el aula
- Mantener comunicación constante con los padres de familia
    `.trim();
  };

  const getReportTypeIcon = (type: Report['type']) => {
    switch (type) {
      case 'academico': return <FileText className="text-blue-500" size={20} />;
      case 'asistencia': return <Users className="text-green-500" size={20} />;
      case 'pagos': return <DollarSign className="text-yellow-500" size={20} />;
      case 'conducta': return <TrendingUp className="text-purple-500" size={20} />;
      default: return <FileText className="text-gray-500" size={20} />;
    }
  };

  const getReportTypeColor = (type: Report['type']) => {
    switch (type) {
      case 'academico': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'asistencia': return 'bg-green-100 text-green-800 border-green-200';
      case 'pagos': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'conducta': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const downloadReport = (report: Report) => {
    const element = document.createElement('a');
    const file = new Blob([report.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${report.title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Sistema de Reportes</h2>
          <p className="text-gray-600 mt-1">Genera y administra reportes académicos, de asistencia y pagos</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2"
        >
          <FileText size={20} />
          Generar Reporte
        </Button>
      </div>

      {/* Estadísticas de Reportes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <FileText className="mx-auto text-blue-500 mb-2" size={24} />
            <div className="text-2xl font-bold text-gray-800">{reports.filter(r => r.type === 'academico').length}</div>
            <div className="text-sm text-gray-600">Reportes Académicos</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="mx-auto text-green-500 mb-2" size={24} />
            <div className="text-2xl font-bold text-gray-800">{reports.filter(r => r.type === 'asistencia').length}</div>
            <div className="text-sm text-gray-600">Reportes de Asistencia</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="mx-auto text-yellow-500 mb-2" size={24} />
            <div className="text-2xl font-bold text-gray-800">{reports.filter(r => r.type === 'pagos').length}</div>
            <div className="text-sm text-gray-600">Reportes de Pagos</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="mx-auto text-purple-500 mb-2" size={24} />
            <div className="text-2xl font-bold text-gray-800">{reports.filter(r => r.type === 'conducta').length}</div>
            <div className="text-sm text-gray-600">Reportes de Conducta</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Reportes */}
      <div className="space-y-4">
        {reports.map(report => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white">
                    {getReportTypeIcon(report.type)}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800">{report.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getReportTypeColor(report.type)}`}>
                        {report.type.charAt(0).toUpperCase() + report.type.slice(1)}
                      </span>
                      <span>Generado: {new Date(report.createdAt).toLocaleDateString()}</span>
                      {report.studentId && <span>Estudiante: {students.find(s => s.id === report.studentId)?.name}</span>}
                      {report.classroomId && <span>Aula: {classrooms.find(c => c.id === report.classroomId)?.name}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedReport(report)}
                  >
                    <Eye size={16} />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadReport(report)}
                    className="text-green-600 hover:text-green-700"
                  >
                    <Download size={16} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reports.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No hay reportes generados</h3>
            <p className="text-gray-500 mb-4">Genera tu primer reporte para comenzar</p>
            <Button onClick={() => setShowCreateForm(true)}>
              Generar Reporte
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Modal de Generar Reporte */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Generar Nuevo Reporte</h3>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cerrar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Reporte *
                  </label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value as Report['type'])}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="academico">Reporte Académico</option>
                    <option value="asistencia">Reporte de Asistencia</option>
                    <option value="pagos">Reporte de Pagos</option>
                    <option value="conducta">Reporte de Conducta</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Inicio *
                    </label>
                    <input
                      type="date"
                      value={dateRange.startDate}
                      onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha de Fin *
                    </label>
                    <input
                      type="date"
                      value={dateRange.endDate}
                      onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {reportType === 'academico' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estudiante
                    </label>
                    <select
                      value={selectedFilters.studentId}
                      onChange={(e) => setSelectedFilters(prev => ({ ...prev, studentId: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Todos los estudiantes</option>
                      {students.map(student => (
                        <option key={student.id} value={student.id}>{student.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                {(reportType === 'asistencia' || reportType === 'conducta') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Aula
                    </label>
                    <select
                      value={selectedFilters.classroomId}
                      onChange={(e) => setSelectedFilters(prev => ({ ...prev, classroomId: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Todas las aulas</option>
                      {classrooms.map(classroom => (
                        <option key={classroom.id} value={classroom.id}>{classroom.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button onClick={generateReport} className="flex-1">
                    Generar Reporte
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

      {/* Modal de Ver Reporte */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{selectedReport.title}</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => downloadReport(selectedReport)}
                    className="flex items-center gap-2"
                  >
                    <Download size={16} />
                    Descargar
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedReport(null)}>
                    Cerrar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                  {selectedReport.content}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
