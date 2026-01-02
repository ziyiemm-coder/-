
import React, { useState, useMemo, useEffect } from 'react';
import { VOCABULARY_DATA } from '../data/vocabulary';
import { LearningState } from '../types';
import { Network, Plus, Info, CheckCircle, Brain, BookOpen, ChevronRight, Shuffle, Star, ExternalLink, ArrowRight, AlertTriangle, Trash2 } from 'lucide-react';

interface DerivativesSectionProps {
  states: Record<number, LearningState>;
  onUpdateState: (wordId: number, updates: Partial<LearningState>) => void;
}

interface DerivativeMistake {
  wordId: number;
  derivativeIndex: number;
}

const DerivativesSection: React.FC<DerivativesSectionProps> = ({ states, onUpdateState }) => {
  const [selectedWord, setSelectedWord] = useState(VOCABULARY_DATA[0]);
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const [practiceMode, setPracticeMode] = useState<'all' | 'mistakes'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Practice state
  const [practiceInput, setPracticeInput] = useState('');
  const [practiceFeedback, setPracticeFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [currentDerivativeIndex, setCurrentDerivativeIndex] = useState(0);

  // Derivative mistake tracking
  const [mistakePool, setMistakePool] = useState<DerivativeMistake[]>(() => {
    const saved = localStorage.getItem('derivative_mistakes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('derivative_mistakes', JSON.stringify(mistakePool));
  }, [mistakePool]);

  const filteredWords = useMemo(() => 
    VOCABULARY_DATA.filter(w => 
      w.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
      w.definitionZh.includes(searchTerm)
    ), [searchTerm]
  );

  const currentDerivatives = selectedWord.derivatives;
  
  // Logic for picking the next question in mistake mode
  const currentPracticeTarget = useMemo(() => {
    if (practiceMode === 'all') {
      return currentDerivatives[currentDerivativeIndex];
    } else {
      const mistake = mistakePool[0];
      if (!mistake) return null;
      const word = VOCABULARY_DATA.find(w => w.id === mistake.wordId);
      return word ? word.derivatives[mistake.derivativeIndex] : null;
    }
  }, [practiceMode, currentDerivatives, currentDerivativeIndex, mistakePool]);

  const handleCheckPractice = () => {
    if (!currentPracticeTarget) return;
    const isCorrect = practiceInput.trim().toLowerCase() === currentPracticeTarget.word.toLowerCase();
    setPracticeFeedback(isCorrect ? 'correct' : 'incorrect');
    
    if (isCorrect) {
      onUpdateState(selectedWord.id, { lastReviewed: Date.now() });
      // If we were in mistake mode, remove the mistake
      if (practiceMode === 'mistakes') {
        setMistakePool(prev => prev.filter((_, i) => i !== 0));
      }
    } else {
      // Record global mistake count
      onUpdateState(selectedWord.id, { 
        mistakeCount: (states[selectedWord.id]?.mistakeCount || 0) + 1 
      });
      
      // Record specific derivative mistake if not already in pool
      const isAlreadyInPool = mistakePool.some(m => 
        m.wordId === selectedWord.id && m.derivativeIndex === currentDerivativeIndex
      );
      if (!isAlreadyInPool && practiceMode === 'all') {
        setMistakePool(prev => [...prev, { wordId: selectedWord.id, derivativeIndex: currentDerivativeIndex }]);
      }
    }
  };

  const nextDerivative = () => {
    setPracticeInput('');
    setPracticeFeedback(null);
    if (practiceMode === 'all') {
      if (currentDerivatives.length > 1 && currentDerivativeIndex < currentDerivatives.length - 1) {
        setCurrentDerivativeIndex((prev) => prev + 1);
      } else {
        randomNextWord();
      }
    }
    // In mistake mode, the next item is automatically pulled by the useMemo from the pool
  };

  const randomNextWord = () => {
    const wordsWithDerivatives = VOCABULARY_DATA.filter(w => w.derivatives.length > 0);
    const nextWord = wordsWithDerivatives[Math.floor(Math.random() * wordsWithDerivatives.length)];
    setSelectedWord(nextWord);
    setCurrentDerivativeIndex(0);
    setPracticeInput('');
    setPracticeFeedback(null);
  };

  const clearMistakes = () => {
    if (confirm('Clear all recorded derivative mistakes?')) {
      setMistakePool([]);
      setPracticeMode('all');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[750px]">
      {/* Sidebar - Word List (3 cols) */}
      <div className="md:col-span-3 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col h-full">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 space-y-3">
           <h3 className="font-bold flex items-center gap-2 text-slate-800 dark:text-slate-100">
             <Network size={18} className="text-indigo-500" />
             Word Families
           </h3>
           <div className="relative">
             <input 
               type="text" 
               placeholder="Search..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl text-xs border border-slate-100 dark:border-slate-700 outline-none focus:border-indigo-400 transition-all"
             />
             <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400">
               <Shuffle size={12} />
             </div>
           </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
           {filteredWords.map(word => (
             <button
               key={word.id}
               onClick={() => {
                 setSelectedWord(word);
                 setCurrentDerivativeIndex(0);
                 setPracticeInput('');
                 setPracticeFeedback(null);
                 setPracticeMode('all');
               }}
               className={`w-full text-left p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-all border-l-4 ${
                 selectedWord.id === word.id && practiceMode === 'all'
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                  : 'border-transparent text-slate-500 dark:text-slate-400'
               }`}
             >
               <div className="flex justify-between items-center mb-1">
                  <span className={`font-bold ${selectedWord.id === word.id && practiceMode === 'all' ? 'text-indigo-600 dark:text-indigo-400' : ''}`}>
                    {word.term}
                  </span>
                  {states[word.id].isMastered && <CheckCircle size={12} className="text-emerald-500" />}
               </div>
               <p className="text-[10px] truncate opacity-70">{word.definitionZh}</p>
             </button>
           ))}
        </div>
      </div>

      {/* Main Content (9 cols) */}
      <div className="md:col-span-9 flex flex-col gap-6">
        {/* Mode Toggles */}
        <div className="flex gap-4 p-1 bg-slate-200/50 dark:bg-slate-800 rounded-2xl w-fit">
          <button 
            onClick={() => setActiveTab('learn')}
            className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'learn' ? 'bg-white dark:bg-slate-700 shadow-md text-indigo-600' : 'text-slate-500'}`}
          >
            <BookOpen size={16} /> Overview & Usage
          </button>
          <button 
            onClick={() => setActiveTab('practice')}
            className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'practice' ? 'bg-white dark:bg-slate-700 shadow-md text-indigo-600' : 'text-slate-500'}`}
          >
            <Brain size={16} /> Transformation Drill
          </button>
        </div>

        <div className="flex-1 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-8 overflow-y-auto custom-scrollbar">
           {activeTab === 'learn' ? (
             <div className="animate-in fade-in slide-in-from-right-4 duration-400">
               {/* Root Word Header */}
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-8 border-b border-slate-100 dark:border-slate-800">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-black text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full uppercase tracking-widest">{selectedWord.pos}</span>
                      <span className="text-slate-400 font-mono text-sm">{selectedWord.phonetic}</span>
                    </div>
                    <h2 className="text-5xl font-black text-slate-800 dark:text-white mb-2">{selectedWord.term}</h2>
                    <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">{selectedWord.definitionZh}</p>
                  </div>
                  <div className="flex gap-3">
                     <button className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl text-slate-400 hover:text-amber-500 transition-colors">
                       <Star size={24} />
                     </button>
                  </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column: Derivatives Family (UPPER PART) */}
                  <section className="space-y-4">
                    <h4 className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                      <ExternalLink size={14} className="text-indigo-500" /> Derivatives Family
                    </h4>
                    <div className="space-y-4">
                      {selectedWord.derivatives.length > 0 ? (
                        selectedWord.derivatives.map(d => (
                          <div key={d.word} className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:border-indigo-200 transition-all group">
                             <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg font-bold text-slate-800 dark:text-slate-200">{d.word}</span>
                                  <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-md uppercase">{d.pos}</span>
                                </div>
                             </div>
                             <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{d.definition}</p>
                             {d.example && (
                               <div className="text-xs italic text-slate-400 bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border-l-2 border-slate-200 dark:border-slate-700">
                                 "{d.example}"
                               </div>
                             )}
                          </div>
                        ))
                      ) : (
                        <div className="p-10 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl text-center text-slate-400">
                          No secondary derivatives listed.
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Right Column: Logic & Collocations (LOWER PART) */}
                  <div className="space-y-8">
                    <section>
                      <h4 className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                        <Network size={14} className="text-indigo-500" /> Root Logic & Notes
                      </h4>
                      <div className="p-5 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">
                          {selectedWord.roots || "Focus on the relationship between forms and contextual nuances provided in the dictionary entry."}
                        </p>
                      </div>
                    </section>

                    <section>
                      <h4 className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
                        <Plus size={14} className="text-indigo-500" /> Key Phrases & Collocations
                      </h4>
                      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
                         {selectedWord.roots?.includes("Collocation:") ? (
                            <ul className="space-y-3">
                               {selectedWord.roots.split("Collocation:")[1].split(",").map((phrase, i) => (
                                 <li key={i} className="flex items-start gap-3">
                                   <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                                   <span className="text-slate-700 dark:text-slate-200 font-medium leading-tight">{phrase.trim()}</span>
                                 </li>
                               ))}
                            </ul>
                         ) : (
                            <p className="text-xs text-slate-400 italic">No specific collocations listed in current record.</p>
                         )}
                      </div>
                    </section>
                  </div>
               </div>
             </div>
           ) : (
             <div className="flex flex-col h-full animate-in fade-in slide-in-from-left-4 duration-400">
               {/* Practice Header with Mode Toggle */}
               <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-4">
                   <h3 className="text-2xl font-black flex items-center gap-2">
                     <Brain size={24} className="text-indigo-500" />
                     Drill Session
                   </h3>
                   <div className="flex p-1 bg-slate-100 dark:bg-slate-700 rounded-xl">
                      <button 
                        onClick={() => { setPracticeMode('all'); setPracticeFeedback(null); setPracticeInput(''); }}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${practiceMode === 'all' ? 'bg-white dark:bg-slate-600 shadow-sm text-indigo-600' : 'text-slate-400'}`}
                      >
                        All Forms
                      </button>
                      <button 
                        onClick={() => { setPracticeMode('mistakes'); setPracticeFeedback(null); setPracticeInput(''); }}
                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${practiceMode === 'mistakes' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-400'}`}
                      >
                        <AlertTriangle size={12} /> Mistake Training ({mistakePool.length})
                      </button>
                   </div>
                 </div>
                 
                 {practiceMode === 'all' ? (
                   <div className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full uppercase tracking-widest">
                      {currentDerivativeIndex + 1} / {currentDerivatives.length || 0} FORMS
                   </div>
                 ) : (
                   <button 
                     onClick={clearMistakes}
                     className="text-xs font-bold text-rose-500 flex items-center gap-1 hover:underline"
                   >
                     <Trash2 size={12} /> Clear Mistake History
                   </button>
                 )}
               </div>
               
               {currentPracticeTarget ? (
                 <div className="space-y-8 max-w-2xl mx-auto w-full">
                    {/* Practice Card */}
                    <div className={`bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] p-8 md:p-10 border shadow-inner transition-colors ${practiceMode === 'mistakes' ? 'border-rose-100 dark:border-rose-900/30' : 'border-slate-100 dark:border-slate-800'}`}>
                       <div className="space-y-6">
                          <div className="flex items-center gap-3">
                             <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-[0.2em] ${practiceMode === 'mistakes' ? 'bg-rose-500 text-white' : 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500'}`}>
                               Target POS: {currentPracticeTarget.pos}
                             </span>
                          </div>
                          <p className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-800 dark:text-slate-100 italic">
                            "{currentPracticeTarget.example 
                              ? currentPracticeTarget.example.replace(new RegExp(`\\b${currentPracticeTarget.word}\\b`, 'gi'), '__________')
                              : `The context requires a ${currentPracticeTarget.pos} form of the word below: __________`}"
                          </p>
                          <div className="pt-6 border-t border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-4">
                             <div className="flex items-center gap-4">
                                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                                   <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Root Base</div>
                                   <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                                     {practiceMode === 'all' ? selectedWord.term : VOCABULARY_DATA.find(w => w.derivatives.includes(currentPracticeTarget))?.term}
                                   </div>
                                </div>
                                <ArrowRight className="text-slate-300 hidden md:block" />
                                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                                   <div className="text-[10px] font-bold text-indigo-400 uppercase mb-1">Target Role</div>
                                   <div className="text-lg font-bold text-indigo-600 dark:text-indigo-300">{currentPracticeTarget.pos}</div>
                                </div>
                             </div>
                             <div className="text-right">
                                <span className="text-xs text-slate-400 block mb-1">Target meaning:</span>
                                <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{currentPracticeTarget.definition}</span>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-6">
                       <div className="relative">
                          <input 
                            type="text"
                            value={practiceInput}
                            autoFocus
                            onChange={(e) => setPracticeInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleCheckPractice()}
                            placeholder={`Type the ${currentPracticeTarget.pos} form here...`}
                            className={`w-full p-6 text-2xl font-medium rounded-3xl border-2 outline-none transition-all shadow-lg ${
                              practiceFeedback === 'correct' ? 'border-emerald-500 bg-emerald-50 text-emerald-600 shadow-emerald-200' :
                              practiceFeedback === 'incorrect' ? 'border-rose-500 bg-rose-50 text-rose-600 shadow-rose-200' :
                              'border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:border-indigo-500 focus:bg-white'
                            }`}
                          />
                          {practiceFeedback === 'correct' && <CheckCircle size={32} className="absolute right-6 top-1/2 -translate-y-1/2 text-emerald-500" />}
                       </div>
                       
                       {practiceFeedback === 'incorrect' && (
                         <div className="p-5 bg-rose-100/30 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-2xl text-sm font-bold flex items-center gap-3 animate-in slide-in-from-top-4">
                           <Info size={20} /> Correct answer: <span className="underline decoration-double font-black uppercase">{currentPracticeTarget.word}</span>
                         </div>
                       )}

                       <div className="flex gap-4">
                          {!practiceFeedback ? (
                             <button 
                               onClick={handleCheckPractice}
                               disabled={!practiceInput.trim()}
                               className="flex-1 py-5 bg-indigo-600 text-white text-lg font-black rounded-2xl shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all"
                             >
                               Validate Transformation
                             </button>
                          ) : (
                             <>
                               <button 
                                 onClick={nextDerivative}
                                 className="flex-1 py-5 bg-slate-800 dark:bg-slate-700 text-white text-lg font-black rounded-2xl shadow-xl hover:bg-slate-900 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                               >
                                 {practiceMode === 'mistakes' && mistakePool.length > 1 ? 'Next Mistake' : 'Continue Drill'} <ChevronRight size={24} />
                               </button>
                               {practiceMode === 'all' && (
                                  <button 
                                    onClick={randomNextWord}
                                    className="py-5 px-8 bg-indigo-500 text-white font-black rounded-2xl shadow-xl hover:bg-indigo-600 hover:scale-[1.02] active:scale-95 transition-all"
                                  >
                                    <Shuffle size={24} />
                                  </button>
                               )}
                             </>
                          )}
                       </div>
                    </div>
                 </div>
               ) : (
                 <div className="flex flex-col items-center justify-center py-20 text-slate-400 h-full text-center">
                    <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-full mb-6">
                      <CheckCircle size={64} className="text-emerald-500" />
                    </div>
                    <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
                      {practiceMode === 'mistakes' ? 'All Mistakes Cleared!' : 'Choose a Word to Begin'}
                    </p>
                    <p className="text-sm opacity-60 mt-2 max-w-xs mx-auto">
                      {practiceMode === 'mistakes' 
                        ? 'Great job mastering your difficult forms. Return to "All Forms" to keep practicing.' 
                        : 'Select a word from the sidebar or click below to start a random drill.'}
                    </p>
                    <button 
                      onClick={() => { setPracticeMode('all'); randomNextWord(); }} 
                      className="mt-8 px-8 py-3 bg-indigo-500 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-lg"
                    >
                      Start All-Forms Drill
                    </button>
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
