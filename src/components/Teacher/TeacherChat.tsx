import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MessageCircle, Send, Bot, User, BookOpen, Lightbulb, Target } from 'lucide-react';
import OpenAIService, { ChatMessage, ChatContext } from '../../services/openAIService';

interface TeacherChatProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

const TeacherChat: React.FC<TeacherChatProps> = ({ user }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const openaiService = OpenAIService.getInstance();

  useEffect(() => {
    // Mensaje de bienvenida
    const welcomeMessage: ChatMessage = {
      role: 'assistant',
      content: `¡Hola ${user.name}! Soy tu asistente IA especializado en educación. Puedo ayudarte con:

📚 **Planificación de clases**
📝 **Creación de tareas y evaluaciones**
📊 **Estrategias pedagógicas**
🎯 **Gestión del calendario académico**
💡 **Consejos de enseñanza**

¿En qué puedo ayudarte hoy?`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [user.name]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      const context: ChatContext = {
        userRole: 'teacher',
        userName: user.name,
        subject: 'General',
        grade: '10°'
      };

      const response = await openaiService.sendMessage(
        [...messages, userMessage],
        context
      );

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error en chat:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'Lo siento, no pude procesar tu mensaje. Verifica que la API key de OpenAI esté configurada correctamente.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const suggestions = [
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "Planificar una clase",
      text: "Ayúdame a planificar una clase de matemáticas sobre ecuaciones cuadráticas para estudiantes de 10° grado"
    },
    {
      icon: <Target className="w-5 h-5" />,
      title: "Crear evaluación",
      text: "Necesito crear un examen de historia sobre la Revolución Mexicana con diferentes tipos de preguntas"
    },
    {
      icon: <Lightbulb className="w-5 h-5" />,
      title: "Estrategia pedagógica",
      text: "¿Qué estrategias puedo usar para mantener la atención de estudiantes adolescentes en clase?"
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      title: "Gestión de aula",
      text: "Tengo problemas con la disciplina en mi clase, ¿qué técnicas puedo implementar?"
    }
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Asistente IA para Maestros</h2>
            <p className="text-sm opacity-90">Especializado en educación y pedagogía</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-start gap-2">
                {message.role === 'assistant' && (
                  <Bot className="w-5 h-5 mt-0.5 text-purple-600 flex-shrink-0" />
                )}
                {message.role === 'user' && (
                  <User className="w-5 h-5 mt-0.5 text-blue-200 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  <div className={`text-xs mt-1 ${
                    message.role === 'user' ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    {message.timestamp?.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-purple-600" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggestions */}
      {showSuggestions && messages.length === 1 && (
        <div className="p-4 border-t bg-gray-50">
          <h3 className="text-sm font-medium text-gray-700 mb-3">💡 Sugerencias de inicio:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                onClick={() => handleSuggestionClick(suggestion.text)}
                variant="outline"
                className="h-auto p-3 text-left justify-start hover:bg-blue-50 hover:border-blue-300"
              >
                <div className="flex items-start gap-3">
                  <div className="text-blue-600 mt-0.5">
                    {suggestion.icon}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{suggestion.title}</div>
                    <div className="text-xs text-gray-600 mt-1">{suggestion.text}</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Escribe tu pregunta o solicitud..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 px-4"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="mt-2 text-xs text-gray-500 text-center">
          💡 Tip: Puedes preguntar sobre planificación de clases, estrategias pedagógicas, gestión de aula y más
        </div>
      </div>
    </div>
  );
};

export default TeacherChat;
