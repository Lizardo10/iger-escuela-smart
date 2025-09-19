import { useState, useEffect } from 'react';
import { Lesson, Task, ChatSession, Achievement, Classroom } from '../types';

// Datos de muestra para desarrollo
const mockClassrooms: Classroom[] = [
  {
    id: 'aula-1a',
    name: '1° Básico A',
    teacherId: 'teacher-1',
    students: ['student-1', 'student-2', 'student-3'],
    schedule: [
      { day: 'Lunes', startTime: '08:00', endTime: '10:00', subject: 'Matemáticas' },
      { day: 'Lunes', startTime: '10:30', endTime: '12:00', subject: 'Comunicación y Lenguaje' }
    ],
    createdAt: new Date().toISOString()
  },
  {
    id: 'aula-2a',
    name: '2° Básico A',
    teacherId: 'teacher-2',
    students: ['student-4', 'student-5', 'student-6'],
    schedule: [
      { day: 'Martes', startTime: '08:00', endTime: '10:00', subject: 'Ciencias Naturales' },
      { day: 'Martes', startTime: '10:30', endTime: '12:00', subject: 'Estudios Sociales' }
    ],
    createdAt: new Date().toISOString()
  }
];

const mockLessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Los Números del 1 al 10',
    description: 'Aprenderemos a contar hasta 10 con ejemplos divertidos',
    content: 'En esta lección veremos los números básicos...',
    resources: [
      { id: 'res-1', name: 'Video de números', type: 'video', url: 'https://example.com/video1' },
      { id: 'res-2', name: 'Ejercicios de práctica', type: 'document', url: 'https://example.com/doc1' }
    ],
    classroomId: 'aula-1a',
    createdBy: 'teacher-1',
    createdAt: new Date().toISOString()
  },
  {
    id: 'lesson-2',
    title: 'Las Vocales A, E, I, O, U',
    description: 'Conoceremos las cinco vocales con canciones y ejercicios',
    content: 'Las vocales son la base del lenguaje...',
    resources: [
      { id: 'res-3', name: 'Canción de las vocales', type: 'video', url: 'https://example.com/video2' }
    ],
    classroomId: 'aula-1a',
    createdBy: 'teacher-1',
    createdAt: new Date().toISOString()
  }
];

const mockTasks: Task[] = [
  {
    id: 'task-1',
    title: 'Contar hasta 10',
    description: 'Practica contando del 1 al 10 con objetos de tu casa',
    lessonId: 'lesson-1',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: ['student-1', 'student-2', 'student-3'],
    status: 'pending',
    createdBy: 'teacher-1',
    createdAt: new Date().toISOString()
  },
  {
    id: 'task-2',
    title: 'Escribir las vocales',
    description: 'Escribe cada vocal 5 veces en tu cuaderno',
    lessonId: 'lesson-2',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    assignedTo: ['student-1'],
    status: 'pending',
    createdBy: 'teacher-1',
    createdAt: new Date().toISOString()
  }
];

const mockAchievements: Achievement[] = [
  {
    id: 'ach-1',
    title: '¡Primera Lección!',
    description: 'Completaste tu primera lección',
    icon: 'star',
    points: 100,
    unlockedAt: new Date().toISOString()
  },
  {
    id: 'ach-2',
    title: 'Matemático Junior',
    description: 'Completaste 5 lecciones de matemáticas',
    icon: 'calculator',
    points: 250
  }
];

export const useData = (userRole: string, userId?: string) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setTimeout(() => {
      setLessons(mockLessons);
      setTasks(mockTasks);
      setAchievements(mockAchievements);
      setClassrooms(mockClassrooms);
      setLoading(false);
    }, 1000);
  }, []);

  const addLesson = (lesson: Omit<Lesson, 'id' | 'createdAt'>) => {
    const newLesson = {
      ...lesson,
      id: Math.random().toString(36),
      createdAt: new Date().toISOString()
    };
    setLessons(prev => [...prev, newLesson]);
  };

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask = {
      ...task,
      id: Math.random().toString(36),
      createdAt: new Date().toISOString()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const completeTask = (taskId: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, status: 'completed' as const } : task
      )
    );
  };

  return {
    lessons,
    tasks,
    achievements,
    classrooms,
    loading,
    addLesson,
    addTask,
    completeTask
  };
};