
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { VOCABULARY_DATA } from '../data/vocabulary';
import { LearningState, Word } from '../types';
import { Timer, CheckCircle, ArrowRight, RefreshCcw, BookOpen, HelpCircle, XCircle, Lightbulb, Info } from 'lucide-react';

interface TestSectionProps {
  states: Record<number, LearningState>;
  onComplete: (score: number, total: number) => void;
}

interface ClozeQuestion {
  id: string;
  sentence: string;
  contextAnswer: string;
  rootWord: string;
  candidates: string[];
  explanation: string;
  translation: string;
  targetWordObj: Word;
}

const getSmartHollow = (sentence: string, term: string) => {
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
    const actual = match[0];
    return {
      hollowed: sentence.replace(actual, '__________'),
      contextAnswer: actual
    };
  }
  return {
    hollowed: sentence.replace(new RegExp(term, 'gi'), '__________'),
    contextAnswer: term
  };
};

const TestSection: React.FC<TestSectionProps> = ({ states, onComplete }) => {
  const [testStarted, setTestStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10 * 60); 
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [testFinished, setTestFinished] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [testResults, setTestResults] = useState<{isCorrect: boolean, userAnswer: string, question: ClozeQuestion}[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);

  const testQuestions = useMemo(() => {
    if (!testStarted) return [];
    
    const pool: ClozeQuestion[] = [];
    VOCABULARY_DATA.forEach((word) => {
      if (word.exampleEn) {
        const { hollowed, contextAnswer } = getSmartHollow(word.exampleEn, word.term);
        pool.push({
          id: `root-${word.id}`,
          sentence: hollowed,
          contextAnswer,
          rootWord: word.term,
          candidates: VOCABULARY_DATA.filter(w => w.id !== word.id).sort(() => Math.random() - 0.5).slice(0, 3).map(w => w.term).concat(word.term).sort(() => Math.random() - 0.5),
          explanation: `Definition: ${word.definitionZh}`,
          translation: word.exampleZh,
          targetWordObj: word
        });
      }

      word.derivatives.forEach((deriv, dIdx) => {
        if (deriv.example) {
          const { hollowed, contextAnswer } = getSmartHollow(deriv.example, deriv.word);
          pool.push({
            id: `deriv-${word.id}-${dIdx}`,
            sentence: hollowed,
            contextAnswer,
            rootWord: word.term,
            candidates: [word.term, ...VOCABULARY_DATA.filter(w => w.id !== word.id).sort(() => Math.random() - 0.5).slice(0, 2).map(w => w.term)].sort(() => Math.random() - 0.5),
            explanation: `Usage: ${deriv.pos} of "${word.term}" (${deriv.definition})`,
            translation: deriv.example,
            targetWordObj: word
          });
        }
      });
    });

    return pool.sort(() => Math.random() - 0.5).slice(0, 10);
  }, [testStarted]);

  useEffect(() => {
    let timer: number;
    if (testStarted && !testFinished && timeLeft > 0) {
      timer = window.setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && testStarted && !testFinished) {
      setTestFinished(true);
    }
    return () => clearInterval(timer);
  }, [testStarted, testFinished, timeLeft]);

  useEffect(() => {
    if (testStarted && !testFinished && !isSubmitted) {
      inputRef.current?.focus();
    }
  }, [currentIdx, testStarted, testFinished, isSubmitted]);

  const handleSubmit = () => {
    if (isSubmitted) return;
    
    const currentQ = testQuestions[currentIdx];
    const userVal = userAnswer.trim();
    const isCorrect = userVal.toLowerCase() === currentQ.contextAnswer.toLowerCase();
    
    setTestResults(prev => [...prev, {
      isCorrect,
      userAnswer: userVal,
      question: currentQ
    }]);
    
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIdx < testQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setUserAnswer('');
      setIsSubmitted(false);
    } else {
      setTestFinished(true);
      const score = testResults.filter(r => r.isCorrect).length;
      onComplete(score, 10);
    }
  };

  if (!testStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl max-w-2xl mx-auto">
        <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 rounded-full flex items-center justify-center mb-8">
          <BookOpen size={48} />
        </div>
        <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Mock Test Challenge
        </h2>
        <div className="space-y-4 mb-10 text-slate-500 dark:text-slate-400">
          <p>Test your knowledge with 10 random contextual questions. Instant feedback provided!</p>
        </div>
        <button 
          onClick={() => setTestStarted(true)}
          className="w-full py-5 bg-indigo-600 text-white text-lg font-black rounded-2xl shadow-xl hover:scale-[1.02] transition-all"
        >
          START ASSESSMENT
        </button>
      </div>
    );
  }

  if (testFinished) {
    const score = testResults.filter(r => r.isCorrect).length;
    return (
      <div className="flex flex-col items-center gap-8 animate-in zoom-in duration-300 max-w-4xl mx-auto pb-12">
        <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 text-center w-full">
          <h2 className="text-4xl font-black mb-2">Final Performance</h2>
          <div className="text-7xl font-black text-indigo-500 my-10">
            {score}<span className="text-3xl text-slate-300 mx-2">/</span>10
          </div>
          <button 
            onClick={() => {
              setTestStarted(false);
              setTestFinished(false);
              setCurrentIdx(0);
              setUserAnswer('');
              setTestResults([]);
              setIsSubmitted(false);
              setTimeLeft(10 * 60);
            }}
            className="flex items-center justify-center gap-3 w-full py-5 bg-slate-900 dark:bg-slate-700 text-white text-xl font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg"
          >
            <RefreshCcw size={24} /> New Random Test
          </button>
        </div>
      </div>
    );
  }

  const currentQ = testQuestions[currentIdx];
  const progressPercent = ((currentIdx + 1) / 10) * 100;

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        <div className="flex-1 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-50 dark:bg-rose-900/30 text-rose-500 rounded-lg">
              <Timer size={20} />
            </div>
            <span className="font-mono text-xl font-bold tracking-wider">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
          <div className="text-sm font-black text-slate-400 tracking-widest uppercase">
            Question {currentIdx + 1} / 10
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-700 relative">
         <div className="mb-10">
            <div className="flex items-center gap-2 text-indigo-500 text-xs font-black uppercase tracking-[0.2em] mb-4">
              <HelpCircle size={16} /> Context Logic Test
            </div>
            <h3 className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-800 dark:text-slate-100">
               "{currentQ.sentence}"
            </h3>
         </div>

         {!isSubmitted && (
           <div className="mb-10 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Recall Potential Roots</div>
              <div className="flex flex-wrap gap-2">
                 {currentQ.candidates.map((cand, idx) => (
                   <span key={idx} className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 rounded-lg text-xs font-bold text-indigo-500">
                     {cand}
                   </span>
                 ))}
              </div>
           </div>
         )}

         <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Your Entry:</label>
            <input 
              ref={inputRef}
              type="text"
              disabled={isSubmitted}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (isSubmitted ? handleNext() : handleSubmit())}
              placeholder="Case-insensitive..."
              className={`w-full p-6 text-2xl font-medium rounded-2xl border-2 outline-none transition-all shadow-inner ${
                isSubmitted 
                  ? (userAnswer.trim().toLowerCase() === currentQ.contextAnswer.toLowerCase() ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-rose-500 bg-rose-50 text-rose-600')
                  : 'border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 focus:border-indigo-500'
              }`}
            />
         </div>

         {isSubmitted && (
            <div className="mt-8 space-y-4 animate-in slide-in-from-top-4 duration-300">
              {/* Correct/Incorrect Banner */}
              <div className={`p-6 rounded-2xl border flex flex-col gap-2 ${userAnswer.trim().toLowerCase() === currentQ.contextAnswer.toLowerCase() ? 'bg-emerald-50 border-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-900/30 dark:text-emerald-400' : 'bg-rose-50 border-rose-100 text-rose-800 dark:bg-rose-900/20 dark:border-rose-900/30 dark:text-rose-400'}`}>
                <div className="flex items-center gap-2 font-black uppercase tracking-widest text-sm">
                  {userAnswer.trim().toLowerCase() === currentQ.contextAnswer.toLowerCase() ? <CheckCircle size={18} /> : <XCircle size={18} />}
                  {userAnswer.trim().toLowerCase() === currentQ.contextAnswer.toLowerCase() ? 'Perfect Match' : 'Incorrect'}
                </div>
                {userAnswer.trim().toLowerCase() !== currentQ.contextAnswer.toLowerCase() && (
                  <p className="font-bold">Correct Response: <span className="underline underline-offset-4">{currentQ.contextAnswer}</span></p>
                )}
              </div>
              
              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold mb-3">
                  <Lightbulb size={18} /> General Hint & Translation
                </div>
                <div className="space-y-3">
                  <p className="text-slate-800 dark:text-slate-200 font-medium">{currentQ.explanation}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm italic border-t border-slate-100 dark:border-slate-800 pt-2">Translation: {currentQ.translation}</p>
                </div>
              </div>
            </div>
         )}

         <div className="mt-12 flex justify-end">
            {!isSubmitted ? (
               <button 
                 onClick={handleSubmit}
                 disabled={!userAnswer.trim()}
                 className="px-12 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl hover:bg-indigo-700 transition-all flex items-center gap-2 disabled:opacity-50"
               >
                 Submit Answer
               </button>
            ) : (
               <button 
                 onClick={handleNext}
                 className="px-12 py-4 bg-slate-900 dark:bg-slate-700 text-white font-black rounded-2xl shadow-xl hover:bg-slate-800 transition-all flex items-center gap-2"
               >
                 {currentIdx === 9 ? 'Finish Test' : 'Continue'} <ArrowRight size={20} />
               </button>
            )}
         </div>
      </div>
    </div>
  );
};

export default TestSection;
