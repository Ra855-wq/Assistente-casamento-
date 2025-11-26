import React, { useState } from 'react';
import { Guest, GuestStatus } from '../types';
import { UserPlus, Search, Check, X, Clock } from 'lucide-react';

interface GuestListProps {
  guests: Guest[];
  setGuests: React.Dispatch<React.SetStateAction<Guest[]>>;
}

const GuestList: React.FC<GuestListProps> = ({ guests, setGuests }) => {
  const [filter, setFilter] = useState<'ALL' | GuestStatus>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGuestName, setNewGuestName] = useState('');

  const filteredGuests = guests.filter(guest => {
    const matchesFilter = filter === 'ALL' || guest.status === filter;
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim()) return;
    
    const newGuest: Guest = {
      id: Date.now().toString(),
      name: newGuestName,
      category: 'Outros',
      status: GuestStatus.PENDING,
      plusOne: false
    };

    setGuests([...guests, newGuest]);
    setNewGuestName('');
    setShowAddModal(false);
  };

  const toggleStatus = (id: string) => {
    setGuests(guests.map(g => {
        if (g.id !== id) return g;
        // Cycle status: Pending -> Confirmed -> Declined -> Pending
        let nextStatus = GuestStatus.PENDING;
        if (g.status === GuestStatus.PENDING) nextStatus = GuestStatus.CONFIRMED;
        else if (g.status === GuestStatus.CONFIRMED) nextStatus = GuestStatus.DECLINED;
        
        return { ...g, status: nextStatus };
    }));
  };

  const getStatusColor = (status: GuestStatus) => {
    switch (status) {
      case GuestStatus.CONFIRMED: return 'bg-green-100 text-green-700';
      case GuestStatus.DECLINED: return 'bg-red-100 text-red-700';
      default: return 'bg-amber-100 text-amber-700';
    }
  };

  const getStatusIcon = (status: GuestStatus) => {
    switch (status) {
      case GuestStatus.CONFIRMED: return <Check className="w-3 h-3" />;
      case GuestStatus.DECLINED: return <X className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-3xl font-serif font-bold text-slate-800">Lista de Convidados</h2>
           <p className="text-slate-500">Gerencie presenças e acompanhantes.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 bg-rose-500 text-white px-5 py-2.5 rounded-xl hover:bg-rose-600 transition-colors shadow-md shadow-rose-200"
        >
          <UserPlus className="w-5 h-5" />
          Adicionar Convidado
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar convidado..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
            {(['ALL', GuestStatus.PENDING, GuestStatus.CONFIRMED, GuestStatus.DECLINED] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === s 
                    ? 'bg-rose-100 text-rose-700' 
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {s === 'ALL' ? 'Todos' : s}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
              <tr>
                <th className="px-6 py-4">Nome</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4 text-center">Acompanhante</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredGuests.length > 0 ? (
                filteredGuests.map((guest) => (
                  <tr key={guest.id} className="hover:bg-rose-50/30 transition-colors group">
                    <td className="px-6 py-4 font-medium text-slate-800">{guest.name}</td>
                    <td className="px-6 py-4 text-slate-500 text-sm">{guest.category}</td>
                    <td className="px-6 py-4 text-center">
                        {guest.plusOne && <span className="inline-block w-2 h-2 rounded-full bg-rose-400"></span>}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => toggleStatus(guest.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(guest.status)} cursor-pointer hover:opacity-80`}
                      >
                        {getStatusIcon(guest.status)}
                        {guest.status}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => setGuests(guests.filter(g => g.id !== guest.id))}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    Nenhum convidado encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Simple Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Novo Convidado</h3>
            <form onSubmit={handleAddGuest} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome Completo</label>
                <input 
                  autoFocus
                  type="text" 
                  value={newGuestName}
                  onChange={e => setNewGuestName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                  placeholder="Ex: João da Silva"
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestList;