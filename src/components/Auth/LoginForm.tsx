import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { ResponsiveLogo } from '../ui/ResponsiveLogo';
import { User, BookOpen, Shield } from 'lucide-react';

interface LoginFormProps {
  onLogin: (email: string) => void;
  onShowRegister?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onShowRegister }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onLogin(email);
    }
  };

  const quickLogin = (email: string) => {
    setEmail(email);
    onLogin(email);
  };

  return (
    <div className="min-h-screen gradient-animated flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="logo-float mb-6">
            <ResponsiveLogo className="justify-center" />
          </div>
          <p className="text-white/80 mt-2 animate-fade-in-up text-lg">Aprender es divertido con IA</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/95 animate-scale-in hover-lift">
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
                  Acceso Rápido (Credenciales de Prueba)
                </label>
                <div className="space-y-3">
                  <div
                    className="p-4 border-2 border-gray-200 rounded-xl cursor-pointer transition-all duration-300 hover-scale hover-glow hover:border-purple-300"
                    onClick={() => quickLogin('admin@iger.edu')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-purple-500 text-white">
                        <Shield size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Administrador</p>
                        <p className="text-sm text-gray-600">admin@iger.edu</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="p-4 border-2 border-gray-200 rounded-xl cursor-pointer transition-all duration-300 hover-scale hover-glow hover:border-blue-300"
                    onClick={() => quickLogin('ana.martinez@iger.edu')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-blue-500 text-white">
                        <BookOpen size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Maestro/a</p>
                        <p className="text-sm text-gray-600">ana.martinez@iger.edu</p>
                      </div>
                    </div>
                  </div>

                  <div
                    className="p-4 border-2 border-gray-200 rounded-xl cursor-pointer transition-all duration-300 hover-scale hover-glow hover:border-green-300"
                    onClick={() => quickLogin('maria.garcia@iger.edu')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-green-500 text-white">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Estudiante</p>
                        <p className="text-sm text-gray-600">maria.garcia@iger.edu</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full btn-animate hover-lift" size="lg">
                Ingresar a IGER
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                ¿Primera vez aquí?{' '}
                <button 
                  onClick={onShowRegister}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  ¡Regístrate aquí!
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};