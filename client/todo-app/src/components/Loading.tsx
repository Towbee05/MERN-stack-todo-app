import { useEffect, useState } from 'react';

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
}

const Loading = ({ message = "Loading...", fullScreen = true }: LoadingProps) => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const dotString = '.'.repeat(dots);

  return (
    <div className={`flex flex-col items-center justify-center ${fullScreen ? 'min-h-screen' : 'py-20'} bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300`}>
      <div className="relative">
        {/* Animated circles */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-blue-200 dark:bg-blue-900 animate-ping"></div>
          <div className="absolute inset-2 rounded-full bg-blue-500 dark:bg-blue-600 animate-pulse"></div>
          <div className="absolute inset-4 rounded-full bg-white dark:bg-slate-200 animate-bounce"></div>
        </div>

        {/* Checkmark animation */}
        <div className="absolute -top-2 -right-2">
          {/* <div className="w-10 h-10 border-4 border-green-500 rounded-full animate-spin border-t-transparent"></div> */}
        </div>
      </div>

      {/* Text with animated dots */}
      <p className="text-lg font-medium text-slate-700 dark:text-slate-300 mt-6">
        {message}
        <span className="inline-block w-4">{dotString}</span>
      </p>

      {/* Progress bar */}
      <div className="w-64 h-2 bg-slate-200 dark:bg-slate-700 rounded-full mt-4 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-[progressBar_2s_ease-in-out_infinite]"></div>
      </div>

      {/* Optional tips */}
      <div className="mt-8 text-sm text-slate-500 dark:text-slate-400 text-center max-w-md px-4">
        <p className="animate-pulse">Tip: Organize your tasks by priority for better productivity</p>
      </div>

      {/* Style for the progress bar animation */}
      <style jsx>{`
        @keyframes progressBar {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

// Skeleton loader for content placeholders
export const SkeletonLoader = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
      <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
    </div>
  );
};

export default Loading; 