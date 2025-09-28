import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useData } from './hooks/useData';
import { LoginForm } from './components/Auth/LoginForm';
import { RegisterForm, RegisterData } from './components/Auth/RegisterForm';
import { Navigation } from './components/Layout/Navigation';
import { StudentDashboard } from './components/Student/StudentDashboard';
import { AITutorChat } from './components/Student/AITutorChat';
import { TeacherDashboard } from './components/Teacher/TeacherDashboard';
import { AttendanceSystem } from './components/Teacher/AttendanceSystem';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { UserManagement } from './components/Admin/UserManagement';
import { ClassroomManagement } from './components/Admin/ClassroomManagement';
import { PaymentSystem } from './components/Admin/PaymentSystem';
import { ReportsSystem } from './components/Admin/ReportsSystem';
import { AcademicCalendar } from './components/Admin/AcademicCalendar';
import { GradeManagement } from './components/Admin/GradeManagement';
import { APITest } from './components/Test/APITest';
import { LogoDemo } from './components/Test/LogoDemo';
import { LoginDebug } from './components/Debug/LoginDebug';
import { Logo } from './components/ui/Logo';
import { User } from './types';

function App() {
  const { user, loading, login, register, logout } = useAuth();
  const { lessons, tasks, achievements, classrooms, addLesson, addTask, completeTask } = useData(user?.role || '', user?.id);
  const [currentView, setCurrentView] = useState('dashboard');
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-yellow-400 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-6 mx-auto"></div>
          <div className="logo-float mb-6">
            <Logo size="xl" className="justify-center" />
          </div>
          <p className="text-white/80 text-lg animate-pulse">Cargando tu experiencia educativa...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (showRegisterForm) {
      return (
        <RegisterForm 
          onRegister={async (userData: RegisterData) => {
            const result = await register(userData);
            if (result.success) {
              setShowRegisterForm(false);
            } else {
              alert(result.error || 'Error al registrar usuario');
            }
          }}
          onBackToLogin={() => setShowRegisterForm(false)}
        />
      );
    }
    
    return (
      <LoginForm 
        onLogin={async (email: string) => {
          const result = await login(email);
          if (!result.success) {
            alert(result.error || 'Error al iniciar sesión');
          }
        }}
        onShowRegister={() => setShowRegisterForm(true)}
      />
    );
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
        switch (currentView) {
          case 'attendance':
            return <AttendanceSystem user={user} classroom={classrooms[0]} currentUser={user} />;
          default:
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
        }
      
          case 'administrador':
            switch (currentView) {
              case 'users':
                return <UserManagement onUserSelect={(user) => console.log('Usuario seleccionado:', user)} />;
              case 'classrooms':
                return <ClassroomManagement onClassroomSelect={(classroom) => console.log('Aula seleccionada:', classroom)} />;
              case 'payments':
                return <PaymentSystem onPaymentSelect={(payment) => console.log('Pago seleccionado:', payment)} />;
              case 'reports':
                return <ReportsSystem onReportSelect={(report) => console.log('Reporte seleccionado:', report)} />;
              case 'calendar':
                return <AcademicCalendar onEventSelect={(event) => console.log('Evento seleccionado:', event)} />;
              case 'grades':
                return <GradeManagement onGradeSelect={(grade) => console.log('Grado seleccionado:', grade)} />;
              case 'api-test':
                return <APITest />;
              case 'logo-demo':
                return <LogoDemo />;
              case 'login-debug':
                return <LoginDebug />;
              default:
                return (
                  <AdminDashboard
                    user={user}
                    classrooms={classrooms}
                    onViewChange={setCurrentView}
                  />
                );
            }
      
      default:
        return <div>Rol no reconocido</div>;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
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