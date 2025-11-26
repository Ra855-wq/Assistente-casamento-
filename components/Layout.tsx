import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Calculator, Sparkles, CheckSquare, Heart } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Painel' },
    { to: '/guests', icon: Users, label: 'Convidados' },
    { to: '/budget', icon: Calculator, label: 'Orçamento' },
    { to: '/tasks', icon: CheckSquare, label: 'Tarefas' },
    { to: '/ai-planner', icon: Sparkles, label: 'IA Planner' },
  ];

  return (
    <div className="flex h-screen bg-rose-50 overflow-hidden">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-rose-100 shadow-sm">
        <div className="p-6 flex items-center gap-2">
          <Heart className="w-8 h-8 text-rose-500 fill-current" />
          <h1 className="text-2xl font-serif font-bold text-slate-800 tracking-tight">Amar & Planejar</h1>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-200'
                    : 'text-slate-500 hover:bg-rose-50 hover:text-rose-600'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 m-4 bg-rose-50 rounded-xl border border-rose-100">
          <p className="text-xs text-rose-600 font-semibold mb-1">Dia do Casamento</p>
          <p className="text-sm text-slate-700">14 de Dezembro, 2024</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-rose-100 z-50 pb-safe">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                  isActive ? 'text-rose-500' : 'text-slate-400'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;