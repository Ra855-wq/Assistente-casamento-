import React from 'react';
import { Task } from '../types';
import { CheckSquare, Square, Calendar, Plus } from 'lucide-react';

interface TasksProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Tasks: React.FC<TasksProps> = ({ tasks, setTasks }) => {
  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTask = () => {
     const newTask: Task = {
         id: Date.now().toString(),
         title: 'Nova Tarefa',
         completed: false,
         priority: 'Média'
     }
     setTasks([newTask, ...tasks]);
  };

  const updateTaskTitle = (id: string, newTitle: string) => {
      setTasks(tasks.map(t => t.id === id ? {...t, title: newTitle} : t));
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-3xl font-serif font-bold text-slate-800">Tarefas</h2>
           <p className="text-slate-500">O que precisa ser feito?</p>
        </div>
        <button 
            onClick={addTask}
            className="p-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 shadow-lg shadow-rose-200 transition-all hover:scale-105"
        >
            <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="grid gap-3">
        {tasks.map((task) => (
          <div 
            key={task.id}
            className={`group flex items-center gap-4 p-4 bg-white rounded-xl border transition-all ${
                task.completed ? 'border-slate-100 opacity-60' : 'border-slate-200 shadow-sm hover:border-rose-200'
            }`}
          >
            <button 
                onClick={() => toggleTask(task.id)}
                className={`flex-shrink-0 transition-colors ${task.completed ? 'text-green-500' : 'text-slate-300 hover:text-rose-500'}`}
            >
                {task.completed ? <CheckSquare className="w-6 h-6" /> : <Square className="w-6 h-6" />}
            </button>
            
            <div className="flex-1">
                <input 
                    type="text"
                    value={task.title}
                    onChange={(e) => updateTaskTitle(task.id, e.target.value)}
                    className={`w-full bg-transparent focus:outline-none font-medium text-lg ${
                        task.completed ? 'text-slate-400 line-through decoration-slate-300' : 'text-slate-700'
                    }`}
                />
                <div className="flex items-center gap-3 mt-1 text-xs">
                    {task.dueDate && (
                        <span className="flex items-center gap-1 text-slate-400">
                            <Calendar className="w-3 h-3" />
                            {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                    )}
                    <span className={`px-2 py-0.5 rounded-full ${
                        task.priority === 'Alta' ? 'bg-red-50 text-red-600' :
                        task.priority === 'Média' ? 'bg-yellow-50 text-yellow-600' :
                        'bg-blue-50 text-blue-600'
                    }`}>
                        {task.priority}
                    </span>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;