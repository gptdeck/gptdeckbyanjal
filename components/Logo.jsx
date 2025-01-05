"use client";

import React from "react";
import claudeLogo from "@/public/assets/logos/claude.png";
import geminiLogo from "@/public/assets/logos/gemini.png";
import chatgptLogo from "@/public/assets/logos/chatgpt.png";
import preplexityLogo from "@/public/assets/logos/perplexity.png";
import { motion } from "framer-motion";
import Image from "next/image";
const Logo = () => {
  return (
    <div>
      <div className="w-96">
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)]">
          <motion.div
            className="flex gap-14 flex-none pr-14"
            animate={{ translateX: "-50%" }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
              repeatType: "loop",
            }}
          >
            <Image src={claudeLogo} className="logo-png" />
            <Image src={chatgptLogo} className="logo-png" />
            <Image src={geminiLogo} className="logo-png" />
            <Image src={preplexityLogo} className="logo-png" />

            <Image src={claudeLogo} className="logo-png" />
            <Image src={chatgptLogo} className="logo-png" />
            <Image src={geminiLogo} className="logo-png" />
            <Image src={preplexityLogo} className="logo-png" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
