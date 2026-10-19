import React, { useState, useMemo } from 'react';
import { Equipment, Loan } from '../types';
import { StatusPill } from '../components/ui/StatusPill';

interface OperationsPageProps {
  equipments: Equipment[];
  loans: Loan[];
  onReturnLoan: (loan: Loan) => void;
  onNavigateToCreate: () => void;
}

export const OperationsPage: React.FC<OperationsPageProps> = ({
  equipments,
  loans,
  onReturnLoan,
  onNavigateToCreate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // KPIs
  const openLoansCount = loans.length;
  const overdueCount = loans.filter((l) => l.status === 'atraso').length;
  const availableCount = equipments.filter((e) => e.status === 'disponivel').length;
  const maintenanceCount = equipments.filter((e) => e.status === 'manutencao').length;

  // Filtro de busca (pessoa + item)
  const filteredLoans = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return loans;
    return loans.filter(
      (l) =>
        l.userName.toLowerCase().includes(q) ||
        l.equipmentName.toLowerCase().includes(q) ||
        l.patrimony.toLowerCase().includes(q)
    );
  }, [loans, searchQuery]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className="max-w-[1320px] mx-auto py-9 px-10 animate-fadeUp">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[30px] font-semibold text-text tracking-[-0.015em]">
            Operações · Empréstimos em aberto
          </h1>
          <p className="text-[14px] text-text/55">
            Visão consolidada de retiradas, prazos e controle de devolução no balcão.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Buscar pessoa ou item..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input w-[230px] h-[36px]"
          />
          <button
            onClick={onNavigateToCreate}
            className="btn btn-primary font-semibold"
          >
            Cadastrar equipamento
          </button>
        </div>
      </div>

      {/* Grade de 4 KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
        <div className="bg-surface border border-divider rounded-lg p-[16px_18px]">
          <span className="text-[11px] font-semibold text-text/45 uppercase tracking-wider">
            Em aberto
          </span>
          <div className="text-[30px] font-semibold text-text mt-1">
            {openLoansCount}
          </div>
          <span className="text-[12px] text-text/45">retiradas ativas</span>
        </div>

        <div className="bg-surface border border-divider rounded-lg p-[16px_18px]">
          <span className="text-[11px] font-semibold text-text/45 uppercase tracking-wider">
            Em atraso
          </span>
          <div className="text-[30px] font-semibold text-[#e88b8b] mt-1">
            {overdueCount}
          </div>
          <span className="text-[12px] text-text/45">fora do prazo de 14 dias</span>
        </div>

        <div className="bg-surface border border-divider rounded-lg p-[16px_18px]">
          <span className="text-[11px] font-semibold text-text/45 uppercase tracking-wider">
            Disponíveis
          </span>
          <div className="text-[30px] font-semibold text-accent-500 mt-1">
            {availableCount}
          </div>
          <span className="text-[12px] text-text/45">prontos para empréstimo</span>
        </div>

        <div className="bg-surface border border-divider rounded-lg p-[16px_18px]">
          <span className="text-[11px] font-semibold text-text/45 uppercase tracking-wider">
            Manutenção
          </span>
          <div className="text-[30px] font-semibold text-[#9aa0ad] mt-1">
            {maintenanceCount}
          </div>
          <span className="text-[12px] text-text/45">indisponíveis temporariamente</span>
        </div>
      </div>

      {/* Tabela de Empréstimos */}
      <div className="border border-divider rounded-lg overflow-hidden bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13.5px]">
            <thead className="bg-white/[0.03] border-b border-divider text-[11px] font-semibold uppercase tracking-wider text-text/45">
              <tr>
                <th className="p-[12px_18px]">Pessoa</th>
                <th className="p-[12px_18px]">Equipamento</th>
                <th className="p-[12px_18px]">Patrimônio</th>
                <th className="p-[12px_18px]">Retirada</th>
                <th className="p-[12px_18px]">Prazo</th>
                <th className="p-[12px_18px]">Situação</th>
                <th className="p-[12px_18px] text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-divider/60">
              {filteredLoans.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-10 text-center text-text/50">
                    Nenhum empréstimo encontrado.
                  </td>
                </tr>
              ) : (
                filteredLoans.map((loan) => {
                  const isOverdue = loan.status === 'atraso';
                  return (
                    <tr key={loan.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-[13px_18px]">
                        <div className="flex items-center gap-2.5">
                          <div className="w-[26px] h-[26px] rounded-full bg-neutral-900 border border-divider text-[11px] text-text/80 flex items-center justify-center font-medium">
                            {getInitials(loan.userName)}
                          </div>
                          <span className="font-medium text-text">{loan.userName}</span>
                        </div>
                      </td>
                      <td className="p-[13px_18px] text-text/90 font-medium">
                        {loan.equipmentName}
                      </td>
                      <td className="p-[13px_18px] font-mono text-[12px] text-text/50">
                        {loan.patrimony}
                      </td>
                      <td className="p-[13px_18px] text-text/70">{loan.borrowedAt}</td>
                      <td className="p-[13px_18px]">
                        <span className={isOverdue ? 'text-[#e88b8b] font-semibold' : 'text-text/80'}>
                          {loan.dueDate}
                        </span>
                      </td>
                      <td className="p-[13px_18px]">
                        <StatusPill status={loan.status} />
                      </td>
                      <td className="p-[13px_18px] text-right">
                        <button
                          onClick={() => onReturnLoan(loan)}
                          className="btn btn-secondary text-[12.5px] h-[30px] px-3 hover:border-accent-500 hover:text-accent-400"
                        >
                          Registrar devolução
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
