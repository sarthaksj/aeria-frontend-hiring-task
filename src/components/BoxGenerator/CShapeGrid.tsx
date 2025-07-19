import React from "react";

interface CShapeGridProps {
  count: number;
  selected: Set<number>;
  onBoxClick: (index: number) => void;
}

const CShapeGrid: React.FC<CShapeGridProps> = ({
  count,
  selected,
  onBoxClick,
}) => {
  if (count < 5) return null;

  const boxes: React.ReactNode[] = [];
  const rowWidth = Math.min(Math.ceil(count / 3), 5);
  const middleHeight = count - rowWidth * 2;

  let currentIndex = 0;

  // Top row
  boxes.push(
    <div key="top" className="flex gap-1 justify-start">
      {Array.from({ length: rowWidth }).map(() => {
        const index = currentIndex++;
        return (
          <div
            key={index}
            onClick={() => onBoxClick(index)}
            className={`w-12 h-12 cursor-pointer transition-colors duration-300 ${
              selected.has(index) ? "bg-green-500" : "bg-red-500"
            }`}
          />
        );
      })}
    </div>
  );

  // Middle column
  for (let i = 0; i < middleHeight; i++) {
    const index = currentIndex++;
    boxes.push(
      <div key={`mid-${i}`} className="h-12 flex items-center gap-1">
        <div
          onClick={() => onBoxClick(index)}
          className={`w-12 h-12 cursor-pointer transition-colors duration-300 ${
            selected.has(index) ? "bg-green-500" : "bg-red-500"
          }`}
        />
      </div>
    );
  }

  // Bottom row
  boxes.push(
    <div key="bottom" className="flex gap-1 justify-start">
      {Array.from({ length: rowWidth }).map(() => {
        const index = currentIndex++;
        if (index >= count) return null; // Handle overflow
        return (
          <div
            key={index}
            onClick={() => onBoxClick(index)}
            className={`w-12 h-12 cursor-pointer transition-colors duration-300 ${
              selected.has(index) ? "bg-green-500" : "bg-red-500"
            }`}
          />
        );
      })}
    </div>
  );

  return <div className="flex flex-col gap-1 mt-4">{boxes}</div>;
};

export default CShapeGrid;
