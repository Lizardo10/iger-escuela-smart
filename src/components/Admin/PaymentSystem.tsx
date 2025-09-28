import React, { useState, useEffect } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { DollarSign, Plus, Search, Filter, Calendar, CreditCard, Banknote, Smartphone, CheckCircle, XCircle, Clock, Download, Eye } from 'lucide-react';
import { Payment, User } from '../../types';

interface PaymentSystemProps {
  onPaymentSelect?: (payment: Payment) => void;
}

export const PaymentSystem: React.FC<PaymentSystemProps> = ({ onPaymentSelect }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [students, setStudents] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'pending' | 'completed' | 'cancelled'>('todos');
  const [methodFilter, setMethodFilter] = useState<'todos' | 'efectivo' | 'transferencia' | 'tarjeta'>('todos');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [newPayment, setNewPayment] = useState({
    studentId: '',
    amount: '',
    description: '',
    paymentMethod: 'efectivo' as Payment['paymentMethod'],
    dueDate: ''
  });

  // Datos simulados
  useEffect(() => {
    const mockStudents: User[] = [
      {
        id: 'student-1',
        name: 'María García López',
        email: 'maria.garcia@iger.edu',
        role: 'estudiante',
        avatar: 'avatar-1',
        parentConsent: true,
        parentEmail: 'padre.garcia@email.com',
        parentPhone: '+502 1234-5678',
        birthDate: '2018-05-15',
        isActive: true,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z'
      },
      {
        id: 'student-2',
        name: 'Carlos López Pérez',
        email: 'carlos.lopez@iger.edu',
        role: 'estudiante',
        avatar: 'avatar-2',
        parentConsent: true,
        parentEmail: 'madre.lopez@email.com',
        parentPhone: '+502 5555-1234',
        birthDate: '2017-08-22',
        isActive: true,
        createdAt: '2024-01-20T14:30:00Z',
        updatedAt: '2024-01-20T14:30:00Z'
      },
      {
        id: 'student-3',
        name: 'Ana Rodríguez',
        email: 'ana.rodriguez@iger.edu',
        role: 'estudiante',
        avatar: 'avatar-3',
        parentConsent: true,
        parentEmail: 'padre.rodriguez@email.com',
        parentPhone: '+502 7777-8888',
        birthDate: '2018-03-10',
        isActive: true,
        createdAt: '2024-01-25T09:15:00Z',
        updatedAt: '2024-01-25T09:15:00Z'
      }
    ];

    const mockPayments: Payment[] = [
      {
        id: 'payment-1',
        studentId: 'student-1',
        amount: 500,
        currency: 'GTQ',
        description: 'Mensualidad Enero 2024',
        paymentMethod: 'efectivo',
        status: 'completed',
        dueDate: '2024-01-31',
        paidDate: '2024-01-15',
        receiptNumber: 'REC-001',
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'payment-2',
        studentId: 'student-2',
        amount: 500,
        currency: 'GTQ',
        description: 'Mensualidad Enero 2024',
        paymentMethod: 'transferencia',
        status: 'pending',
        dueDate: '2024-01-31',
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'payment-3',
        studentId: 'student-3',
        amount: 500,
        currency: 'GTQ',
        description: 'Mensualidad Enero 2024',
        paymentMethod: 'tarjeta',
        status: 'completed',
        dueDate: '2024-01-31',
        paidDate: '2024-01-20',
        receiptNumber: 'REC-003',
        createdAt: '2024-01-01T00:00:00Z'
      },
      {
        id: 'payment-4',
        studentId: 'student-1',
        amount: 500,
        currency: 'GTQ',
        description: 'Mensualidad Febrero 2024',
        paymentMethod: 'efectivo',
        status: 'pending',
        dueDate: '2024-02-29',
        createdAt: '2024-02-01T00:00:00Z'
      }
    ];

    setStudents(mockStudents);
    setPayments(mockPayments);
  }, []);

  const filteredPayments = payments.filter(payment => {
    const student = students.find(s => s.id === payment.studentId);
    const matchesSearch = student?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.receiptNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'todos' || payment.status === statusFilter;
    const matchesMethod = methodFilter === 'todos' || payment.paymentMethod === methodFilter;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const handleCreatePayment = () => {
    if (!newPayment.studentId || !newPayment.amount || !newPayment.description || !newPayment.dueDate) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    const payment: Payment = {
      id: `payment-${Date.now()}`,
      studentId: newPayment.studentId,
      amount: parseFloat(newPayment.amount),
      currency: 'GTQ',
      description: newPayment.description,
      paymentMethod: newPayment.paymentMethod,
      status: 'pending',
      dueDate: newPayment.dueDate,
      createdAt: new Date().toISOString()
    };

    setPayments(prev => [...prev, payment]);
    setNewPayment({ studentId: '', amount: '', description: '', paymentMethod: 'efectivo', dueDate: '' });
    setShowCreateForm(false);
  };

  const handlePaymentStatusChange = (paymentId: string, status: Payment['status']) => {
    setPayments(prev => prev.map(payment => 
      payment.id === paymentId 
        ? { 
            ...payment, 
            status,
            paidDate: status === 'completed' ? new Date().toISOString().split('T')[0] : undefined,
            receiptNumber: status === 'completed' ? `REC-${Date.now().toString().slice(-3)}` : undefined
          }
        : payment
    ));
  };

  const handleDeletePayment = (paymentId: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este pago?')) {
      setPayments(prev => prev.filter(payment => payment.id !== paymentId));
    }
  };

  const getStudentName = (studentId: string) => {
    return students.find(s => s.id === studentId)?.name || 'Estudiante no encontrado';
  };

  const getStatusIcon = (status: Payment['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="text-green-500" size={20} />;
      case 'pending': return <Clock className="text-yellow-500" size={20} />;
      case 'cancelled': return <XCircle className="text-red-500" size={20} />;
      default: return <Clock className="text-gray-400" size={20} />;
    }
  };

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMethodIcon = (method: Payment['paymentMethod']) => {
    switch (method) {
      case 'efectivo': return <Banknote className="text-green-600" size={16} />;
      case 'transferencia': return <Smartphone className="text-blue-600" size={16} />;
      case 'tarjeta': return <CreditCard className="text-purple-600" size={16} />;
      default: return <DollarSign className="text-gray-600" size={16} />;
    }
  };

  const getPaymentStats = () => {
    const total = payments.length;
    const completed = payments.filter(p => p.status === 'completed').length;
    const pending = payments.filter(p => p.status === 'pending').length;
    const cancelled = payments.filter(p => p.status === 'cancelled').length;
    const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0);
    const collectedAmount = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);

    return { total, completed, pending, cancelled, totalAmount, collectedAmount };
  };

  const stats = getPaymentStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Gestión de Pagos</h2>
          <p className="text-gray-600 mt-1">Administra los pagos de mensualidades y servicios</p>
        </div>
        <Button 
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2"
        >
          <Plus size={20} />
          Nuevo Pago
        </Button>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="mx-auto text-gray-600 mb-2" size={24} />
            <div className="text-2xl font-bold text-gray-800">Q{stats.totalAmount.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Facturado</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="mx-auto text-green-500 mb-2" size={24} />
            <div className="text-2xl font-bold text-green-600">Q{stats.collectedAmount.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Recaudado</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="mx-auto text-yellow-500 mb-2" size={24} />
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-sm text-gray-600">Pendientes</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <XCircle className="mx-auto text-red-500 mb-2" size={24} />
            <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
            <div className="text-sm text-gray-600">Cancelados</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar por estudiante o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todos">Todos los estados</option>
              <option value="pending">Pendientes</option>
              <option value="completed">Completados</option>
              <option value="cancelled">Cancelados</option>
            </select>

            <select
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="todos">Todos los métodos</option>
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
              <option value="tarjeta">Tarjeta</option>
            </select>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Filter size={16} />
              <span>{filteredPayments.length} pagos encontrados</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Pagos */}
      <div className="space-y-4">
        {filteredPayments.map(payment => (
          <Card key={payment.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xl">
                    {getMethodIcon(payment.paymentMethod)}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800">{getStudentName(payment.studentId)}</h3>
                    <p className="text-gray-600">{payment.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span>Vence: {new Date(payment.dueDate).toLocaleDateString()}</span>
                      {payment.paidDate && <span>Pagado: {new Date(payment.paidDate).toLocaleDateString()}</span>}
                      {payment.receiptNumber && <span>Recibo: {payment.receiptNumber}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">Q{payment.amount.toLocaleString()}</div>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(payment.status)}`}>
                      {getStatusIcon(payment.status)}
                      <span className="ml-1">{payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedPayment(payment)}
                    >
                      <Eye size={16} />
                    </Button>
                    
                    {payment.status === 'pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePaymentStatusChange(payment.id, 'completed')}
                        className="text-green-600 hover:text-green-700"
                      >
                        <CheckCircle size={16} />
                      </Button>
                    )}
                    
                    {payment.status === 'pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePaymentStatusChange(payment.id, 'cancelled')}
                        className="text-red-600 hover:text-red-700"
                      >
                        <XCircle size={16} />
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeletePayment(payment.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <XCircle size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPayments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <DollarSign size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No se encontraron pagos</h3>
            <p className="text-gray-500 mb-4">Intenta ajustar los filtros de búsqueda</p>
            <Button onClick={() => {
              setSearchTerm('');
              setStatusFilter('todos');
              setMethodFilter('todos');
            }}>
              Limpiar Filtros
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Modal de Crear Pago */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Crear Nuevo Pago</h3>
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cerrar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estudiante *
                  </label>
                  <select
                    value={newPayment.studentId}
                    onChange={(e) => setNewPayment(prev => ({ ...prev, studentId: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccionar estudiante</option>
                    {students.map(student => (
                      <option key={student.id} value={student.id}>{student.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monto (GTQ) *
                    </label>
                    <input
                      type="number"
                      value={newPayment.amount}
                      onChange={(e) => setNewPayment(prev => ({ ...prev, amount: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Método de Pago *
                    </label>
                    <select
                      value={newPayment.paymentMethod}
                      onChange={(e) => setNewPayment(prev => ({ ...prev, paymentMethod: e.target.value as Payment['paymentMethod'] }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="efectivo">Efectivo</option>
                      <option value="transferencia">Transferencia</option>
                      <option value="tarjeta">Tarjeta</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descripción *
                  </label>
                  <input
                    type="text"
                    value={newPayment.description}
                    onChange={(e) => setNewPayment(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: Mensualidad Enero 2024"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fecha de Vencimiento *
                  </label>
                  <input
                    type="date"
                    value={newPayment.dueDate}
                    onChange={(e) => setNewPayment(prev => ({ ...prev, dueDate: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleCreatePayment} className="flex-1">
                    Crear Pago
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modal de Detalles del Pago */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Detalles del Pago</h3>
                <Button variant="outline" onClick={() => setSelectedPayment(null)}>
                  Cerrar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Estudiante</label>
                    <p className="text-gray-800">{getStudentName(selectedPayment.studentId)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Monto</label>
                    <p className="text-gray-800">Q{selectedPayment.amount.toLocaleString()}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600">Descripción</label>
                  <p className="text-gray-800">{selectedPayment.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Método de Pago</label>
                    <p className="text-gray-800">{selectedPayment.paymentMethod.charAt(0).toUpperCase() + selectedPayment.paymentMethod.slice(1)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Estado</label>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedPayment.status)}`}>
                      {getStatusIcon(selectedPayment.status)}
                      <span className="ml-1">{selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Fecha de Vencimiento</label>
                    <p className="text-gray-800">{new Date(selectedPayment.dueDate).toLocaleDateString()}</p>
                  </div>
                  {selectedPayment.paidDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Fecha de Pago</label>
                      <p className="text-gray-800">{new Date(selectedPayment.paidDate).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>

                {selectedPayment.receiptNumber && (
                  <div>
                    <label className="text-sm font-medium text-gray-600">Número de Recibo</label>
                    <p className="text-gray-800">{selectedPayment.receiptNumber}</p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-600">Fecha de Creación</label>
                  <p className="text-gray-800">{new Date(selectedPayment.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
