import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Code2, Zap } from 'lucide-react';

const HomePage: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      // In a real app, you might want to encode the prompt or use a state management solution
      navigate('/editor', { state: { prompt } });
    }
  };

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
    <div className="min-h-screen flex flex-col dark:bg-dark-bg">
      <header className="border-b dark:border-dark-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-extrabold tracking-tight">AI Buddy</h1>
          </div>
          <span className="text-sm text-muted-foreground min-h-[1.5rem]">
            {displayedText}
          </span>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="hover:text-primary transition-colors">Docs</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">Examples</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">About</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-3xl w-full text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Build websites with natural language
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Describe what you want, and we'll generate the code for you.
          </p>

          <form onSubmit={handleSubmit} className="w-full">
            <div className="relative">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the website you want to build..."
                className="w-full p-4 pr-12 rounded-lg border dark:border-dark-border bg-white dark:bg-dark-surface focus:outline-none focus:ring-2 focus:ring-primary text-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary-dark text-white p-2 rounded-md transition-colors"
                disabled={!prompt.trim()}
              >
                <Zap className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
          <FeatureCard
            icon={<Sparkles className="h-8 w-8 text-primary" />}
            title="AI-Powered"
            description="Our advanced AI understands your requirements and generates appropriate code."
          />
          <FeatureCard
            icon={<Code2 className="h-8 w-8 text-primary" />}
            title="Real-time Editing"
            description="View and edit the generated code in real-time with our Monaco editor."
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8 text-primary" />}
            title="Instant Preview"
            description="See your website come to life instantly as you make changes."
          />
        </div>
      </main>

      <footer className="border-t dark:border-dark-border py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© 2025 AI Budy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="p-6 rounded-lg border dark:border-dark-border bg-white dark:bg-dark-surface">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default HomePage;