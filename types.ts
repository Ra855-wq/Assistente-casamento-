export enum GuestStatus {
  PENDING = 'Pendente',
  CONFIRMED = 'Confirmado',
  DECLINED = 'Recusado'
}

export interface Guest {
  id: string;
  name: string;
  email?: string;
  category: 'Noiva' | 'Noivo' | 'Amigos' | 'Trabalho' | 'Outros';
  status: GuestStatus;
  plusOne: boolean;
}

export interface BudgetItem {
  id: string;
  category: string;
  estimatedCost: number;
  actualCost: number;
  paid: number;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority: 'Alta' | 'Média' | 'Baixa';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export type WeddingData = {
  names: string;
  date: string;
  budget: number;
  location: string;
};