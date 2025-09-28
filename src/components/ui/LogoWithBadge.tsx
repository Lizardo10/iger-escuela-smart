import React from 'react';
import { ResponsiveLogo } from './ResponsiveLogo';

interface LogoWithBadgeProps {
  className?: string;
  showBadge?: boolean;
  badgeText?: string;
  badgeColor?: 'blue' | 'green' | 'purple' | 'yellow';
}

export const LogoWithBadge: React.FC<LogoWithBadgeProps> = ({
  className = '',
  showBadge = true,
  badgeText = 'NUEVO',
  badgeColor = 'blue'
}) => {
  const getBadgeClasses = () => {
    switch (badgeColor) {
      case 'blue':
        return 'bg-blue-500 text-white';
      case 'green':
        return 'bg-green-500 text-white';
      case 'purple':
        return 'bg-purple-500 text-white';
      case 'yellow':
        return 'bg-yellow-500 text-black';
      default:
        return 'bg-blue-500 text-white';
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <ResponsiveLogo />
      {showBadge && (
        <div className={`absolute -top-2 -right-2 px-2 py-1 text-xs font-bold rounded-full animate-bounce ${getBadgeClasses()}`}>
          {badgeText}
        </div>
      )}
    </div>
  );
};
