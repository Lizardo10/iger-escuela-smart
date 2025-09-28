import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { ResponsiveLogo } from '../ui/ResponsiveLogo';
import { User, BookOpen, Shield, UserPlus, Calendar, Phone, Mail, MapPin } from 'lucide-react';

interface RegisterFormProps {
  onRegister: (userData: RegisterData) => void;
  onBackToLogin: () => void;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'estudiante' | 'maestro' | 'administrador';
  birthDate?: string;
  address?: string;
  phone?: string;
  parentEmail?: string;
  parentPhone?: string;
  parentConsent?: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onRegister, onBackToLogin }) => {
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    role: 'estudiante',
    birthDate: '',
    address: '',
    phone: '',
    parentEmail: '',
    parentPhone: '',
    parentConsent: false
  });

  const [errors, setErrors] = useState<Partial<RegisterData>>({});

  const handleInputChange = (field: keyof RegisterData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterData> = {};

    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    if (!formData.password.trim()) newErrors.password = 'La contraseña es requerida';
    if (formData.password.length < 6) newErrors.password = 'La contraseña debe tener al menos 6 caracteres';

    if (formData.role === 'estudiante') {
      if (!formData.birthDate) newErrors.birthDate = 'La fecha de nacimiento es requerida';
      if (!formData.parentEmail?.trim()) newErrors.parentEmail = 'El email del padre/madre es requerido';
      if (!formData.parentPhone?.trim()) newErrors.parentPhone = 'El teléfono del padre/madre es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onRegister(formData);
    }
  };

  const roles = [
    { 
      value: 'estudiante' as const, 
      label: 'Estudiante', 
      icon: User, 
      color: 'bg-green-500',
      description: '1° - 3° Básico',
      fields: ['birthDate', 'parentEmail', 'parentPhone', 'parentConsent']
    },
    { 
      value: 'maestro' as const, 
      label: 'Maestro/a', 
      icon: BookOpen, 
      color: 'bg-blue-500',
      description: 'Profesor de aula',
      fields: ['phone']
    },
    { 
      value: 'administrador' as const, 
      label: 'Administrador', 
      icon: Shield, 
      color: 'bg-purple-500',
      description: 'Gestión del sistema',
      fields: ['phone']
    }
  ];

  const currentRole = roles.find(role => role.value === formData.role);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-yellow-400 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="logo-float mb-6">
            <ResponsiveLogo className="justify-center" />
          </div>
          <p className="text-white/80 mt-2 animate-fade-in-up text-lg">Únete a nuestra comunidad educativa</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/95">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Crear Cuenta</h2>
                <p className="text-gray-600">Regístrate para comenzar tu experiencia educativa</p>
              </div>
              <Button 
                variant="outline" 
                onClick={onBackToLogin}
                className="flex items-center gap-2"
              >
                <UserPlus size={16} />
                Volver al Login
              </Button>
            </div>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selección de Rol */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Tipo de Usuario
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {roles.map((role) => {
                    const Icon = role.icon;
                    return (
                      <div
                        key={role.value}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                          formData.role === role.value
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => handleInputChange('role', role.value)}
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
                              formData.role === role.value 
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

              {/* Información Básica */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-lg ${
                      errors.name ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                    }`}
                    placeholder="Tu nombre completo"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-lg ${
                      errors.email ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                    }`}
                    placeholder="tu-email@ejemplo.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contraseña *
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-lg ${
                      errors.password ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                    }`}
                    placeholder="Mínimo 6 caracteres"
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                {currentRole?.fields.includes('phone') && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
                      placeholder="+502 1234-5678"
                    />
                  </div>
                )}
              </div>

              {/* Campos específicos para estudiantes */}
              {formData.role === 'estudiante' && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Fecha de Nacimiento *
                    </label>
                    <input
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-lg ${
                        errors.birthDate ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                      }`}
                    />
                    {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Dirección
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg"
                      placeholder="Tu dirección de residencia"
                    />
                  </div>

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <UserPlus size={20} />
                      Información del Padre/Madre o Tutor
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email del Padre/Madre *
                        </label>
                        <input
                          type="email"
                          value={formData.parentEmail}
                          onChange={(e) => handleInputChange('parentEmail', e.target.value)}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-lg ${
                            errors.parentEmail ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                          }`}
                          placeholder="padre@ejemplo.com"
                        />
                        {errors.parentEmail && <p className="text-red-500 text-sm mt-1">{errors.parentEmail}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Teléfono del Padre/Madre *
                        </label>
                        <input
                          type="tel"
                          value={formData.parentPhone}
                          onChange={(e) => handleInputChange('parentPhone', e.target.value)}
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors text-lg ${
                            errors.parentPhone ? 'border-red-500' : 'border-gray-200 focus:border-blue-500'
                          }`}
                          placeholder="+502 1234-5678"
                        />
                        {errors.parentPhone && <p className="text-red-500 text-sm mt-1">{errors.parentPhone}</p>}
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.parentConsent}
                          onChange={(e) => handleInputChange('parentConsent', e.target.checked)}
                          className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          Confirmo que tengo el consentimiento de mi padre/madre o tutor para registrarme
                        </span>
                      </label>
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-4">
                <Button type="submit" className="flex-1" size="lg">
                  Crear Cuenta
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onBackToLogin}
                  className="flex-1"
                  size="lg"
                >
                  Cancelar
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                ¿Ya tienes una cuenta?{' '}
                <button 
                  onClick={onBackToLogin}
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Inicia sesión aquí
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
