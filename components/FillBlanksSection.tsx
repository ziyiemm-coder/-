
import React, { useState, useMemo } from 'react';
import { VOCABULARY_DATA } from '../data/vocabulary';
import { LearningState, Word } from '../types';
import { Check, X, ArrowRight, Lightbulb, Shuffle } from 'lucide-react';

interface FillBlanksSectionProps {
  states: Record<number, LearningState>;
  onUpdateState: (wordId: number, updates: Partial<LearningState>) => void;
}

const FillBlanksSection: React.FC<FillBlanksSectionProps> = ({ states, onUpdateState }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [mode, setMode] = useState<'mcq' | 'input'>('mcq');
  const [inputValue, setInputValue] = useState('');

  const questions = useMemo(() => {
    // Generate distinct questions for all 54 words
    return VOCABULARY_DATA.map(word => {
      // Find 3 distractors
      const distractors = VOCABULARY_DATA
        .filter(w => w.id !== word.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(w => w.term);
      
      const options = [...distractors, word.term].sort(() => Math.random() - 0.5);
      
      return {
        word,
        sentence: word.exampleEn.replace(new RegExp(word.term, 'gi'), '__________'),
        options
      };
    });
  }, []);

  const currentQuestion = questions[currentIndex];

  const handleCheck = () => {
    const isCorrect = mode === 'mcq' 
      ? selectedOption === currentQuestion.word.term
      : inputValue.trim().toLowerCase() === currentQuestion.word.term.toLowerCase();
    
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
          onClick={() => { setMode('mcq'); setSubmitted(false); }}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'mcq' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600' : 'text-slate-500'}`}
        >
          Multiple Choice
        </button>
        <button 
          onClick={() => { setMode('input'); setSubmitted(false); }}
          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'input' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600' : 'text-slate-500'}`}
        >
          Spelling Cloze
        </button>
      </div>

      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-8">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">Sentence Context</span>
          <p className="mt-4 text-2xl font-medium leading-relaxed text-slate-800 dark:text-slate-200">
            "{currentQuestion.sentence}"
          </p>
          {/* Hint removed per request */}
        </div>

        {mode === 'mcq' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option) => {
              const isCorrect = option === currentQuestion.word.term;
              const isSelected = selectedOption === option;
              
              let style = "border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30";
              if (submitted) {
                if (isCorrect) style = "bg-emerald-500 text-white border-emerald-500";
                else if (isSelected) style = "bg-rose-500 text-white border-rose-500";
              } else if (isSelected) {
                style = "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600";
              }

              return (
                <button
                  key={option}
                  disabled={submitted}
                  onClick={() => setSelectedOption(option)}
                  className={`p-4 rounded-2xl text-lg font-medium border-2 transition-all flex items-center justify-between ${style}`}
                >
                  {option}
                  {submitted && isCorrect && <Check size={20} />}
                  {submitted && isSelected && !isCorrect && <X size={20} />}
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
               placeholder="Type the missing word..."
               className={`w-full p-4 rounded-2xl text-xl font-medium border-2 outline-none transition-all ${
                 submitted 
                   ? (inputValue.trim().toLowerCase() === currentQuestion.word.term.toLowerCase() ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-rose-500 bg-rose-50 text-rose-600')
                   : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 focus:border-indigo-500'
               }`}
             />
             {submitted && inputValue.trim().toLowerCase() !== currentQuestion.word.term.toLowerCase() && (
               <div className="p-4 bg-rose-50 text-rose-600 rounded-xl text-sm font-medium">
                 The correct word was: <span className="font-bold underline">{currentQuestion.word.term}</span>
               </div>
             )}
          </div>
        )}

        <div className="mt-8 flex gap-4">
           {!submitted ? (
             <button
               onClick={handleCheck}
               disabled={mode === 'mcq' ? !selectedOption : !inputValue.trim()}
               className="flex-1 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
             >
               Check Answer
             </button>
           ) : (
             <>
               <button
                 onClick={nextQuestion}
                 className="flex-1 py-4 bg-slate-800 dark:bg-slate-700 text-white font-bold rounded-2xl shadow-lg hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
               >
                 Next Question <ArrowRight size={20} />
               </button>
               <button
                 onClick={randomNextWord}
                 className="flex-1 py-4 bg-indigo-500 text-white font-bold rounded-2xl shadow-lg hover:bg-indigo-600 transition-all flex items-center justify-center gap-2"
               >
                 Random Next Word <Shuffle size={20} />
               </button>
             </>
           )}
        </div>

        {submitted && (
          <div className="mt-8 p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-800">
             <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold mb-2">
                <Lightbulb size={18} /> Explanation
             </div>
             <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
               The word <span className="font-bold">"{currentQuestion.word.term}"</span> fits here because it means "{currentQuestion.word.definitionEn}". 
               In this context: <span className="italic">{currentQuestion.word.exampleZh}</span>
             </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FillBlanksSection;
