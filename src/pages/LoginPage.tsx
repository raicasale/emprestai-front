import React, { useState } from 'react';
import { Logo } from '../components/ui/Logo';
import { UserRole } from '../types';

interface LoginPageProps {
  onLogin: (email: string, role: UserRole) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('ana.ribeiro@empresa.com');
  const [password, setPassword] = useState('••••••••');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, 'colaborador');
  };

  const handleLoginAsOps = () => {
    onLogin('operacoes.ti@empresa.com', 'operacoes');
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] bg-bg min-h-[820px]">
      {/* Coluna Esquerda - Marca e Estatísticas */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1b1f2e] via-bg to-bg p-12 lg:p-[64px_56px] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-divider">
        {/* Brilho radial teal */}
        <div
          className="absolute pointer-events-none rounded-full blur-[140px] opacity-25"
          style={{
            width: '520px',
            height: '520px',
            background: 'radial-gradient(circle, #2fb8ac 0%, rgba(47,184,172,0) 70%)',
            left: '-160px',
            top: '120px',
          }}
        />

        <div className="relative z-10">
          <Logo size="lg" />
        </div>

        <div className="relative z-10 my-16 max-w-[540px]">
          <h1 className="text-[36px] lg:text-[44px] font-semibold text-text leading-[1.12] tracking-[-0.015em] mb-4 text-balance">
            Empréstimo de equipamentos sem planilha.
          </h1>
          <p className="text-[16px] text-text/60 leading-[1.55]">
            Controle de retiradas, devoluções e disponibilidade de TI em tempo real com transparência total.
          </p>
        </div>

        <div className="relative z-10">
          <div className="pt-6 border-t border-divider grid grid-cols-3 gap-6">
            <div>
              <div className="text-[28px] font-semibold text-accent-500 tracking-tight">3</div>
              <div className="text-[13px] text-text/55 leading-snug">itens por pessoa</div>
            </div>
            <div>
              <div className="text-[28px] font-semibold text-accent-500 tracking-tight">14</div>
              <div className="text-[13px] text-text/55 leading-snug">dias de prazo</div>
            </div>
            <div>
              <div className="text-[28px] font-semibold text-accent-500 tracking-tight">0</div>
              <div className="text-[13px] text-text/55 leading-snug">linhas para preencher</div>
            </div>
          </div>
          <div className="mt-8 text-[12px] text-text/40">
            Operações · TI interno
          </div>
        </div>
      </div>

      {/* Coluna Direita - Formulário de Acesso */}
      <div className="p-12 lg:p-[64px_56px] flex items-center justify-center">
        <div className="w-full max-w-[340px]">
          <div className="mb-8">
            <h2 className="text-[26px] font-semibold text-text mb-2">Entrar</h2>
            <p className="text-[14px] text-text/55">
              Informe suas credenciais para acessar o catálogo de equipamentos.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-text/70 font-medium">E-mail corporativo</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input h-[36px]"
                placeholder="seu.nome@empresa.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-text/70 font-medium">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input h-[36px]"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary h-[40px] w-full mt-2 font-semibold"
            >
              Entrar
            </button>

            <button
              type="button"
              onClick={handleLoginAsOps}
              className="btn btn-ghost h-[36px] w-full text-[13.5px]"
            >
              Entrar como Operações →
            </button>

            <div className="mt-4 pt-4 border-t border-divider/40 text-center">
              <p className="text-[12px] text-text/45">
                Cada pessoa vê apenas os próprios empréstimos.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
