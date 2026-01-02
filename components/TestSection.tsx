
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { VOCABULARY_DATA } from '../data/vocabulary';
import { LearningState, Word } from '../types';
import { Timer, CheckCircle, ArrowRight, RefreshCcw, BookOpen, AlertCircle, HelpCircle } from 'lucide-react';

interface TestSectionProps {
  states: Record<number, LearningState>;
  onComplete: (score: number, total: number) => void;
}

interface ClozeQuestion {
  sentence: string;
  answer: string;
  rootWord: string;
  candidates: string[];
}

const TestSection: React.FC<TestSectionProps> = ({ states, onComplete }) => {
  const [testStarted, setTestStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60); // 20 mins for comprehensive test
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [testFinished, setTestFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate the comprehensive question pool from roots and derivatives
  const testQuestions = useMemo(() => {
    const pool: ClozeQuestion[] = [];

    VOCABULARY_DATA.forEach((word) => {
      // 1. Add root word question
      if (word.exampleEn) {
        const distractors = VOCABULARY_DATA
          .filter(w => w.id !== word.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(w => w.term);
        
        pool.push({
          sentence: word.exampleEn.replace(new RegExp(`\\b${word.term}\\b`, 'gi'), '__________'),
          answer: word.term,
          rootWord: word.term,
          candidates: [...distractors, word.term].sort(() => Math.random() - 0.5)
        });
      }

      // 2. Add derivative questions
      word.derivatives.forEach((deriv) => {
        if (deriv.example) {
          const distractors = VOCABULARY_DATA
            .filter(w => w.id !== word.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(w => w.term);

          pool.push({
            sentence: deriv.example.replace(new RegExp(`\\b${deriv.word}\\b`, 'gi'), '__________'),
            answer: deriv.word,
            rootWord: word.term,
            candidates: [...distractors, word.term].sort(() => Math.random() - 0.5)
          });
        }
      });
    });

    // Pick 30 random questions for the test session
    return pool.sort(() => Math.random() - 0.5).slice(0, 30);
  }, [testStarted]);

  useEffect(() => {
    let timer: number;
    if (testStarted && !testFinished && timeLeft > 0) {
      timer = window.setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && testStarted) {
      finishTest();
    }
    return () => clearInterval(timer);
  }, [testStarted, testFinished, timeLeft]);

  useEffect(() => {
    if (testStarted && !testFinished) {
      inputRef.current?.focus();
    }
  }, [currentIdx, testStarted, testFinished]);

  const finishTest = () => {
    setTestFinished(true);
    let score = 0;
    testQuestions.forEach((q, i) => {
      if (userAnswers[i]?.trim().toLowerCase() === q.answer.toLowerCase()) {
        score++;
      }
    });
    onComplete(score, testQuestions.length);
  };

  if (!testStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl max-w-2xl mx-auto">
        <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 rounded-full flex items-center justify-center mb-8">
          <BookOpen size={48} />
        </div>
        <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          Proficiency Challenge
        </h2>
        <div className="space-y-4 mb-10 text-slate-500 dark:text-slate-400">
          <p>This test consists of <span className="font-bold text-indigo-500">30 sentence-cloze questions</span>.</p>
          <p>You must identify the correct root from the provided candidates and enter the <span className="font-bold text-slate-800 dark:text-slate-200 underline">exact form</span> (singular/plural, tense, or derivative) required by the sentence.</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
             <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Time Limit</div>
             <div className="text-xl font-bold text-indigo-500">20 Minutes</div>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
             <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Questions</div>
             <div className="text-xl font-bold text-indigo-500">30 Total</div>
          </div>
        </div>

        <button 
          onClick={() => setTestStarted(true)}
          className="w-full py-5 bg-indigo-600 text-white text-lg font-black rounded-2xl shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all"
        >
          START ASSESSMENT
        </button>
      </div>
    );
  }

  if (testFinished) {
    const score = testQuestions.reduce((acc, q, i) => 
      acc + (userAnswers[i]?.trim().toLowerCase() === q.answer.toLowerCase() ? 1 : 0), 0);
    
    return (
      <div className="flex flex-col items-center gap-8 animate-in zoom-in duration-300 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-800 p-12 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 text-center w-full">
          <h2 className="text-4xl font-black mb-2">Assessment Complete</h2>
          <div className="text-7xl font-black text-indigo-500 my-10 drop-shadow-sm">
            {score}<span className="text-3xl text-slate-300 mx-2">/</span>{testQuestions.length}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-10">
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
               <h4 className="font-bold text-emerald-600 mb-2">Accuracy</h4>
               <p className="text-3xl font-black text-emerald-500">{Math.round((score / testQuestions.length) * 100)}%</p>
            </div>
            <div className="p-6 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
               <h4 className="font-bold text-indigo-600 mb-2">Mastery Level</h4>
               <p className="text-3xl font-black text-indigo-500">
                 {score > 27 ? 'Elite' : score > 20 ? 'Advanced' : score > 10 ? 'Intermediate' : 'Beginner'}
               </p>
            </div>
          </div>

          <button 
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-3 w-full py-5 bg-slate-900 dark:bg-slate-700 text-white text-xl font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-lg"
          >
            <RefreshCcw size={24} /> Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentQ = testQuestions[currentIdx];
  const progressPercent = ((currentIdx + 1) / testQuestions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-6 animate-in fade-in duration-500">
      {/* Header Info */}
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
            Question {currentIdx + 1} / 30
          </div>
        </div>
        
        <div className="md:w-64 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-4">
           <div className="flex-1 h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
           </div>
           <span className="text-xs font-bold text-indigo-500">{Math.round(progressPercent)}%</span>
        </div>
      </div>

      {/* Main Question Card */}
      <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-700 relative overflow-hidden">
         {/* Decoration */}
         <div className="absolute top-0 right-0 p-8 opacity-5">
            <BookOpen size={120} />
         </div>

         <div className="mb-10">
            <div className="flex items-center gap-2 text-indigo-500 text-xs font-black uppercase tracking-[0.2em] mb-4">
              <HelpCircle size={16} /> Sentence Cloze Assessment
            </div>
            <h3 className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-800 dark:text-slate-100">
               "{currentQ.sentence}"
            </h3>
         </div>

         {/* Candidate Word Bank */}
         <div className="mb-10 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Candidate Root Word Hints</div>
            <div className="flex flex-wrap gap-3">
               {currentQ.candidates.map((cand, idx) => (
                 <div 
                   key={idx}
                   className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold text-indigo-600 dark:text-indigo-400 shadow-sm"
                 >
                   {cand}
                 </div>
               ))}
            </div>
         </div>

         <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Your Answer (Type correctly):</label>
            <input 
              ref={inputRef}
              type="text"
              value={userAnswers[currentIdx] || ''}
              onChange={(e) => setUserAnswers({...userAnswers, [currentIdx]: e.target.value})}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (currentIdx < testQuestions.length - 1) setCurrentIdx(prev => prev + 1);
                  else finishTest();
                }
              }}
              placeholder="Enter the required word form..."
              className="w-full p-6 text-2xl font-medium rounded-2xl border-2 border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 focus:border-indigo-500 outline-none transition-all shadow-inner"
            />
         </div>

         <div className="mt-12 flex flex-col md:flex-row justify-between gap-4">
            <button 
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="px-8 py-4 font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-2xl disabled:opacity-30 transition-all"
            >
              Previous Question
            </button>
            
            <div className="flex gap-4">
               {currentIdx === testQuestions.length - 1 ? (
                 <button 
                   onClick={finishTest}
                   className="px-12 py-4 bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 hover:bg-emerald-700 transition-all flex items-center gap-2"
                 >
                   <CheckCircle size={20} /> Finish & Grade
                 </button>
               ) : (
                 <button 
                   onClick={() => setCurrentIdx(prev => prev + 1)}
                   className="px-12 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all flex items-center gap-2"
                 >
                   Next Question <ArrowRight size={20} />
                 </button>
               )}
            </div>
         </div>
      </div>

      {/* Quick Navigation Footer */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-wrap gap-2 justify-center">
         {testQuestions.map((_, i) => (
           <button
             key={i}
             onClick={() => setCurrentIdx(i)}
             className={`w-8 h-8 rounded-lg text-[10px] font-bold transition-all border ${
               currentIdx === i 
                 ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-110' 
                 : (userAnswers[i] 
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 border-indigo-100 dark:border-indigo-800' 
                    : 'bg-slate-50 dark:bg-slate-900 text-slate-400 border-slate-100 dark:border-slate-800')
             }`}
           >
             {i + 1}
           </button>
         ))}
      </div>
    </div>
  );
};

export default TestSection;
