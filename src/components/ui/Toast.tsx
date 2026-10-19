import React from 'react';

interface ToastProps {
  message: string | null;
}

export const Toast: React.FC<ToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-7 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-accent-900 border border-accent-700 text-accent-200 text-[13.5px] font-medium shadow-lg animate-fadeUp-toast select-none">
      {message}
    </div>
  );
};
