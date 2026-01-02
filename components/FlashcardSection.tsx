
import React, { useState, useMemo, useCallback } from 'react';
import { VOCABULARY_DATA } from '../data/vocabulary';
import { Word, LearningState } from '../types';
import { RotateCw, Volume2, Star, CheckCircle, ChevronLeft, ChevronRight, Shuffle } from 'lucide-react';

interface FlashcardSectionProps {
  states: Record<number, LearningState>;
  onUpdateState: (wordId: number, updates: Partial<LearningState>) => void;
}

const FlashcardSection: React.FC<FlashcardSectionProps> = ({ states, onUpdateState }) => {
  // 初始索引改为随机，增加趣味性
  const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * VOCABULARY_DATA.length));
  const [isFlipped, setIsFlipped] = useState(false);
  const [shuffledOrder, setShuffledOrder] = useState<number[]>(() => 
    VOCABULARY_DATA.map((_, i) => i).sort(() => Math.random() - 0.5)
  );

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
         <span className="text-sm font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">Card {currentIndex + 1} / {VOCABULARY_DATA.length}</span>
         <button 
           onClick={shuffleCards}
           className="flex items-center gap-2 text-sm font-bold text-indigo-500 hover:text-indigo-600 transition-colors"
         >
           <Shuffle size={16} /> Reshuffle Pool
         </button>
      </div>

      {/* 3D Flashcard */}
      <div 
        className="w-full max-w-lg h-[450px] perspective-1000 cursor-pointer group"
        onClick={handleFlip}
      >
        <div className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front Side */}
          <div className="absolute inset-0 backface-hidden flex flex-col items-center justify-center bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 p-8">
            <div className="absolute top-6 right-6 flex gap-2">
                <Star 
                  size={28} 
                  className={currentState.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'} 
                  onClick={(e) => {
                    e.stopPropagation();
                    onUpdateState(currentWord.id, { isFavorite: !currentState.isFavorite });
                  }}
                />
            </div>
            
            <h2 className="text-6xl font-black text-slate-800 dark:text-white mb-6 tracking-tight">{currentWord.term}</h2>
            <div className="flex items-center gap-4 text-indigo-500 dark:text-indigo-400 mb-8">
               <span className="text-2xl font-medium tracking-wide">{currentWord.phonetic}</span>
               <button 
                onClick={(e) => {
                  e.stopPropagation();
                  speak(currentWord.term);
                }}
                className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-full hover:scale-110 active:scale-95 transition-all shadow-sm"
               >
                 <Volume2 size={24} />
               </button>
            </div>
            
            <div className="mt-12 flex items-center gap-2 text-slate-400 text-sm font-bold animate-bounce">
               <RotateCw size={18} />
               TAP TO FLIP
            </div>
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 p-8 overflow-y-auto">
            <div className="flex justify-between items-start mb-6 border-b border-slate-100 dark:border-slate-700 pb-4">
               <div>
                 <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-lg">{currentWord.pos}</span>
                 <h3 className="text-3xl font-black mt-3 text-slate-800 dark:text-white">{currentWord.term}</h3>
               </div>
               <button 
                 onClick={(e) => {
                   e.stopPropagation();
                   onUpdateState(currentWord.id, { isMastered: !currentState.isMastered });
                 }}
                 className={`p-3 rounded-2xl transition-all shadow-sm ${currentState.isMastered ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400 dark:bg-slate-700'}`}
               >
                 <CheckCircle size={28} />
               </button>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-2xl font-black text-slate-800 dark:text-slate-100 leading-tight">{currentWord.definitionZh}</p>
                <p className="text-slate-500 dark:text-slate-400 text-md mt-2 font-medium leading-relaxed italic">{currentWord.definitionEn}</p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border-l-4 border-indigo-500 shadow-inner">
                <p className="text-slate-700 dark:text-slate-200 font-bold italic text-lg leading-relaxed">"{currentWord.exampleEn}"</p>
                <p className="text-slate-500 text-md mt-3 font-medium">{currentWord.exampleZh}</p>
              </div>

              {currentWord.derivatives && currentWord.derivatives.length > 0 && (
                <div className="pt-2">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-3">Family Members</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentWord.derivatives.map(d => (
                      <span key={d.word} className="text-sm font-bold px-3 py-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
                        {d.word} <span className="text-[10px] opacity-60">({d.pos})</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6 mt-4">
        <button 
          onClick={prevCard}
          className="p-5 bg-white dark:bg-slate-800 rounded-full shadow-xl border border-slate-100 dark:border-slate-700 hover:scale-110 active:scale-95 transition-all text-indigo-500 group"
        >
          <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
        </button>
        
        <button 
          onClick={nextCard}
          className="px-12 py-5 bg-indigo-600 text-white text-lg font-black rounded-[2rem] shadow-2xl shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
        >
          NEXT WORD <ChevronRight size={20} />
        </button>

        <button 
          onClick={nextCard}
          className="p-5 bg-white dark:bg-slate-800 rounded-full shadow-xl border border-slate-100 dark:border-slate-700 hover:scale-110 active:scale-95 transition-all text-indigo-500 group"
        >
          <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default FlashcardSection;
