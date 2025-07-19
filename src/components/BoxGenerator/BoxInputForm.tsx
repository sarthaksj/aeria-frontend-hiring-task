import React from "react";

interface BoxInputFormProps {
  inputValue: string;
  error: string;
  isResetting: boolean;
  onInputChange: (value: string) => void;
  onGenerate: () => void;
}

const BoxInputForm: React.FC<BoxInputFormProps> = ({
  inputValue,
  error,
  isResetting,
  onInputChange,
  onGenerate,
}) => {
  return (
    <div className="flex items-center gap-4 mb-2">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Enter a number (5–25)"
        className="border border-gray-300 rounded px-3 py-1 w-full max-w-xs"
      />
      <button
        onClick={onGenerate}
        disabled={isResetting}
        className={`px-4 py-1 rounded text-white ${
          isResetting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        Generate Boxes
      </button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default BoxInputForm;
