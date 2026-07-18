import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import AnimatedLetter from './AnimatedLetter';

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

const ScrollRevealText = ({ text, className = "" }: ScrollRevealTextProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2']
  });

  const chars = text.split("");
  return (
    <p ref={ref} className={className}>
      {chars.map((char, i) => (
        <AnimatedLetter key={i} char={char} index={i} total={chars.length} scrollYProgress={scrollYProgress} />
      ))}
    </p>
  );
};

export default ScrollRevealText;