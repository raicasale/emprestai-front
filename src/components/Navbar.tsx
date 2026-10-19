import React from 'react';
import { Logo } from './ui/Logo';
import { UserSession } from '../types';

interface NavbarProps {
  user: UserSession;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  onSelectTab,
  onLogout,
}) => {
  const isOps = user.role === 'operacoes';

  // Tabs de acordo com layout.md seção 6:
  // Colaborador: Catálogo, Meus empréstimos
  // Operações: Catálogo, Operações, Equipamentos, Meus empréstimos
  const tabs = isOps
    ? [
        { id: 'catalogo', label: 'Catálogo' },
        { id: 'operacoes', label: 'Operações' },
        { id: 'equipamentos', label: 'Equipamentos' },
        { id: 'meus', label: 'Meus empréstimos' },
      ]
    : [
        { id: 'catalogo', label: 'Catálogo' },
        { id: 'meus', label: 'Meus empréstimos' },
      ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-20 h-[60px] bg-bg border-b border-divider px-10 flex items-center justify-between">
      <div className="flex items-center gap-8 h-full">
        <Logo size="md" />

        <nav className="flex items-center h-full gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`h-[60px] px-3.5 text-[13.5px] font-medium transition-colors border-b-2 ${
                  isActive
                    ? 'border-accent-500 text-text font-semibold'
                    : 'border-transparent text-text/55 hover:text-text/80'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <span className="px-2 py-0.5 rounded text-[11px] font-medium border border-divider text-text/70 uppercase tracking-wider">
          {isOps ? 'Operações' : 'Colaborador'}
        </span>

        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-accent-900 border border-accent-700 text-accent-300 text-[12px] font-semibold flex items-center justify-center">
            {getInitials(user.name)}
          </div>
          <span className="text-[13.5px] text-text/90 font-medium">{user.name}</span>
        </div>

        <button
          onClick={onLogout}
          className="text-[13px] text-text/55 hover:text-accent-400 transition-colors ml-2"
        >
          Sair
        </button>
      </div>
    </header>
  );
};
