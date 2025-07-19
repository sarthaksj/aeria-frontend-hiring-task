import React, { useState, useEffect } from "react";
import BoxInputForm from "./BoxInputForm";
import BoxGrid from "./BoxGrid";
import CShapeGrid from "./CShapeGrid";

const BoxGenerator: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [boxCount, setBoxCount] = useState(0);
  const [selectedBoxes, setSelectedBoxes] = useState<Set<number>>(new Set());
  const [isResetting, setIsResetting] = useState(false);
  const [useCShape, setUseCShape] = useState(false);

  const handleGenerate = () => {
    const number = parseInt(inputValue, 10);
    if (isNaN(number) || number < 5 || number > 25) {
      setError("Please enter a valid number between 5 and 25.");
      setBoxCount(0);
      setSelectedBoxes(new Set());
    } else {
      setError("");
      setBoxCount(number);
      setSelectedBoxes(new Set());
    }
  };

  const handleBoxClick = (index: number) => {
    if (isResetting || selectedBoxes.has(index)) return;
    setSelectedBoxes((prev) => new Set([...prev, index]));
  };

  useEffect(() => {
    if (selectedBoxes.size === boxCount && boxCount > 0) {
      setIsResetting(true);
      const order = Array.from(selectedBoxes).reverse();

      const interval = setInterval(() => {
        if (order.length) {
          const currentBox = order.shift();
          setSelectedBoxes((prev) => {
            const updated = new Set(prev);
            if (currentBox !== undefined) updated.delete(currentBox);
            return updated;
          });
        } else {
          clearInterval(interval);
          setIsResetting(false);
        }
      }, 1000);
    }
  }, [selectedBoxes, boxCount]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <BoxInputForm
        inputValue={inputValue}
        error={error}
        isResetting={isResetting}
        onInputChange={setInputValue}
        onGenerate={handleGenerate}
      />
      <div className="flex items-center gap-2 mb-2">
        <input
          type="checkbox"
          id="c-shape-toggle"
          checked={useCShape}
          onChange={(e) => setUseCShape(e.target.checked)}
        />
        <label htmlFor="c-shape-toggle">Use C Shape</label>
      </div>
      {useCShape ? (
        <CShapeGrid
          count={boxCount}
          selected={selectedBoxes}
          onBoxClick={handleBoxClick}
        />
      ) : (
        <BoxGrid
          count={boxCount}
          selected={selectedBoxes}
          onBoxClick={handleBoxClick}
        />
      )}
    </div>
  );
};

export default BoxGenerator;
