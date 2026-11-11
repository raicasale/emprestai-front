import { Equipment, Loan, UserSession } from '../types';

export const INITIAL_USER: UserSession = {
  id: 'usr-1',
  name: 'Ana Ribeiro',
  email: 'ana.ribeiro@empresa.com',
  role: 'colaborador',
};

const SUPABASE_STORAGE_BASE = 'https://stubxpftqcfiqqvsrplv.supabase.co/storage/v1/object/public/equipamentos';

export const INITIAL_EQUIPMENTS: Equipment[] = [
  {
    id: 'eq-1',
    name: 'Notebook 14 polegadas',
    category: 'Notebook',
    patrimony: 'TI-0001',
    status: 'disponivel',
    imageUrl: `${SUPABASE_STORAGE_BASE}/TI-0001.jpg`,
  },
  {
    id: 'eq-2',
    name: 'Notebook 15 polegadas',
    category: 'Notebook',
    patrimony: 'TI-0002',
    status: 'disponivel',
    imageUrl: `${SUPABASE_STORAGE_BASE}/TI-0002.jpg`,
  },
  {
    id: 'eq-3',
    name: 'Notebook 13 polegadas',
    category: 'Notebook',
    patrimony: 'TI-0003',
    status: 'disponivel',
    imageUrl: `${SUPABASE_STORAGE_BASE}/TI-0003.jpg`,
  },
  {
    id: 'eq-4',
    name: 'Notebook 15 polegadas',
    category: 'Notebook',
    patrimony: 'TI-0004',
    status: 'manutencao',
    notes: 'Em manutenção preventiva',
    imageUrl: `${SUPABASE_STORAGE_BASE}/TI-0004.jpg`,
  },
  {
    id: 'eq-5',
    name: 'Monitor 24 polegadas',
    category: 'Monitor',
    patrimony: 'TI-0005',
    status: 'disponivel',
    imageUrl: `${SUPABASE_STORAGE_BASE}/TI-0005.jpg`,
  },
  {
    id: 'eq-6',
    name: 'Monitor 27 polegadas',
    category: 'Monitor',
    patrimony: 'TI-0006',
    status: 'disponivel',
    imageUrl: `${SUPABASE_STORAGE_BASE}/TI-0006.jpg`,
  },
  {
    id: 'eq-7',
    name: 'Monitor 22 polegadas',
    category: 'Monitor',
    patrimony: 'TI-0007',
    status: 'manutencao',
    notes: 'Aguardando troca de painel',
    imageUrl: `${SUPABASE_STORAGE_BASE}/TI-0007.jpg`,
  },
  {
    id: 'eq-8',
    name: 'Cabo HDMI 2 m',
    category: 'Cabo',
    patrimony: 'TI-0008',
    status: 'disponivel',
    imageUrl: `${SUPABASE_STORAGE_BASE}/TI-0008.jpg`,
  },
  {
    id: 'eq-9',
    name: 'Cabo USB-C 1 m',
    category: 'Cabo',
    patrimony: 'TI-0009',
    status: 'disponivel',
    imageUrl: `${SUPABASE_STORAGE_BASE}/TI-0009.jpg`,
  },
  {
    id: 'eq-10',
    name: 'Cabo de rede 3 m',
    category: 'Cabo',
    patrimony: 'TI-0010',
    status: 'manutencao',
    notes: 'Conector danificado',
    imageUrl: `${SUPABASE_STORAGE_BASE}/TI-0010.jpg`,
  },
  {
    id: 'eq-11',
    name: 'Webcam Full HD',
    category: 'Câmera',
    patrimony: 'TI-0011',
    status: 'disponivel',
    imageUrl: `${SUPABASE_STORAGE_BASE}/TI-0011.jpg`,
  },
  {
    id: 'eq-12',
    name: 'Câmera compacta',
    category: 'Câmera',
    patrimony: 'TI-0012',
    status: 'disponivel',
    imageUrl: `${SUPABASE_STORAGE_BASE}/TI-0012.jpg`,
  },
];

export const INITIAL_LOANS: Loan[] = [
  {
    id: 'loan-sample-1',
    equipmentId: 'eq-sample',
    equipmentName: 'Equipamento de Teste',
    patrimony: 'TI-9999',
    userName: 'Ana Ribeiro',
    borrowedAt: '29/08/2026',
    dueDate: '12/09/2026',
    status: 'em_dia',
  },
];
