import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { User } from '../../types';
import { apiService } from '../../services/apiService';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  Clock, 
  User as UserIcon,
  Calendar,
  BookOpen,
  AlertCircle,
  Eye,
  Download
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  subject: string;
  teacher: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  feedback?: string;
}

interface Submission {
  id: string;
  taskId: string;
  studentId: string;
  fileName: string;
  fileUrl: string;
  submittedAt: string;
  status: 'pending' | 'graded';
  grade?: number;
  feedback?: string;
}

export const StudentTaskUpload: React.FC<{ user: User }> = ({ user }) => {
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadTasks();
    loadSubmissions();
  }, []);

  const loadTasks = async () => {
    try {
      // Simular tareas asignadas por maestros
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Ensayo sobre Historia de Guatemala',
          description: 'Escribe un ensayo de 500 palabras sobre la independencia de Guatemala',
          dueDate: '2024-11-15',
          subject: 'Historia',
          teacher: 'Ana Martínez',
          status: 'pending'
        },
        {
          id: '2',
          title: 'Problemas de Matemáticas',
          description: 'Resuelve los ejercicios de la página 45 del libro de texto',
          dueDate: '2024-11-20',
          subject: 'Matemáticas',
          teacher: 'Carlos López',
          status: 'pending'
        },
        {
          id: '3',
          title: 'Experimento de Ciencias',
          description: 'Realiza el experimento del capítulo 3 y documenta los resultados',
          dueDate: '2024-11-25',
          subject: 'Ciencias',
          teacher: 'María García',
          status: 'pending'
        }
      ];
      setAssignedTasks(mockTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const loadSubmissions = async () => {
    try {
      // Simular envíos del estudiante
      const mockSubmissions: Submission[] = [
        {
          id: '1',
          taskId: '1',
          studentId: user.id,
          fileName: 'ensayo_historia.pdf',
          fileUrl: '/uploads/ensayo_historia.pdf',
          submittedAt: '2024-10-20T10:30:00Z',
          status: 'graded',
          grade: 85,
          feedback: 'Excelente trabajo, muy bien estructurado'
        }
      ];
      setSubmissions(mockSubmissions);
    } catch (error) {
      console.error('Error loading submissions:', error);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmitTask = async () => {
    if (!selectedTask || !uploadedFile) return;

    setIsLoading(true);
    try {
      // Simular envío de tarea
      const newSubmission: Submission = {
        id: Date.now().toString(),
        taskId: selectedTask.id,
        studentId: user.id,
        fileName: uploadedFile.name,
        fileUrl: `/uploads/${uploadedFile.name}`,
        submittedAt: new Date().toISOString(),
        status: 'pending'
      };

      setSubmissions([...submissions, newSubmission]);
      
      // Actualizar estado de la tarea
      setAssignedTasks(assignedTasks.map(task => 
        task.id === selectedTask.id 
          ? { ...task, status: 'submitted' as const }
          : task
      ));

      setShowModal(false);
      setSelectedTask(null);
      setUploadedFile(null);
    } catch (error) {
      console.error('Error submitting task:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTaskStatus = (task: Task) => {
    const submission = submissions.find(s => s.taskId === task.id);
    if (submission) {
      return submission.status === 'graded' ? 'graded' : 'submitted';
    }
    return 'pending';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'graded':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-red-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'graded':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'Enviada';
      case 'graded':
        return 'Calificada';
      default:
        return 'Pendiente';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-GT');
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Upload className="w-8 h-8 text-blue-500 mr-3" />
            Mis Tareas
          </h1>
          <p className="text-gray-600">Envía tus tareas asignadas por los maestros</p>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Tareas Asignadas</p>
                <p className="text-2xl font-bold">{assignedTasks.length}</p>
              </div>
              <BookOpen className="w-6 h-6 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Enviadas</p>
                <p className="text-2xl font-bold">
                  {submissions.length}
                </p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Calificadas</p>
                <p className="text-2xl font-bold">
                  {submissions.filter(s => s.status === 'graded').length}
                </p>
              </div>
              <UserIcon className="w-6 h-6 text-purple-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de tareas */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Tareas Asignadas</h3>
        </CardHeader>
        <CardContent>
          {assignedTasks.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No hay tareas asignadas</h3>
              <p className="text-gray-500">Los maestros aún no han asignado tareas</p>
            </div>
          ) : (
            <div className="space-y-4">
              {assignedTasks.map((task) => {
                const status = getTaskStatus(task);
                const submission = submissions.find(s => s.taskId === task.id);
                const overdue = isOverdue(task.dueDate);

                return (
                  <div
                    key={task.id}
                    className={`p-4 rounded-lg border ${getStatusColor(status)} ${
                      overdue && status === 'pending' ? 'border-red-300 bg-red-50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(status)}
                        <div>
                          <h4 className="font-semibold text-gray-900">{task.title}</h4>
                          <p className="text-sm text-gray-600">{task.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                          {getStatusText(status)}
                        </span>
                        {status === 'graded' && submission?.grade && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            {submission.grade}/100
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {task.subject}
                      </div>
                      <div className="flex items-center gap-1">
                        <UserIcon className="w-4 h-4" />
                        {task.teacher}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(task.dueDate)}
                        {overdue && status === 'pending' && (
                          <span className="text-red-600 font-medium">(Vencida)</span>
                        )}
                      </div>
                    </div>

                    {submission && (
                      <div className="mt-3 p-3 bg-white rounded border">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-600" />
                            <span className="text-sm font-medium">{submission.fileName}</span>
                            <span className="text-xs text-gray-500">
                              Enviado: {formatDate(submission.submittedAt)}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="w-3 h-3 mr-1" />
                              Ver
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-3 h-3 mr-1" />
                              Descargar
                            </Button>
                          </div>
                        </div>
                        {submission.feedback && (
                          <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                            <strong>Feedback:</strong> {submission.feedback}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-3 flex gap-2">
                      {status === 'pending' && (
                        <Button
                          onClick={() => {
                            setSelectedTask(task);
                            setShowModal(true);
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Enviar Tarea
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSelectedTask(task);
                          setShowModal(true);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal para enviar/ver tarea */}
      {showModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              {getTaskStatus(selectedTask) === 'pending' ? 'Enviar Tarea' : 'Detalles de la Tarea'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">{selectedTask.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{selectedTask.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Materia:</span>
                  <p className="text-gray-600">{selectedTask.subject}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Maestro:</span>
                  <p className="text-gray-600">{selectedTask.teacher}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Fecha límite:</span>
                  <p className="text-gray-600">{formatDate(selectedTask.dueDate)}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Estado:</span>
                  <p className="text-gray-600">{getStatusText(getTaskStatus(selectedTask))}</p>
                </div>
              </div>

              {getTaskStatus(selectedTask) === 'pending' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar archivo
                  </label>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                  />
                  {uploadedFile && (
                    <p className="text-sm text-gray-600 mt-1">
                      Archivo seleccionado: {uploadedFile.name}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              {getTaskStatus(selectedTask) === 'pending' && (
                <Button
                  onClick={handleSubmitTask}
                  disabled={!uploadedFile || isLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {isLoading ? 'Enviando...' : 'Enviar Tarea'}
                </Button>
              )}
              <Button
                onClick={() => {
                  setShowModal(false);
                  setSelectedTask(null);
                  setUploadedFile(null);
                }}
                variant="outline"
                className="flex-1"
              >
                Cerrar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
