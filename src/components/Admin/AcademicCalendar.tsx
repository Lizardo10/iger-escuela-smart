import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Calendar, Plus, Edit, Trash2, Clock, Users, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';
import { AcademicYear, Classroom, ScheduleItem } from '../../types';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime?: string;
  endTime?: string;
  type: 'clase' | 'examen' | 'evento' | 'vacaciones' | 'reunion';
  classroomId?: string;
  isRecurring: boolean;
  recurringDays?: string[];
  color: string;
  createdAt: string;
}

interface AcademicCalendarProps {
  onEventSelect?: (event: CalendarEvent) => void;
}

export const AcademicCalendar: React.FC<AcademicCalendarProps> = ({ onEventSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [academicYears, setAcademicYears] = useState<AcademicYear[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    type: 'clase' as CalendarEvent['type'],
    classroomId: '',
    isRecurring: false,
    recurringDays: [] as string[]
  });

  // Datos simulados
  useEffect(() => {
    const mockClassrooms: Classroom[] = [
      {
        id: 'aula-1a',
        name: 'Aula 1A - Primer Grado',
        teacherId: 'teacher-1',
        students: [],
        schedule: [
          { day: 'Lunes', startTime: '08:00', endTime: '09:00', subject: 'Matemáticas' },
          { day: 'Martes', startTime: '08:00', endTime: '09:00', subject: 'Lenguaje' },
          { day: 'Miércoles', startTime: '08:00', endTime: '09:00', subject: 'Ciencias' }
        ],
        createdAt: '2024-01-15T10:00:00Z'
      },
      {
        id: 'aula-2b',
        name: 'Aula 2B - Segundo Grado',
        teacherId: 'teacher-2',
        students: [],
        schedule: [
          { day: 'Lunes', startTime: '10:00', endTime: '11:00', subject: 'Matemáticas' },
          { day: 'Martes', startTime: '10:00', endTime: '11:00', subject: 'Lenguaje' },
          { day: 'Miércoles', startTime: '10:00', endTime: '11:00', subject: 'Ciencias' }
        ],
        createdAt: '2024-01-20T14:30:00Z'
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
      }
    ];

    const mockEvents: CalendarEvent[] = [
      {
        id: 'event-1',
        title: 'Inicio de Clases',
        description: 'Primer día del año académico 2024',
        date: '2024-01-15',
        type: 'evento',
        isRecurring: false,
        color: 'bg-blue-500',
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'event-2',
        title: 'Examen de Matemáticas',
        description: 'Examen parcial de matemáticas para primer grado',
        date: '2024-02-15',
        startTime: '09:00',
        endTime: '10:00',
        type: 'examen',
        classroomId: 'aula-1a',
        isRecurring: false,
        color: 'bg-red-500',
        createdAt: '2024-01-15T00:00:00Z'
      },
      {
        id: 'event-3',
        title: 'Vacaciones de Semana Santa',
        description: 'Período de vacaciones de Semana Santa',
        date: '2024-03-25',
        type: 'vacaciones',
        isRecurring: false,
        color: 'bg-green-500',
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'event-4',
        title: 'Reunión de Padres',
        description: 'Reunión mensual con padres de familia',
        date: '2024-02-28',
        startTime: '18:00',
        endTime: '19:30',
        type: 'reunion',
        isRecurring: false,
        color: 'bg-purple-500',
        createdAt: '2024-01-20T00:00:00Z'
      }
    ];

    setClassrooms(mockClassrooms);
    setAcademicYears(mockAcademicYears);
    setEvents(mockEvents);
  }, []);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Días del mes anterior
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      days.push({ date: currentDate, isCurrentMonth: true });
    }
    
    // Días del mes siguiente
    const remainingDays = 42 - days.length; // 6 semanas * 7 días
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({ date: nextDate, isCurrentMonth: false });
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      alert('Por favor completa los campos requeridos');
      return;
    }

    const event: CalendarEvent = {
      id: `event-${Date.now()}`,
      title: newEvent.title,
      description: newEvent.description,
      date: newEvent.date,
      startTime: newEvent.startTime || undefined,
      endTime: newEvent.endTime || undefined,
      type: newEvent.type,
      classroomId: newEvent.classroomId || undefined,
      isRecurring: newEvent.isRecurring,
      recurringDays: newEvent.recurringDays,
      color: getEventTypeColor(newEvent.type),
      createdAt: new Date().toISOString()
    };

    setEvents(prev => [...prev, event]);
    setNewEvent({
      title: '',
      description: '',
      date: '',
      startTime: '',
      endTime: '',
      type: 'clase',
      classroomId: '',
      isRecurring: false,
      recurringDays: []
    });
    setShowCreateForm(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      setEvents(prev => prev.filter(event => event.id !== eventId));
    }
  };

  const getEventTypeColor = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'clase': return 'bg-blue-500';
      case 'examen': return 'bg-red-500';
      case 'evento': return 'bg-green-500';
      case 'vacaciones': return 'bg-yellow-500';
      case 'reunion': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventTypeIcon = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'clase': return <BookOpen size={16} />;
      case 'examen': return <AlertCircle size={16} />;
      case 'evento': return <Calendar size={16} />;
      case 'vacaciones': return <CheckCircle size={16} />;
      case 'reunion': return <Users size={16} />;
      default: return <Calendar size={16} />;
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(newDate.getMonth() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      return newDate;
    });
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Calendario Académico</h2>
          <p className="text-gray-600 mt-1">Gestiona eventos, clases y actividades escolares</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2"
          >
            <Plus size={20} />
            Nuevo Evento
          </Button>
        </div>
      </div>

      {/* Controles del Calendario */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigateMonth('prev')}
              >
                ←
              </Button>
              <h3 className="text-xl font-semibold">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <Button
                variant="outline"
                onClick={() => navigateMonth('next')}
              >
                →
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant={viewMode === 'month' ? 'default' : 'outline'}
                onClick={() => setViewMode('month')}
              >
                Mes
              </Button>
              <Button
                variant={viewMode === 'week' ? 'default' : 'outline'}
                onClick={() => setViewMode('week')}
              >
                Semana
              </Button>
              <Button
                variant={viewMode === 'day' ? 'default' : 'outline'}
                onClick={() => setViewMode('day')}
              >
                Día
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendario */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-7 gap-1 mb-4">
            {weekDays.map(day => (
              <div key={day} className="p-2 text-center font-semibold text-gray-600 text-sm">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              const dayEvents = getEventsForDate(day.date);
              const isToday = day.date.toDateString() === new Date().toDateString();
              
              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 border border-gray-200 ${
                    day.isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                  } ${isToday ? 'bg-blue-50 border-blue-300' : ''}`}
                >
                  <div className={`text-sm font-medium mb-1 ${
                    day.isCurrentMonth ? 'text-gray-800' : 'text-gray-400'
                  } ${isToday ? 'text-blue-600' : ''}`}>
                    {day.date.getDate()}
                  </div>
                  
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map(event => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded text-white cursor-pointer hover:opacity-80 ${event.color}`}
                        onClick={() => setSelectedEvent(event)}
                      >
                        <div className="flex items-center gap-1">
                          {getEventTypeIcon(event.type)}
                          <span className="truncate">{event.title}</span>
                        </div>
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{dayEvents.length - 3} más
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Eventos Próximos */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Eventos Próximos</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {events
              .filter(event => new Date(event.date) >= new Date())
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 5)
              .map(event => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${event.color}`}>
                    {getEventTypeIcon(event.type)}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{event.title}</h4>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                      <span>{new Date(event.date).toLocaleDateString()}</span>
                      {event.startTime && <span>{event.startTime} - {event.endTime}</span>}
                      {event.classroomId && (
                        <span>Aula: {classrooms.find(c => c.id === event.classroomId)?.name}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event);
                      }}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteEvent(event.id);
                      }}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Crear Evento */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Crear Nuevo Evento</h3>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cerrar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Título del Evento *
                  </label>
                  <input
                    type="text"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: Examen de Matemáticas"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción
                  </label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Descripción del evento..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fecha *
                    </label>
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Evento *
                    </label>
                    <select
                      value={newEvent.type}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, type: e.target.value as CalendarEvent['type'] }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="clase">Clase</option>
                      <option value="examen">Examen</option>
                      <option value="evento">Evento</option>
                      <option value="vacaciones">Vacaciones</option>
                      <option value="reunion">Reunión</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hora de Inicio
                    </label>
                    <input
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, startTime: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hora de Fin
                    </label>
                    <input
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent(prev => ({ ...prev, endTime: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aula (Opcional)
                  </label>
                  <select
                    value={newEvent.classroomId}
                    onChange={(e) => setNewEvent(prev => ({ ...prev, classroomId: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar aula</option>
                    {classrooms.map(classroom => (
                      <option key={classroom.id} value={classroom.id}>{classroom.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleCreateEvent} className="flex-1">
                    Crear Evento
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

      {/* Modal de Detalles del Evento */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{selectedEvent.title}</h3>
                <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                  Cerrar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${selectedEvent.color}`}>
                    {getEventTypeIcon(selectedEvent.type)}
                  </div>
                  <div>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${
                      selectedEvent.type === 'clase' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                      selectedEvent.type === 'examen' ? 'bg-red-100 text-red-800 border-red-200' :
                      selectedEvent.type === 'evento' ? 'bg-green-100 text-green-800 border-green-200' :
                      selectedEvent.type === 'vacaciones' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                      'bg-purple-100 text-purple-800 border-purple-200'
                    }`}>
                      {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600">Descripción</label>
                  <p className="text-gray-800">{selectedEvent.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Fecha</label>
                    <p className="text-gray-800">{new Date(selectedEvent.date).toLocaleDateString()}</p>
                  </div>
                  
                  {selectedEvent.startTime && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Horario</label>
                      <p className="text-gray-800">{selectedEvent.startTime} - {selectedEvent.endTime}</p>
                    </div>
                  )}
                </div>

                {selectedEvent.classroomId && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Aula</label>
                    <p className="text-gray-800">{classrooms.find(c => c.id === selectedEvent.classroomId)?.name}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-600">Fecha de Creación</label>
                  <p className="text-gray-800">{new Date(selectedEvent.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
