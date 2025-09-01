import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Carousel = ({
  items,
  renderItem,
  slidesToShow = 3,
  autoplay = false,
  autoplayDelay = 3000,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    direction: 'rtl',
    breakpoints: {
      '(max-width: 640px)': { slidesToScroll: 1 },
      '(max-width: 1024px)': { slidesToScroll: 1 },
    },
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!autoplay || !emblaApi) return;
    
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [emblaApi, autoplay, autoplayDelay]);

  return (
    <div className="relative overflow-hidden">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex" dir="rtl">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-none w-full sm:w-1/2 lg:w-1/3 px-2 sm:px-3 lg:px-4 min-w-0"
              style={{ minWidth: 0 }}
            >
              <div className="w-full min-w-0 h-full">
                {renderItem(item, index)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
        className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-brand hover:bg-brand hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
        className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-brand hover:bg-brand hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
      </motion.button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 sm:mt-6 lg:mt-8 space-x-reverse space-x-2 overflow-hidden">
        {Array.from({ length: Math.ceil(items.length / slidesToShow) }).map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 flex-shrink-0 ${
              index === Math.floor(selectedIndex / slidesToShow)
                ? 'bg-brand scale-125'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;