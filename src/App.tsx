import React, { useState } from 'react';
import { UserSession, Equipment, Loan, UserRole } from './types';
import {
  INITIAL_USER,
  INITIAL_EQUIPMENTS,
  INITIAL_LOANS,
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { LoginPage } from './pages/LoginPage';
import { CatalogPage } from './pages/CatalogPage';
import { MyLoansPage } from './pages/MyLoansPage';
import { OperationsPage } from './pages/OperationsPage';
import { EquipmentFormPage } from './pages/EquipmentFormPage';
import { Modal } from './components/ui/Modal';
import { Toast } from './components/ui/Toast';

export const App: React.FC = () => {
  // Sessão do usuário (null = tela de login)
  const [user, setUser] = useState<UserSession | null>(null);
  const [activeTab, setActiveTab] = useState<string>('catalogo');

  // Estado dos dados (inicializados com a seção 9 de layout.md)
  const [equipments, setEquipments] = useState<Equipment[]>(INITIAL_EQUIPMENTS);
  const [loans, setLoans] = useState<Loan[]>(INITIAL_LOANS);

  // Estados de Toast e Modal
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'borrow' | 'return';
    equipment?: Equipment;
    loan?: Loan;
  }>({
    isOpen: false,
    type: 'borrow',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2600); // Conforme seção 5.6 do layout.md: 2600ms
  };

  // Login / Logout
  const handleLogin = (email: string, role: UserRole) => {
    const isOps = role === 'operacoes';
    const isProfessor = email.toLowerCase().includes('marcelo.grilo');

    let displayName = isOps ? 'Operações TI' : 'Colaborador';
    if (isProfessor) {
      displayName = 'Marcelo Grilo';
    } else if (email === INITIAL_USER.email) {
      displayName = INITIAL_USER.name;
    } else {
      const namePart = email.split('@')[0];
      displayName = namePart
        .split('.')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    }

    setUser({
      id: isProfessor ? 'usr-marcelo-grilo' : isOps ? 'usr-ops' : `usr-${Date.now()}`,
      name: displayName,
      email,
      role,
    });
    // Conforme seção 6: "Entrar" -> Catálogo; "Entrar como Operações" -> Operações
    setActiveTab(isOps ? 'operacoes' : 'catalogo');
    showToast(isOps ? 'Bem-vindo(a) ao painel de Operações' : `Bem-vindo(a), ${displayName}!`);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('catalogo');
  };

  // Empréstimos do usuário logado
  const userLoans = loans.filter((l) => l.userName === user?.name);

  // Fluxo de Solicitação de Empréstimo
  const handleOpenBorrowModal = (item: Equipment) => {
    setModalState({
      isOpen: true,
      type: 'borrow',
      equipment: item,
    });
  };

  const handleConfirmBorrow = () => {
    if (!modalState.equipment || !user) return;
    const item = modalState.equipment;

    // Calcular data devolução (hoje + 14 dias fixos)
    const dueDate = '15/09/2026'; // referência do protótipo

    // Atualizar equipamento
    setEquipments((prev) =>
      prev.map((e) =>
        e.id === item.id
          ? { ...e, status: 'emprestado', assignedTo: user.name, dueDate }
          : e
      )
    );

    // Adicionar empréstimo
    const newLoan: Loan = {
      id: `loan-${Date.now()}`,
      equipmentId: item.id,
      equipmentName: item.name,
      patrimony: item.patrimony,
      userName: user.name,
      borrowedAt: '31/08/2026',
      dueDate,
      status: 'em_dia',
    };
    setLoans((prev) => [newLoan, ...prev]);

    setModalState({ isOpen: false, type: 'borrow' });
    showToast(`Empréstimo de ${item.name} confirmado com sucesso!`);
  };

  // Fluxo de Devolução (Colaborador e Operações)
  const handleOpenReturnModal = (loan: Loan) => {
    setModalState({
      isOpen: true,
      type: 'return',
      loan,
    });
  };

  const handleConfirmReturn = () => {
    if (!modalState.loan) return;
    const loan = modalState.loan;

    // Atualizar equipamento para disponível
    setEquipments((prev) =>
      prev.map((e) =>
        e.id === loan.equipmentId || e.name === loan.equipmentName
          ? { ...e, status: 'disponivel', assignedTo: undefined, dueDate: undefined }
          : e
      )
    );

    // Remover dos empréstimos ativos
    setLoans((prev) => prev.filter((l) => l.id !== loan.id));

    setModalState({ isOpen: false, type: 'return' });
    showToast(`Devolução de ${loan.equipmentName} registrada com sucesso!`);
  };

  // Cadastro de Novo Equipamento
  const handleSaveEquipment = (newEquip: Equipment) => {
    setEquipments((prev) => [newEquip, ...prev]);
    setActiveTab('operacoes');
    showToast(`Equipamento ${newEquip.name} cadastrado com sucesso!`);
  };

  // Se não estiver logado, exibe a página de Login (seção 5.1)
  if (!user) {
    return (
      <>
        <LoginPage onLogin={handleLogin} />
        <Toast message={toastMessage} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text flex flex-col">
      <Navbar
        user={user}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onLogout={handleLogout}
      />

      <main className="flex-1 pb-16">
        {activeTab === 'catalogo' && (
          <CatalogPage
            user={user}
            equipments={equipments}
            userLoans={userLoans}
            onRequestLoan={handleOpenBorrowModal}
            onNavigateToLoans={() => setActiveTab('meus')}
          />
        )}

        {activeTab === 'meus' && (
          <MyLoansPage
            loans={userLoans}
            onReturnLoan={handleOpenReturnModal}
            onNavigateToCatalog={() => setActiveTab('catalogo')}
          />
        )}

        {activeTab === 'operacoes' && (
          <OperationsPage
            equipments={equipments}
            loans={loans}
            onReturnLoan={handleOpenReturnModal}
            onNavigateToCreate={() => setActiveTab('equipamentos')}
          />
        )}

        {activeTab === 'equipamentos' && (
          <EquipmentFormPage
            onSave={handleSaveEquipment}
            onCancel={() => setActiveTab('operacoes')}
            onErrorToast={showToast}
          />
        )}
      </main>

      {/* Modal de Solicitação de Empréstimo */}
      {modalState.type === 'borrow' && modalState.equipment && (
        <Modal
          isOpen={modalState.isOpen}
          title="Confirmar solicitação"
          description="Você está solicitando o empréstimo deste equipamento. O prazo fixo de uso é de 14 dias."
          summaryLabel1="Equipamento"
          summaryValue1={modalState.equipment.name}
          summaryLabel2="Devolver até"
          summaryValue2="15/09/2026 (14 dias)"
          confirmLabel="Confirmar empréstimo"
          onConfirm={handleConfirmBorrow}
          onClose={() => setModalState({ isOpen: false, type: 'borrow' })}
        />
      )}

      {/* Modal de Devolução */}
      {modalState.type === 'return' && modalState.loan && (
        <Modal
          isOpen={modalState.isOpen}
          title="Confirmar devolução"
          description={
            user.role === 'operacoes'
              ? 'Confirme o recebimento deste equipamento no balcão de TI para liberar o inventário.'
              : 'Confirme a devolução deste equipamento ao balcão de operações.'
          }
          summaryLabel1="Equipamento"
          summaryValue1={modalState.loan.equipmentName}
          summaryLabel2={user.role === 'operacoes' ? 'Colaborador' : 'Devolução em'}
          summaryValue2={user.role === 'operacoes' ? modalState.loan.userName : 'Hoje (31/08/2026)'}
          confirmLabel="Registrar devolução"
          onConfirm={handleConfirmReturn}
          onClose={() => setModalState({ isOpen: false, type: 'return' })}
        />
      )}

      <Toast message={toastMessage} />
    </div>
  );
};
