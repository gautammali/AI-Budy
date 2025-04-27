import { useEffect, useState, useRef, FC } from 'react';
import CodeLoader from './CodeLoader';
import { ErrorListener, FileSystemTree, WebContainer } from '@webcontainer/api';

interface WebContainerDemoProps {
  projectFiles: FileSystemTree | ArrayBuffer | Uint8Array<ArrayBufferLike>;
  webContainer: WebContainer | null;
}

const WebContainerDemo: FC<WebContainerDemoProps> = ({ projectFiles, webContainer }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const iframeRef = useRef<any>(null);
  const [updateMessage, setUpdateMessage] = useState<string | null>('updating...');
  const mountFiles = async () => {
    setUpdateMessage("Mounting files...");
    await webContainer?.mount(projectFiles);
    console.log("Files mounted");
    setUpdateMessage("Installing dependencies...");
    const installProcess = await webContainer?.spawn('npm', ['install', '--legacy-peer-deps', 'serve', '--no-package-lock']);
    console.log("Installing dependencies...");
    const installExitCode = await installProcess?.exit;
    if (installExitCode !== 0) {
      throw new Error(`Installation failed with exit code ${installExitCode}`);
    }
    setUpdateMessage("Dependencies installed successfully");
    console.log("Dependencies installed successfully");
  }

  const inIt = async () => {
    try {
      setLoading(true);
      await mountFiles();
      setUpdateMessage("Starting server...");
      const startProcess = await webContainer?.spawn('npm', ['run', 'dev']);
      startProcess?.output.pipeTo(new WritableStream({
        write(data) {
          (data.toString().includes('Failed') || data.toString().includes('Error')) && console.log("[Server]", data) && setError(data);
        }
      })
      );

      // Handle server-ready event

      webContainer?.on('error', (error: { message: string }) => {
        setError(error?.message)
      })

      webContainer?.on('server-ready', (port, url) => {
        console.log(`Server is ready at ${url}`);
        setUpdateMessage("Server started successfully");
        if (iframeRef.current) {
          iframeRef.current.src = url;
          setLoading(false);
        }
      });
      setUpdateMessage("Loading your preview");

    } catch (err: never | any) {
      console.error("WebContainer error:", err);
      setError(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!projectFiles) return;
    !iframeRef?.current?.src && inIt();
  }, [projectFiles]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-12 bg-gray-100 p-3 flex items-center justify-between border-b">
        <h2 className="text-lg font-medium">WebContainer Preview</h2>
        {loading && <span className="text-sm text-gray-500">Loading...</span>}
        {error && <span className="text-sm text-red-500">Error: {error}</span>}
      </div>

      <div className="flex-1 bg-white relative max-h-[90vh] overflow-auto">
        {loading && <CodeLoader updateMessage={updateMessage} />}
        <iframe
          ref={iframeRef}
          title="WebContainer Preview"
          className="w-full h-full border-none text-black"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts allow-downloads"
        />
      </div>
    </div>
  );
};

export default WebContainerDemo;