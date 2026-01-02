
import React, { useState, useMemo, useEffect } from 'react';
import { VOCABULARY_DATA } from '../data/vocabulary';
import { LearningState, Word } from '../types';
import { Check, X, ArrowRight, Lightbulb, Shuffle, Info } from 'lucide-react';

interface FillBlanksSectionProps {
  states: Record<number, LearningState>;
  onUpdateState: (wordId: number, updates: Partial<LearningState>) => void;
}

const smartHollow = (sentence: string, term: string) => {
  const parts = term.split(' ');
  let pattern = '';
  
  if (parts.length > 1) {
    const firstWordSafe = parts[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const remainingParts = parts.slice(1).map(p => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('\\s+');
    pattern = `(${firstWordSafe}[a-z]*\\s+${remainingParts})`;
  } else {
    const termSafe = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    pattern = `(${termSafe}[a-z]*)`;
  }

  const regex = new RegExp(pattern, 'i');
  const match = sentence.match(regex);
  
  if (match) {
    const actualWordInSentence = match[0];
    return {
      hollowed: sentence.replace(actualWordInSentence, '__________'),
      contextAnswer: actualWordInSentence,
      rootAnswer: term
    };
  }
  
  return {
    hollowed: sentence.replace(new RegExp(term, 'gi'), '__________'),
    contextAnswer: term,
    rootAnswer: term
  };
};

const FillBlanksSection: React.FC<FillBlanksSectionProps> = ({ states, onUpdateState }) => {
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * VOCABULARY_DATA.length));
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [mode, setMode] = useState<'mcq' | 'input'>('mcq');
  const [inputValue, setInputValue] = useState('');

  const questions = useMemo(() => {
    return VOCABULARY_DATA.map(word => {
      const { hollowed, contextAnswer, rootAnswer } = smartHollow(word.exampleEn, word.term);
      const distractors = VOCABULARY_DATA
        .filter(w => w.id !== word.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => w.term);
      
      const options = [...distractors, rootAnswer].sort(() => Math.random() - 0.5);
      
      return {
        word,
        sentence: hollowed,
        contextAnswer,
        rootAnswer,
        options
      };
    });
  }, []);

  const currentQuestion = questions[currentIndex];

  const handleCheck = () => {
    if (submitted) return;
    const isCorrect = mode === 'mcq' 
      ? selectedOption === currentQuestion.rootAnswer
      : inputValue.trim().toLowerCase() === currentQuestion.contextAnswer.toLowerCase();
    
    setSubmitted(true);
    if (isCorrect) {
      onUpdateState(currentQuestion.word.id, { isMastered: true });
    } else {
      onUpdateState(currentQuestion.word.id, { 
        mistakeCount: (states[currentQuestion.word.id]?.mistakeCount || 0) + 1 
      });
    }
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setInputValue('');
    setSubmitted(false);
    setCurrentIndex((prev) => (prev + 1) % questions.length);
  };

  const randomNextWord = () => {
    setSelectedOption(null);
    setInputValue('');
    setSubmitted(false);
    setCurrentIndex(Math.floor(Math.random() * questions.length));
  };

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <div className="flex gap-4 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl w-fit">
        <button 
          onClick={() => { setMode('mcq'); setSubmitted(false); setSelectedOption(null); }}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'mcq' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600' : 'text-slate-500'}`}
        >
          Choice Mode
        </button>
        <button 
          onClick={() => { setMode('input'); setSubmitted(false); setInputValue(''); }}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'input' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600' : 'text-slate-500'}`}
        >
          Spelling Mode
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-8">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">
            {mode === 'mcq' ? 'Select matching root' : 'Type exact form'}
          </span>
          <p className="mt-4 text-2xl font-medium leading-relaxed text-slate-800 dark:text-slate-200">
            "{currentQuestion.sentence}"
          </p>
        </div>

        {mode === 'mcq' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option) => {
              const isCorrectWord = option === currentQuestion.rootAnswer;
              const isSelected = selectedOption === option;
              
              let style = "border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30";
              if (submitted) {
                if (isCorrectWord) style = "bg-emerald-500 text-white border-emerald-500 shadow-lg";
                else if (isSelected) style = "bg-rose-500 text-white border-rose-500 shadow-lg";
              } else if (isSelected) {
                style = "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 shadow-md";
              }

              return (
                <button
                  key={option}
                  disabled={submitted}
                  onClick={() => setSelectedOption(option)}
                  className={`p-4 rounded-2xl text-lg font-medium border-2 transition-all flex items-center justify-between ${style}`}
                >
                  {option}
                  {submitted && isCorrectWord && <Check size={20} />}
                  {submitted && isSelected && !isCorrectWord && <X size={20} />}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
             <input 
               type="text"
               disabled={submitted}
               value={inputValue}
               onChange={(e) => setInputValue(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
               placeholder="Example: persists, culminated in..."
               className={`w-full p-4 rounded-2xl text-xl font-medium border-2 outline-none transition-all ${
                 submitted 
                   ? (inputValue.trim().toLowerCase() === currentQuestion.contextAnswer.toLowerCase() ? 'border-emerald-500 bg-emerald-50 text-emerald-600 shadow-inner' : 'border-rose-500 bg-rose-50 text-rose-600 shadow-inner')
                   : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 focus:border-indigo-500'
               }`}
             />
          </div>
        )}

        <div className="mt-8 flex gap-4">
           {!submitted ? (
             <button
               onClick={handleCheck}
               disabled={mode === 'mcq' ? !selectedOption : !inputValue.trim()}
               className="flex-1 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:bg-indigo-700 disabled:opacity-50 transition-all"
             >
               Check Result
             </button>
           ) : (
             <>
               <button
                 onClick={nextQuestion}
                 className="flex-1 py-4 bg-slate-800 dark:bg-slate-700 text-white font-bold rounded-2xl shadow-lg hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
               >
                 Next Item <ArrowRight size={20} />
               </button>
               <button
                 onClick={randomNextWord}
                 className="flex-1 py-4 bg-indigo-500 text-white font-bold rounded-2xl shadow-lg hover:bg-indigo-600 transition-all flex items-center justify-center gap-2"
               >
                 Random Jump <Shuffle size={20} />
               </button>
             </>
           )}
        </div>

        {submitted && (
          <div className="mt-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800 animate-in slide-in-from-bottom-2">
             <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold mb-4">
                <Info size={18} /> Context Mastery
             </div>
             <div className="space-y-4">
                <div className="flex gap-4 items-center">
                   <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border-2 border-indigo-100 text-indigo-600 font-black text-lg">
                     {currentQuestion.contextAnswer}
                   </div>
                   <div className="flex-1 text-slate-500 dark:text-slate-400 text-sm font-medium">
                     {currentQuestion.word.definitionZh}
                   </div>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-indigo-50 shadow-sm">
                   <p className="italic text-slate-700 dark:text-slate-200 text-base leading-relaxed">"{currentQuestion.word.exampleEn}"</p>
                   <p className="text-slate-400 text-xs mt-2 font-bold uppercase tracking-widest">Translation: {currentQuestion.word.exampleZh}</p>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FillBlanksSection;
