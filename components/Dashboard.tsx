
// Updated hardcoded 54 to VOCABULARY_DATA.length in the Fast Learn card.
import React from 'react';
import { VOCABULARY_DATA } from '../data/vocabulary';
import { LearningState, ViewMode } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Target, Zap, Clock, Star, ArrowUpRight, HelpCircle } from 'lucide-react';

interface DashboardProps {
  states: Record<number, LearningState>;
  onNavigate: (view: ViewMode) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ states, onNavigate }) => {
  const stats = {
    mastered: Object.values(states).filter(s => s.isMastered).length,
    difficult: Object.values(states).filter(s => s.mistakeCount > 2).length,
    favorites: Object.values(states).filter(s => s.isFavorite).length,
    total: VOCABULARY_DATA.length
  };

  const activityData = [
    { name: 'Mon', words: 4 },
    { name: 'Tue', words: 7 },
    { name: 'Wed', words: 2 },
    { name: 'Thu', words: 12 },
    { name: 'Fri', words: 18 },
    { name: 'Sat', words: 15 },
    { name: 'Sun', words: 25 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Quick Stats */}
      <div className="md:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
         <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 rounded-lg">
               <Target size={20} />
            </div>
            <h3 className="font-bold">Learning Stats</h3>
         </div>
         <div className="space-y-6">
            <div>
               <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-500">Mastered</span>
                  <span className="font-bold text-emerald-500">{stats.mastered}</span>
               </div>
               <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${(stats.mastered / stats.total) * 100}%` }} />
               </div>
            </div>
            <div>
               <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-500">Struggling</span>
                  <span className="font-bold text-rose-500">{stats.difficult}</span>
               </div>
               <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500" style={{ width: `${(stats.difficult / stats.total) * 100}%` }} />
               </div>
            </div>
            <div className="pt-4 border-t border-slate-50 dark:border-slate-700 grid grid-cols-2 gap-4">
               <div className="text-center">
                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">Favorites</p>
                  <p className="text-2xl font-black text-amber-500">{stats.favorites}</p>
               </div>
               <div className="text-center">
                  <p className="text-xs text-slate-400 font-bold uppercase mb-1">Streak</p>
                  <p className="text-2xl font-black text-indigo-500">5 <span className="text-xs">days</span></p>
               </div>
            </div>
         </div>
      </div>

      {/* Chart */}
      <div className="md:col-span-3 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700">
         <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 rounded-lg">
                  <Zap size={20} />
               </div>
               <h3 className="font-bold">Knowledge Growth</h3>
            </div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Past 7 Days</span>
         </div>
         <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={activityData}>
                  <defs>
                     <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                     </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}}
                    cursor={{ stroke: '#6366f1', strokeWidth: 2 }}
                  />
                  <Area type="monotone" dataKey="words" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorWords)" />
               </AreaChart>
            </ResponsiveContainer>
         </div>
      </div>

      {/* Recommended Learning Path */}
      <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-6">
         <button 
           onClick={() => onNavigate('flashcards')}
           className="group p-8 bg-indigo-600 text-white rounded-3xl shadow-xl shadow-indigo-500/20 hover:scale-[1.02] transition-all flex flex-col items-start"
         >
            <div className="p-3 bg-white/20 rounded-2xl mb-6">
               <Zap size={24} />
            </div>
            <h4 className="text-xl font-bold mb-2">Fast Learn</h4>
            <p className="text-white/70 text-sm text-left mb-6">Review all {VOCABULARY_DATA.length} words using interactive 3D cards.</p>
            <div className="mt-auto flex items-center gap-2 font-bold text-sm">
               Jump In <ArrowUpRight size={16} />
            </div>
         </button>

         <button 
           onClick={() => onNavigate('meaning')}
           className="group p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:scale-[1.02] transition-all flex flex-col items-start"
         >
            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 text-amber-500 rounded-2xl mb-6">
               <HelpCircle size={24} />
            </div>
            <h4 className="text-xl font-bold mb-2">Meaning Mastery</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm text-left mb-6">Challenge your definition knowledge.</p>
            <div className="mt-auto flex items-center gap-2 font-bold text-sm text-amber-500">
               Test Now <ArrowUpRight size={16} />
            </div>
         </button>

         <button 
           onClick={() => onNavigate('spelling')}
           className="group p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:scale-[1.02] transition-all flex flex-col items-start"
         >
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 rounded-2xl mb-6">
               <Clock size={24} />
            </div>
            <h4 className="text-xl font-bold mb-2">Practice Mode</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm text-left mb-6">Master spelling and phonetics of words.</p>
            <div className="mt-auto flex items-center gap-2 font-bold text-sm text-emerald-500">
               Continue <ArrowUpRight size={16} />
            </div>
         </button>

         <button 
           onClick={() => onNavigate('mistakes')}
           className="group p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:scale-[1.02] transition-all flex flex-col items-start"
         >
            <div className="p-3 bg-rose-50 dark:bg-rose-900/30 text-rose-500 rounded-2xl mb-6">
               <Star size={24} />
            </div>
            <h4 className="text-xl font-bold mb-2">Master Difficult</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm text-left mb-6">Review words with high mistake counts specifically.</p>
            <div className="mt-auto flex items-center gap-2 font-bold text-sm text-rose-500">
               Review Now <ArrowUpRight size={16} />
            </div>
         </button>
      </div>
    </div>
  );
};

export default Dashboard;
