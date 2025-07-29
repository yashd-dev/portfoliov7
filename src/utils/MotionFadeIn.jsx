
import { motion } from "motion/react";

export default function MotionFadeIn({
  children,
  delay = 0.2,    // default delay in seconds
  duration = 1.8, // default duration (transition time)
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay,
        duration,
      }}
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
