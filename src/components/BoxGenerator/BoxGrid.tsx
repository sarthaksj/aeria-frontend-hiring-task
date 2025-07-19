import React from "react";

interface BoxGridProps {
  count: number;
  selected: Set<number>;
  onBoxClick: (index: number) => void;
}

const BoxGrid: React.FC<BoxGridProps> = ({ count, selected, onBoxClick }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(50px,1fr))] gap-1 sm:gap-1.5 md:gap-2 mt-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          onClick={() => onBoxClick(index)}
          className={`aspect-square cursor-pointer transition-colors duration-300 ${
            selected.has(index) ? "bg-green-500" : "bg-red-500"
          }`}
        />
      ))}
    </div>
  );
};

export default BoxGrid;
