import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { apiService } from '../../services/apiService';

export const APITest: React.FC = () => {
  const [results, setResults] = useState<any>({});
  const [loading, setLoading] = useState<string | null>(null);

  const testEndpoint = async (name: string, testFn: () => Promise<any>) => {
    setLoading(name);
    try {
      const result = await testFn();
      setResults(prev => ({ ...prev, [name]: { success: true, data: result } }));
    } catch (error) {
      setResults(prev => ({ ...prev, [name]: { success: false, error: error.message } }));
    } finally {
      setLoading(null);
    }
  };

  const tests = [
    {
      name: 'Health Check',
      test: () => apiService.healthCheck()
    },
    {
      name: 'Login (Admin)',
      test: () => apiService.login('admin@iger.edu')
    },
    {
      name: 'Login (Teacher)',
      test: () => apiService.login('ana.martinez@iger.edu')
    },
    {
      name: 'Login (Student)',
      test: () => apiService.login('maria.garcia@iger.edu')
    },
    {
      name: 'Get Users',
      test: () => apiService.getUsers()
    },
    {
      name: 'Get Classrooms',
      test: () => apiService.getClassrooms()
    },
    {
      name: 'Get Grades',
      test: () => apiService.getGrades()
    },
    {
      name: 'Get Payments',
      test: () => apiService.getPayments()
    },
    {
      name: 'Get Calendar Events',
      test: () => apiService.getCalendarEvents()
    },
    {
      name: 'Get Reports',
      test: () => apiService.getReports()
    }
  ];

  const runAllTests = async () => {
    for (const test of tests) {
      await testEndpoint(test.name, test.test);
      // Pequeña pausa entre tests
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Prueba de API</h2>
          <p className="text-gray-600 mt-1">Verifica que todas las rutas del backend funcionen correctamente</p>
        </div>
        <Button onClick={runAllTests} disabled={loading !== null}>
          {loading ? 'Ejecutando...' : 'Ejecutar Todas las Pruebas'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tests.map(test => (
          <Card key={test.name}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{test.name}</h3>
                <Button
                  size="sm"
                  onClick={() => testEndpoint(test.name, test.test)}
                  disabled={loading === test.name}
                >
                  {loading === test.name ? 'Probando...' : 'Probar'}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {results[test.name] && (
                <div className={`p-3 rounded-lg ${
                  results[test.name].success 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <div className={`font-medium ${
                    results[test.name].success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {results[test.name].success ? '✅ Éxito' : '❌ Error'}
                  </div>
                  {results[test.name].success ? (
                    <div className="text-sm text-green-700 mt-1">
                      Datos recibidos: {JSON.stringify(results[test.name].data).length} caracteres
                    </div>
                  ) : (
                    <div className="text-sm text-red-700 mt-1">
                      {results[test.name].error}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Resumen */}
      <Card>
        <CardHeader>
          <h3 className="text-xl font-semibold">Resumen de Pruebas</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {Object.values(results).filter((r: any) => r.success).length}
              </div>
              <div className="text-sm text-green-700">Exitosas</div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {Object.values(results).filter((r: any) => !r.success).length}
              </div>
              <div className="text-sm text-red-700">Fallidas</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {Object.keys(results).length}/{tests.length}
              </div>
              <div className="text-sm text-blue-700">Completadas</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
