const LoaderSpinner = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-[200px]">
      <div className="w-12 h-12 border-4 border-sky-100 border-t-[#0056D2] rounded-full animate-spin" />
    </div>
  );
};

const LoaderSpinnerScreen = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <LoaderSpinner />
    </div>
  );
};

const LoaderCard = () => {
  return (
    <div className="w-full p-8 bg-white rounded-[8px] shadow-sm">
      <div className="flex items-center justify-center space-x-3">
        <div className="w-8 h-8 border-3 border-sky-100 border-t-[#0056D2] rounded-full animate-spin" />
        <span className="text-lg font-medium text-gray-600">Loading...</span>
      </div>
    </div>
  );
};

const LoaderFullscreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-sky-100 border-t-[#0056D2] rounded-full animate-spin" />
        <p className="text-xl font-medium text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

const LoaderInline = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-4 h-4 border-2 border-sky-100 border-t-[#0056D2] rounded-full animate-spin" />
      <span className="text-sm text-gray-600">Loading...</span>
    </div>
  );
};

const LoaderDots = () => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="w-3 h-3 bg-[#0056D2] rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="w-3 h-3 bg-[#0056D2] rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="w-3 h-3 bg-[#0056D2] rounded-full animate-bounce" />
    </div>
  );
};

// Export all variants
export {
  LoaderSpinner, // Simple spinner
  LoaderCard, // Spinner in a card with text
  LoaderFullscreen, // Full-screen overlay loader
  LoaderInline, // Small inline loader
  LoaderDots, // Bouncing dots animation
  LoaderSpinnerScreen, // Full screen loader
};

// Default export
export default LoaderSpinner;
