import React from 'react';
import { CalendarDays, DollarSign, Users, CheckCircle2 } from 'lucide-react';
import { WeddingData, Guest, BudgetItem, Task, GuestStatus } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface DashboardProps {
  weddingData: WeddingData;
  guests: Guest[];
  budget: BudgetItem[];
  tasks: Task[];
}

const Dashboard: React.FC<DashboardProps> = ({ weddingData, guests, budget, tasks }) => {
  const confirmedGuests = guests.filter(g => g.status === GuestStatus.CONFIRMED).length;
  const totalGuests = guests.length + guests.filter(g => g.plusOne).length; // Rough estimate
  
  const totalBudget = weddingData.budget;
  const currentSpend = budget.reduce((acc, item) => acc + item.actualCost, 0);
  const remainingBudget = totalBudget - currentSpend;
  
  const completedTasks = tasks.filter(t => t.completed).length;
  const progress = Math.round((completedTasks / tasks.length) * 100) || 0;

  const daysUntil = Math.ceil((new Date(weddingData.date).getTime() - new Date().getTime()) / (1000 * 3600 * 24));

  const StatCard = ({ title, value, subtext, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className="text-3xl font-serif font-bold text-slate-800">{value}</span>
      </div>
      <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wide">{title}</h3>
      <p className="text-xs text-slate-400 mt-1">{subtext}</p>
    </div>
  );

  const budgetData = [
    { name: 'Gasto', value: currentSpend },
    { name: 'Restante', value: remainingBudget > 0 ? remainingBudget : 0 },
  ];
  const COLORS = ['#f43f5e', '#e2e8f0'];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-bold text-slate-800">Olá, {weddingData.names}!</h2>
        <p className="text-slate-500">Faltam <strong className="text-rose-500">{daysUntil} dias</strong> para o grande dia.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Convidados" 
          value={confirmedGuests} 
          subtext={`De ${guests.length} convites enviados`}
          icon={Users} 
          color="bg-blue-400"
        />
        <StatCard 
          title="Orçamento" 
          value={`R$ ${currentSpend.toLocaleString('pt-BR')}`} 
          subtext={`De R$ ${totalBudget.toLocaleString('pt-BR')}`}
          icon={DollarSign} 
          color="bg-green-400"
        />
        <StatCard 
          title="Tarefas" 
          value={`${progress}%`} 
          subtext={`${completedTasks} de ${tasks.length} concluídas`}
          icon={CheckCircle2} 
          color="bg-rose-400"
        />
        <StatCard 
          title="Data" 
          value={new Date(weddingData.date).getDate()} 
          subtext={new Date(weddingData.date).toLocaleString('pt-BR', { month: 'long' })}
          icon={CalendarDays} 
          color="bg-purple-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Budget Overview */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Visão Geral do Orçamento</h3>
          <div className="flex flex-col md:flex-row items-center">
             <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={budgetData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {budgetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString()}`} />
                  </PieChart>
                </ResponsiveContainer>
             </div>
             <div className="w-full md:w-1/2 space-y-4">
                <div className="flex items-center justify-between p-3 bg-rose-50 rounded-lg">
                   <span className="text-slate-600">Disponível</span>
                   <span className="font-bold text-rose-600">R$ {remainingBudget.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                   <span className="text-slate-600">Gasto Atual</span>
                   <span className="font-bold text-slate-800">R$ {currentSpend.toLocaleString()}</span>
                </div>
             </div>
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Próximas Tarefas</h3>
          <div className="space-y-3">
            {tasks.filter(t => !t.completed).slice(0, 4).map(task => (
              <div key={task.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${task.priority === 'Alta' ? 'bg-red-500' : 'bg-yellow-500'}`} />
                <div>
                  <p className="text-sm font-medium text-slate-800">{task.title}</p>
                  <p className="text-xs text-slate-500">{task.dueDate ? `Vence em ${new Date(task.dueDate).toLocaleDateString()}` : 'Sem data'}</p>
                </div>
              </div>
            ))}
            {tasks.filter(t => !t.completed).length === 0 && (
               <p className="text-slate-400 text-sm text-center py-4">Tudo em dia! 🎉</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;