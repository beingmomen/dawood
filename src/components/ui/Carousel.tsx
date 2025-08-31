import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface CarouselProps {
  items: any[];
  renderItem: (item: any, index: number) => React.ReactNode;
  slidesToShow?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
}

const Carousel: React.FC<CarouselProps> = ({
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
    direction: 'rtl', // إضافة دعم RTL
    breakpoints: {
      '(max-width: 768px)': { slidesToScroll: 1 },
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
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex" dir="rtl">
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex-none w-full md:w-1/2 lg:w-1/3 px-4`}
              style={{ minWidth: 0 }}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons - تم تعديل المواضع للـ RTL */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
        className="absolute top-1/2 -translate-y-1/2 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-brand hover:bg-brand hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
        className="absolute top-1/2 -translate-y-1/2 left-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-brand hover:bg-brand hover:text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-reverse space-x-2">
        {Array.from({ length: Math.ceil(items.length / slidesToShow) }).map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
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