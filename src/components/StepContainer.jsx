import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepCard from './StepCard';
import { ArrowRight, ArrowLeft } from 'lucide-react';

export default function StepContainer({
  stepData,
  currentStepIndex,
  selectedAnswer,
  customSlogan,
  onSelectAnswer,
  onUpdateCustomSlogan,
  onNext,
  onBack,
  canProceed
}) {
  const [localCustomSlogan, setLocalCustomSlogan] = useState(customSlogan || '');

  // Normalize selectedAnswer as array for consistent handling
  const currentSelection = useMemo(() => {
    if (Array.isArray(selectedAnswer)) return selectedAnswer;
    return selectedAnswer ? [selectedAnswer] : [];
  }, [selectedAnswer]);

  const currentSelectionRef = useRef(currentSelection);
  useEffect(() => {
    currentSelectionRef.current = currentSelection;
  }, [currentSelection]);

  const handleToggle = useCallback(
    (val) => {
      if (stepData.isMultiSelect) {
        const list = currentSelectionRef.current;
        if (list.includes(val)) {
          onSelectAnswer(list.filter((item) => item !== val));
        } else {
          onSelectAnswer([...list, val]);
        }
      } else {
        // Single-select: replace choice
        onSelectAnswer([val]);
      }
    },
    [stepData.isMultiSelect, onSelectAnswer]
  );

  // Sync custom slogan
  const handleCustomSloganChange = (e) => {
    const val = e.target.value;
    setLocalCustomSlogan(val);
    onUpdateCustomSlogan(val);
  };

  // Keyboard shortcut listener (1, 2, 3, 4, Enter)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in textarea or input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        if (e.key === 'Enter' && !e.shiftKey && canProceed) {
          e.preventDefault();
          onNext();
        }
        return;
      }

      if (e.key === '1' && stepData.options[0]) {
        handleToggle(stepData.options[0].value);
      } else if (e.key === '2' && stepData.options[1]) {
        handleToggle(stepData.options[1].value);
      } else if (e.key === '3' && stepData.options[2]) {
        handleToggle(stepData.options[2].value);
      } else if (e.key === '4' && stepData.options[3]) {
        handleToggle(stepData.options[3].value);
      } else if (e.key === 'Enter' && canProceed) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [stepData, canProceed, handleToggle, onNext]);

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 py-24 sm:py-28 z-20 max-w-6xl mx-auto w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={stepData.id}
          initial={{ opacity: 0, y: 32, scale: 0.975, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -26, scale: 0.98, filter: 'blur(10px)' }}
          transition={{
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="w-full flex flex-col relative"
        >
          {/* Calm Atmospheric Golden Horizon Sweep on Each Step Transition */}
          <motion.div
            key={`gleam-${stepData.id}`}
            initial={{ opacity: 0.7, scaleX: 0.2 }}
            animate={{ opacity: 0, scaleX: 1 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 w-4/5 h-[1.5px] bg-gradient-to-r from-transparent via-gold to-transparent pointer-events-none"
          />

          {/* Tag & Step Title (Symmetrically Centered) */}
          <div className="mb-10 text-center flex flex-col items-center mx-auto">
            {/* Step Tag: Clean typography without enclosing rounded rectangle */}
            {stepData.tag && (
              <div className="text-xs sm:text-sm font-mono tracking-luxury text-gold font-medium uppercase mb-1.5">
                {stepData.tag}
              </div>
            )}

            {/* Simple selection indicator */}
            <div className="text-[11px] sm:text-xs font-mono tracking-widest text-architectural-muted/80 uppercase mb-5">
              {stepData.isMultiSelect ? 'Çoklu Seçim' : 'Tek Seçim'}
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-architectural-white font-light tracking-tight leading-[1.15] mb-3 text-center max-w-3xl">
              {stepData.title}
            </h2>

            {stepData.subtitle && (
              <p className="text-sm sm:text-base text-architectural-muted max-w-2xl font-light leading-relaxed text-center">
                {stepData.subtitle}
              </p>
            )}
          </div>

          {/* Dynamic Grid Options with Micro Stagger */}
          <div
            className={`grid gap-4 sm:gap-5 mb-8 ${
              stepData.options.length === 2
                ? 'grid-cols-1 md:grid-cols-2'
                : stepData.options.length === 3
                ? 'grid-cols-1 md:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            }`}
          >
            {stepData.options.map((opt) => (
              <StepCard
                key={opt.id}
                option={opt}
                isSelected={currentSelection.includes(opt.value)}
                onSelect={() => handleToggle(opt.value)}
                isHeroVisualStep={stepData.id === 3}
                isDesignStyleStep={stepData.id === 4}
                isMultiSelect={stepData.isMultiSelect}
              />
            ))}
          </div>

          {/* Optional Custom Slogan Input for Step 2 */}
          {stepData.hasCustomInput && currentSelection.includes('custom_slogan') && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8 p-6 rounded-3xl luxury-glass border border-gold/40"
            >
              <label className="block text-xs uppercase tracking-widest text-gold-light mb-2 font-medium">
                Özel Slogan / Karşılama Cümleniz
              </label>
              <textarea
                value={localCustomSlogan}
                onChange={handleCustomSloganChange}
                placeholder="Örn: 'Boğazın en seçkin yalılarını, güven ve gizlilik prensibiyle doğru alıcıyla buluşturuyoruz.'"
                rows={3}
                className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-gold focus:ring-1 focus:ring-gold/50 text-sm text-architectural-white placeholder-architectural-subtle/50 outline-none resize-none transition-all"
                autoFocus
              />
            </motion.div>
          )}

          {/* Action & Navigation Bar (Same Row for Back & Next) */}
          <div className="flex items-center justify-between gap-4 pt-6 border-t border-white/5">
            {/* Back Button (only when step > 1) */}
            <div>
              {currentStepIndex > 1 && onBack && (
                <motion.button
                  type="button"
                  onClick={onBack}
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-5 sm:px-6 py-3.5 rounded-full flex items-center justify-center gap-2.5 text-xs uppercase tracking-luxury font-medium text-architectural-muted hover:text-gold bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-gold/30 transition-all duration-300 backdrop-blur-md cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-gold-light" />
                  <span>Geri Dön</span>
                </motion.button>
              )}
            </div>

            {/* Next Step Button with Tactile Feedback */}
            <button
              onClick={onNext}
              disabled={!canProceed}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-full flex items-center justify-center gap-3 text-xs uppercase tracking-luxury font-semibold transition-all duration-500 ${
                canProceed
                  ? 'bg-gradient-to-r from-gold via-gold-shimmer to-gold-bronze text-obsidian shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-white/5 border border-white/5 text-architectural-subtle cursor-not-allowed opacity-50'
              }`}
            >
              <span>{stepData.id === 7 ? 'Analizi Tamamla & Raporu Gör' : 'Onayla & Sonraki Adım'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
