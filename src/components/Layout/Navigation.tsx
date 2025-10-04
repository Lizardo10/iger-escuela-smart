import React from 'react';
import { Home, BookOpen, Users, MessageCircle, Calendar, Trophy, Settings, LogOut, UserCheck, DollarSign, FileText, Clock, GraduationCap, Palette } from 'lucide-react';
import { User } from '../../types';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { ResponsiveLogo } from '../ui/ResponsiveLogo';

interface NavigationProps {
  user: User;
  currentView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ user, currentView, onViewChange, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const getMenuItems = () => {
    switch (user.role) {
      case 'estudiante':
        return [
          { id: 'dashboard', label: 'Inicio', icon: Home },
          { id: 'lessons', label: 'Lecciones', icon: BookOpen },
          { id: 'tasks', label: 'Tareas', icon: Calendar },
          { id: 'chat', label: 'Tutor IA', icon: MessageCircle },
          { id: 'achievements', label: 'Logros', icon: Trophy }
        ];
      case 'maestro':
        return [
          { id: 'dashboard', label: 'Inicio', icon: Home },
          { id: 'lessons', label: 'Lecciones', icon: BookOpen },
          { id: 'students', label: 'Estudiantes', icon: Users },
          { id: 'attendance', label: 'Asistencia', icon: UserCheck },
          { id: 'calendar', label: 'Calendario', icon: Calendar },
          { id: 'chat', label: 'Chat IA', icon: MessageCircle }
        ];
      case 'administrador':
        return [
          { id: 'dashboard', label: 'Inicio', icon: Home },
          { id: 'users', label: 'Usuarios', icon: Users },
          { id: 'classrooms', label: 'Aulas', icon: BookOpen },
          { id: 'grades', label: 'Grados', icon: GraduationCap },
          { id: 'payments', label: 'Pagos', icon: DollarSign },
          { id: 'reports', label: 'Reportes', icon: FileText },
          { id: 'calendar', label: 'Calendario', icon: Calendar },
          { id: 'logo-demo', label: 'Demo Logo', icon: Palette },
          { id: 'settings', label: 'Configuración', icon: Settings }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Navegación móvil - Header */}
      <div className="lg:hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="logo-hover">
            <ResponsiveLogo />
          </div>
          <button 
            className="p-2 rounded-lg bg-blue-400/30 hover:bg-blue-400/50 transition-colors hover:scale-110"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Menú móvil desplegable */}
        {isMobileMenuOpen && (
          <div className="mt-4 bg-blue-600/90 backdrop-blur-sm rounded-xl p-4 animate-fade-in-down">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onViewChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 text-left ${
                      currentView === item.id 
                        ? 'bg-white text-blue-600 shadow-lg' 
                        : 'hover:bg-blue-400/30 text-white'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
              
              {/* Botón de cerrar sesión en móvil mejorado */}
              <div className="pt-4 border-t border-red-400/30">
                <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl p-2 backdrop-blur-sm border border-red-400/30">
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-red-500/30 text-red-100 hover:text-white transition-all duration-300 group"
                  >
                    <LogOut size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                    <span className="font-medium">Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navegación desktop */}
      <nav className="hidden lg:flex bg-gradient-to-b from-slate-800 via-slate-700 to-slate-900 text-white h-screen w-80 shadow-2xl animate-fade-in-left flex-col relative">
        {/* Header con Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="logo-float logo-hover">
            <ResponsiveLogo className="justify-center" />
          </div>
        </div>

        {/* Información del Usuario */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="font-bold text-lg">{user.name}</p>
              <p className="text-slate-300 text-sm capitalize">{user.role}</p>
            </div>
          </div>
        </div>

        {/* Menú de Navegación */}
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 text-left group ${
                  currentView === item.id 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'hover:bg-white/10 text-slate-200 hover:text-white'
                }`}
              >
                <Icon size={20} className="flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
                {currentView === item.id && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Botón de Cerrar Sesión */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-3 p-3 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-200 hover:text-white transition-all duration-200 group border border-red-500/30"
          >
            <LogOut size={20} className="group-hover:rotate-12 transition-transform duration-200" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </nav>
    </>
  );
};