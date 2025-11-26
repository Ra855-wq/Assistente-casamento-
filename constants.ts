import { Guest, GuestStatus, BudgetItem, Task, WeddingData } from './types';

export const INITIAL_WEDDING_DATA: WeddingData = {
  names: "Ana caroline ferreira lima pimenta & Rafael dalazen araujo ",
  date: "2025-01-16",
  budget: 50000,
  location: "vitoria, ES"
};

export const INITIAL_GUESTS: Guest[] = [
  { id: '1', name: 'Roberto Silva', category: 'Noiva', status: GuestStatus.CONFIRMED, plusOne: true },
  { id: '2', name: 'Mariana Costa', category: 'Noivo', status: GuestStatus.PENDING, plusOne: false },
  { id: '3', name: 'Carlos Oliveira', category: 'Amigos', status: GuestStatus.DECLINED, plusOne: true },
  { id: '4', name: 'Fernanda Lima', category: 'Trabalho', status: GuestStatus.PENDING, plusOne: false },
];

export const INITIAL_BUDGET: BudgetItem[] = [
  { id: '1', category: 'Local', estimatedCost: 15000, actualCost: 14500, paid: 5000 },
  { id: '2', category: 'Buffet', estimatedCost: 20000, actualCost: 0, paid: 0 },
  { id: '3', category: 'Fotografia', estimatedCost: 5000, actualCost: 4800, paid: 4800 },
  { id: '4', category: 'Decoração', estimatedCost: 8000, actualCost: 0, paid: 0 },
  { id: '5', category: 'Música', estimatedCost: 3000, actualCost: 3500, paid: 1000 },
];

export const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Contratar Buffet', completed: false, priority: 'Alta', dueDate: '2024-06-01' },
  { id: '2', title: 'Enviar Save the Date', completed: true, priority: 'Média', dueDate: '2024-05-15' },
  { id: '3', title: 'Escolher vestido', completed: false, priority: 'Alta', dueDate: '2024-07-01' },
  { id: '4', title: 'Degustação de doces', completed: false, priority: 'Baixa', dueDate: '2024-08-20' },
];