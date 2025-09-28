import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { User, Plus, Search, Filter, Edit, Trash2, Eye, Mail, Phone, Calendar } from 'lucide-react';
import { User as UserType, Grade } from '../../types';

interface UserManagementProps {
  onUserSelect?: (user: UserType) => void;
}

export const UserManagement: React.FC<UserManagementProps> = ({ onUserSelect }) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'todos' | 'estudiante' | 'maestro' | 'administrador'>('todos');
  const [gradeFilter, setGradeFilter] = useState<string>('todos');
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  // Datos simulados - en producción vendrían de una API
  useEffect(() => {
    const mockUsers: UserType[] = [
      {
        id: '1',
        name: 'María García López',
        email: 'maria.garcia@iger.edu',
        role: 'estudiante',
        classroomId: 'aula-1a',
        gradeId: 'grado-1',
        avatar: 'avatar-1',
        parentConsent: true,
        parentEmail: 'padre.garcia@email.com',
        parentPhone: '+502 1234-5678',
        birthDate: '2018-05-15',
        address: 'Zona 10, Ciudad de Guatemala',
        isActive: true,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
      },
      {
        id: '2',
        name: 'Prof. Ana Martínez',
        email: 'ana.martinez@iger.edu',
        role: 'maestro',
        avatar: 'avatar-2',
        phone: '+502 9876-5432',
        isActive: true,
        createdAt: '2024-01-10T09:00:00Z',
        updatedAt: '2024-01-10T09:00:00Z'
      },
      {
        id: '3',
        name: 'Carlos López Pérez',
        email: 'carlos.lopez@iger.edu',
        role: 'estudiante',
        classroomId: 'aula-2b',
        gradeId: 'grado-2',
        avatar: 'avatar-3',
        parentConsent: true,
        parentEmail: 'madre.lopez@email.com',
        parentPhone: '+502 5555-1234',
        birthDate: '2017-08-22',
        address: 'Zona 15, Ciudad de Guatemala',
        isActive: true,
        createdAt: '2024-01-20T14:30:00Z',
        updatedAt: '2024-01-20T14:30:00Z'
      }
    ];

    const mockGrades: Grade[] = [
      { id: 'grado-1', name: 'Primer Grado', level: 1, description: 'Primer año de básico', maxStudents: 25, createdAt: '2024-01-01T00:00:00Z' },
      { id: 'grado-2', name: 'Segundo Grado', level: 2, description: 'Segundo año de básico', maxStudents: 25, createdAt: '2024-01-01T00:00:00Z' },
      { id: 'grado-3', name: 'Tercer Grado', level: 3, description: 'Tercer año de básico', maxStudents: 25, createdAt: '2024-01-01T00:00:00Z' }
    ];

    setUsers(mockUsers);
    setGrades(mockGrades);
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'todos' || user.role === roleFilter;
    const matchesGrade = gradeFilter === 'todos' || user.gradeId === gradeFilter;
    
    return matchesSearch && matchesRole && matchesGrade;
  });

  const handleUserClick = (user: UserType) => {
    setSelectedUser(user);
    onUserSelect?.(user);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, isActive: !user.isActive, updatedAt: new Date().toISOString() }
        : user
    ));
  };

  const getRoleColor = (role: UserType['role']) => {
    switch (role) {
      case 'estudiante': return 'bg-green-100 text-green-800';
      case 'maestro': return 'bg-blue-100 text-blue-800';
      case 'administrador': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: UserType['role']) => {
    switch (role) {
      case 'estudiante': return '👨‍🎓';
      case 'maestro': return '👩‍🏫';
      case 'administrador': return '👨‍💼';
      default: return '👤';
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Gestión de Usuarios</h2>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Administra estudiantes, maestros y administradores</p>
        </div>
        <Button 
          onClick={() => setShowRegisterForm(true)}
          className="flex items-center gap-2 w-full sm:w-auto"
        >
          <Plus size={16} className="sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base">Nuevo Usuario</span>
        </Button>
      </div>

      {/* Filtros y Búsqueda */}
      <Card>
        <CardContent className="p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="relative sm:col-span-2 lg:col-span-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todos">Todos los roles</option>
              <option value="estudiante">Estudiantes</option>
              <option value="maestro">Maestros</option>
              <option value="administrador">Administradores</option>
            </select>

            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todos">Todos los grados</option>
              {grades.map(grade => (
                <option key={grade.id} value={grade.id}>{grade.name}</option>
              ))}
            </select>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Filter size={16} />
              <span>{filteredUsers.length} usuarios encontrados</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Usuarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredUsers.map(user => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-lg sm:text-xl flex-shrink-0">
                    {getRoleIcon(user.role)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{user.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{user.email}</p>
                  </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUserClick(user)}
                    className="p-2"
                  >
                    <Eye size={14} className="sm:w-4 sm:h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteUser(user.id)}
                    className="p-2"
                  >
                    <Trash2 size={14} className="sm:w-4 sm:h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </div>
                
                {user.gradeId && (
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Grado:</span> {grades.find(g => g.id === user.gradeId)?.name}
                  </div>
                )}

                {user.parentEmail && (
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <Mail size={14} />
                    <span>{user.parentEmail}</span>
                  </div>
                )}

                {user.phone && (
                  <div className="text-sm text-gray-600 flex items-center gap-1">
                    <Phone size={14} />
                    <span>{user.phone}</span>
                  </div>
                )}

                <div className="text-sm text-gray-600 flex items-center gap-1">
                  <Calendar size={14} />
                  <span>Registrado: {new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className={`flex items-center gap-2 text-sm ${
                  user.isActive ? 'text-green-600' : 'text-red-600'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    user.isActive ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  {user.isActive ? 'Activo' : 'Inactivo'}
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleUserStatus(user.id)}
                >
                  {user.isActive ? 'Desactivar' : 'Activar'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <User size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No se encontraron usuarios</h3>
            <p className="text-gray-500 mb-4">Intenta ajustar los filtros de búsqueda</p>
            <Button onClick={() => {
              setSearchTerm('');
              setRoleFilter('todos');
              setGradeFilter('todos');
            }}>
              Limpiar Filtros
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Modal de Detalles del Usuario */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Detalles del Usuario</h3>
                <Button variant="outline" onClick={() => setSelectedUser(null)}>
                  Cerrar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Nombre</label>
                    <p className="text-gray-800">{selectedUser.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email</label>
                    <p className="text-gray-800">{selectedUser.email}</p>
                  </div>
                </div>
                
                {selectedUser.birthDate && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Fecha de Nacimiento</label>
                    <p className="text-gray-800">{new Date(selectedUser.birthDate).toLocaleDateString()}</p>
                  </div>
                )}

                {selectedUser.address && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Dirección</label>
                    <p className="text-gray-800">{selectedUser.address}</p>
                  </div>
                )}

                {selectedUser.parentEmail && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email del Padre/Madre</label>
                      <p className="text-gray-800">{selectedUser.parentEmail}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Teléfono del Padre/Madre</label>
                      <p className="text-gray-800">{selectedUser.parentPhone}</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Estado</label>
                    <p className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      selectedUser.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedUser.isActive ? 'Activo' : 'Inactivo'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Fecha de Registro</label>
                    <p className="text-gray-800">{new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
