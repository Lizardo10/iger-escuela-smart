import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useData } from './hooks/useData';
import { LoginForm } from './components/Auth/LoginForm';
import { Navigation } from './components/Layout/Navigation';
import { StudentDashboard } from './components/Student/StudentDashboard';
import { AITutorChat } from './components/Student/AITutorChat';
import { TeacherDashboard } from './components/Teacher/TeacherDashboard';
import { AdminDashboard } from './components/Admin/AdminDashboard';

function App() {
  const { user, loading, login, logout } = useAuth();
  const { lessons, tasks, achievements, classrooms, addLesson, addTask, completeTask } = useData(user?.role || '', user?.id);
  const [currentView, setCurrentView] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-yellow-400 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <h2 className="text-2xl font-bold text-white mb-2">IGER — Escuela Smart</h2>
          <p className="text-white/80">Cargando tu experiencia educativa...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm onLogin={login} />;
  }

  const renderContent = () => {
    switch (user.role) {
      case 'estudiante':
        switch (currentView) {
          case 'chat':
            return <AITutorChat user={user} />;
          default:
            return (
              <StudentDashboard
                user={user}
                lessons={lessons}
                tasks={tasks}
                achievements={achievements}
                onViewChange={setCurrentView}
              />
            );
        }
      
      case 'maestro':
        return (
          <TeacherDashboard
            user={user}
            lessons={lessons}
            tasks={tasks}
            classrooms={classrooms}
            onViewChange={setCurrentView}
            onAddLesson={addLesson}
            onAddTask={addTask}
          />
        );
      
      case 'administrador':
        return (
          <AdminDashboard
            user={user}
            classrooms={classrooms}
            onViewChange={setCurrentView}
          />
        );
      
      default:
        return <div>Rol no reconocido</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Navigation
        user={user}
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={logout}
      />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;