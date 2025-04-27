import { Bot, Loader } from "lucide-react"
import { FC } from "react"

const CodeLoader: FC<any> = ({ updateMessage }) => {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-900 bg-opacity-90">
      <div className="relative flex flex-col items-center">
        {/* AI Bot Icon with glow effect */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-pulse"></div>
          <Bot className="w-12 h-12 text-blue-400 relative z-10 animate-bounce" />
        </div>

        {/* Code writing animation container */}
        <div className="bg-gray-800 rounded-lg p-4 w-64 shadow-xl border border-gray-700">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          <div className="font-mono text-sm">
            <div className="text-blue-400">
              {"function"} <span className="text-green-400">{"generateCode"}</span>
              {"() {"}
            </div>
            <div className="text-gray-300 pl-4 overflow-hidden whitespace-nowrap animate-typing">
              return AI.write(amazing_code);
            </div>
            <div className="text-blue-400">{"}"}</div>
          </div>
          <div className="flex gap-1 font-mono text-sm">
            <Loader className="animate-spin" />
            <div className="text-gray-300 pl-4 overflow-hidden whitespace-nowrap">
              {updateMessage}.....
            </div>
          </div>
        </div>

        {/* Loading text */}
        <p className="mt-6 text-blue-300 font-medium">
          AI is crafting your code
          <span className="animate-ellipsis">...</span>
        </p>
      </div>
    </div>
  )
}

export default CodeLoader

