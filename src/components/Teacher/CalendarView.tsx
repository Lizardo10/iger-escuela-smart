import React, { useState } from 'react';
import { Calendar, Clock, Users, BookOpen, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { User as UserType, Classroom } from '../../types';

interface CalendarViewProps {
  user: UserType;
  classrooms: Classroom[];
  onViewChange: (view: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ user, classrooms, onViewChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Datos simulados de eventos y clases
  const events = [
    {
      id: '1',
      title: 'Clase de Matemáticas - Aula 1A',
      time: '08:00 - 09:00',
      classroom: 'Aula 1A',
      type: 'class',
      date: new Date().toISOString().split('T')[0]
    },
    {
      id: '2',
      title: 'Reunión de Padres - 2do Grado',
      time: '14:00 - 15:00',
      classroom: 'Aula Principal',
      type: 'meeting',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    {
      id: '3',
      title: 'Evaluación de Ciencias',
      time: '10:00 - 11:00',
      classroom: 'Aula 2B',
      type: 'exam',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Días del mes anterior
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Días del mes actual
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateString);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'class': return 'bg-blue-500';
      case 'meeting': return 'bg-green-500';
      case 'exam': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const selectedDateEvents = getEventsForDate(selectedDate);

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-4 sm:p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Calendario Académico 📅</h1>
            <p className="text-indigo-100 text-base sm:text-lg">Gestiona tus clases y eventos</p>
          </div>
          <Button 
            variant="ghost"
            className="text-white border-white hover:bg-white hover:text-indigo-600"
            onClick={() => alert('Crear nuevo evento')}
          >
            <Plus size={16} className="mr-2" />
            Nuevo Evento
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendario */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <div className="flex space-x-2">
                  <Button size="sm" variant="ghost" onClick={() => navigateMonth('prev')}>
                    <ChevronLeft size={16} />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setCurrentDate(new Date())}>
                    Hoy
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => navigateMonth('next')}>
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Días de la semana */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {dayNames.map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                    {day}
                  </div>
                ))}
              </div>

              {/* Días del mes */}
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentDate).map((day, index) => {
                  if (!day) {
                    return <div key={index} className="p-2"></div>;
                  }

                  const dayEvents = getEventsForDate(day);
                  const isToday = day.toDateString() === new Date().toDateString();
                  const isSelected = day.toDateString() === selectedDate.toDateString();

                  return (
                    <button
                      key={day.toISOString()}
                      onClick={() => setSelectedDate(day)}
                      className={`p-2 text-center text-sm rounded-lg transition-colors ${
                        isSelected ? 'bg-blue-500 text-white' :
                        isToday ? 'bg-blue-100 text-blue-700' :
                        'hover:bg-gray-100'
                      }`}
                    >
                      <div className="font-medium">{day.getDate()}</div>
                      {dayEvents.length > 0 && (
                        <div className="flex justify-center space-x-1 mt-1">
                          {dayEvents.slice(0, 3).map(event => (
                            <div
                              key={event.id}
                              className={`w-1 h-1 rounded-full ${getEventTypeColor(event.type)}`}
                            />
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="w-1 h-1 rounded-full bg-gray-400" />
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Panel lateral */}
        <div className="space-y-6">
          {/* Eventos del día seleccionado */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold">
                {selectedDate.toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-3">
                  {selectedDateEvents.map(event => (
                    <div key={event.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full mt-1 ${getEventTypeColor(event.type)}`} />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800">{event.title}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock size={12} />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Users size={12} />
                          <span>{event.classroom}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No hay eventos para este día</p>
              )}
            </CardContent>
          </Card>

          {/* Próximas clases */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold">Próximas Clases</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {classrooms.map(classroom => (
                  <div key={classroom.id} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{classroom.name}</h4>
                      <p className="text-sm text-gray-600">{classroom.students.length} estudiantes</p>
                      <p className="text-sm text-gray-600">Próxima: 08:00 AM</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
