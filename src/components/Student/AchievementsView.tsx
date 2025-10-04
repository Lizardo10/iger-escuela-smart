import React, { useState } from 'react';
import { Trophy, Star, Lock, CheckCircle, Target } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { User as UserType, Achievement } from '../../types';

interface AchievementsViewProps {
  user: UserType;
  achievements: Achievement[];
  onViewChange: (view: string) => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({ user, achievements, onViewChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredAchievements = achievements.filter(achievement => {
    if (selectedFilter === 'unlocked') return achievement.unlockedAt;
    if (selectedFilter === 'locked') return !achievement.unlockedAt;
    return true;
  });

  const totalPoints = achievements.filter(a => a.unlockedAt).reduce((sum, a) => sum + a.points, 0);
  const unlockedCount = achievements.filter(a => a.unlockedAt).length;

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-4 sm:p-6 text-white">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Mis Logros 🏆</h1>
        <p className="text-purple-100 text-base sm:text-lg">¡Desbloquea logros y gana puntos por tu esfuerzo!</p>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white">
          <CardContent className="p-4 text-center">
            <Star size={32} className="mx-auto mb-2" />
            <p className="text-2xl font-bold">{totalPoints}</p>
            <p className="text-yellow-100 text-sm">Puntos Totales</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-400 to-green-500 text-white">
          <CardContent className="p-4 text-center">
            <Trophy size={32} className="mx-auto mb-2" />
            <p className="text-2xl font-bold">{unlockedCount}</p>
            <p className="text-green-100 text-sm">Logros Desbloqueados</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-400 to-blue-500 text-white">
          <CardContent className="p-4 text-center">
            <Target size={32} className="mx-auto mb-2" />
            <p className="text-2xl font-bold">{achievements.length - unlockedCount}</p>
            <p className="text-blue-100 text-sm">Por Desbloquear</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-400 to-purple-500 text-white">
          <CardContent className="p-4 text-center">
            <CheckCircle size={32} className="mx-auto mb-2" />
            <p className="text-2xl font-bold">{Math.round((unlockedCount / achievements.length) * 100)}%</p>
            <p className="text-purple-100 text-sm">Progreso Total</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={selectedFilter === 'all' ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => setSelectedFilter('all')}
        >
          Todos ({achievements.length})
        </Button>
        <Button 
          variant={selectedFilter === 'unlocked' ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => setSelectedFilter('unlocked')}
        >
          Desbloqueados ({unlockedCount})
        </Button>
        <Button 
          variant={selectedFilter === 'locked' ? 'default' : 'ghost'} 
          size="sm"
          onClick={() => setSelectedFilter('locked')}
        >
          Por Desbloquear ({achievements.length - unlockedCount})
        </Button>
      </div>

      {/* Grid de Logros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredAchievements.map((achievement) => (
          <Card key={achievement.id} className={`transition-all ${
            achievement.unlockedAt ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' : 'bg-gray-50'
          }`}>
            <CardContent className="p-4 text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                achievement.unlockedAt 
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' 
                  : 'bg-gray-300 text-gray-500'
              }`}>
                {achievement.unlockedAt ? (
                  <Trophy size={32} />
                ) : (
                  <Lock size={32} />
                )}
              </div>
              
              <h3 className={`font-bold text-lg mb-2 ${
                achievement.unlockedAt ? 'text-gray-800' : 'text-gray-500'
              }`}>
                {achievement.title}
              </h3>
              
              <p className={`text-sm mb-4 ${
                achievement.unlockedAt ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {achievement.description}
              </p>
              
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Star size={16} className={achievement.unlockedAt ? 'text-yellow-500' : 'text-gray-400'} />
                <span className={`font-bold ${
                  achievement.unlockedAt ? 'text-yellow-600' : 'text-gray-400'
                }`}>
                  {achievement.points} puntos
                </span>
              </div>

              {achievement.unlockedAt && (
                <div className="text-xs text-gray-500">
                  Desbloqueado el {new Date(achievement.unlockedAt).toLocaleDateString()}
                </div>
              )}

              {!achievement.unlockedAt && (
                <div className="text-xs text-gray-400">
                  {achievement.requirements || 'Requisitos no especificados'}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estado vacío */}
      {filteredAchievements.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Trophy size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-bold text-gray-600 mb-2">
              {selectedFilter === 'unlocked' ? 'No has desbloqueado logros aún' :
               selectedFilter === 'locked' ? '¡Excelente! Has desbloqueado todos los logros' :
               'No hay logros disponibles'}
            </h3>
            <p className="text-gray-500">
              {selectedFilter === 'unlocked' ? 'Completa tareas y lecciones para desbloquear logros.' :
               selectedFilter === 'locked' ? '¡Felicidades! Sigue así.' :
               'Los logros aparecerán aquí cuando estén disponibles.'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
