// Servicio para integración con ChatGPT - llamadas al backend
export interface ChatGPTRequest {
  userId: string;
  classroomId?: string;
  message: string;
  context?: string;
}

export interface ChatGPTResponse {
  response: string;
  metadata: {
    tokens: number;
    model: string;
    timestamp: string;
  };
  moderated: boolean;
}

// En producción, estas llamadas irían a endpoints backend seguros
export const aiService = {
  async askTutor(request: ChatGPTRequest): Promise<ChatGPTResponse> {
    // Simular moderación de contenido
    const inappropriate = checkInappropriateContent(request.message);
    if (inappropriate) {
      return {
        response: "No sé, pregúntale a tu maestro/a. Recuerda hacer preguntas apropiadas para la escuela.",
        metadata: {
          tokens: 0,
          model: 'moderation',
          timestamp: new Date().toISOString()
        },
        moderated: true
      };
    }

    // Simular respuesta de IA tutor (en producción: llamar a /api/chatgpt/tutor)
    const mockResponses = [
      "¡Excelente pregunta! Te explico de manera sencilla: ",
      "Me alegra que preguntes. Aquí tienes la respuesta: ",
      "¡Qué bueno que tengas curiosidad! Te ayudo: ",
      "Muy bien, vamos a aprender juntos: "
    ];

    const baseResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
    const specificResponse = generateEducationalResponse(request.message);

    return {
      response: baseResponse + specificResponse,
      metadata: {
        tokens: 150,
        model: 'gpt-4o-mini',
        timestamp: new Date().toISOString()
      },
      moderated: false
    };
  },

  async generateExercise(subject: string, level: string): Promise<string> {
    // Simular generación de ejercicios
    const exercises = {
      matemáticas: [
        "Cuenta cuántos lápices hay en tu escritorio y escribe el número.",
        "Dibuja 5 círculos y coloréalos de diferentes colores.",
        "¿Cuánto es 2 + 3? Puedes usar tus dedos para contar."
      ],
      lenguaje: [
        "Escribe tu nombre con letras grandes y bonitas.",
        "Encuentra 3 cosas en tu cuarto que empiecen con la letra 'A'.",
        "Lee este cuento corto y dibuja tu parte favorita."
      ]
    };

    const subjectExercises = exercises[subject as keyof typeof exercises] || exercises.matemáticas;
    return subjectExercises[Math.floor(Math.random() * subjectExercises.length)];
  }
};

function checkInappropriateContent(message: string): boolean {
  // Lista básica de palabras/frases inapropiadas
  const inappropriate = ['violencia', 'malo', 'odio', 'pelea'];
  return inappropriate.some(word => message.toLowerCase().includes(word));
}

function generateEducationalResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('suma') || lowerMessage.includes('más')) {
    return "Para sumar, puedes usar tus dedos o contar objetos. Por ejemplo, 2 + 3 = 5. ¡Practica contando!";
  }
  
  if (lowerMessage.includes('letra') || lowerMessage.includes('escribir')) {
    return "Las letras son muy importantes. Practica escribiendo despacio y con buena postura. ¡Te está saliendo muy bien!";
  }
  
  if (lowerMessage.includes('color')) {
    return "Los colores nos ayudan a expresar sentimientos y hacer bonitos nuestros trabajos. ¿Cuál es tu color favorito?";
  }
  
  return "Esa es una pregunta muy inteligente. Sigue preguntando y aprendiendo. Si necesitas más ayuda, habla con tu maestro/a.";
}

// Ejemplo de función para llamada real al backend (comentado)
/*
async function callBackendChatGPT(request: ChatGPTRequest): Promise<ChatGPTResponse> {
  const response = await fetch('/api/chatgpt/tutor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`
    },
    body: JSON.stringify(request)
  });
  
  if (!response.ok) {
    throw new Error('Error en la llamada al tutor IA');
  }
  
  return response.json();
}
*/