import React from 'react';
import { Loan } from '../types';
import { StatusPill } from '../components/ui/StatusPill';

interface MyLoansPageProps {
  loans: Loan[];
  onReturnLoan: (loan: Loan) => void;
  onNavigateToCatalog: () => void;
}

export const MyLoansPage: React.FC<MyLoansPageProps> = ({
  loans,
  onReturnLoan,
  onNavigateToCatalog,
}) => {
  const activeCount = loans.length;

  return (
    <div className="max-w-[1000px] mx-auto py-9 px-10 animate-fadeUp">
      <div className="mb-6">
        <h1 className="text-[30px] font-semibold text-text tracking-[-0.015em]">
          Meus empréstimos
        </h1>
        <p className="text-[14px] text-text/55">
          {activeCount} de 3 itens em seu nome · prazo padrão de 14 dias
        </p>
      </div>

      {/* Barra de 3 traços de ocupação */}
      <div className="grid grid-cols-3 gap-2.5 mb-8">
        {[0, 1, 2].map((slotIndex) => {
          const loan = loans[slotIndex];
          let barClass = 'bg-text/10'; // vazio

          if (loan) {
            barClass = loan.status === 'atraso' ? 'bg-[#e88b8b]' : 'bg-accent-500';
          }

          return (
            <div key={slotIndex} className="h-[5px] rounded-full bg-surface overflow-hidden">
              <div className={`h-full w-full ${barClass}`} />
            </div>
          );
        })}
      </div>

      {/* Lista de Empréstimos */}
      {loans.length === 0 ? (
        <div className="border border-dashed border-divider rounded-lg p-12 text-center bg-surface/30">
          <p className="text-[14px] text-text/60 mb-4">
            Você não possui nenhum equipamento emprestado no momento.
          </p>
          <button onClick={onNavigateToCatalog} className="btn btn-primary">
            Ir ao catálogo →
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {loans.map((loan) => {
            const isOverdue = loan.status === 'atraso';
            const borderCol = isOverdue
              ? 'border-l-[#e88b8b]'
              : 'border-l-accent-500';

            return (
              <div
                key={loan.id}
                className={`bg-surface border border-divider border-l-[3px] ${borderCol} rounded-lg p-[18px_20px] flex flex-col md:flex-row md:items-center justify-between gap-4`}
              >
                <div className="flex-1">
                  <h4 className="text-[16px] font-semibold text-text">
                    {loan.equipmentName}
                  </h4>
                  <span className="text-[12px] font-mono text-text/45">
                    {loan.patrimony}
                  </span>
                </div>

                <div className="text-[13px] text-text/60">
                  <span className="text-[11px] uppercase tracking-wider text-text/40 block">
                    Retirada
                  </span>
                  {loan.borrowedAt}
                </div>

                <div className="text-[13px]">
                  <span className="text-[11px] uppercase tracking-wider text-text/40 block">
                    Devolver até
                  </span>
                  <span className={isOverdue ? 'text-[#e88b8b] font-medium' : 'text-text/80'}>
                    {loan.dueDate}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <StatusPill status={loan.status} />

                  <button
                    onClick={() => onReturnLoan(loan)}
                    className="btn btn-secondary text-[13px] px-3.5"
                  >
                    Devolver
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Rodapé de regras */}
      <div className="mt-12 pt-6 border-t border-divider grid grid-cols-1 md:grid-cols-3 gap-4 text-[12.5px] text-text/45">
        <div>• Prazo padrão fixo de 14 dias corridos para devolução.</div>
        <div>• Máximo de 3 itens por colaborador simultaneamente.</div>
        <div>• Itens em atraso bloqueiam novas solicitações.</div>
      </div>
    </div>
  );
};
