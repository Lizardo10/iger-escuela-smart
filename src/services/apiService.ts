// Servicio API para conectar con el backend
// La URL del API se obtiene de las variables de entorno de Vite
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

class ApiService {
  private token: string | null = null;

  constructor() {
    // Obtener token del localStorage
    this.token = localStorage.getItem('iger-token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      if (this.token) {
        headers.Authorization = `Bearer ${this.token}`;
      }

      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || 'Error en la solicitud' };
      }

      return { data: data };
    } catch (error) {
      console.error('Error en API request:', error);
      return { error: 'Error de conexión con el servidor' };
    }
  }

  // Auth methods
  async login(email: string, password?: string) {
    try {
      const response = await this.request<{ token: string; user: any }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (response.data) {
        this.token = response.data.token;
        localStorage.setItem('iger-token', this.token);
        localStorage.setItem('iger-user', JSON.stringify(response.data.user));
        return { success: true, user: response.data.user };
      } else {
        return { success: false, error: response.error || 'Error de autenticación' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Error de conexión con el servidor' };
    }
  }

  async register(userData: any) {
    const response = await this.request<{ user: any }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });

    return response;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('iger-token');
    localStorage.removeItem('iger-user');
  }

  // Users methods
  async getUsers(filters?: { role?: string; gradeId?: string; search?: string }) {
    const params = new URLSearchParams();
    if (filters?.role) params.append('role', filters.role);
    if (filters?.gradeId) params.append('gradeId', filters.gradeId);
    if (filters?.search) params.append('search', filters.search);

    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<any[]>(`/users${query}`);
  }

  async getUser(id: string) {
    return this.request<any>(`/users/${id}`);
  }

  // Classrooms methods
  async getClassrooms() {
    return this.request<any[]>('/classrooms');
  }

  async createClassroom(classroomData: any) {
    return this.request<{ id: string }>('/classrooms', {
      method: 'POST',
      body: JSON.stringify(classroomData),
    });
  }

  // Attendance methods
  async getAttendance(classroomId: string, date: string) {
    return this.request<any[]>(`/attendance/${classroomId}/${date}`);
  }

  async saveAttendance(classroomId: string, date: string, attendanceRecords: any[]) {
    return this.request('/attendance', {
      method: 'POST',
      body: JSON.stringify({
        classroomId,
        date,
        attendanceRecords,
      }),
    });
  }

  // Payments methods
  async getPayments(filters?: { status?: string; method?: string; search?: string }) {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.method) params.append('method', filters.method);
    if (filters?.search) params.append('search', filters.search);

    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<any[]>(`/payments${query}`);
  }

  async createPayment(paymentData: any) {
    return this.request<{ id: string }>('/payments', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  async updatePaymentStatus(paymentId: string, status: string) {
    return this.request(`/payments/${paymentId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Grades methods
  async getGrades() {
    return this.request<any[]>('/grades');
  }

  // Calendar methods
  async getCalendarEvents(startDate?: string, endDate?: string) {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);

    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<any[]>(`/calendar/events${query}`);
  }

  async createCalendarEvent(eventData: any) {
    return this.request<{ id: string }>('/calendar/events', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  // Reports methods
  async getReports(filters?: { type?: string; studentId?: string; classroomId?: string; gradeId?: string }) {
    const params = new URLSearchParams();
    if (filters?.type) params.append('type', filters.type);
    if (filters?.studentId) params.append('studentId', filters.studentId);
    if (filters?.classroomId) params.append('classroomId', filters.classroomId);
    if (filters?.gradeId) params.append('gradeId', filters.gradeId);

    const query = params.toString() ? `?${params.toString()}` : '';
    return this.request<any[]>(`/reports${query}`);
  }

  async createReport(reportData: any) {
    return this.request<{ id: string }>('/reports', {
      method: 'POST',
      body: JSON.stringify(reportData),
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export const apiService = new ApiService();
