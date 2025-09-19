// Tipos de datos para IGER — Escuela Smart

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'estudiante' | 'maestro' | 'administrador';
  classroomId?: string;
  avatar: string;
  parentConsent?: boolean;
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