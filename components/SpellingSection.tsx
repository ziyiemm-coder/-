
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VOCABULARY_DATA } from '../data/vocabulary';
import { LearningState } from '../types';
import { Volume2, CheckCircle, XCircle, ChevronRight, HelpCircle } from 'lucide-react';

interface SpellingSectionProps {
  states: Record<number, LearningState>;
  onUpdateState: (wordId: number, updates: Partial<LearningState>) => void;
}

const SpellingSection: React.FC<SpellingSectionProps> = ({ states, onUpdateState }) => {
  // 初始状态改为随机选择一个单词
  const [currentWord, setCurrentWord] = useState(() => {
    const randomIndex = Math.floor(Math.random() * VOCABULARY_DATA.length);
    return VOCABULARY_DATA[randomIndex];
  });
  
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [mode, setMode] = useState<'translate' | 'dictate'>('translate');
  
  const inputRef = useRef<HTMLInputElement>(null);

  const pickRandomWord = useCallback(() => {
    // 算法：70% 概率从错误率最高的词中选，30% 概率全随机，确保练习具有针对性同时也具备随机性
    const sortedWords = [...VOCABULARY_DATA].sort((a, b) => {
      const stateA = states[a.id];
      const stateB = states[b.id];
      return (stateB.mistakeCount || 0) - (stateA.mistakeCount || 0);
    });
    
    let nextWord;
    if (Math.random() < 0.7) {
      // 从前15个难词中选
      const poolSize = Math.min(15, VOCABULARY_DATA.length);
      nextWord = sortedWords[Math.floor(Math.random() * poolSize)];
    } else {
      // 完全随机
      nextWord = VOCABULARY_DATA[Math.floor(Math.random() * VOCABULARY_DATA.length)];
    }
    
    // 避免连续抽到同一个词
    if (nextWord.id === currentWord.id) {
       const index = (VOCABULARY_DATA.indexOf(nextWord) + 1) % VOCABULARY_DATA.length;
       nextWord = VOCABULARY_DATA[index];
    }
    
    setCurrentWord(nextWord);
    setInput('');
    setFeedback(null);
    setShowHint(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [states, currentWord]);

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(currentWord.term);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (mode === 'dictate') speak();
  }, [currentWord, mode]);

  const checkAnswer = () => {
    const isCorrect = input.trim().toLowerCase() === currentWord.term.toLowerCase();
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      onUpdateState(currentWord.id, { 
        isMastered: true,
        lastReviewed: Date.now() 
      });
      setTimeout(() => pickRandomWord(), 1500);
    } else {
      onUpdateState(currentWord.id, { 
        mistakeCount: (states[currentWord.id]?.mistakeCount || 0) + 1,
        isMastered: false
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <div className="flex gap-4 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit">
        <button 
          onClick={() => setMode('translate')}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'translate' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600' : 'text-slate-500'}`}
        >
          Spelling (中译英)
        </button>
        <button 
          onClick={() => setMode('dictate')}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'dictate' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600' : 'text-slate-500'}`}
        >
          Dictation (听写)
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-8 flex flex-col items-center text-center">
        <div className="mb-8 w-full">
          {mode === 'translate' ? (
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Translate to English</span>
              <h3 className="text-4xl font-bold text-slate-800 dark:text-white">{currentWord.definitionZh}</h3>
              <p className="text-slate-400 italic">({currentWord.pos}) {currentWord.phonetic}</p>
            </div>
          ) : (
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Listen and Write</span>
              <button 
                onClick={speak}
                className="w-24 h-24 mx-auto flex items-center justify-center bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg"
              >
                <Volume2 size={40} />
              </button>
            </div>
          )}
        </div>

        <div className="w-full max-w-md relative">
          <input
            ref={inputRef}
            type="text"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkAnswer()}
            placeholder="Type your answer..."
            className={`w-full text-center text-2xl font-medium py-4 px-6 rounded-2xl border-2 transition-all outline-none ${
              feedback === 'correct' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600' : 
              feedback === 'incorrect' ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20 text-rose-600' : 
              'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 shadow-inner'
            }`}
          />
          {feedback === 'correct' && <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500" size={24} />}
          {feedback === 'incorrect' && <XCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-rose-500" size={24} />}
        </div>

        {feedback === 'incorrect' && (
          <div className="mt-6 flex flex-col items-center animate-in slide-in-from-top-2">
             <p className="text-rose-500 font-medium mb-2">Incorrect, please try again</p>
             <button 
               onClick={() => setShowHint(true)}
               className="text-indigo-500 hover:underline flex items-center gap-1 text-sm font-bold"
             >
               <HelpCircle size={14} /> Reveal Word
             </button>
             {showHint && (
               <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl font-mono text-2xl tracking-widest text-indigo-500 shadow-sm border border-indigo-100">
                  {currentWord.term}
               </div>
             )}
          </div>
        )}

        <div className="mt-12 w-full flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-6">
          <div className="text-left">
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Current Word Error Count</p>
            <p className="text-xl font-black text-slate-700 dark:text-slate-300">
               {states[currentWord.id]?.mistakeCount || 0}
            </p>
          </div>
          <button 
            onClick={pickRandomWord}
            className="flex items-center gap-2 px-8 py-4 bg-slate-800 dark:bg-slate-700 text-white font-bold rounded-2xl hover:bg-slate-900 transition-all shadow-md"
          >
            Random Next <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpellingSection;
