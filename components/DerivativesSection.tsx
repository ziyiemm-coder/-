
import React, { useState, useMemo } from 'react';
import { VOCABULARY_DATA } from '../data/vocabulary';
import { LearningState } from '../types';
import { Network, Plus, Info, CheckCircle, Brain, BookOpen, ChevronRight, RefreshCw, Shuffle } from 'lucide-react';

interface DerivativesSectionProps {
  states: Record<number, LearningState>;
  onUpdateState: (wordId: number, updates: Partial<LearningState>) => void;
}

const DerivativesSection: React.FC<DerivativesSectionProps> = ({ states, onUpdateState }) => {
  const [selectedWord, setSelectedWord] = useState(VOCABULARY_DATA[0]);
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  
  // Practice state
  const [practiceInput, setPracticeInput] = useState('');
  const [practiceFeedback, setPracticeFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [currentDerivativeIndex, setCurrentDerivativeIndex] = useState(0);

  // Get current derivative for practice
  const currentDerivatives = selectedWord.derivatives;
  const currentPracticeTarget = currentDerivatives[currentDerivativeIndex];

  const handleCheckPractice = () => {
    if (!currentPracticeTarget) return;
    const isCorrect = practiceInput.trim().toLowerCase() === currentPracticeTarget.word.toLowerCase();
    setPracticeFeedback(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      onUpdateState(selectedWord.id, { lastReviewed: Date.now() });
    }
  };

  const nextDerivative = () => {
    setPracticeInput('');
    setPracticeFeedback(null);
    if (currentDerivatives.length > 1) {
      setCurrentDerivativeIndex((prev) => (prev + 1) % currentDerivatives.length);
    } else {
      randomNextWord();
    }
  };

  const randomNextWord = () => {
    const wordsWithDerivatives = VOCABULARY_DATA.filter(w => w.derivatives.length > 0);
    const nextWord = wordsWithDerivatives[Math.floor(Math.random() * wordsWithDerivatives.length)];
    setSelectedWord(nextWord);
    setCurrentDerivativeIndex(0);
    setPracticeInput('');
    setPracticeFeedback(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Sidebar - Word List */}
      <div className="md:col-span-1 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col h-[650px]">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
           <h3 className="font-bold flex items-center gap-2">
             <Network size={20} className="text-indigo-500" />
             Word Roots
           </h3>
        </div>
        <div className="flex-1 overflow-y-auto">
           {VOCABULARY_DATA.map(word => (
             <button
               key={word.id}
               onClick={() => {
                 setSelectedWord(word);
                 setCurrentDerivativeIndex(0);
                 setPracticeInput('');
                 setPracticeFeedback(null);
               }}
               className={`w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors border-l-4 ${
                 selectedWord.id === word.id 
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                  : 'border-transparent'
               }`}
             >
               <div className="flex justify-between items-center">
                  <span className={`font-medium ${selectedWord.id === word.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}`}>
                    {word.term} <span className="text-xs text-slate-400 font-normal ml-1">({word.pos})</span>
                  </span>
                  {states[word.id].isMastered && <CheckCircle size={14} className="text-emerald-500" />}
               </div>
               <p className="text-xs text-slate-400 mt-1 truncate">{word.definitionZh}</p>
             </button>
           ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="md:col-span-2 space-y-6">
        {/* Mode Toggles */}
        <div className="flex gap-4 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit">
          <button 
            onClick={() => setActiveTab('learn')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'learn' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600' : 'text-slate-500'}`}
          >
            <BookOpen size={16} /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('practice')}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'practice' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600' : 'text-slate-500'}`}
          >
            <Brain size={16} /> Transformation Practice
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-8 min-h-[500px]">
           {activeTab === 'learn' ? (
             <div className="animate-in fade-in duration-300">
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-indigo-500 text-white rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-black">{selectedWord.term} <span className="text-xl font-normal opacity-80 ml-2">({selectedWord.pos})</span></h2>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Master Root</span>
                    <p className="text-slate-600 dark:text-slate-400 italic">"{selectedWord.definitionZh}"</p>
                  </div>
               </div>

               {selectedWord.roots && (
                 <div className="mb-8 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl flex gap-3">
                   <Info size={20} className="text-amber-500 shrink-0" />
                   <div>
                      <h4 className="font-bold text-amber-700 dark:text-amber-500 text-sm">Etymology & Root Logic</h4>
                      <p className="text-amber-600/80 dark:text-amber-400/80 text-sm">{selectedWord.roots}</p>
                   </div>
                 </div>
               )}

               <div className="space-y-4">
                  <h4 className="font-bold text-slate-500 text-xs uppercase tracking-widest flex items-center gap-2">
                    <Plus size={14} /> Derivatives Expansion
                  </h4>
                  <div className="grid gap-4">
                    {selectedWord.derivatives.length > 0 ? (
                      selectedWord.derivatives.map(d => (
                        <div key={d.word} className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 group hover:border-indigo-200 transition-colors">
                           <div className="flex items-center gap-3 mb-2">
                              <span className="text-xl font-bold text-slate-800 dark:text-slate-200">{d.word}</span>
                              <span className="text-xs font-bold px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 rounded-full">{d.pos}</span>
                           </div>
                           <p className="text-slate-600 dark:text-slate-400">{d.definition}</p>
                           {d.example && (
                             <div className="mt-3 text-sm italic text-slate-500 border-l-2 border-indigo-200 pl-3">
                               "{d.example}"
                             </div>
                           )}
                        </div>
                      ))
                    ) : (
                      <div className="p-12 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl flex flex-col items-center justify-center text-slate-400">
                        <p>No primary derivatives listed for this term.</p>
                        <p className="text-xs">Focus on usage and contextual mastery.</p>
                      </div>
                    )}
                  </div>
               </div>
             </div>
           ) : (
             <div className="flex flex-col h-full animate-in fade-in duration-300">
               <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                 <RefreshCw size={20} className="text-indigo-500" />
                 Transformation Practice
               </h3>
               
               {currentPracticeTarget ? (
                 <div className="space-y-6">
                    {/* Practice Card */}
                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                       <div className="absolute top-0 right-0 p-4">
                          <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase">
                             {currentPracticeTarget.pos}
                          </div>
                       </div>
                       
                       <div className="flex flex-col md:flex-row gap-8 items-start">
                          <div className="flex-1 space-y-4">
                             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sentence Transformation</span>
                             <p className="text-2xl font-medium leading-relaxed text-slate-800 dark:text-slate-100">
                               {currentPracticeTarget.example 
                                 ? currentPracticeTarget.example.replace(new RegExp(currentPracticeTarget.word, 'gi'), '__________')
                                 : `Please provide the correct ${currentPracticeTarget.pos} form of the root in this context: __________`}
                             </p>
                             <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                               Target meaning: {currentPracticeTarget.definition}
                             </p>
                          </div>

                          <div className="w-full md:w-48 shrink-0">
                             <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center">
                                <span className="text-[10px] font-bold text-slate-400 uppercase mb-2">Root Word</span>
                                <div className="text-xl font-black text-indigo-600 dark:text-indigo-400 mb-1">{selectedWord.term}</div>
                                <div className="text-[10px] text-slate-500">({selectedWord.pos})</div>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-4 max-w-xl mx-auto">
                       <div className="relative">
                          <input 
                            type="text"
                            value={practiceInput}
                            onChange={(e) => setPracticeInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleCheckPractice()}
                            placeholder={`Type the ${currentPracticeTarget.pos} form...`}
                            className={`w-full p-5 text-xl rounded-2xl border-2 outline-none transition-all ${
                              practiceFeedback === 'correct' ? 'border-emerald-500 bg-emerald-50 text-emerald-600' :
                              practiceFeedback === 'incorrect' ? 'border-rose-500 bg-rose-50 text-rose-600' :
                              'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 focus:border-indigo-500'
                            }`}
                          />
                          {practiceFeedback === 'correct' && <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500" />}
                       </div>
                       
                       {practiceFeedback === 'incorrect' && (
                         <div className="p-4 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-xl text-sm font-medium animate-in slide-in-from-top-2">
                           Hint: The correct word is <span className="font-bold underline">{currentPracticeTarget.word}</span>
                         </div>
                       )}

                       <div className="flex gap-4">
                          {!practiceFeedback ? (
                             <button 
                               onClick={handleCheckPractice}
                               disabled={!practiceInput.trim()}
                               className="flex-1 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:bg-indigo-700 disabled:opacity-50 transition-all"
                             >
                               Check Answer
                             </button>
                          ) : (
                             <>
                               <button 
                                 onClick={nextDerivative}
                                 className="flex-1 py-4 bg-slate-800 dark:bg-slate-700 text-white font-bold rounded-2xl shadow-lg hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
                               >
                                 Next Question <ChevronRight size={18} />
                               </button>
                               <button 
                                 onClick={randomNextWord}
                                 className="flex-1 py-4 bg-indigo-500 text-white font-bold rounded-2xl shadow-lg hover:bg-indigo-600 transition-all flex items-center justify-center gap-2"
                               >
                                 Random Next Root <Shuffle size={18} />
                               </button>
                             </>
                          )}
                       </div>
                    </div>
                 </div>
               ) : (
                 <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                    <p>No practice items for this root yet.</p>
                    <button onClick={randomNextWord} className="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-600">Try another word</button>
                 </div>
               )}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default DerivativesSection;
