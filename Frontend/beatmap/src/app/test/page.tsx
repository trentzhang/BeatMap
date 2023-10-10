"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Card = ({ content = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
      animate={{ opacity: 1, rotate: 0, scale: 1 }}
      exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
        width: "300px",
        margin: "16px",
      }}
    >
      {content}
    </motion.div>
  );
};

const AnimatedCardContainer = () => {
  const [cardContent, setCardContent] = useState("Card 1");

  const changeCardContent = () => {
    // Change the content for demonstration
    setCardContent(`Card ${Math.floor(Math.random() * 100)}`);
  };

  return (
    <div>
      <button onClick={changeCardContent}>Change Card Content</button>
      <AnimatePresence mode="wait">
        <Card key={cardContent} content={cardContent} />
      </AnimatePresence>
    </div>
  );
};

export default AnimatedCardContainer;
