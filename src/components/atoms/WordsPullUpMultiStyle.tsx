import { useRef } from 'react';
import { motion, useInView, useReducedMotion, type Variants } from 'framer-motion';

interface WordsPullUpMultiStyleSegment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: WordsPullUpMultiStyleSegment[];
}

const WordsPullUpMultiStyle = ({ segments }: WordsPullUpMultiStyleProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const prefersReducedMotion = useReducedMotion();

  const container: Variants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    show: { opacity: 1, transition: { staggerChildren: prefersReducedMotion ? 0 : 0.08 } }
  };

  const item: Variants = {
    hidden: { y: prefersReducedMotion ? 0 : 20, opacity: prefersReducedMotion ? 1 : 0 },
    show: { y: 0, opacity: 1, transition: { duration: prefersReducedMotion ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      className="inline-flex flex-wrap justify-center"
    >
      {segments.map((segment, segIdx) => {
        const words = segment.text.split(" ");
        return words.map((word, wIdx) => (
          <motion.span
            key={`${segIdx}-${wIdx}`}
            variants={item}
            className={`inline-block mr-[0.2em] mb-[0.1em] ${segment.className || ""}`}
          >
            {word}
          </motion.span>
        ));
      })}
    </motion.div>
  );
};

export default WordsPullUpMultiStyle;