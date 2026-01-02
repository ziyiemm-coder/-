
import React, { useState, useMemo, useCallback } from 'react';
import { VOCABULARY_DATA } from '../data/vocabulary';
import { Word, LearningState } from '../types';
import { RotateCw, Volume2, Star, CheckCircle, ChevronLeft, ChevronRight, Shuffle } from 'lucide-react';

interface FlashcardSectionProps {
  states: Record<number, LearningState>;
  onUpdateState: (wordId: number, updates: Partial<LearningState>) => void;
}

const FlashcardSection: React.FC<FlashcardSectionProps> = ({ states, onUpdateState }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledOrder, setShuffledOrder] = useState<number[]>(VOCABULARY_DATA.map((_, i) => i));

  const currentWord = useMemo(() => VOCABULARY_DATA[shuffledOrder[currentIndex]], [currentIndex, shuffledOrder]);
  const currentState = states[currentWord.id];

  const handleFlip = () => setIsFlipped(!isFlipped);

  const nextCard = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % VOCABULARY_DATA.length);
    }, 150);
  }, []);

  const prevCard = useCallback(() => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + VOCABULARY_DATA.length) % VOCABULARY_DATA.length);
    }, 150);
  }, []);

  const shuffleCards = () => {
    const newOrder = [...shuffledOrder].sort(() => Math.random() - 0.5);
    setShuffledOrder(newOrder);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <div className="w-full max-w-lg flex items-center justify-between mb-2">
         <span className="text-sm font-medium text-slate-500">Card {currentIndex + 1} of {VOCABULARY_DATA.length}</span>
         <button 
           onClick={shuffleCards}
           className="flex items-center gap-2 text-sm text-indigo-500 hover:text-indigo-600 transition-colors"
         >
           <Shuffle size={16} /> Shuffle
         </button>
      </div>

      {/* 3D Flashcard */}
      <div 
        className="w-full max-w-lg h-96 perspective-1000 cursor-pointer group"
        onClick={handleFlip}
      >
        <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front Side */}
          <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-8">
            <div className="absolute top-6 right-6 flex gap-2">
                <Star 
                  size={24} 
                  className={currentState.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'} 
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateState(currentWord.id, { isFavorite: !currentState.isFavorite });
                  }}
                />
            </div>
            
            <h2 className="text-5xl font-bold text-slate-800 dark:text-white mb-4">{currentWord.term}</h2>
            <div className="flex items-center gap-3 text-indigo-500 dark:text-indigo-400 mb-6">
               <span className="text-lg italic">{currentWord.phonetic}</span>
               <button 
                onClick={(e) => {
                  e.stopPropagation();
                  speak(currentWord.term);
                }}
                className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-full hover:scale-110 transition-transform"
               >
                 <Volume2 size={20} />
               </button>
            </div>
            
            <div className="mt-8 flex items-center gap-2 text-slate-400 text-sm animate-pulse">
               <RotateCw size={16} />
               Click to reveal definition
            </div>
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-8 overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
               <div>
                 <span className="text-xs font-bold uppercase tracking-wider text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded">{currentWord.pos}</span>
                 <h3 className="text-2xl font-bold mt-2">{currentWord.term}</h3>
               </div>
               <button 
                 onClick={(e) => {
                   e.stopPropagation();
                   onUpdateState(currentWord.id, { isMastered: !currentState.isMastered });
                 }}
                 className={`p-2 rounded-xl transition-all ${currentState.isMastered ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-300 dark:bg-slate-700'}`}
               >
                 <CheckCircle size={24} className={currentState.isMastered ? 'fill-emerald-50' : ''} />
               </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-lg font-medium text-slate-800 dark:text-slate-200">{currentWord.definitionZh}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">{currentWord.definitionEn}</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border-l-4 border-indigo-400">
                <p className="text-slate-700 dark:text-slate-300 font-medium italic">"{currentWord.exampleEn}"</p>
                <p className="text-slate-500 text-sm mt-2">{currentWord.exampleZh}</p>
              </div>

              {currentWord.derivatives.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-2">Derivatives</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentWord.derivatives.map(d => (
                      <span key={d.word} className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-lg">
                        {d.word} ({d.pos})
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={prevCard}
          className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 hover:scale-110 active:scale-95 transition-all text-indigo-500"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          onClick={nextCard}
          className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all"
        >
          Next Random
        </button>

        <button 
          onClick={nextCard}
          className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-lg border border-slate-100 dark:border-slate-700 hover:scale-110 active:scale-95 transition-all text-indigo-500"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default FlashcardSection;
