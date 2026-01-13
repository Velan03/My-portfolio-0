import { useState, useEffect } from 'react';

interface UseTypewriterProps {
  words: string[];
  loop?: boolean;
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenWords?: number;
}

export const useTypewriter = ({
  words,
  loop = true,
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetweenWords = 2000,
}: UseTypewriterProps) => {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    if (isWaiting) {
      const waitTimer = setTimeout(() => {
        setIsWaiting(false);
        setIsDeleting(true);
      }, delayBetweenWords);
      return () => clearTimeout(waitTimer);
    }

    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (loop ? (prev + 1) % words.length : Math.min(prev + 1, words.length - 1)));
      } else {
        const deleteTimer = setTimeout(() => {
          setText(text.slice(0, -1));
        }, deleteSpeed);
        return () => clearTimeout(deleteTimer);
      }
    } else {
      if (text === currentWord) {
        setIsWaiting(true);
      } else {
        const typeTimer = setTimeout(() => {
          setText(currentWord.slice(0, text.length + 1));
        }, typeSpeed);
        return () => clearTimeout(typeTimer);
      }
    }
  }, [text, wordIndex, isDeleting, isWaiting, words, loop, typeSpeed, deleteSpeed, delayBetweenWords]);

  return { text, isTyping: !isWaiting && !isDeleting };
};
