export type EquipmentStatus = 'disponivel' | 'emprestado' | 'manutencao';
export type LoanStatus = 'em_dia' | 'a_vencer' | 'atraso';
export type UserRole = 'colaborador' | 'operacoes';

export interface Equipment {
  id: string;
  name: string;
  category: 'Notebook' | 'Monitor' | 'Cabo' | 'Câmera' | 'Acessório';
  patrimony: string;
  status: EquipmentStatus;
  imageUrl?: string;
  notes?: string;
  assignedTo?: string; // nome do usuário caso emprestado
  dueDate?: string; // data de devolução prevista
}

export interface Loan {
  id: string;
  equipmentId: string;
  equipmentName: string;
  patrimony: string;
  userName: string;
  borrowedAt: string;
  dueDate: string;
  status: LoanStatus;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
