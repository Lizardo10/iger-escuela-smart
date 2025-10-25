// Servicio de OpenAI para integración con GPT
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
}

export interface ChatContext {
  userRole: 'admin' | 'teacher' | 'student';
  userName: string;
  subject?: string;
  grade?: string;
}

export class OpenAIService {
  private static instance: OpenAIService;
  private apiKey: string;

  constructor() {
    this.apiKey = OPENAI_API_KEY;
  }

  static getInstance(): OpenAIService {
    if (!OpenAIService.instance) {
      OpenAIService.instance = new OpenAIService();
    }
    return OpenAIService.instance;
  }

  async sendMessage(
    messages: ChatMessage[],
    context: ChatContext
  ): Promise<string> {
    if (!this.apiKey || this.apiKey === 'TU_API_KEY_AQUI') {
      throw new Error('OpenAI API key no configurada');
    }

    try {
      const systemPrompt = this.generateSystemPrompt(context);
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages.map(msg => ({
              role: msg.role,
              content: msg.content
            }))
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error de API: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error en OpenAI Service:', error);
      throw error;
    }
  }

  private generateSystemPrompt(context: ChatContext): string {
    const basePrompt = `Eres un asistente educativo inteligente para IGER Escuela Smart. 
    Usuario: ${context.userName} (${context.userRole})
    Responde de manera educativa, profesional y útil.`;

    switch (context.userRole) {
      case 'admin':
        return `${basePrompt}
        Como administrador, puedes ayudar con:
        - Gestión de usuarios y roles
        - Configuración del sistema
        - Reportes y estadísticas
        - Resolución de problemas técnicos`;
      
      case 'teacher':
        return `${basePrompt}
        Como maestro, puedes ayudar con:
        - Planificación de clases
        - Creación de tareas y evaluaciones
        - Seguimiento de estudiantes
        - Estrategias pedagógicas
        - Gestión del calendario académico`;
      
      case 'student':
        return `${basePrompt}
        Como estudiante, puedes ayudar con:
        - Explicación de conceptos académicos
        - Resolución de ejercicios
        - Técnicas de estudio
        - Motivación y consejos de aprendizaje
        - Organización de tareas`;
      
      default:
        return basePrompt;
    }
  }

  async generateTaskDescription(subject: string, grade: string, topic: string): Promise<string> {
    const prompt = `Genera una descripción detallada para una tarea de ${subject} para grado ${grade} sobre el tema: ${topic}. 
    Incluye objetivos de aprendizaje, instrucciones claras y criterios de evaluación.`;

    return this.sendMessage(
      [{ role: 'user', content: prompt }],
      { userRole: 'teacher', userName: 'Sistema', subject, grade }
    );
  }

  async explainConcept(concept: string, level: string): Promise<string> {
    const prompt = `Explica el concepto "${concept}" de manera clara y didáctica para un estudiante de nivel ${level}. 
    Usa ejemplos prácticos y analogías cuando sea apropiado.`;

    return this.sendMessage(
      [{ role: 'user', content: prompt }],
      { userRole: 'student', userName: 'Estudiante' }
    );
  }
}

export default OpenAIService;
