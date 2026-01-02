
import React from 'react';
import { ViewMode } from '../types';
import { LayoutDashboard, Layers, SpellCheck, Type, Pencil, ClipboardCheck, AlertCircle, Moon, Sun } from 'lucide-react';

interface SidebarProps {
  currentView: ViewMode;
  setView: (view: ViewMode) => void;
  progress: number;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, progress, darkMode, toggleDarkMode }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'flashcards', icon: Layers, label: 'Flashcards' },
    { id: 'spelling', icon: SpellCheck, label: 'Spelling' },
    { id: 'derivatives', icon: Type, label: 'Derivatives' },
    { id: 'cloze', icon: Pencil, label: 'Contextual' },
    { id: 'test', icon: ClipboardCheck, label: 'Mock Test' },
    { id: 'mistakes', icon: AlertCircle, label: 'Mistakes' },
  ];

  return (
    <aside className="w-20 md:w-64 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300">
      <div className="p-6 hidden md:block">
        <h2 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">VocabMaster</h2>
      </div>

      <nav className="flex-1 flex flex-col gap-2 p-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id as ViewMode)}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
              currentView === item.id 
                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
            }`}
          >
            <item.icon size={20} />
            <span className="hidden md:block font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center justify-center md:justify-start gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-all"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span className="hidden md:block font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
