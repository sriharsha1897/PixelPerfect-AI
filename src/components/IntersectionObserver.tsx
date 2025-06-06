
"use client";

import { useEffect, useRef, useState } from 'react';

interface IntersectionObserverProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
}

const IntersectionObserverComponent: React.FC<IntersectionObserverProps> = ({
  children,
  threshold = 0.1,
  rootMargin = "0px",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once it's visible, we can stop observing
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, rootMargin]);

  return (
    <div 
      ref={ref} 
      className={`animate-on-scroll ${isVisible ? 'visible' : ''}`}
    >
      {children}
    </div>
  );
};

export default IntersectionObserverComponent;
