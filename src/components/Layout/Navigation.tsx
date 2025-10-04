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
      <nav className="hidden lg:flex bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 text-white h-screen w-72 p-6 shadow-2xl animate-fade-in-left flex-col relative overflow-hidden">
        <div className="mb-8 text-center animate-fade-in-down">
          <div className="logo-float logo-hover">
            <ResponsiveLogo className="justify-center" />
          </div>
        </div>

      {/* Información del Usuario Mejorada */}
      <div className="mb-8 p-6 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl animate-fade-in-up hover-lift backdrop-blur-sm border border-white/20">
        <div className="flex items-center space-x-4">
          <Avatar src={`avatar-${user.avatar}`} alt={user.name} size="lg" />
          <div className="flex-1">
            <p className="font-bold text-lg">{user.name}</p>
            <p className="text-blue-100 text-sm capitalize font-medium">{user.role}</p>
            <div className="mt-2 w-full bg-white/20 rounded-full h-1">
              <div className="bg-white h-1 rounded-full w-3/4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Menú de Navegación Mejorado */}
      <div className="space-y-3 mb-8 stagger-animation flex-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 text-left hover-lift group ${
                currentView === item.id 
                  ? 'bg-white text-blue-600 shadow-xl animate-pulse-hover border border-blue-200' 
                  : 'hover:bg-white/20 text-white hover-scale backdrop-blur-sm'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`p-2 rounded-xl transition-all duration-300 ${
                currentView === item.id 
                  ? 'bg-blue-100' 
                  : 'bg-white/20 group-hover:bg-white/30'
              }`}>
                <Icon size={20} />
              </div>
              <span className="font-semibold text-base">{item.label}</span>
              {currentView === item.id && (
                <div className="ml-auto w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              )}
            </button>
          );
        })}
      </div>

        {/* Botón de Cerrar Sesión Mejorado */}
        <div className="mt-auto p-4">
          <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl p-3 backdrop-blur-sm border border-red-400/30">
            <Button
              variant="ghost"
              className="w-full text-red-100 hover:text-white hover:bg-red-500/30 transition-all duration-300 group"
              onClick={onLogout}
            >
              <LogOut size={18} className="mr-3 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-medium">Cerrar Sesión</span>
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};