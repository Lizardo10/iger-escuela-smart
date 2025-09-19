import React from 'react';
import { Home, BookOpen, Users, MessageCircle, Calendar, Trophy, Settings, LogOut } from 'lucide-react';
import { User } from '../../types';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';

interface NavigationProps {
  user: User;
  currentView: string;
  onViewChange: (view: string) => void;
  onLogout: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ user, currentView, onViewChange, onLogout }) => {
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
          { id: 'calendar', label: 'Calendario', icon: Calendar },
          { id: 'chat', label: 'Chat IA', icon: MessageCircle }
        ];
      case 'administrador':
        return [
          { id: 'dashboard', label: 'Inicio', icon: Home },
          { id: 'users', label: 'Usuarios', icon: Users },
          { id: 'classrooms', label: 'Aulas', icon: BookOpen },
          { id: 'settings', label: 'Configuración', icon: Settings }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <nav className="bg-gradient-to-b from-blue-500 to-blue-600 text-white h-screen w-64 p-4 shadow-xl">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold mb-2">IGER</h1>
        <p className="text-blue-100 text-sm">Escuela Smart</p>
      </div>

      <div className="mb-6 p-4 bg-blue-400/30 rounded-xl">
        <div className="flex items-center space-x-3">
          <Avatar src={`avatar-${user.avatar}`} alt={user.name} size="md" />
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-blue-100 text-sm capitalize">{user.role}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-8">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 text-left ${
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
  );
};