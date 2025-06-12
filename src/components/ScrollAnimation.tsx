import { useEffect, useRef, type ReactNode } from 'react';
import '../styles/ScrollAnimation.css';

interface ScrollAnimationProps {
  children: ReactNode;
  animationClass?: string;
  threshold?: number;
  delay?: number;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animationClass = 'fade-in',
  threshold = 0.2,
  delay = 0
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const currentElement = elementRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          // Añadir timeout para el delay
          setTimeout(() => {
            if (elementRef.current) {
              elementRef.current.classList.add('animated', animationClass);
              hasAnimated.current = true;
            }
          }, delay);
          
          // Una vez que se anima, ya no necesitamos observar
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      { threshold }
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [animationClass, threshold, delay]);

  return (
    <div ref={elementRef} className="scroll-animation">
      {children}
    </div>
  );
};

export default ScrollAnimation;
