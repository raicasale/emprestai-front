import React, { useState } from 'react';
import { Equipment, EquipmentStatus } from '../types';

interface EquipmentFormPageProps {
  onSave: (equipment: Equipment) => void;
  onCancel: () => void;
  onErrorToast: (msg: string) => void;
}

export const EquipmentFormPage: React.FC<EquipmentFormPageProps> = ({
  onSave,
  onCancel,
  onErrorToast,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'Notebook' | 'Monitor' | 'Cabo' | 'Câmera' | 'Acessório'>('Notebook');
  const [patrimony, setPatrimony] = useState('');
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState<EquipmentStatus>('disponivel');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      onErrorToast('Informe o nome do equipamento');
      return;
    }

    const newEquip: Equipment = {
      id: `eq-${Date.now()}`,
      name: name.trim(),
      category,
      patrimony: patrimony.trim() || 'TI-—',
      notes: notes.trim() || undefined,
      status,
    };

    onSave(newEquip);
  };

  return (
    <div className="max-w-[1160px] mx-auto py-9 px-10 animate-fadeUp">
      <div className="mb-6">
        <h1 className="text-[30px] font-semibold text-text tracking-[-0.015em]">
          Equipamentos · Novo cadastro
        </h1>
        <p className="text-[14px] text-text/55">
          Adicione novos itens ao inventário da empresa para controle de empréstimos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-[34px] items-start">
        {/* Formulário em Card */}
        <div className="bg-surface border border-divider rounded-lg p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-text/70 font-medium">Nome do equipamento *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: MacBook Pro 14 M3, Monitor Dell 27..."
                className="input h-[36px]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] text-text/70 font-medium">Categoria</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="input h-[36px] bg-surface text-text cursor-pointer"
                >
                  <option value="Notebook">Notebook</option>
                  <option value="Monitor">Monitor</option>
                  <option value="Cabo">Cabo</option>
                  <option value="Câmera">Câmera</option>
                  <option value="Acessório">Acessório</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] text-text/70 font-medium">Patrimônio</label>
                <input
                  type="text"
                  value={patrimony}
                  onChange={(e) => setPatrimony(e.target.value)}
                  placeholder="TI-0000 (opcional)"
                  className="input h-[36px]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] text-text/70 font-medium">Observações</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Informações adicionais, defeitos ou acessórios inclusos..."
                className="input py-2 text-[13.5px]"
              />
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <label className="text-[13px] text-text/70 font-medium">Situação inicial</label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer text-[13.5px] text-text/90">
                  <input
                    type="radio"
                    name="status"
                    checked={status === 'disponivel'}
                    onChange={() => setStatus('disponivel')}
                    className="accent-accent-500 cursor-pointer"
                  />
                  Disponível para empréstimo
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-[13.5px] text-text/90">
                  <input
                    type="radio"
                    name="status"
                    checked={status === 'manutencao'}
                    onChange={() => setStatus('manutencao')}
                    className="accent-accent-500 cursor-pointer"
                  />
                  Em manutenção
                </label>
              </div>
            </div>

            <div className="mt-4 pt-5 border-t border-divider flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="btn btn-ghost"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary font-semibold"
              >
                Cadastrar equipamento
              </button>
            </div>
          </form>
        </div>

        {/* Coluna Direita - Regras e Escopo */}
        <div className="flex flex-col gap-4">
          <div className="bg-surface border border-divider rounded-lg p-5">
            <h3 className="text-[14px] font-semibold text-text mb-3">Regras em vigor</h3>
            <ul className="text-[12.5px] text-text/70 space-y-2.5">
              <li className="flex items-start gap-2">
                <span className="text-accent-500 font-bold">—</span>
                <span>Itens cadastrados ficam imediatamente visíveis no catálogo.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-500 font-bold">—</span>
                <span>Equipamentos em manutenção não aparecem como disponíveis para solicitação.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-500 font-bold">—</span>
                <span>O patrimônio é gerado como TI-— caso não informado.</span>
              </li>
            </ul>
          </div>

          <div className="bg-surface border border-divider rounded-lg p-5 opacity-45">
            <h3 className="text-[14px] font-semibold text-text mb-3">Fora desta versão (v1)</h3>
            <ul className="text-[12.5px] text-text/70 space-y-2">
              <li>• Reserva com data futura</li>
              <li>• Notificação por e-mail</li>
              <li>• Importação de planilha atual</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
