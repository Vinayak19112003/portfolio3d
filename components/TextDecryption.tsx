import React, { useEffect, useState } from 'react';

interface TextDecryptionProps {
  text: string;
  className?: string;
  reveal?: boolean;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export const TextDecryption: React.FC<TextDecryptionProps> = ({ text, className = "", reveal = true }) => {
  const [outputText, setOutputText] = useState("");

  useEffect(() => {
    if (!reveal) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setOutputText(
        text
          .split("")
          .map((_letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text, reveal]);

  return <span className={className}>{outputText}</span>;
};