import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  const isLg = size === 'lg';
  const boxSize = isLg ? 'w-6 h-6' : 'w-5 h-5';
  const innerSize = isLg ? 'w-2.5 h-2.5' : 'w-2 h-2';
  const textSize = isLg ? 'text-[17px]' : 'text-[15px]';

  return (
    <div className="inline-flex items-center gap-2.5 select-none">
      <div className={`${boxSize} border-[1.5px] border-accent-500 rounded-[6px] flex items-center justify-center p-0.5`}>
        <div className={`${innerSize} bg-accent-500 rounded-[2px]`} />
      </div>
      <span className={`${textSize} tracking-[0.02em]`}>
        <strong className="font-bold text-text">EMPREST</strong>
        <span className="font-bold text-accent-500">.AI</span>
      </span>
    </div>
  );
};
