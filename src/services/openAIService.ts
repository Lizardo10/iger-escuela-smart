interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

class OpenAIService {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1';

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENAI_API_KEY || '';
  }

  async sendMessage(message: string, systemPrompt?: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const messages: ChatMessage[] = [];
    
    if (systemPrompt) {
      messages.push({ role: 'assistant', content: systemPrompt });
    }
    
    messages.push({ role: 'user', content: message });

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: messages,
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || 'No response received';
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw error;
    }
  }

  async sendStudentMessage(message: string): Promise<string> {
    const systemPrompt = `Eres un tutor educativo especializado para estudiantes. Tu nombre es EduBot. Eres amigable, motivador y ayudas con el aprendizaje. Siempre responde en español de manera positiva y educativa.`;
    return this.sendMessage(message, systemPrompt);
  }

  async sendTeacherMessage(message: string, category?: string): Promise<string> {
    let systemPrompt = `Eres un asistente pedagógico especializado para maestros. Tu nombre es ProfeIA. Eres experto en educación, pedagogía y gestión del aula. Siempre responde en español de manera profesional pero amigable.`;

    switch (category) {
      case 'pedagogical':
        systemPrompt += ` Te especializas en estrategias pedagógicas, metodologías de enseñanza, y técnicas para mejorar el aprendizaje de los estudiantes.`;
        break;
      case 'assessment':
        systemPrompt += ` Te especializas en evaluación educativa, métodos de calificación, y herramientas para medir el progreso de los estudiantes.`;
        break;
      case 'classroom':
        systemPrompt += ` Te especializas en gestión del aula, manejo de comportamiento, y técnicas para mantener un ambiente de aprendizaje positivo.`;
        break;
      case 'planning':
        systemPrompt += ` Te especializas en planificación educativa, organización de clases, y diseño de actividades.`;
        break;
    }

    return this.sendMessage(message, systemPrompt);
  }
}

export const openAIService = new OpenAIService();
