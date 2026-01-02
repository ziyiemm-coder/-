
import React from 'react';
import { VOCABULARY_DATA } from '../data/vocabulary';
import { LearningState, ViewMode } from '../types';
import { AlertCircle, Trash2, BookOpen, ChevronRight } from 'lucide-react';

interface MistakesSectionProps {
  states: Record<number, LearningState>;
  onNavigate: (view: ViewMode) => void;
}

const MistakesSection: React.FC<MistakesSectionProps> = ({ states, onNavigate }) => {
  const difficultWords = VOCABULARY_DATA.filter(word => 
    states[word.id].mistakeCount > 0 || states[word.id].isHard
  ).sort((a, b) => states[b.id].mistakeCount - states[a.id].mistakeCount);

  if (difficultWords.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
        <div className="p-6 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 rounded-full mb-6">
          <AlertCircle size={48} />
        </div>
        <h3 className="text-2xl font-bold mb-2">Clear Slate!</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm">
          You haven't made any mistakes yet. Keep up the great work and complete more exercises.
        </p>
        <button 
          onClick={() => onNavigate('flashcards')}
          className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Go to Flashcards
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <AlertCircle className="text-rose-500" />
          Focus Review: {difficultWords.length} Words
        </h2>
        <div className="text-sm text-slate-400 font-medium">Sorted by difficulty</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {difficultWords.map(word => (
          <div key={word.id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 group hover:border-rose-200 transition-all">
             <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{word.term}</h3>
                <span className="px-2 py-1 bg-rose-50 dark:bg-rose-900/30 text-rose-500 text-xs font-black rounded-lg">
                  {states[word.id].mistakeCount} ERRORS
                </span>
             </div>
             
             <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-2">
               {word.definitionZh} - {word.definitionEn}
             </p>

             <div className="flex items-center gap-2 mt-auto">
               <button 
                 onClick={() => onNavigate('flashcards')}
                 className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-600 dark:text-slate-400 hover:text-indigo-500 transition-all rounded-xl text-sm font-bold"
               >
                 <BookOpen size={16} /> Review Card
               </button>
               <button 
                 onClick={() => onNavigate('spelling')}
                 className="p-2 bg-slate-50 dark:bg-slate-900 hover:bg-emerald-50 text-slate-400 hover:text-emerald-500 rounded-xl transition-all"
               >
                 <ChevronRight size={20} />
               </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MistakesSection;
