import React from 'react';
import { EquipmentStatus, LoanStatus } from '../../types';

interface StatusPillProps {
  status: EquipmentStatus | LoanStatus;
  label?: string;
}

export const StatusPill: React.FC<StatusPillProps> = ({ status, label }) => {
  let displayLabel = label;
  let colorClasses = '';

  switch (status) {
    case 'disponivel':
    case 'em_dia':
      displayLabel = displayLabel || (status === 'disponivel' ? 'Disponível' : 'Em dia');
      colorClasses = 'text-[#5fcfc4] bg-[rgba(47,184,172,0.12)] border-[rgba(47,184,172,0.40)]';
      break;
    case 'emprestado':
    case 'a_vencer':
      displayLabel = displayLabel || (status === 'emprestado' ? 'Emprestado' : 'A vencer');
      colorClasses = 'text-[#c9a25f] bg-[rgba(201,162,95,0.12)] border-[rgba(201,162,95,0.38)]';
      break;
    case 'atraso':
      displayLabel = displayLabel || 'Em atraso';
      colorClasses = 'text-[#e88b8b] bg-[rgba(200,90,90,0.14)] border-[rgba(200,90,90,0.40)]';
      break;
    case 'manutencao':
      displayLabel = displayLabel || 'Manutenção';
      colorClasses = 'text-[#9aa0ad] bg-[rgba(154,160,173,0.10)] border-[rgba(154,160,173,0.30)]';
      break;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-[3px] rounded-full text-[12px] font-medium border ${colorClasses}`}>
      {displayLabel}
    </span>
  );
};
