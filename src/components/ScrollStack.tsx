import React, { useLayoutEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';

export interface ScrollStackItemProps {
  itemClassName?: string;
  children: ReactNode;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({ children, itemClassName = '' }) => (
  <div
    className={`scroll-stack-card relative w-full h-80 p-12 rounded-[40px] shadow-[0_0_30px_rgba(0,0,0,0.1)] box-border origin-top will-change-transform ${itemClassName}`.trim()}
    style={{ backfaceVisibility: 'hidden', transformStyle: 'preserve-3d' }}
  >
    {children}
  </div>
);

interface ScrollStackProps {
  className?: string;
  children: ReactNode;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
  scaleDuration?: number;
  rotationAmount?: number;
  blurAmount?: number;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = '15%',
  scaleEndPosition = '10%',
  baseScale = 0.85,
  scaleDuration = 0.5,
  rotationAmount = 0,
  blurAmount = 0,
  onStackComplete,
}) => {
  // scrollerRef: the overflow:hidden container that we manually scroll
  const scrollerRef = useRef<HTMLDivElement>(null);
  // cardsWrapperRef: the div directly wrapping the cards — wheel events here are intercepted
  const cardsWrapperRef = useRef<HTMLDivElement>(null);

  const stackCompletedRef = useRef(false);
  const cardsRef = useRef<HTMLElement[]>([]);
  const lastTransformsRef = useRef(new Map<number, any>());
  const isUpdatingRef = useRef(false);

  const calculateProgress = useCallback((scrollTop: number, start: number, end: number) => {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value as string);
  }, []);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;
    const scroller = scrollerRef.current;
    if (!scroller) return;

    isUpdatingRef.current = true;

    const scrollTop = scroller.scrollTop;
    const containerHeight = scroller.clientHeight;
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const scaleEndPositionPx = parsePercentage(scaleEndPosition, containerHeight);
    const endElement = scroller.querySelector('.scroll-stack-end') as HTMLElement | null;
    const endElementTop = endElement ? endElement.offsetTop : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = card.offsetTop;
      const triggerStart = cardTop - stackPositionPx - itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = baseScale + i * itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = rotationAmount ? i * rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < cardsRef.current.length; j++) {
          const jTriggerStart = cardsRef.current[j].offsetTop - stackPositionPx - itemStackDistance * j;
          if (scrollTop >= jTriggerStart) topCardIndex = j;
        }
        if (i < topCardIndex) blur = Math.max(0, (topCardIndex - i) * blurAmount);
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;
      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + itemStackDistance * i;
      }

      const newT = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const last = lastTransformsRef.current.get(i);
      const changed = !last ||
        Math.abs(last.translateY - newT.translateY) > 0.1 ||
        Math.abs(last.scale - newT.scale) > 0.001 ||
        Math.abs(last.rotation - newT.rotation) > 0.1 ||
        Math.abs(last.blur - newT.blur) > 0.1;

      if (changed) {
        card.style.transform = `translate3d(0, ${newT.translateY}px, 0) scale(${newT.scale}) rotate(${newT.rotation}deg)`;
        card.style.filter = newT.blur > 0 ? `blur(${newT.blur}px)` : '';
        lastTransformsRef.current.set(i, newT);
      }

      if (i === cardsRef.current.length - 1) {
        const inView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (inView && !stackCompletedRef.current) { stackCompletedRef.current = true; onStackComplete?.(); }
        else if (!inView && stackCompletedRef.current) { stackCompletedRef.current = false; }
      }
    });

    isUpdatingRef.current = false;
  }, [itemScale, itemStackDistance, stackPosition, scaleEndPosition, baseScale, rotationAmount, blurAmount, onStackComplete, calculateProgress, parsePercentage]);

  useLayoutEffect(() => {
    const scroller = scrollerRef.current;
    const cardsWrapper = cardsWrapperRef.current;
    if (!scroller || !cardsWrapper) return;

    const cards = Array.from(scroller.querySelectorAll('.scroll-stack-card')) as HTMLElement[];
    cardsRef.current = cards;
    const transformsCache = lastTransformsRef.current;

    cards.forEach((card, i) => {
      if (i < cards.length - 1) card.style.marginBottom = `${itemDistance}px`;
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
    });

    updateCardTransforms();

    // ─── THE KEY FIX ───────────────────────────────────────────────────────────
    // Wheel events are captured ONLY on the cardsWrapper div.
    // This means scrolling anywhere outside the cards div is never intercepted.
    const onCardWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = scroller;
      const atTop = scrollTop <= 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1;

      // At a limit? Let the event go to the page (do NOT prevent default)
      if ((e.deltaY > 0 && atBottom) || (e.deltaY < 0 && atTop)) {
        return;
      }

      // Still have room to scroll cards — consume the event
      e.preventDefault();
      e.stopPropagation();
      scroller.scrollTop += e.deltaY;
      updateCardTransforms();
    };

    // non-passive so we can preventDefault; only on cardsWrapper — NOT window
    cardsWrapper.addEventListener('wheel', onCardWheel, { passive: false });

    // Keep transforms in sync when the scroller scrolls (e.g. via touch)
    const onScroll = () => updateCardTransforms();
    scroller.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cardsWrapper.removeEventListener('wheel', onCardWheel);
      scroller.removeEventListener('scroll', onScroll);
      stackCompletedRef.current = false;
      cardsRef.current = [];
      transformsCache.clear();
      isUpdatingRef.current = false;
    };
  }, [itemDistance, itemScale, itemStackDistance, stackPosition, scaleEndPosition, baseScale, scaleDuration, rotationAmount, blurAmount, onStackComplete, updateCardTransforms]);

  return (
    <div
      ref={scrollerRef}
      className={`relative w-full h-full ${className}`.trim()}
      style={{
        // ALWAYS hidden — we drive scrollTop manually via JS.
        // This means the container NEVER captures native scroll events.
        overflowY: 'hidden',
        overflowX: 'visible',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <div className="scroll-stack-inner px-6 md:px-2 pb-[26rem] min-h-screen max-w-5xl mx-auto">
        {/* Wheel events only intercepted here, not on the whole scroller */}
        <div ref={cardsWrapperRef} style={{ pointerEvents: 'auto' }}>
          {children}
        </div>
        <div className="scroll-stack-end w-full h-px" />
      </div>
    </div>
  );
};

export default ScrollStack;
