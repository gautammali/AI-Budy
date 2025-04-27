import { useState } from "react";
import { ChevronRight, ChevronDown, FolderOpen, FileCode } from "lucide-react";


// Convert files into a tree structure
const buildTree = (files: any[]) => {
  const tree: any = {};

  files.forEach((file) => {
    const parts = file.path.split("/");
    let current = tree;

    parts.forEach((part: any, index: number) => {
      if (index === parts.length - 1) {
        current[part] = file; // Assign file object
      } else {
        current[part] = current[part] || {}; // Create folder if it doesn't exist
        current = current[part];
      }
    });
  });

  return tree;
};

const FileTree = ({ files, selectedFile, handleFileSelect }: any) => {
  const [folderState, setFolderState] = useState<{ [key: string]: boolean }>({});

  const toggleFolder = (path: string) => {
    setFolderState((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const renderFileTree = (tree: any, path = "") => {
    return Object.entries(tree).map(([key, value]: any) => {
      const currentPath = path ? `${path}/${key}` : key;

      if (typeof value === "object" && !value.content) {
        // Folder
        return (
          <div key={currentPath}>
            <div
              onClick={() => toggleFolder(currentPath)}
              className="flex items-center cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            >
              {folderState[currentPath] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              <FolderOpen className="h-4 w-4 text-primary mx-2" />
              <span>{key}</span>
            </div>
            {folderState[currentPath] && <div className="ml-5">{renderFileTree(value, currentPath)}</div>}
          </div>
        );
      } else {
        // File
        return (
          <div
            key={currentPath}
            onClick={() => handleFileSelect(value)}
            className={`flex items-center space-x-2 p-2 rounded cursor-pointer ${selectedFile?.id === value.id ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
          >
            <FileCode className="h-4 w-4 text-gray-500" />
            <span>{value.name}</span>
          </div>
        );
      }
    });
  };

  return <div className="p-4">{renderFileTree(buildTree(files))}</div>;
};

export default FileTree;
