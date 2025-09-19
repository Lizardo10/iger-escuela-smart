# Backend Integration Guide - IGER Escuela Smart

## Resumen de Integración

Esta guía proporciona ejemplos de código para integrar ChatGPT de forma segura y configurar los endpoints necesarios para el sistema IGER.

## 1. Endpoint para Tutor IA (/api/chatgpt/tutor)

```javascript
// backend/api/chatgpt/tutor.js
const fetch = require('node-fetch');

// Configuración de seguridad
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // Almacenado en secrets manager
const MAX_TOKENS = 400;
const RATE_LIMIT = 10; // mensajes por usuario por minuto

// Mensajes del sistema para diferentes contextos
const SYSTEM_MESSAGES = {
  'student_chat': `Eres un tutor virtual para estudiantes de 1° a 3° básico en Guatemala. 
    Responde con lenguaje simple, frases cortas, ejemplos visuales cuando aplique, 
    y nunca solicites datos personales. Si la pregunta es sensible o insegura, 
    responde: "No sé, pregúntale a tu maestro/a" y ofrece enviar la pregunta al docente.`,
  
  'homework_help': `Ayuda con tareas escolares para niños de primaria. 
    Usa ejemplos cotidianos de Guatemala, mantén respuestas apropiadas para la edad 
    y siempre fomenta el aprendizaje activo.`
};

async function moderateContent(message) {
  // Lista de palabras/temas inapropiados
  const inappropriateKeywords = [
    'violencia', 'pelea', 'malo', 'odio', 'drogas', 'alcohol', 'sexo'
  ];
  
  const lowerMessage = message.toLowerCase();
  return inappropriateKeywords.some(keyword => lowerMessage.includes(keyword));
}

exports.handler = async (event, context) => {
  try {
    const { userId, classroomId, message, context: messageContext = 'student_chat' } = JSON.parse(event.body);
    
    // Validación de entrada
    if (!userId || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'userId y message son requeridos' })
      };
    }

    // Verificar rate limiting (implementar con Redis o base de datos)
    // const isRateLimited = await checkRateLimit(userId);
    // if (isRateLimited) {
    //   return { statusCode: 429, body: JSON.stringify({ error: 'Límite de mensajes alcanzado' }) };
    // }

    // Moderar contenido
    const isInappropriate = await moderateContent(message);
    if (isInappropriate) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
          response: "No sé, pregúntale a tu maestro/a. Recuerda hacer preguntas apropiadas para la escuela.",
          metadata: {
            tokens: 0,
            model: 'moderation',
            timestamp: new Date().toISOString()
          },
          moderated: true
        })
      };
    }

    // Preparar mensajes para OpenAI
    const messages = [
      { role: 'system', content: SYSTEM_MESSAGES[messageContext] },
      { role: 'user', content: message }
    ];

    // Llamada a OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini', // Modelo recomendado por costo-efectividad
        messages: messages,
        max_tokens: MAX_TOKENS,
        temperature: 0.6,
        top_p: 0.9,
        frequency_penalty: 0.2
      })
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content || 'No pude generar una respuesta apropiada.';

    // Log de actividad (sin almacenar contenido sensible)
    console.log(`AI Query - User: ${userId}, Tokens: ${data.usage?.total_tokens}, Timestamp: ${new Date().toISOString()}`);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: JSON.stringify({
        response: aiResponse,
        metadata: {
          tokens: data.usage?.total_tokens || 0,
          model: data.model || 'gpt-4o-mini',
          timestamp: new Date().toISOString()
        },
        moderated: false
      })
    };

  } catch (error) {
    console.error('Error in ChatGPT handler:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        response: 'Lo siento, no pude procesar tu pregunta en este momento. Intenta más tarde.',
        metadata: {
          tokens: 0,
          model: 'error',
          timestamp: new Date().toISOString()
        },
        moderated: false,
        error: 'Internal server error'
      })
    };
  }
};
```

## 2. Endpoint para Google Calendar Sync (/api/calendar/sync)

```javascript
// backend/api/calendar/sync.js
const { google } = require('googleapis');

// Configuración OAuth
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

exports.handler = async (event, context) => {
  try {
    const { taskId, title, description, dueDate, teacherId } = JSON.parse(event.body);

    // Configurar cliente OAuth
    const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
    
    // Obtener tokens del usuario (almacenados de forma segura)
    const tokens = await getUserTokens(teacherId); // Implementar función para obtener tokens
    oauth2Client.setCredentials(tokens);

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // Crear evento en Google Calendar
    const event = {
      summary: title,
      description: description,
      start: {
        dateTime: new Date(dueDate).toISOString(),
        timeZone: 'America/Guatemala'
      },
      end: {
        dateTime: new Date(new Date(dueDate).getTime() + 60 * 60 * 1000).toISOString(), // 1 hora después
        timeZone: 'America/Guatemala'
      },
      colorId: '2', // Color específico para tareas escolares
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 día antes
          { method: 'popup', minutes: 60 } // 1 hora antes
        ]
      }
    };

    const result = await calendar.events.insert({
      calendarId: 'primary',
      resource: event
    });

    // Actualizar tarea con el ID del evento de calendario
    await updateTaskWithCalendarId(taskId, result.data.id);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        success: true,
        calendarEventId: result.data.id,
        eventUrl: result.data.htmlLink
      })
    };

  } catch (error) {
    console.error('Calendar sync error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: 'Error al sincronizar con Google Calendar'
      })
    };
  }
};

// Funciones auxiliares
async function getUserTokens(teacherId) {
  // Implementar: obtener tokens OAuth del usuario desde la base de datos
  // Los tokens deben estar encriptados y almacenados de forma segura
  return {
    access_token: 'token_encriptado',
    refresh_token: 'refresh_token_encriptado'
  };
}

async function updateTaskWithCalendarId(taskId, calendarEventId) {
  // Implementar: actualizar la tarea en la base de datos con el ID del evento
  console.log(`Updated task ${taskId} with calendar event ${calendarEventId}`);
}
```

## 3. Checklist de Seguridad y Privacidad

### ✅ Gestión de Claves API
- [ ] OPENAI_API_KEY almacenada en variables de entorno/secrets manager
- [ ] Google OAuth credentials en configuración segura
- [ ] Rotación periódica de claves
- [ ] Monitoreo de uso de APIs para detectar anomalías

### ✅ Moderación y Filtros
- [ ] Lista de palabras inapropiadas implementada
- [ ] Filtro de temas sensibles para menores
- [ ] Rate limiting por usuario (10 mensajes/minuto recomendado)
- [ ] Logs de moderación para auditoría

### ✅ Consentimiento Parental
- [ ] Verificación de consentimiento antes de usar IA
- [ ] Modo restringido para usuarios sin consentimiento
- [ ] Formulario de consentimiento accesible para padres
- [ ] Almacenamiento seguro de consentimientos

### ✅ Privacidad de Datos
- [ ] No almacenar conversaciones IA sin permiso explícito
- [ ] Encriptación de datos sensibles en tránsito y reposo
- [ ] Políticas de retención de datos claras
- [ ] Derecho al olvido implementado

## 4. Variables de Entorno Requeridas

```bash
# OpenAI
OPENAI_API_KEY=sk-proj-xxx...
OPENAI_MODEL=gpt-4o-mini

# Google OAuth
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx
GOOGLE_REDIRECT_URI=https://your-domain.com/auth/callback

# Configuración General
NODE_ENV=production
RATE_LIMIT_REDIS_URL=redis://localhost:6379
DATABASE_URL=postgresql://...

# Configuración de Seguridad
JWT_SECRET=your-super-secret-key
ENCRYPTION_KEY=32-byte-encryption-key
```

## 5. Datos de Muestra para Desarrollo

```json
{
  "classrooms": [
    {
      "id": "aula-1a",
      "name": "1° Básico A - Sección Amarilla",
      "teacherId": "teacher-ana",
      "students": ["student-maria", "student-carlos", "student-sofia"],
      "schedule": [
        {"day": "Lunes", "startTime": "08:00", "endTime": "10:00", "subject": "Matemáticas"},
        {"day": "Lunes", "startTime": "10:30", "endTime": "12:00", "subject": "Comunicación y Lenguaje"}
      ]
    },
    {
      "id": "aula-2b",
      "name": "2° Básico B - Sección Verde",
      "teacherId": "teacher-luis",
      "students": ["student-pedro", "student-ana", "student-diego"],
      "schedule": [
        {"day": "Martes", "startTime": "08:00", "endTime": "09:30", "subject": "Ciencias Naturales"},
        {"day": "Martes", "startTime": "10:00", "endTime": "11:30", "subject": "Estudios Sociales"}
      ]
    }
  ],
  "teachers": [
    {
      "id": "teacher-ana",
      "name": "Profesora Ana García",
      "email": "ana.garcia@iger.edu.gt",
      "specialization": "Matemáticas y Ciencias",
      "classrooms": ["aula-1a"]
    },
    {
      "id": "teacher-luis",
      "name": "Profesor Luis Morales",
      "email": "luis.morales@iger.edu.gt",
      "specialization": "Lenguaje y Estudios Sociales",
      "classrooms": ["aula-2b"]
    }
  ],
  "students": [
    {
      "id": "student-maria",
      "name": "María Rodríguez",
      "grade": "1°",
      "classroomId": "aula-1a",
      "parentConsent": true,
      "avatar": "avatar-1"
    },
    {
      "id": "student-carlos",
      "name": "Carlos Mendoza",
      "grade": "1°", 
      "classroomId": "aula-1a",
      "parentConsent": true,
      "avatar": "avatar-2"
    }
  ]
}
```

Esta documentación proporciona la base técnica para implementar la integración segura con ChatGPT y las funcionalidades del sistema IGER — Escuela Smart.