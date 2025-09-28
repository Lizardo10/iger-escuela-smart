// Tipos de datos para IGER — Escuela Smart

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'estudiante' | 'maestro' | 'administrador';
  classroomId?: string;
  gradeId?: string;
  avatar: string;
  parentConsent?: boolean;
  parentEmail?: string;
  parentPhone?: string;
  birthDate?: string;
  address?: string;
  phone?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Grade {
  id: string;
  name: string;
  level: number; // 1, 2, 3 para básico
  description: string;
  maxStudents: number;
  createdAt: string;
}

export interface Course {
  id: string;
  name: string;
  description: string;
  gradeId: string;
  teacherId: string;
  schedule: ScheduleItem[];
  credits: number;
  isActive: boolean;
  createdAt: string;
}

export interface Payment {
  id: string;
  studentId: string;
  amount: number;
  currency: string;
  description: string;
  paymentMethod: 'efectivo' | 'transferencia' | 'tarjeta';
  status: 'pending' | 'completed' | 'cancelled';
  dueDate: string;
  paidDate?: string;
  receiptNumber?: string;
  createdAt: string;
}

export interface Attendance {
  id: string;
  studentId: string;
  courseId: string;
  date: string;
  status: 'presente' | 'ausente' | 'tardanza' | 'justificado';
  notes?: string;
  recordedBy: string;
  createdAt: string;
}

export interface Report {
  id: string;
  title: string;
  type: 'academico' | 'asistencia' | 'pagos' | 'conducta';
  studentId?: string;
  classroomId?: string;
  gradeId?: string;
  content: string;
  generatedBy: string;
  createdAt: string;
}

export interface AcademicYear {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
}

export interface Classroom {
  id: string;
  name: string;
  teacherId: string;
  students: string[];
  schedule: ScheduleItem[];
  createdAt: string;
}

export interface ScheduleItem {
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  resources: Resource[];
  classroomId: string;
  createdBy: string;
  createdAt: string;
  isCompleted?: boolean;
}

export interface Resource {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'link';
  url: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  lessonId: string;
  dueDate: string;
  assignedTo: string[];
  calendarEventId?: string;
  status: 'pending' | 'completed' | 'overdue';
  createdBy: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: string;
  moderated?: boolean;
}

export interface ChatSession {
  id: string;
  studentId: string;
  messages: ChatMessage[];
  createdAt: string;
  lastActivity: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  points: number;
  unlockedAt?: string;
}