import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { User, BookOpen, Shield } from 'lucide-react';

interface LoginFormProps {
  onLogin: (email: string, role: 'estudiante' | 'maestro' | 'administrador') => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<'estudiante' | 'maestro' | 'administrador'>('estudiante');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onLogin(email, selectedRole);
    }
  };

  const roles = [
    { value: 'estudiante' as const, label: 'Estudiante', icon: User, color: 'bg-green-500', description: '1° - 3° Básico' },
    { value: 'maestro' as const, label: 'Maestro/a', icon: BookOpen, color: 'bg-blue-500', description: 'Profesor de aula' },
    { value: 'administrador' as const, label: 'Administrador', icon: Shield, color: 'bg-purple-500', description: 'Gestión del sistema' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-yellow-400 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">IGER</h1>
          <p className="text-2xl text-white/90 font-semibold">Escuela Smart</p>
          <p className="text-white/80 mt-2">Aprender es divertido con IA</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/95">
          <CardHeader>
            <h2 className="text-2xl font-bold text-center text-gray-800">¡Bienvenido!</h2>
            <p className="text-gray-600 text-center">Inicia sesión para comenzar</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
                  placeholder="tu-email@ejemplo.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Selecciona tu rol
                </label>
                <div className="space-y-3">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                      <div
                        key={role.value}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          selectedRole === role.value
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedRole(role.value)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${role.color} text-white`}>
                            <Icon size={20} />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{role.label}</p>
                            <p className="text-sm text-gray-600">{role.description}</p>
                          </div>
                          <div className="ml-auto">
                            <div className={`w-4 h-4 border-2 rounded-full ${
                              selectedRole === role.value 
                                ? 'bg-blue-500 border-blue-500' 
                                : 'border-gray-300'
                            }`} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Ingresar a IGER
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                ¿Primera vez aquí?{' '}
                <span className="text-blue-600 font-semibold">¡Te daremos la bienvenida!</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};