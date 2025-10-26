
import React, { useState, useEffect } from 'react';

interface TypingAnimationProps {
  text: string;
  speed?: number;
  processingTime?: number;
}

/**
 * A blinking cursor component, styled to match the input cursor in Terminal.tsx.
 */
const BlinkingCursor: React.FC = () => (
    <span 
        className="animate-blink bg-green-400 w-2 h-4 inline-block ml-1" 
        style={{ verticalAlign: 'text-bottom' }}
    ></span>
);

const TypingAnimation: React.FC<TypingAnimationProps> = ({ text, speed = 20, processingTime = 300 }) => {
  const [showProcessing, setShowProcessing] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Reset state when the text prop changes
    setShowProcessing(true);
    setDisplayedText('');
    setIsTyping(false);

    // 1. Show "Processing..." for a short time
    const processingTimeout = setTimeout(() => {
      setShowProcessing(false);
      setIsTyping(true);
    }, processingTime);
    
    return () => clearTimeout(processingTimeout);
  }, [text, processingTime]); // Rerun if the text prop changes

  useEffect(() => {
    // 2. Once processing is done, start typing
    if (isTyping) {
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false); // Typing is complete
        }
      }, speed);
      
      return () => clearInterval(typingInterval);
    }
  }, [isTyping, text, speed]);

  // Don't render anything for commands with no string output
  if (!text) {
      return null;
  }
  
  if (showProcessing) {
    return (
      <div className="flex items-center text-gray-400">
        <span>Processing</span>
        <span className="animate-pulse">...</span>
      </div>
    );
  }

  return (
    <span>
      {displayedText}
      {isTyping && <BlinkingCursor />}
    </span>
  );
};

export default TypingAnimation;
