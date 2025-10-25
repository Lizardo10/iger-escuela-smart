import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Logo } from '../ui/Logo';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

interface ImprovedLoginFormProps {
  onLogin: (email: string, password?: string) => void;
  onShowRegister?: () => void;
  loading?: boolean;
}

export const ImprovedLoginForm: React.FC<ImprovedLoginFormProps> = ({ 
  onLogin, 
  onShowRegister, 
  loading = false 
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showQuickAccess, setShowQuickAccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onLogin(email.trim(), password || undefined);
    }
  };

  const quickLogin = (email: string) => {
    setEmail(email);
    onLogin(email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-200 rounded-full opacity-10 animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <Logo size="xl" className="justify-center" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            ¡Bienvenido a IGER!
          </h1>
          <p className="text-gray-600 text-lg">
            Tu plataforma educativa inteligente
          </p>
        </div>

        {/* Formulario de login */}
        <Card className="backdrop-blur-sm bg-white/80 shadow-2xl border-0">
          <CardHeader className="text-center pb-4">
            <h2 className="text-2xl font-bold text-gray-800">Iniciar Sesión</h2>
            <p className="text-gray-600">Accede a tu cuenta para continuar</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Campo de email */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-200 text-lg bg-white/50"
                    placeholder="tu-email@ejemplo.com"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Campo de contraseña (opcional) */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Contraseña (Opcional)
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-200 text-lg bg-white/50"
                    placeholder="Tu contraseña"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Puedes dejar este campo vacío para usar el acceso rápido
                </p>
              </div>

              {/* Botón de envío */}
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                disabled={loading || !email.trim()}
                size="lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Iniciando sesión...
                  </>
                ) : (
                  'Ingresar a IGER'
                )}
              </Button>
            </form>

            {/* Acceso rápido */}
            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowQuickAccess(!showQuickAccess)}
                className="w-full text-center text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                disabled={loading}
              >
                {showQuickAccess ? 'Ocultar' : 'Mostrar'} acceso rápido
              </button>
              
              {showQuickAccess && (
                <div className="mt-4 space-y-3 animate-fade-in">
                  <p className="text-sm text-gray-600 text-center mb-3">
                    Haz clic en cualquier cuenta para iniciar sesión automáticamente:
                  </p>
                  
                  {/* Administrador */}
                  <div
                    className="p-4 border-2 border-gray-200 rounded-xl cursor-pointer transition-all duration-300 hover:border-purple-300 hover:shadow-md hover:scale-105 bg-gradient-to-r from-purple-50 to-purple-100"
                    onClick={() => quickLogin('admin@iger.edu')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Administrador</p>
                        <p className="text-sm text-gray-600">admin@iger.edu</p>
                        <p className="text-xs text-purple-600">Gestión completa del sistema</p>
                      </div>
                    </div>
                  </div>

                  {/* Maestro */}
                  <div
                    className="p-4 border-2 border-gray-200 rounded-xl cursor-pointer transition-all duration-300 hover:border-blue-300 hover:shadow-md hover:scale-105 bg-gradient-to-r from-blue-50 to-blue-100"
                    onClick={() => quickLogin('ana.martinez@iger.edu')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Maestro/a</p>
                        <p className="text-sm text-gray-600">ana.martinez@iger.edu</p>
                        <p className="text-xs text-blue-600">Crear lecciones y tareas</p>
                      </div>
                    </div>
                  </div>

                  {/* Estudiante */}
                  <div
                    className="p-4 border-2 border-gray-200 rounded-xl cursor-pointer transition-all duration-300 hover:border-green-300 hover:shadow-md hover:scale-105 bg-gradient-to-r from-green-50 to-green-100"
                    onClick={() => quickLogin('maria.garcia@iger.edu')}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Estudiante</p>
                        <p className="text-sm text-gray-600">maria.garcia@iger.edu</p>
                        <p className="text-xs text-green-600">Aprender y completar tareas</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Enlace a registro */}
            <div className="pt-4 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                ¿Primera vez aquí?{' '}
                <button 
                  onClick={onShowRegister}
                  className="text-blue-600 font-semibold hover:text-blue-800 hover:underline transition-colors"
                  disabled={loading}
                >
                  ¡Regístrate aquí!
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2024 IGER Escuela Smart. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};
