import { Loader, Sparkles } from 'lucide-react'
import React, { FC } from 'react'

interface StepsSectionProps {
  steps: any
  prompt: string
}

const StepsSection: FC<StepsSectionProps> = ({ steps, prompt }) => {
  return (
    <div className="w-1/4 border-l dark:border-dark-border overflow-y-auto">
      <div className="p-3 border-b dark:border-dark-border">
        <h2 className="font-medium">Execution Steps</h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Prompt: "{prompt}"
        </p>
      </div>
      <div className="p-4 max-h-[550px] overflow-auto">
        {steps.map((step: any, index: number) => (
          <div key={index} className="mb-4">
            <div className="flex items-center space-x-2">
              <div className={`h-5 w-5 rounded-full flex items-center justify-center text-xs ${step.status === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-gray-700'}`}>
                {step.status === 'completed' ? <Sparkles /> : <Loader />}
              </div>
              <span className={`font-medium ${step.status === 'completed' ? 'text-green-500' : ''}`}>
                {step.title}
              </span>
            </div>
            {step.status === 'completed' && (
              <div className="ml-7 mt-1 text-sm text-gray-500 dark:text-gray-400">
                Completed successfully
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default StepsSection