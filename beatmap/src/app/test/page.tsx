"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const App = () => {
  const [isTapped, setIsTapped] = useState(false);

  const onTap = () => {
    setIsTapped(true);
  };

  useEffect(() => {
    setTimeout(() => setIsTapped(false), 1000);
  }, [isTapped]);

  return (
    <div className="flex items-center justify-center h-screen">
      <motion.div
        className=" h-20 w-20 bg-red-500 flex items-center justify-center"
        initial={{ scale: 1 }}
        whileTap={{ scale: 2 }}
        onTap={onTap}
      >
        <div>
          {isTapped && (
            <text onPointerDownCapture={(e) => e.stopPropagation()}>
              Tapped!
            </text>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default App;
