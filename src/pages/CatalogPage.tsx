import React, { useState, useMemo } from 'react';
import { Equipment, Loan, UserSession } from '../types';
import { StatusPill } from '../components/ui/StatusPill';

interface CatalogPageProps {
  user: UserSession;
  equipments: Equipment[];
  userLoans: Loan[];
  onRequestLoan: (equipment: Equipment) => void;
  onNavigateToLoans: () => void;
}

type FilterType = 'todos' | 'disponivel' | 'emprestado' | 'manutencao';

export const CatalogPage: React.FC<CatalogPageProps> = ({
  user,
  equipments,
  userLoans,
  onRequestLoan,
  onNavigateToLoans,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('todos');

  // Regras de negócio da v1:
  // 1. Limite de 3 empréstimos simultâneos
  const activeLoansCount = userLoans.length;
  const isLimitReached = activeLoansCount >= 3;

  // 2. Quem tem item em atraso não pode pegar outro
  const hasOverdueLoans = userLoans.some((l) => l.status === 'atraso');

  // Contagem de disponíveis
  const availableCount = equipments.filter((e) => e.status === 'disponivel').length;
  const totalCount = equipments.length;

  // Filtragem e busca imediata
  const filteredEquipments = useMemo(() => {
    return equipments.filter((item) => {
      const matchesFilter =
        activeFilter === 'todos' ? true : item.status === activeFilter;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        item.name.toLowerCase().includes(q) ||
        item.patrimony.toLowerCase().includes(q);

      return matchesFilter && matchesSearch;
    });
  }, [equipments, activeFilter, searchQuery]);

  return (
    <div className="max-w-[1240px] mx-auto py-9 px-10">
      {/* Banner de bloqueio por atraso (Condicional) */}
      {hasOverdueLoans && (
        <div className="mb-6 p-4 rounded-lg bg-[rgba(122,59,59,0.14)] border border-[#7a3b3b] flex items-center justify-between animate-fadeUp">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#e88b8b]" />
            <p className="text-[13.5px] text-[#e88b8b]">
              Você possui equipamentos em atraso. Devolva os itens pendentes para solicitar novos empréstimos.
            </p>
          </div>
          <button
            onClick={onNavigateToLoans}
            className="text-[13px] text-[#e88b8b] hover:underline font-medium"
          >
            Ver meus empréstimos →
          </button>
        </div>
      )}

      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[30px] font-semibold text-text tracking-[-0.015em]">
            Catálogo
          </h1>
          <p className="text-[14px] text-text/55">
            {availableCount} de {totalCount} equipamentos disponíveis agora
          </p>
        </div>

        {/* Busca */}
        <div className="w-full md:w-[260px]">
          <input
            type="text"
            placeholder="Buscar por nome ou patrimônio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input w-full h-[36px] text-[13.5px]"
          />
        </div>
      </div>

      {/* Chips de filtro */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        {(
          [
            { id: 'todos', label: 'Todos' },
            { id: 'disponivel', label: 'Disponíveis' },
            { id: 'emprestado', label: 'Emprestados' },
            { id: 'manutencao', label: 'Em manutenção' },
          ] as const
        ).map((filter) => {
          const isActive = activeFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-3.5 py-1.5 rounded-full text-[13px] font-medium transition-all ${
                isActive
                  ? 'border border-accent-500 text-accent-400 bg-[rgba(47,184,172,0.10)]'
                  : 'border border-divider text-text/60 hover:text-text/80 bg-surface'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Grade de Cards */}
      {filteredEquipments.length === 0 ? (
        <div className="border border-dashed border-divider rounded-lg p-12 text-center text-text/50">
          Nenhum equipamento encontrado para a busca informada.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(292px,1fr))] gap-4">
          {filteredEquipments.map((item) => {
            const isAssignedToMe = item.assignedTo === user.name;
            const isAvailable = item.status === 'disponivel';
            const isMaintenance = item.status === 'manutencao';

            // Detalhe do card
            let detailText = 'Pronto para retirada no balcão';
            if (item.status === 'emprestado') {
              detailText = isAssignedToMe
                ? `Com você · devolver até ${item.dueDate}`
                : `Com ${item.assignedTo} · devolver até ${item.dueDate}`;
            } else if (isMaintenance) {
              detailText = item.notes || 'Equipamento em reparo técnico';
            }

            // Ação e rótulo do botão
            let btnLabel = 'Solicitar empréstimo';
            let isDisabled = false;

            if (hasOverdueLoans) {
              btnLabel = 'Bloqueado por atraso';
              isDisabled = true;
            } else if (isLimitReached && isAvailable) {
              btnLabel = 'Limite de 3 itens atingido';
              isDisabled = true;
            } else if (isAssignedToMe) {
              btnLabel = 'Está com você';
              isDisabled = true;
            } else if (item.status === 'emprestado') {
              btnLabel = 'Emprestado';
              isDisabled = true;
            } else if (isMaintenance) {
              btnLabel = 'Indisponível';
              isDisabled = true;
            }

            return (
              <div
                key={item.id}
                className="bg-surface border border-divider rounded-lg p-[18px] flex flex-col justify-between gap-3 animate-fadeUp hover:border-text/25 transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-[11px] font-semibold tracking-[0.08em] text-text/45 uppercase">
                      {item.category}
                    </span>
                    <StatusPill status={item.status} />
                  </div>

                  <h3 className="text-[16.5px] font-semibold text-text leading-snug">
                    {item.name}
                  </h3>

                  <div className="text-[12px] text-text/45 mt-0.5 font-mono">
                    {item.patrimony}
                  </div>
                </div>

                <div className="pt-2 border-t border-divider/40 flex flex-col gap-3">
                  <p className="text-[12.5px] text-text/60 min-h-[38px] line-clamp-2">
                    {detailText}
                  </p>

                  <button
                    onClick={() => onRequestLoan(item)}
                    disabled={isDisabled}
                    className={`btn w-full text-[13.5px] ${
                      isDisabled ? 'btn-secondary opacity-50' : 'btn-primary'
                    }`}
                  >
                    {btnLabel}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
