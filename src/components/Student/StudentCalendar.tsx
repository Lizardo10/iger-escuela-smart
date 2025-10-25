import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Calendar, Clock, Users, BookOpen, Plus, Edit, Trash2 } from 'lucide-react';
import OpenAIService, { ChatMessage, ChatContext } from '../../services/openAIService';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'class' | 'exam' | 'assignment' | 'meeting' | 'holiday';
  description?: string;
  subject?: string;
  grade?: string;
  participants?: string[];
}

interface StudentCalendarProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

const StudentCalendar: React.FC<StudentCalendarProps> = ({ user }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({});
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openaiService = OpenAIService.getInstance();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    // Simular carga de eventos del estudiante
    const mockEvents: CalendarEvent[] = [
      {
        id: '1',
        title: 'Clase de Matemáticas',
        date: '2024-01-15',
        time: '09:00',
        type: 'class',
        subject: 'Matemáticas',
        grade: '10°',
        description: 'Álgebra y ecuaciones cuadráticas'
      },
      {
        id: '2',
        title: 'Examen de Historia',
        date: '2024-01-18',
        time: '14:00',
        type: 'exam',
        subject: 'Historia',
        grade: '10°',
        description: 'Examen parcial sobre Revolución Mexicana'
      },
      {
        id: '3',
        title: 'Entrega de Proyecto',
        date: '2024-01-20',
        time: '23:59',
        type: 'assignment',
        subject: 'Ciencias',
        grade: '10°',
        description: 'Proyecto de investigación sobre ecosistemas'
      }
    ];
    setEvents(mockEvents);
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time) {
      const event: CalendarEvent = {
        id: Date.now().toString(),
        title: newEvent.title!,
        date: newEvent.date!,
        time: newEvent.time!,
        type: newEvent.type || 'class',
        description: newEvent.description,
        subject: newEvent.subject,
        grade: newEvent.grade
      };
      setEvents([...events, event]);
      setNewEvent({});
      setShowAddEvent(false);
    }
  };

  const handleChatSubmit = async () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: chatInput,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsLoading(true);

    try {
      const context: ChatContext = {
        userRole: 'student',
        userName: user.name,
        subject: 'General',
        grade: '10°'
      };

      const response = await openaiService.sendMessage(
        [...chatMessages, userMessage],
        context
      );

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error en chat:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Lo siento, no pude procesar tu mensaje. Verifica que la API key de OpenAI esté configurada correctamente.',
        timestamp: new Date()
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'class': return 'bg-blue-100 text-blue-800';
      case 'exam': return 'bg-red-100 text-red-800';
      case 'assignment': return 'bg-yellow-100 text-yellow-800';
      case 'meeting': return 'bg-green-100 text-green-800';
      case 'holiday': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'class': return <BookOpen className="w-4 h-4" />;
      case 'exam': return <Users className="w-4 h-4" />;
      case 'assignment': return <Edit className="w-4 h-4" />;
      case 'meeting': return <Users className="w-4 h-4" />;
      case 'holiday': return <Calendar className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const renderCalendar = () => {
    const today = new Date();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      const dayEvents = getEventsForDate(current);
      const isCurrentMonth = current.getMonth() === currentDate.getMonth();
      const isToday = current.toDateString() === today.toDateString();
      const isSelected = selectedDate?.toDateString() === current.toDateString();

      days.push(
        <div
          key={i}
          className={`p-2 min-h-[100px] border border-gray-200 cursor-pointer hover:bg-gray-50 ${
            !isCurrentMonth ? 'text-gray-400' : ''
          } ${isToday ? 'bg-blue-50 border-blue-300' : ''} ${
            isSelected ? 'bg-blue-100 border-blue-400' : ''
          }`}
          onClick={() => setSelectedDate(current)}
        >
          <div className="text-sm font-medium mb-1">{current.getDate()}</div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map(event => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded ${getEventTypeColor(event.type)}`}
                title={event.title}
              >
                <div className="flex items-center gap-1">
                  {getEventTypeIcon(event.type)}
                  <span className="truncate">{event.title}</span>
                </div>
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-gray-500">
                +{dayEvents.length - 2} más
              </div>
            )}
          </div>
        </div>
      );
      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mi Calendario</h2>
          <p className="text-gray-600">Gestiona tus clases, exámenes y tareas</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowChat(!showChat)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            💬 Chat IA
          </Button>
          <Button
            onClick={() => setShowAddEvent(true)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar Evento
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendario Principal */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            {/* Navegación del calendario */}
            <div className="flex justify-between items-center mb-6">
              <Button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                variant="outline"
              >
                ← Anterior
              </Button>
              <h3 className="text-lg font-semibold">
                {currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
              </h3>
              <Button
                onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                variant="outline"
              >
                Siguiente →
              </Button>
            </div>

            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-0 mb-2">
              {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                <div key={day} className="p-2 text-center font-medium text-gray-500 text-sm">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendario */}
            <div className="grid grid-cols-7 gap-0">
              {renderCalendar()}
            </div>
          </Card>
        </div>

        {/* Panel Lateral */}
        <div className="space-y-4">
          {/* Eventos del día seleccionado */}
          {selectedDate && (
            <Card className="p-4">
              <h4 className="font-semibold mb-3">
                Eventos del {selectedDate.toLocaleDateString('es-ES')}
              </h4>
              <div className="space-y-2">
                {getEventsForDate(selectedDate).map(event => (
                  <div key={event.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      {getEventTypeIcon(event.type)}
                      <span className="font-medium text-sm">{event.title}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {event.time}
                    </div>
                    {event.description && (
                      <div className="text-xs text-gray-500 mt-1">
                        {event.description}
                      </div>
                    )}
                  </div>
                ))}
                {getEventsForDate(selectedDate).length === 0 && (
                  <p className="text-gray-500 text-sm">No hay eventos para este día</p>
                )}
              </div>
            </Card>
          )}

          {/* Próximos eventos */}
          <Card className="p-4">
            <h4 className="font-semibold mb-3">Próximos Eventos</h4>
            <div className="space-y-2">
              {events
                .filter(event => new Date(event.date) >= new Date())
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .slice(0, 5)
                .map(event => (
                  <div key={event.id} className="p-2 bg-gray-50 rounded">
                    <div className="text-sm font-medium">{event.title}</div>
                    <div className="text-xs text-gray-600">
                      {new Date(event.date).toLocaleDateString('es-ES')} - {event.time}
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Modal para agregar evento */}
      {showAddEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Agregar Evento</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <input
                  type="text"
                  value={newEvent.title || ''}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Ej: Clase de Matemáticas"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Fecha</label>
                  <input
                    type="date"
                    value={newEvent.date || ''}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Hora</label>
                  <input
                    type="time"
                    value={newEvent.time || ''}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tipo</label>
                <select
                  value={newEvent.type || 'class'}
                  onChange={(e) => setNewEvent({...newEvent, type: e.target.value as any})}
                  className="w-full p-2 border rounded-lg"
                >
                  <option value="class">Clase</option>
                  <option value="exam">Examen</option>
                  <option value="assignment">Tarea</option>
                  <option value="meeting">Reunión</option>
                  <option value="holiday">Feriado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <textarea
                  value={newEvent.description || ''}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  rows={3}
                  placeholder="Descripción del evento..."
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Button onClick={handleAddEvent} className="flex-1">
                Agregar
              </Button>
              <Button
                onClick={() => setShowAddEvent(false)}
                variant="outline"
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Chat IA */}
      {showChat && (
        <div className="fixed bottom-4 right-4 w-80 bg-white border rounded-lg shadow-lg z-50">
          <div className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">💬 Asistente IA</h4>
              <Button
                onClick={() => setShowChat(false)}
                variant="outline"
                size="sm"
              >
                ×
              </Button>
            </div>
          </div>
          <div className="h-64 overflow-y-auto p-4 space-y-2">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-blue-100 ml-8'
                    : 'bg-gray-100 mr-8'
                }`}
              >
                <div className="text-sm">{message.content}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {message.timestamp?.toLocaleTimeString()}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="p-2 bg-gray-100 mr-8 rounded-lg">
                <div className="text-sm text-gray-600">Escribiendo...</div>
              </div>
            )}
          </div>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit()}
                placeholder="Pregunta algo..."
                className="flex-1 p-2 border rounded-lg text-sm"
              />
              <Button onClick={handleChatSubmit} size="sm">
                Enviar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentCalendar;
