
import React, { useState, useEffect, useMemo } from 'react';
import { VOCABULARY_DATA } from '../data/vocabulary';
import { LearningState, Word } from '../types';
import { Timer, CheckCircle, ArrowRight, RefreshCcw } from 'lucide-react';

interface TestSectionProps {
  states: Record<number, LearningState>;
  onComplete: (score: number, total: number) => void;
}

const TestSection: React.FC<TestSectionProps> = ({ states, onComplete }) => {
  const [testStarted, setTestStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 mins
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [testFinished, setTestFinished] = useState(false);

  // Generate 30 unique questions
  const testQuestions = useMemo(() => {
    return [...VOCABULARY_DATA]
      .sort(() => Math.random() - 0.5)
      .slice(0, 30)
      .map((word, i) => {
        const type = i % 3; // 0: MCQ, 1: Spelling, 2: Meaning
        const options = VOCABULARY_DATA
          .filter(w => w.id !== word.id)
          .sort(() => Math.random() - 0.5)
          .slice(0, 3)
          .map(w => w.term);
        
        return {
          word,
          type: type === 0 ? 'mcq' : (type === 1 ? 'spelling' : 'meaning'),
          options: [...options, word.term].sort(() => Math.random() - 0.5)
        };
      });
  }, [testStarted]);

  useEffect(() => {
    let timer: number;
    if (testStarted && !testFinished && timeLeft > 0) {
      timer = window.setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      finishTest();
    }
    return () => clearInterval(timer);
  }, [testStarted, testFinished, timeLeft]);

  const finishTest = () => {
    setTestFinished(true);
    let score = 0;
    testQuestions.forEach((q, i) => {
      const userAns = answers[i]?.trim().toLowerCase();
      const correctAns = q.word.term.toLowerCase();
      if (userAns === correctAns) score++;
    });
    onComplete(score, testQuestions.length);
  };

  if (!testStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center p-8 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl">
        <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 rounded-full flex items-center justify-center mb-6">
          <Timer size={40} />
        </div>
        <h2 className="text-3xl font-bold mb-4">Mock Proficiency Test</h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
          30 questions spanning spelling, definitions, and contextual usage. 
          You have 15 minutes to complete the test.
        </p>
        <button 
          onClick={() => setTestStarted(true)}
          className="px-12 py-4 bg-indigo-600 text-white font-black rounded-2xl shadow-xl shadow-indigo-500/20 hover:scale-105 transition-all"
        >
          START TEST
        </button>
      </div>
    );
  }

  if (testFinished) {
    const score = testQuestions.reduce((acc, q, i) => 
      acc + (answers[i]?.trim().toLowerCase() === q.word.term.toLowerCase() ? 1 : 0), 0);
    
    return (
      <div className="flex flex-col items-center gap-8 animate-in zoom-in duration-300">
        <div className="bg-white dark:bg-slate-800 p-12 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 text-center w-full max-w-2xl">
          <h2 className="text-4xl font-black mb-2">Test Results</h2>
          <div className="text-6xl font-black text-indigo-500 my-8">
            {score}/{testQuestions.length}
          </div>
          <p className="text-slate-500 mb-8">
            {score === testQuestions.length ? 'Perfect Score! You are a master.' : 
             score > 24 ? 'Excellent performance!' : 
             score > 15 ? 'Good start, keep practicing.' : 'Focus more on the flashcards.'}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 mx-auto px-8 py-3 bg-slate-800 dark:bg-slate-700 text-white font-bold rounded-xl hover:bg-slate-900 transition-all"
          >
            <RefreshCcw size={18} /> Restart Session
          </button>
        </div>
      </div>
    );
  }

  const currentQ = testQuestions[currentIdx];
  const progressPercent = ((currentIdx + 1) / testQuestions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-rose-50 dark:bg-rose-900/30 text-rose-500 rounded-lg">
            <Timer size={20} />
          </div>
          <span className="font-mono text-xl font-bold">
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>
        <div className="text-sm font-bold text-slate-400">
          Question {currentIdx + 1} of 30
        </div>
      </div>

      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-500 transition-all" style={{ width: `${progressPercent}%` }} />
      </div>

      <div className="bg-white dark:bg-slate-800 p-10 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700">
         <div className="mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-2 block">
              {currentQ.type === 'mcq' ? 'Multiple Choice' : currentQ.type === 'spelling' ? 'Spelling' : 'Definition Match'}
            </span>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
               {currentQ.type === 'mcq' && `Complete: "${currentQ.word.exampleEn.replace(currentQ.word.term, '__________')}"`}
               {currentQ.type === 'spelling' && `Write the word for: "${currentQ.word.definitionZh}"`}
               {currentQ.type === 'meaning' && `Select word for meaning: "${currentQ.word.definitionEn}"`}
            </h3>
         </div>

         <div className="grid gap-4">
            {currentQ.type === 'spelling' ? (
              <input 
                type="text"
                autoFocus
                value={answers[currentIdx] || ''}
                onChange={(e) => setAnswers({...answers, [currentIdx]: e.target.value})}
                placeholder="Type word here..."
                className="w-full p-6 text-xl rounded-2xl border-2 border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 focus:border-indigo-500 outline-none transition-all"
              />
            ) : (
              currentQ.options.map(opt => (
                <button
                  key={opt}
                  onClick={() => setAnswers({...answers, [currentIdx]: opt})}
                  className={`p-5 rounded-2xl text-left font-bold transition-all border-2 ${
                    answers[currentIdx] === opt 
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                      : 'border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 hover:border-slate-200'
                  }`}
                >
                  {opt}
                </button>
              ))
            )}
         </div>

         <div className="mt-12 flex justify-between">
            <button 
              onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
              disabled={currentIdx === 0}
              className="px-6 py-3 font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl disabled:opacity-30"
            >
              Back
            </button>
            
            {currentIdx === testQuestions.length - 1 ? (
              <button 
                onClick={finishTest}
                className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-700"
              >
                Finish Test
              </button>
            ) : (
              <button 
                onClick={() => setCurrentIdx(prev => prev + 1)}
                className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-lg hover:bg-indigo-700"
              >
                Next <ArrowRight size={18} />
              </button>
            )}
         </div>
      </div>
    </div>
  );
};

export default TestSection;
