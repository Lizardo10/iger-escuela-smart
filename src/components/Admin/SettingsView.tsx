import React, { useState } from 'react';
import { Settings, Save, Database, Key, Mail, Bell, Shield, Globe, TestTube } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { User as UserType } from '../../types';

interface SettingsViewProps {
  user: UserType;
  onViewChange: (view: string) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user, onViewChange }) => {
  const [settings, setSettings] = useState({
    // Configuración de API
    openaiApiKey: 'sk-...',
    googleCalendarApiKey: 'AIza...',
    databaseUrl: 'sqlite://database/iger.db',
    
    // Configuración de notificaciones
    emailNotifications: true,
    pushNotifications: true,
    parentNotifications: true,
    
    // Configuración de seguridad
    requireParentConsent: true,
    dataEncryption: true,
    sessionTimeout: 30,
    
    // Configuración general
    schoolName: 'IGER Escuela Smart',
    schoolAddress: 'Ciudad de Guatemala',
    schoolPhone: '+502 1234-5678',
    schoolEmail: 'info@iger.edu'
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    alert('Configuración guardada exitosamente');
    setHasChanges(false);
  };

  const testConnection = (type: string) => {
    alert(`Probando conexión ${type}...`);
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-4 sm:p-6 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Configuración del Sistema ⚙️</h1>
        <p className="text-purple-100 text-base sm:text-lg">Gestiona la configuración y integraciones del sistema</p>
      </div>

      {/* Configuración de APIs */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Key size={24} className="text-blue-600" />
            <h2 className="text-xl font-bold">Configuración de APIs</h2>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">OpenAI API Key</label>
            <div className="flex space-x-2">
              <input
                type="password"
                value={settings.openaiApiKey}
                onChange={(e) => handleSettingChange('openaiApiKey', e.target.value)}
                className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                placeholder="sk-..."
              />
              <Button onClick={() => testConnection('OpenAI')} variant="ghost">
                <TestTube size={16} />
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Google Calendar API Key</label>
            <div className="flex space-x-2">
              <input
                type="password"
                value={settings.googleCalendarApiKey}
                onChange={(e) => handleSettingChange('googleCalendarApiKey', e.target.value)}
                className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                placeholder="AIza..."
              />
              <Button onClick={() => testConnection('Google Calendar')} variant="ghost">
                <TestTube size={16} />
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">URL de Base de Datos</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={settings.databaseUrl}
                onChange={(e) => handleSettingChange('databaseUrl', e.target.value)}
                className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                placeholder="sqlite://database/iger.db"
              />
              <Button onClick={() => testConnection('Base de Datos')} variant="ghost">
                <Database size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuración de Notificaciones */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Bell size={24} className="text-green-600" />
            <h2 className="text-xl font-bold">Notificaciones</h2>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Notificaciones por Email</h3>
              <p className="text-sm text-gray-600">Enviar notificaciones importantes por correo electrónico</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Notificaciones Push</h3>
              <p className="text-sm text-gray-600">Notificaciones en tiempo real en el navegador</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Notificaciones a Padres</h3>
              <p className="text-sm text-gray-600">Enviar actualizaciones a padres y tutores</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.parentNotifications}
                onChange={(e) => handleSettingChange('parentNotifications', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Configuración de Seguridad */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Shield size={24} className="text-red-600" />
            <h2 className="text-xl font-bold">Seguridad</h2>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Requerir Consentimiento de Padres</h3>
              <p className="text-sm text-gray-600">Obligatorio para estudiantes menores de edad</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.requireParentConsent}
                onChange={(e) => handleSettingChange('requireParentConsent', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Encriptación de Datos</h3>
              <p className="text-sm text-gray-600">Proteger información sensible de estudiantes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.dataEncryption}
                onChange={(e) => handleSettingChange('dataEncryption', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Timeout de Sesión (minutos)</label>
            <input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
              className="w-32 p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              min="5"
              max="120"
            />
          </div>
        </CardContent>
      </Card>

      {/* Información de la Escuela */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Globe size={24} className="text-purple-600" />
            <h2 className="text-xl font-bold">Información de la Escuela</h2>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Nombre de la Escuela</label>
            <input
              type="text"
              value={settings.schoolName}
              onChange={(e) => handleSettingChange('schoolName', e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Dirección</label>
              <input
                type="text"
                value={settings.schoolAddress}
                onChange={(e) => handleSettingChange('schoolAddress', e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Teléfono</label>
              <input
                type="tel"
                value={settings.schoolPhone}
                onChange={(e) => handleSettingChange('schoolPhone', e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Email de Contacto</label>
            <input
              type="email"
              value={settings.schoolEmail}
              onChange={(e) => handleSettingChange('schoolEmail', e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            />
          </div>
        </CardContent>
      </Card>

      {/* Botón de Guardar */}
      {hasChanges && (
        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600">
            <Save size={16} className="mr-2" />
            Guardar Cambios
          </Button>
        </div>
      )}
    </div>
  );
};
