import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import GuestList from './components/GuestList';
import BudgetTracker from './components/BudgetTracker';
import Tasks from './components/Tasks';
import AiAssistant from './components/AiAssistant';
import { 
  INITIAL_WEDDING_DATA, 
  INITIAL_GUESTS, 
  INITIAL_BUDGET, 
  INITIAL_TASKS 
} from './constants';
import { Guest, BudgetItem, Task } from './types';

function App() {
  // Centralized State
  const [guests, setGuests] = useState<Guest[]>(() => {
    const saved = localStorage.getItem('wedding_guests');
    return saved ? JSON.parse(saved) : INITIAL_GUESTS;
  });

  const [budget, setBudget] = useState<BudgetItem[]>(() => {
    const saved = localStorage.getItem('wedding_budget');
    return saved ? JSON.parse(saved) : INITIAL_BUDGET;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('wedding_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  // Persistence
  useEffect(() => {
    localStorage.setItem('wedding_guests', JSON.stringify(guests));
  }, [guests]);

  useEffect(() => {
    localStorage.setItem('wedding_budget', JSON.stringify(budget));
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('wedding_tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route 
            path="/" 
            element={
              <Dashboard 
                weddingData={INITIAL_WEDDING_DATA}
                guests={guests}
                budget={budget}
                tasks={tasks}
              />
            } 
          />
          <Route 
            path="/guests" 
            element={<GuestList guests={guests} setGuests={setGuests} />} 
          />
          <Route 
            path="/budget" 
            element={<BudgetTracker budget={budget} setBudget={setBudget} />} 
          />
          <Route 
            path="/tasks" 
            element={<Tasks tasks={tasks} setTasks={setTasks} />} 
          />
          <Route 
            path="/ai-planner" 
            element={<AiAssistant weddingData={INITIAL_WEDDING_DATA} />} 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;