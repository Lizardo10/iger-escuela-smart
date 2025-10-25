import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { ImprovedLoginForm } from './components/Auth/ImprovedLoginForm';
import { RegisterForm, RegisterData } from './components/Auth/RegisterForm';
import { StudentDashboard } from './components/Student/StudentDashboard';
import { TeacherDashboard } from './components/Teacher/TeacherDashboard';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { UserManagement } from './components/Admin/UserManagement';
import { ClassroomManagement } from './components/Admin/ClassroomManagement';
import { PaymentSystem } from './components/Admin/PaymentSystem';
import { ReportsSystem } from './components/Admin/ReportsSystem';
import { AcademicCalendar } from './components/Admin/AcademicCalendar';
import { GradeManagement } from './components/Admin/GradeManagement';
import { SettingsView } from './components/Admin/SettingsView';
import { APITest } from './components/Test/APITest';
import { LogoDemo } from './components/Test/LogoDemo';
import { LoginDebug } from './components/Debug/LoginDebug';
import { Logo } from './components/ui/Logo';
import { User } from './types';

function App() {
  const { user, loading, login, register, logout } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6 mx-auto"></div>
          <div className="mb-6">
            <Logo size="xl" className="justify-center" />
          </div>
          <p className="text-gray-600 text-lg animate-pulse">Cargando tu experiencia educativa...</p>
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
      <ImprovedLoginForm 
        onLogin={async (email: string, password?: string) => {
          const result = await login(email, password);
          if (!result.success) {
            alert(result.error || 'Error al iniciar sesión');
          }
        }}
        onShowRegister={() => setShowRegisterForm(true)}
        loading={loading}
      />
    );
  }

  const renderContent = () => {
    switch (user.role) {
      case 'estudiante':
        return <StudentDashboard user={user} logout={logout} />;
      
      case 'maestro':
        return <TeacherDashboard user={user} logout={logout} />;
      
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
          case 'settings':
            return <SettingsView user={user} onViewChange={setCurrentView} />;
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
                classrooms={[]}
                onViewChange={setCurrentView}
                logout={logout}
              />
            );
        }
      
      default:
        return <div>Rol no reconocido</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderContent()}
    </div>
  );
}

export default App;