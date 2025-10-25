import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { User } from '../../types';
import { openAIService } from '../../services/openAIService';
import { 
  Send, 
  Bot, 
  User as UserIcon, 
  BookOpen, 
  Lightbulb, 
  Target, 
  Users, 
  BarChart3,
  Clock,
  Star,
  MessageCircle,
  GraduationCap,
  Award,
  TrendingUp
} from 'lucide-react';

interface TeacherChatProps {
  user: User;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  type?: 'general' | 'pedagogical' | 'assessment' | 'classroom';
}

export const TeacherChat: React.FC<TeacherChatProps> = ({ user }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: `¡Hola ${user.name}! Soy tu asistente pedagógico especializado. Puedo ayudarte con:\n\n📚 Planificación de clases\n📊 Estrategias de evaluación\n👥 Gestión del aula\n💡 Ideas pedagógicas\n📈 Análisis de rendimiento\n\n¿En qué puedo ayudarte hoy?`,
      timestamp: new Date(),
      type: 'general'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const categories = [
    {
      id: 'pedagogical',
      label: 'Estrategias Pedagógicas',
      icon: BookOpen,
      color: 'bg-blue-500',
      description: 'Ideas para mejorar la enseñanza'
    },
    {
      id: 'assessment',
      label: 'Evaluación',
      icon: Target,
      color: 'bg-green-500',
      description: 'Herramientas de evaluación'
    },
    {
      id: 'classroom',
      label: 'Gestión del Aula',
      icon: Users,
      color: 'bg-purple-500',
      description: 'Manejo de estudiantes'
    },
    {
      id: 'planning',
      label: 'Planificación',
      icon: Clock,
      color: 'bg-orange-500',
      description: 'Organización de clases'
    }
  ];

  const quickPrompts = [
    {
      category: 'pedagogical',
      prompt: '¿Cómo puedo hacer más interactiva mi clase de Ciencias?',
      icon: BookOpen
    },
    {
      category: 'assessment',
      prompt: 'Sugiere métodos de evaluación para estudiantes de diferentes niveles',
      icon: Target
    },
    {
      category: 'classroom',
      prompt: '¿Cómo manejar estudiantes disruptivos en el aula?',
      icon: Users
    },
    {
      category: 'planning',
      prompt: 'Ayúdame a planificar una clase de 45 minutos sobre fracciones',
      icon: Clock
    }
  ];

  const sendMessage = async (message: string, category?: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date(),
      type: category as any
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await openAIService.sendTeacherMessage(message, category);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        type: category as any
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, inténtalo de nuevo.',
        timestamp: new Date(),
        type: 'general'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (prompt: string, category: string) => {
    setSelectedCategory(category);
    sendMessage(prompt, category);
  };

  const getMessageIcon = (message: ChatMessage) => {
    if (message.role === 'user') {
      return <UserIcon className="w-5 h-5 text-blue-600" />;
    }

    switch (message.type) {
      case 'pedagogical':
        return <BookOpen className="w-5 h-5 text-blue-600" />;
      case 'assessment':
        return <Target className="w-5 h-5 text-green-600" />;
      case 'classroom':
        return <Users className="w-5 h-5 text-purple-600" />;
      case 'planning':
        return <Clock className="w-5 h-5 text-orange-600" />;
      default:
        return <Bot className="w-5 h-5 text-gray-600" />;
    }
  };

  const getMessageColor = (message: ChatMessage) => {
    if (message.role === 'user') {
      return 'bg-blue-50 border-blue-200';
    }

    switch (message.type) {
      case 'pedagogical':
        return 'bg-blue-50 border-blue-200';
      case 'assessment':
        return 'bg-green-50 border-green-200';
      case 'classroom':
        return 'bg-purple-50 border-purple-200';
      case 'planning':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-GT', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <MessageCircle className="w-8 h-8 text-blue-500 mr-3" />
            Chat IA Pedagógico
          </h1>
          <p className="text-gray-600">Tu asistente especializado en educación</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>ProfeIA Online</span>
        </div>
      </div>

      {/* Estadísticas del maestro */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Experiencia</p>
                <p className="text-2xl font-bold">5+ años</p>
              </div>
              <GraduationCap className="w-6 h-6 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Estudiantes</p>
                <p className="text-2xl font-bold">45</p>
              </div>
              <Users className="w-6 h-6 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Materias</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <BookOpen className="w-6 h-6 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Promedio</p>
                <p className="text-2xl font-bold">85%</p>
              </div>
              <TrendingUp className="w-6 h-6 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categorías */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Categorías</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-50 border-2 border-blue-200'
                          : 'hover:bg-gray-50 border-2 border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${category.color} text-white`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{category.label}</p>
                          <p className="text-xs text-gray-600">{category.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Prompts rápidos */}
          <Card className="mt-4">
            <CardHeader>
              <h3 className="text-lg font-semibold">Prompts Rápidos</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quickPrompts.map((prompt, index) => {
                  const IconComponent = prompt.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuickPrompt(prompt.prompt, prompt.category)}
                      className="w-full p-3 rounded-lg text-left hover:bg-gray-50 transition-colors border border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-4 h-4 text-gray-600" />
                        <p className="text-sm text-gray-700">{prompt.prompt}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="bg-blue-50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900">ProfeIA</h3>
                  <p className="text-sm text-blue-700">Asistente Pedagógico Especializado</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Mensajes */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex-shrink-0">
                        {getMessageIcon(message)}
                      </div>
                    )}
                    
                    <div className={`max-w-[80%] p-3 rounded-lg border ${getMessageColor(message)}`}>
                      <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>

                    {message.role === 'user' && (
                      <div className="flex-shrink-0">
                        <UserIcon className="w-5 h-5 text-blue-600" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="flex-shrink-0">
                      <Bot className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <span className="text-sm text-gray-600">ProfeIA está escribiendo...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage, selectedCategory || undefined)}
                    placeholder="Escribe tu pregunta pedagógica..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={() => sendMessage(inputMessage, selectedCategory || undefined)}
                    disabled={isLoading || !inputMessage.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                
                {selectedCategory && (
                  <div className="mt-2 text-xs text-gray-500">
                    💡 Modo: {categories.find(c => c.id === selectedCategory)?.label}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Consejos pedagógicos */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold flex items-center">
            <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
            Consejos Pedagógicos del Día
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">💡 Interactividad</h4>
              <p className="text-sm text-blue-700">
                Usa preguntas abiertas para mantener la atención de tus estudiantes durante toda la clase.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">📊 Evaluación Continua</h4>
              <p className="text-sm text-green-700">
                Implementa evaluaciones formativas regulares para ajustar tu enseñanza según las necesidades.
              </p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2">👥 Colaboración</h4>
              <p className="text-sm text-purple-700">
                Fomenta el trabajo en equipo para desarrollar habilidades sociales y de comunicación.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
