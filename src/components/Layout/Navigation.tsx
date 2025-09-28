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
              
              {/* Botón de cerrar sesión en móvil */}
              <div className="pt-4 border-t border-blue-400/30">
                <button
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 p-3 rounded-xl hover:bg-red-500/30 text-white transition-colors"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navegación desktop */}
      <nav className="hidden lg:flex bg-gradient-to-b from-blue-500 to-blue-600 text-white h-screen w-64 p-4 shadow-xl animate-fade-in-left flex-col">
        <div className="mb-8 text-center animate-fade-in-down">
          <div className="logo-float logo-hover">
            <ResponsiveLogo className="justify-center" />
          </div>
        </div>

      <div className="mb-6 p-4 bg-blue-400/30 rounded-xl animate-fade-in-up hover-lift">
        <div className="flex items-center space-x-3">
          <Avatar src={`avatar-${user.avatar}`} alt={user.name} size="md" />
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-blue-100 text-sm capitalize">{user.role}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-8 stagger-animation">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 text-left hover-lift ${
                currentView === item.id 
                  ? 'bg-white text-blue-600 shadow-lg animate-pulse-hover' 
                  : 'hover:bg-blue-400/30 text-white hover-scale'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="ghost"
            className="w-full text-white border-white hover:bg-white hover:text-blue-600"
            onClick={onLogout}
          >
            <LogOut size={16} className="mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </nav>
    </>
  );
};