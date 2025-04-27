import { ArrowLeft, Save, Sparkles } from 'lucide-react'
import React, { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const EditorHeader: FC = () => {
  const navigate = useNavigate();

  const tagline = [
    "Build your MVP with just a prompt.",
    "Turn ideas into reality — effortlessly.",
    "Your AI partner for rapid product launches.",
  ]
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    setInterval(() => {
      setDisplayedText((prev) => tagline[currentIndex]);
      currentIndex++;
      if (currentIndex === tagline.length) currentIndex = 0
    }, 2000);
  }, []);

  return (
    <header className="border-b dark:border-dark-border">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-extrabold tracking-tight">AI Buddy</h1>
        </div>
        <span className="text-sm text-muted-foreground min-h-[1.5rem]">
          {displayedText}
        </span>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-1 text-sm hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </button>
          <button className="bg-primary hover:bg-primary-dark text-white px-3 py-1 rounded text-sm flex items-center space-x-1">
            <Save className="h-4 w-4" />
            <span>Save Project</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default EditorHeader