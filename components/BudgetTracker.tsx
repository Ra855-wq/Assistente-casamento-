import React from 'react';
import { BudgetItem } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface BudgetTrackerProps {
  budget: BudgetItem[];
  setBudget: React.Dispatch<React.SetStateAction<BudgetItem[]>>;
}

const BudgetTracker: React.FC<BudgetTrackerProps> = ({ budget, setBudget }) => {
  const totalEstimated = budget.reduce((acc, item) => acc + item.estimatedCost, 0);
  const totalActual = budget.reduce((acc, item) => acc + item.actualCost, 0);
  const totalPaid = budget.reduce((acc, item) => acc + item.paid, 0);

  // Simplified edit - normally would be a modal
  const handleUpdateCost = (id: string, field: keyof BudgetItem, value: string) => {
    const numValue = parseFloat(value) || 0;
    setBudget(budget.map(item => item.id === id ? { ...item, [field]: numValue } : item));
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
           <h2 className="text-3xl font-serif font-bold text-slate-800">Controle Financeiro</h2>
           <p className="text-slate-500">Acompanhe seus gastos estimados vs. realizados.</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
            <div className="text-right">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Total Estimado</p>
                <p className="text-xl font-bold text-slate-700">R$ {totalEstimated.toLocaleString()}</p>
            </div>
            <div className="text-right">
                <p className="text-xs text-slate-500 uppercase tracking-wider">Total Realizado</p>
                <p className={`text-xl font-bold ${totalActual > totalEstimated ? 'text-red-500' : 'text-green-600'}`}>
                    R$ {totalActual.toLocaleString()}
                </p>
            </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-80">
        <h3 className="text-sm font-bold text-slate-500 mb-4 uppercase">Comparativo por Categoria</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={budget} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="category" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
            <YAxis tick={{fontSize: 12}} axisLine={false} tickLine={false} tickFormatter={(val) => `R$${val/1000}k`} />
            <Tooltip 
                cursor={{fill: '#f8fafc'}}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
            />
            <Legend wrapperStyle={{paddingTop: '20px'}} />
            <Bar name="Estimado" dataKey="estimatedCost" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar name="Realizado" dataKey="actualCost" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* List Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
                <tr>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Estimado (R$)</th>
                <th className="px-6 py-4">Realizado (R$)</th>
                <th className="px-6 py-4">Pago (R$)</th>
                <th className="px-6 py-4 text-center">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {budget.map((item) => {
                    const status = item.paid >= item.actualCost && item.actualCost > 0 
                        ? 'pago' 
                        : item.actualCost > item.estimatedCost 
                        ? 'alerta' 
                        : 'ok';

                    return (
                        <tr key={item.id} className="hover:bg-rose-50/30 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-800">{item.category}</td>
                            <td className="px-6 py-4">
                                <input 
                                    type="number" 
                                    className="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-rose-500 focus:outline-none w-24 transition-colors text-slate-600"
                                    value={item.estimatedCost}
                                    onChange={(e) => handleUpdateCost(item.id, 'estimatedCost', e.target.value)}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <input 
                                    type="number" 
                                    className="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-rose-500 focus:outline-none w-24 transition-colors font-medium text-slate-800"
                                    value={item.actualCost}
                                    onChange={(e) => handleUpdateCost(item.id, 'actualCost', e.target.value)}
                                />
                            </td>
                            <td className="px-6 py-4">
                                <input 
                                    type="number" 
                                    className="bg-transparent border-b border-transparent hover:border-slate-300 focus:border-rose-500 focus:outline-none w-24 transition-colors text-green-600"
                                    value={item.paid}
                                    onChange={(e) => handleUpdateCost(item.id, 'paid', e.target.value)}
                                />
                            </td>
                            <td className="px-6 py-4 flex justify-center">
                                {status === 'pago' && <CheckCircle className="w-5 h-5 text-green-500" />}
                                {status === 'alerta' && <AlertCircle className="w-5 h-5 text-red-500" />}
                                {status === 'ok' && <TrendingUp className="w-5 h-5 text-blue-400" />}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
            </table>
        </div>
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 text-center">
            Clique nos valores para editar. O gráfico será atualizado automaticamente.
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;