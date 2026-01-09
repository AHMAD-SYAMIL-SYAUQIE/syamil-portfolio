import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.2),
      }
    );
  }, [scope, animate, duration, filter]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="text-generate-words">
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="text-generate-word"
              style={{
                opacity: 0,
                filter: filter ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={className}>
      <div className="text-generate-container">
        {renderWords()}
      </div>
    </div>
  );
};

export default TextGenerateEffect;
