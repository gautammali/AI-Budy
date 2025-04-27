export const basePrompt = `
    Project Files:\\n\\nThe following is a list of all project files and their complete contents that are currently visible and accessible to you.\\n\\neslint.config.js:\\n\\\`\\\`\\\`\\nimport js from '@eslint/js'; 
import globals from 'globals'; 
import reactHooks from 'eslint-plugin-react-hooks'; 
import reactRefresh from 'eslint-plugin-react-refresh'; 
import tseslint from 'typescript-eslint'; 

export default tseslint.config(
  { ignores: ['dist'] }, 
  { 
    extends: [js.configs.recommended, ...tseslint.configs.recommended], 
    files: ['**/*.{ts,tsx}'], 
    languageOptions: { 
      ecmaVersion: 2020, 
      globals: globals.browser, 
    }, 
    plugins: { 
      'react-hooks': reactHooks, 
      'react-refresh': reactRefresh, 
    }, 
    rules: { 
      ...reactHooks.configs.recommended.rules, 
      'react-refresh/only-export-components': [
        'warn', 
        { allowConstantExport: true }, 
      ], 
    }, 
  }
); 
\\\`\\\`\\\`\\n\\nindex.html:\\n\\\`\\\`\\\`\\n<!DOCTYPE html>\\n<html lang="en">\\n  <head>\\n    <meta charset="UTF-8" />\\n    <link rel="icon" type="image/svg+xml" href="/vite.svg" />\\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\\n    <title>Vite + React + TS</title>\\n  </head>\\n  <body>\\n    <div id="root"></div>\\n    <script type="module" src="/src/main.tsx"></script>\\n  </body>\\n</html>\\n\\\`\\\`\\\`\\n\\npackage.json:\\n\\\`\\\`\\\`\\n{
  "name": "vite-react-typescript-starter",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.344.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.1",
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.18",
    "eslint": "^9.9.1",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.11",
    "globals": "^15.9.0",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.3.0",
    "vite": "^5.4.2"
  }
}\\n\\\`\\\`\\\`\\n\\npostcss.config.js:\\n\\\`\\\`\\\`\\nexport default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};\\n\\\`\\\`\\\`\\n\\nsrc/App.tsx:\\n\\\`\\\`\\\`\\nimport React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p>Start prompting (or editing) to see magic happen :)</p>
    </div>
  );
}

export default App;\\n\\\`\\\`\\\`\\n\\nsrc/index.css:\\n\\\`\\\`\\\`\\n@tailwind base;
@tailwind components;
@tailwind utilities;\\n\\\`\\\`\\\`\\n\\nsrc/main.tsx:\\n\\\`\\\`\\\`\\nimport { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);\\n\\\`\\\`\\\`\\n\\nsrc/vite-env.d.ts:\\n\\\`\\\`\\\`\\n/// <reference types="vite/client" />\\n\\\`\\\`\\\`\\n\\ntailwind.config.js:\\n\\\`\\\`\\\`\\n/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};\\n\\\`\\\`\\\`\\n\\ntsconfig.app.json:\\n\\\`\\\`\\\`\\n{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}\\n\\\`\\\`\\\`\\n\\ntsconfig.json:\\n\\\`\\\`\\\`\\n{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}\\n\\\`\\\`\\\`\\n\\ntsconfig.node.json:\\n\\\`\\\`\\\`\\n{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}\\n\\\`\\\`\\\`\\n\\nvite.config.ts:\\n\\\`\\\`\\\`\\nimport { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});\\n\\\`\\\`\\\`\\n\\nHere is a list of files that exist on the file system but are not being shown to you:\\n\\n  - .gitignore\\n  - package-lock.json\\n  - .bolt/prompt
`;
