"use client";
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";

const Card = () => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const controls = useAnimation();


  const handleCardHeaderTap = () => {
    setIsCardOpen(!isCardOpen);

    controls.start({
      y: isCardOpen ? 0 :50,
    });
  };

  return (
    <motion.div className="card" animate={controls}>
      <motion.div className="card-header" onTap={handleCardHeaderTap}>
        {/* Your card header content */}
        Tap me to open/close!
      </motion.div>
      <motion.div className="card-content">
        {/* Your card content */}
        This is the card content.
      </motion.div>
    </motion.div>
  );
};

export default Card;
