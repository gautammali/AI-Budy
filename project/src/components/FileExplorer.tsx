import { FolderOpen, Settings } from 'lucide-react'
import React, { FC } from 'react'
import FileTree from '../pages/FileTree'

interface FileExplorerProps {
  files: any
  handleFileSelect: any
  selectedFile: any
}

const FileExplorer: FC<FileExplorerProps> = ({ files, handleFileSelect, selectedFile }) => {
  return (
    <div className="w-1/5 border-r dark:border-dark-border overflow-y-auto max-h-[90vh] overflow-auto">
      <div className="p-3 border-b dark:border-dark-border flex justify-between items-center">
        <div className="flex items-center space-x-1">
          <FolderOpen className="h-4 w-4 text-primary" />
          <h2 className="font-medium">Files</h2>
        </div>
        <button className="text-gray-500 hover:text-primary">
          <Settings className="h-4 w-4" />
        </button>
      </div>
      <div className="p-2">
        <FileTree files={files} handleFileSelect={handleFileSelect} selectedFile={selectedFile} />
      </div>
    </div>
  )
}

export default FileExplorer