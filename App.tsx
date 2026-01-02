
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { VOCABULARY_DATA } from './data/vocabulary';
import { ViewMode, LearningState, Word } from './types';
import Dashboard from './components/Dashboard';
import FlashcardSection from './components/FlashcardSection';
import SpellingSection from './components/SpellingSection';
import FillBlanksSection from './components/FillBlanksSection';
import TestSection from './components/TestSection';
import MistakesSection from './components/MistakesSection';
import DerivativesSection from './components/DerivativesSection';
import Sidebar from './components/Sidebar';
import { BookOpen, Trophy, AlertTriangle, Layers, Type, SpellCheck, Settings } from 'lucide-react';

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [learningStates, setLearningStates] = useState<Record<number, LearningState>>(() => {
    const saved = localStorage.getItem('vocab_learning_states');
    if (saved) return JSON.parse(saved);
    
    const initial: Record<number, LearningState> = {};
    VOCABULARY_DATA.forEach(word => {
      initial[word.id] = {
        isMastered: false,
        isHard: false,
        isFavorite: false,
        mistakeCount: 0
      };
    });
    return initial;
  });

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('vocab_dark_mode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('vocab_learning_states', JSON.stringify(learningStates));
  }, [learningStates]);

  useEffect(() => {
    localStorage.setItem('vocab_dark_mode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const updateState = useCallback((wordId: number, updates: Partial<LearningState>) => {
    setLearningStates(prev => ({
      ...prev,
      [wordId]: { ...prev[wordId], ...updates }
    }));
  }, []);

  const masteredCount = useMemo(() => 
    Object.values(learningStates).filter(s => s.isMastered).length, 
  [learningStates]);

  const progress = Math.round((masteredCount / VOCABULARY_DATA.length) * 100);

  return (
    <div className={`min-h-screen flex transition-colors duration-200 ${darkMode ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      <Sidebar 
        currentView={viewMode} 
        setView={setViewMode} 
        progress={progress}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />
      
      <main className="flex-1 p-4 md:p-8 max-w-6xl mx-auto overflow-y-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <header>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              VocabMaster Pro
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              {viewMode === 'dashboard' && 'Welcome back, ready to learn?'}
              {viewMode === 'flashcards' && 'Swipe through your 3D flashcards'}
              {viewMode === 'spelling' && 'Perfect your spelling and dictation'}
              {viewMode === 'cloze' && 'Practice vocabulary in context'}
              {viewMode === 'test' && 'Challenge yourself with a mock test'}
              {viewMode === 'mistakes' && 'Review your difficult words'}
              {viewMode === 'derivatives' && 'Expand your word family knowledge'}
            </p>
          </header>

          <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-3 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
             <div className="flex flex-col items-end">
                <span className="text-sm font-medium">Mastery Progress</span>
                <span className="text-xs text-slate-500">{masteredCount}/54 words</span>
             </div>
             <div className="w-24 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-500" 
                  style={{ width: `${progress}%` }}
                />
             </div>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {viewMode === 'dashboard' && (
            <Dashboard 
              states={learningStates} 
              onNavigate={setViewMode}
            />
          )}
          {viewMode === 'flashcards' && (
            <FlashcardSection 
              states={learningStates} 
              onUpdateState={updateState} 
            />
          )}
          {viewMode === 'spelling' && (
            <SpellingSection 
              states={learningStates} 
              onUpdateState={updateState} 
            />
          )}
          {viewMode === 'cloze' && (
             <FillBlanksSection 
               states={learningStates} 
               onUpdateState={updateState} 
             />
          )}
          {viewMode === 'derivatives' && (
             <DerivativesSection 
               states={learningStates} 
               onUpdateState={updateState} 
             />
          )}
          {viewMode === 'test' && (
             <TestSection 
               states={learningStates} 
               onComplete={(score, total) => {
                  console.log(`Test score: ${score}/${total}`);
               }}
             />
          )}
          {viewMode === 'mistakes' && (
             <MistakesSection 
               states={learningStates} 
               onNavigate={setViewMode}
             />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
