import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Upload, FileText, Clock, CheckCircle, AlertCircle, Download, Eye, Plus } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  subject: string;
  grade: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  teacher: string;
  attachments?: string[];
  submission?: {
    id: string;
    content: string;
    attachments: string[];
    submittedAt: string;
    grade?: number;
    feedback?: string;
  };
}

interface StudentTaskUploadProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

const StudentTaskUpload: React.FC<StudentTaskUploadProps> = ({ user }) => {
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [submissionContent, setSubmissionContent] = useState('');
  const [submissionFiles, setSubmissionFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadAssignedTasks();
    loadSubmissions();
  }, []);

  const loadAssignedTasks = async () => {
    // Simular carga de tareas asignadas
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Proyecto de Investigación - Ecosistemas',
        description: 'Realizar una investigación sobre los ecosistemas de tu región, incluyendo flora, fauna y características climáticas.',
        subject: 'Ciencias Naturales',
        grade: '10°A',
        dueDate: '2024-01-25',
        status: 'pending',
        teacher: 'Prof. Ana Martínez',
        attachments: ['guia_proyecto.pdf', 'rubrica_evaluacion.docx']
      },
      {
        id: '2',
        title: 'Ensayo sobre Revolución Mexicana',
        description: 'Escribir un ensayo de 3 páginas sobre las causas y consecuencias de la Revolución Mexicana.',
        subject: 'Historia',
        grade: '10°A',
        dueDate: '2024-01-20',
        status: 'submitted',
        teacher: 'Prof. Carlos López',
        submission: {
          id: 'sub1',
          content: 'La Revolución Mexicana fue un movimiento social...',
          attachments: ['ensayo_revolucion.docx'],
          submittedAt: '2024-01-18T10:30:00Z',
          grade: 85,
          feedback: 'Excelente trabajo, muy bien estructurado. Considera profundizar más en las consecuencias sociales.'
        }
      },
      {
        id: '3',
        title: 'Ejercicios de Álgebra',
        description: 'Resolver los ejercicios de las páginas 45-50 del libro de texto sobre ecuaciones cuadráticas.',
        subject: 'Matemáticas',
        grade: '10°A',
        dueDate: '2024-01-22',
        status: 'pending',
        teacher: 'Prof. María García'
      }
    ];
    setAssignedTasks(mockTasks);
  };

  const loadSubmissions = async () => {
    // Simular carga de envíos
    const mockSubmissions = [
      {
        id: 'sub1',
        taskId: '2',
        content: 'La Revolución Mexicana fue un movimiento social...',
        attachments: ['ensayo_revolucion.docx'],
        submittedAt: '2024-01-18T10:30:00Z',
        grade: 85,
        feedback: 'Excelente trabajo, muy bien estructurado.'
      }
    ];
    setSubmissions(mockSubmissions);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSubmissionFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setSubmissionFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitTask = async () => {
    if (!selectedTask || !submissionContent.trim()) return;

    setIsSubmitting(true);

    try {
      // Simular envío
      const newSubmission = {
        id: Date.now().toString(),
        taskId: selectedTask.id,
        content: submissionContent,
        attachments: submissionFiles.map(f => f.name),
        submittedAt: new Date().toISOString(),
        grade: undefined,
        feedback: undefined
      };

      setSubmissions(prev => [...prev, newSubmission]);
      
      // Actualizar estado de la tarea
      setAssignedTasks(prev => prev.map(task => 
        task.id === selectedTask.id 
          ? { ...task, status: 'submitted' as const, submission: newSubmission }
          : task
      ));

      setSubmissionContent('');
      setSubmissionFiles([]);
      setShowSubmissionModal(false);
      setSelectedTask(null);

      // Simular éxito
      alert('¡Tarea enviada exitosamente!');
    } catch (error) {
      console.error('Error al enviar tarea:', error);
      alert('Error al enviar la tarea. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'graded': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'submitted': return <CheckCircle className="w-4 h-4" />;
      case 'graded': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'submitted': return 'Enviada';
      case 'graded': return 'Calificada';
      default: return 'Desconocido';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mis Tareas</h2>
          <p className="text-gray-600">Envía tus tareas asignadas por los maestros</p>
        </div>
        <div className="text-sm text-gray-600">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-yellow-600" />
              Pendientes: {assignedTasks.filter(t => t.status === 'pending').length}
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              Enviadas: {assignedTasks.filter(t => t.status === 'submitted').length}
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Calificadas: {assignedTasks.filter(t => t.status === 'graded').length}
            </span>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="grid gap-4">
        {assignedTasks.map(task => (
          <Card key={task.id} className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(task.status)}`}>
                    {getStatusIcon(task.status)}
                    {getStatusText(task.status)}
                  </span>
                  {isOverdue(task.dueDate) && task.status === 'pending' && (
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      Vencida
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Materia:</span>
                    <p className="text-sm text-gray-900">{task.subject}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Maestro:</span>
                    <p className="text-sm text-gray-900">{task.teacher}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-600">Fecha límite:</span>
                    <p className={`text-sm ${isOverdue(task.dueDate) && task.status === 'pending' ? 'text-red-600 font-medium' : 'text-gray-900'}`}>
                      {formatDate(task.dueDate)}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{task.description}</p>

                {task.attachments && task.attachments.length > 0 && (
                  <div className="mb-4">
                    <span className="text-sm font-medium text-gray-600">Archivos adjuntos:</span>
                    <div className="flex gap-2 mt-1">
                      {task.attachments.map((file, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                        >
                          <Download className="w-3 h-3 mr-1" />
                          {file}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {task.submission && (
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Tu envío:</h4>
                    <p className="text-sm text-gray-700 mb-2">{task.submission.content}</p>
                    <div className="text-xs text-gray-600">
                      Enviado el: {formatDate(task.submission.submittedAt)}
                    </div>
                    {task.submission.grade && (
                      <div className="mt-2 p-2 bg-green-50 rounded">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-green-800">
                            Calificación: {task.submission.grade}/100
                          </span>
                        </div>
                        {task.submission.feedback && (
                          <p className="text-sm text-green-700 mt-1">
                            {task.submission.feedback}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex gap-2 ml-4">
                {task.status === 'pending' && (
                  <Button
                    onClick={() => {
                      setSelectedTask(task);
                      setShowSubmissionModal(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Enviar
                  </Button>
                )}
                <Button
                  onClick={() => {
                    setSelectedTask(task);
                    setShowViewModal(true);
                  }}
                  variant="outline"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Ver
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Submission Modal */}
      {showSubmissionModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">Enviar Tarea: {selectedTask.title}</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Descripción de la tarea:</label>
                <div className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700">
                  {selectedTask.description}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tu respuesta:</label>
                <textarea
                  value={submissionContent}
                  onChange={(e) => setSubmissionContent(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={6}
                  placeholder="Escribe tu respuesta aquí..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Archivos adjuntos:</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Hacer clic para seleccionar archivos</span>
                  </label>
                </div>
                
                {submissionFiles.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {submissionFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <Button
                          onClick={() => removeFile(index)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          Eliminar
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button
                onClick={handleSubmitTask}
                disabled={!submissionContent.trim() || isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Tarea'}
              </Button>
              <Button
                onClick={() => {
                  setShowSubmissionModal(false);
                  setSelectedTask(null);
                  setSubmissionContent('');
                  setSubmissionFiles([]);
                }}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4">{selectedTask.title}</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm font-medium text-gray-600">Materia:</span>
                  <p className="text-sm text-gray-900">{selectedTask.subject}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Maestro:</span>
                  <p className="text-sm text-gray-900">{selectedTask.teacher}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Fecha límite:</span>
                  <p className="text-sm text-gray-900">{formatDate(selectedTask.dueDate)}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-600">Estado:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(selectedTask.status)}`}>
                    {getStatusIcon(selectedTask.status)}
                    {getStatusText(selectedTask.status)}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-600">Descripción:</span>
                <p className="text-sm text-gray-900 mt-1">{selectedTask.description}</p>
              </div>

              {selectedTask.attachments && selectedTask.attachments.length > 0 && (
                <div>
                  <span className="text-sm font-medium text-gray-600">Archivos adjuntos:</span>
                  <div className="flex gap-2 mt-1">
                    {selectedTask.attachments.map((file, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        {file}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {selectedTask.submission && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Tu envío:</h4>
                  <p className="text-sm text-gray-700 mb-2">{selectedTask.submission.content}</p>
                  <div className="text-xs text-gray-600 mb-2">
                    Enviado el: {formatDate(selectedTask.submission.submittedAt)}
                  </div>
                  {selectedTask.submission.grade && (
                    <div className="p-3 bg-green-50 rounded">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-800">
                          Calificación: {selectedTask.submission.grade}/100
                        </span>
                      </div>
                      {selectedTask.submission.feedback && (
                        <p className="text-sm text-green-700">
                          {selectedTask.submission.feedback}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-6">
              <Button
                onClick={() => {
                  setShowViewModal(false);
                  setSelectedTask(null);
                }}
                className="flex-1"
              >
                Cerrar
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StudentTaskUpload;
