import React, { useState } from 'react';
import { apiService } from '../../services/apiService';

export const LoginDebug: React.FC = () => {
  const [email, setEmail] = useState('admin@iger.edu');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testLogin = async () => {
    setLoading(true);
    try {
      console.log('🔍 Probando login con:', email);
      
      // Test directo al backend
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      console.log('📡 Respuesta del backend:', data);
      
      setResult({
        status: response.status,
        ok: response.ok,
        data: data
      });
      
    } catch (error) {
      console.error('❌ Error:', error);
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  const testApiService = async () => {
    setLoading(true);
    try {
      console.log('🔍 Probando API Service con:', email);
      
      const response = await apiService.login(email);
      console.log('📡 Respuesta del API Service:', response);
      
      setResult({
        apiService: response
      });
      
    } catch (error) {
      console.error('❌ Error API Service:', error);
      setResult({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🔧 Debug de Login</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email de prueba:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="admin@iger.edu"
          />
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={testLogin}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          >
            {loading ? 'Probando...' : 'Test Backend Directo'}
          </button>
          
          <button
            onClick={testApiService}
            disabled={loading}
            className="px-4 py-2 bg-green-500 text-white rounded-lg disabled:opacity-50"
          >
            {loading ? 'Probando...' : 'Test API Service'}
          </button>
        </div>
        
        {result && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Resultado:</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
        
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h3 className="font-semibold mb-2">📋 Información del Sistema:</h3>
          <ul className="text-sm space-y-1">
            <li>• Frontend: http://localhost:5175/</li>
            <li>• Backend: http://localhost:3001/api</li>
            <li>• Email de prueba: admin@iger.edu</li>
            <li>• Sin contraseña requerida</li>
          </ul>
        </div>
      </div>
    </div>
  );
};