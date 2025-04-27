import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Code, Eye, File } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { ActionType, xmlParser } from '../Utils';
import useWebContainer from '../hooks/useWebContainer';
import { DirectoryNode, FileSystemTree, WebContainerProcess } from '@webcontainer/api';
import PreviewSection from '../components/PreviewSection';
import StepsSection from '../components/StepsSection';
import EditorHeader from '../components/EditorHeader';
import FileExplorer from '../components/FileExplorer';
import CodeLoader from '../components/CodeLoader';
const { REACT_APP_API_URL } = { REACT_APP_API_URL: "http://localhost:3002" }

interface File {
  id: number;
  name: string;
  language: string;
  path: string;
  content: string;
}

const EditorPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [steps, setSteps] = useState([]);
  const [selectedFile, setSelectedFile] = useState({} as File);
  const [code, setCode] = useState('');
  const [prompt, setPrompt] = useState('');
  const [view, setView] = useState<'code' | 'preview'>('code');
  const webContainer = useWebContainer();
  const [projectFiles, setProjectFiles] = useState<FileSystemTree>({});
  const [updateMessage, setUpdateMessage] = useState<string | null>('updating...');

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    // Get the prompt from location state
    const locationState = location.state as { prompt?: string } | null;
    if (locationState?.prompt) {
      setPrompt(locationState.prompt);
      getTemplate(locationState.prompt);
    } else {
      // If no prompt is provided, redirect back to home
      navigate('/');
    }
  }, [location, navigate]);


  const getCodeBasedOnTemplate = async (data: any[], _prompt: string) => {
    try {

      if (!_prompt) {
        return;
      }

      setUpdateMessage('getting you template')
      const result = await fetch(`${REACT_APP_API_URL}/chat`, {
        method: 'POST',
        body: JSON.stringify({ prompt: [...data, _prompt] }),
        headers: { 'Content-Type': 'application/json' }
      })
      const reader = await result.json();
      setUpdateMessage('setting up code files')
      const parseXml: any = xmlParser(reader?.text);
      setSteps(parseXml);
      setFiles(setFilePathData(parseXml));
      setSteps((prev: any) => prev.map((step: any) => ({ ...step, status: 'completed' })));
      setLoader((prev) => !prev);
      return true;
    } catch (error) {
      console.log(error);
      setLoader((prev) => !prev);
      return false;
    }
  };

  const getTemplate = async (prompt: string) => {
    setUpdateMessage('update code inside the files')
    const res = await fetch(`${REACT_APP_API_URL}/template`, {
      body: JSON.stringify({ prompt: prompt }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json();
    await getCodeBasedOnTemplate(data, prompt);
  }

  function convertToFileSystemTree(files: { path: string; content: string | Uint8Array }[]): FileSystemTree {
    const fileSystemTree: FileSystemTree = {};
    setUpdateMessage('setting up files')
    files.forEach(file => {
      const pathParts = file.path.split('/'); // Split the path into parts
      let currentDir: FileSystemTree = fileSystemTree; // Start at the root

      pathParts.forEach((part, index) => {
        if (index === pathParts.length - 1) {
          // If it's the last part, it's a file
          currentDir[part] = { file: { contents: file.content } };
        } else {
          // If it's a directory, ensure it exists
          if (!currentDir[part]) {
            currentDir[part] = { directory: {} };
          }
          currentDir = (currentDir[part] as DirectoryNode).directory;
        }
      });
    });

    return fileSystemTree;
  }

  useEffect(() => {
    if (!files.length) return;
    const originalFiles = files;
    const projectFiles: FileSystemTree = convertToFileSystemTree(originalFiles);
    console.log(projectFiles);
    setProjectFiles(projectFiles);
  }, [files]);


  const setFilePathData = (parsedData: any[]) => {
    return parsedData.reduce((acc, data, index: number) => {
      if (data.type === ActionType.CreateFile || data.type === ActionType.ModifyFile) {
        const file = {
          id: index + 1,
          name: data.filePath.split('/')?.pop(),
          languages: '',
          path: data.filePath,
          content: data.code
        }
        return [...acc, file]
      }
      return acc
    }, [])
  }

  const handleFileSelect = (file: typeof files[0]) => {
    if (!files.length) return;
    setSelectedFile(file);
    setCode(file.content);
  };

  const handleCodeChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
      // Update the file content in the files array
      setFiles(files.map(f =>
        f.id === selectedFile.id ? { ...f, content: value } : f
      ));
    }
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-dark-bg">
      <EditorHeader />
      {!files.length && <FileLoader />}
      <div className="flex-1 flex">
        <FileExplorer files={files} handleFileSelect={handleFileSelect} selectedFile={selectedFile} />
        <div className="w-[55%] flex flex-col">
          <div className="p-3 border-b dark:border-dark-border flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-medium">{selectedFile.name}</span>
              <span className="text-xs text-gray-500 dark:text-gray-400">({selectedFile.language})</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="bg-gray-200 dark:bg-dark-surface rounded-md flex overflow-hidden">
                <button
                  onClick={() => setView('code')}
                  className={`px-3 py-1 text-sm flex items-center space-x-1 ${view === 'code' ? 'bg-primary text-white' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                >
                  <Code className="h-4 w-4" />
                  <span>Code</span>
                </button>
                <button
                  onClick={() => setView('preview')}
                  className={`px-3 py-1 text-sm flex items-center space-x-1 ${view === 'preview' ? 'bg-primary text-white' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
                >
                  <Eye className="h-4 w-4" />
                  <span>Preview</span>
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
            {loader ? (
              <div className="absolute inset-0">
                <CodeLoader updateMessage={updateMessage} />
              </div>
            ) : view === "code" ? (
              <Editor
                height="85vh"
                language={selectedFile.language}
                value={code}
                onChange={handleCodeChange}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            ) : (
              <div className="h-full w-full bg-white">
                <PreviewSection projectFiles={projectFiles} webContainer={webContainer} />
              </div>
            )}
          </div>
        </div>
        <StepsSection steps={steps} prompt={prompt} />
      </div>
    </div>
  );
};

export default EditorPage;


const FileLoader = () => {
  return (
    <div className="h-full flex items-center justify-center bg-black">
      <div className="text-gray-300 pl-4 overflow-hidden whitespace-nowrap min-w-64 animate-typing">
        Generating the project files...
      </div>
    </div>
  )
}