import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, AlertCircle, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { aiService } from '../../services/aiService';
import { User as UserType, ChatMessage } from '../../types';

interface AITutorChatProps {
  user: UserType;
}

export const AITutorChat: React.FC<AITutorChatProps> = ({ user }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: `¡Hola ${user.name}! Soy tu tutor virtual. Estoy aquí para ayudarte con tus estudios. ¿En qué puedo ayudarte hoy? 🤖`,
      role: 'assistant',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage.trim(),
      role: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await aiService.askTutor({
        userId: user.id,
        classroomId: user.classroomId,
        message: inputMessage.trim(),
        context: 'student_chat'
      });

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response.response,
        role: 'assistant',
        timestamp: new Date().toISOString(),
        moderated: response.moderated
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Lo siento, no pude entender tu pregunta. Por favor intenta de nuevo o habla con tu maestro/a.',
        role: 'assistant',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    "¿Cómo sumo números?",
    "¿Cuáles son las vocales?",
    "¿Qué colores primarios hay?",
    "Ayúdame con mi tarea"
  ];

  return (
    <div className="h-full flex flex-col p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Tu Tutor IA 🤖</h1>
        <p className="text-gray-600">Pregúntame lo que necesites para tus estudios</p>
      </div>

      {/* Advertencia de Seguridad */}
      <Card className="mb-4 border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="text-yellow-600 mt-1" size={20} />
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-1">Recuerda:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Solo haz preguntas sobre tus estudios</li>
                <li>Si tienes dudas importantes, habla con tu maestro/a</li>
                <li>Nunca compartas información personal</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Área de Chat */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot size={24} />
            </div>
            <div>
              <h3 className="font-bold">Tutor IA</h3>
              <p className="text-sm text-purple-100">Siempre disponible para ayudarte</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                    message.role === 'user' ? 'bg-blue-500 ml-2' : 'bg-purple-500 mr-2'
                  }`}>
                    {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-4 rounded-2xl ${
                    message.role === 'user' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  } ${message.moderated ? 'border-2 border-orange-300' : ''}`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-2 ${
                      message.role === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white mr-2">
                    <Bot size={16} />
                  </div>
                  <div className="bg-gray-100 p-4 rounded-2xl">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Preguntas Rápidas */}
          {messages.length <= 1 && (
            <div className="p-4 border-t border-gray-100">
              <p className="text-sm text-gray-600 mb-3">Preguntas frecuentes:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(question)}
                    className="p-2 text-sm bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors text-left"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input de Mensaje */}
          <div className="p-4 border-t border-gray-100">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escribe tu pregunta aquí..."
                className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                disabled={isLoading}
                maxLength={500}
              />
              <Button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="bg-purple-500 hover:bg-purple-600"
              >
                <Send size={16} />
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-2">
              Máximo 500 caracteres • Hecho con <Heart size={12} className="inline text-red-500" /> para estudiantes
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};