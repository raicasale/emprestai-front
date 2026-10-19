import React from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  summaryLabel1: string;
  summaryValue1: string;
  summaryLabel2: string;
  summaryValue2: string;
  confirmLabel: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  description,
  summaryLabel1,
  summaryValue1,
  summaryLabel2,
  summaryValue2,
  confirmLabel,
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0b12]/[0.68] p-4 animate-fadeUp"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[420px] bg-surface border border-divider rounded-lg p-[26px] shadow-2xl flex flex-col gap-5 animate-fadeUp-modal"
      >
        <div>
          <h3 className="text-[20px] font-semibold text-text mb-1.5">{title}</h3>
          <p className="text-[13.5px] text-text/65 leading-relaxed">{description}</p>
        </div>

        {/* Bloco Resumo */}
        <div className="bg-bg/40 border border-divider rounded-md p-[14px_16px] flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-text/55">{summaryLabel1}</span>
            <span className="font-semibold text-accent-400">{summaryValue1}</span>
          </div>
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-text/55">{summaryLabel2}</span>
            <span className="font-semibold text-accent-400">{summaryValue2}</span>
          </div>
        </div>

        {/* Ações */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="btn btn-secondary text-[13px]"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="btn btn-primary font-semibold text-[13px]"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
