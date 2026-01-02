
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { VOCABULARY_DATA } from '../data/vocabulary';
import { LearningState, Word } from '../types';
import { HelpCircle, ArrowRight, Shuffle, CheckCircle, XCircle } from 'lucide-react';

interface MeaningSectionProps {
  states: Record<number, LearningState>;
  onUpdateState: (wordId: number, updates: Partial<LearningState>) => void;
}

type MeaningMode = 'en-zh' | 'zh-en';

const MeaningSection: React.FC<MeaningSectionProps> = ({ states, onUpdateState }) => {
  const [mode, setMode] = useState<MeaningMode>('en-zh');
  const [currentWord, setCurrentWord] = useState<Word>(() => {
    return VOCABULARY_DATA[Math.floor(Math.random() * VOCABULARY_DATA.length)];
  });
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const generateOptions = useCallback((targetWord: Word, currentMode: MeaningMode) => {
    const distractors = VOCABULARY_DATA
      .filter(w => w.id !== targetWord.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => currentMode === 'en-zh' ? w.definitionZh : w.term);
    
    const correctOption = currentMode === 'en-zh' ? targetWord.definitionZh : targetWord.term;
    const allOptions = [...distractors, correctOption].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  }, []);

  const pickRandomWord = useCallback(() => {
    let nextWord;
    do {
      nextWord = VOCABULARY_DATA[Math.floor(Math.random() * VOCABULARY_DATA.length)];
    } while (nextWord.id === currentWord.id && VOCABULARY_DATA.length > 1);
    
    setCurrentWord(nextWord);
    setSelectedOption(null);
    setSubmitted(false);
    generateOptions(nextWord, mode);
  }, [currentWord, mode, generateOptions]);

  useEffect(() => {
    generateOptions(currentWord, mode);
  }, [mode]);

  const handleSelect = (option: string) => {
    if (submitted) return;
    setSelectedOption(option);
    const isCorrect = mode === 'en-zh' 
      ? option === currentWord.definitionZh 
      : option === currentWord.term;
    
    setSubmitted(true);
    
    if (isCorrect) {
      onUpdateState(currentWord.id, { isMastered: true });
    } else {
      onUpdateState(currentWord.id, { 
        mistakeCount: (states[currentWord.id]?.mistakeCount || 0) + 1 
      });
    }
  };

  const correctValue = mode === 'en-zh' ? currentWord.definitionZh : currentWord.term;

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <div className="flex gap-4 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit">
        <button 
          onClick={() => { setMode('en-zh'); setSubmitted(false); setSelectedOption(null); }}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'en-zh' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600' : 'text-slate-500'}`}
        >
          English to Chinese
        </button>
        <button 
          onClick={() => { setMode('zh-en'); setSubmitted(false); setSelectedOption(null); }}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'zh-en' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600' : 'text-slate-500'}`}
        >
          Chinese to English
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-8">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">
            {mode === 'en-zh' ? 'What does this word mean?' : 'Which word matches this meaning?'}
          </span>
          <h3 className="mt-4 text-5xl font-black tracking-tight text-slate-800 dark:text-white">
            {mode === 'en-zh' ? currentWord.term : currentWord.definitionZh}
          </h3>
          <p className="mt-2 text-slate-400 italic">
            {mode === 'en-zh' && `(${currentWord.pos}) ${currentWord.phonetic}`}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((option) => {
            const isCorrect = option === correctValue;
            const isSelected = selectedOption === option;
            
            let style = "border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300";
            
            if (submitted) {
              if (isCorrect) {
                style = "bg-emerald-500 text-white border-emerald-500 shadow-lg shadow-emerald-500/20";
              } else if (isSelected) {
                style = "bg-rose-500 text-white border-rose-500 shadow-lg shadow-rose-500/20";
              } else {
                style = "opacity-40 border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 text-slate-400 dark:text-slate-600";
              }
            } else if (isSelected) {
              style = "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600";
            } else {
              style += " hover:border-indigo-300 hover:bg-white dark:hover:bg-slate-800 group";
            }

            return (
              <button
                key={option}
                disabled={submitted}
                onClick={() => handleSelect(option)}
                className={`p-6 rounded-2xl text-xl font-bold border-2 transition-all flex items-center justify-between text-left ${style}`}
              >
                <span>{option}</span>
                {submitted && isCorrect && <CheckCircle size={24} />}
                {submitted && isSelected && !isCorrect && <XCircle size={24} />}
              </button>
            );
          })}
        </div>

        {submitted && (
           <div className="mt-8 flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
             <button
               onClick={pickRandomWord}
               className="flex-1 py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/30 hover:bg-indigo-700 transition-all flex items-center justify-center gap-3"
             >
               Next Question <ArrowRight size={24} />
             </button>
             <button
               onClick={() => {
                 pickRandomWord();
               }}
               className="px-6 py-5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all"
             >
               <Shuffle size={24} />
             </button>
           </div>
        )}

        {submitted && (
          <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h4 className="text-sm font-black text-indigo-500 uppercase tracking-widest mb-4">Word Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">Example</p>
                <p className="mt-1 text-slate-800 dark:text-slate-200 font-medium">"{currentWord.exampleEn}"</p>
                <p className="mt-1 text-slate-500 text-sm italic">{currentWord.exampleZh}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase">English Definition</p>
                <p className="mt-1 text-slate-800 dark:text-slate-200 font-medium">{currentWord.definitionEn}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MeaningSection;
