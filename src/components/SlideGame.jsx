import React, { useState } from "react";
import { useNavAllowed } from "../context/NavAllowedProvider";

const SlideGame = () => {
  const [blocks, setBlocks] = useState([4, 1, 3, 2, 0, 5]); // 0 represents the empty space
  const { isNavAllowed, toggleNavAllowed } = useNavAllowed();

  const gridSize = 3; // 3x2 grid

  const checkWin = (arr) => {
    return JSON.stringify(arr) === JSON.stringify([1, 2, 3, 4, 5, 0]);
  };

  const handleClick = (index) => {
    const emptyIndex = blocks.indexOf(0);
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const emptyRow = Math.floor(emptyIndex / gridSize);
    const emptyCol = emptyIndex % gridSize;

    // Check if the clicked block is adjacent to the empty space
    const isAdjacent =
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow);

    if (isAdjacent) {
      const newBlocks = [...blocks];
      [newBlocks[index], newBlocks[emptyIndex]] = [
        newBlocks[emptyIndex],
        newBlocks[index],
      ]; // Swap
      setBlocks(newBlocks);

      if (checkWin(newBlocks)) {
        toggleNavAllowed();
      }
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center">
      {isNavAllowed ? (
        <></>
      ) : (
        <>
          <div className="grid grid-cols-3 w-[120px] h-[80px]">
            {blocks.map((block, index) => (
              <div
                key={index}
                className={`box transition-all ${
                  block === 0
                    ? "bg-transparent"
                    : block === 1
                    ? "bg-dark text-light-100"
                    : block === 2
                    ? "bg-berry"
                    : block === 3
                    ? "bg-blue"
                    : block === 4
                    ? "bg-red"
                    : "bg-green"
                }`}
                onClick={() => handleClick(index)}
              >
                {block !== 0 && block}
              </div>
            ))}
          </div>
          <p className="font-mono text-xs">
            <span className="inline-block text-red -translate-y-2">*</span>
            Slide me right to the good stuff!
          </p>
        </>
      )}
    </div>
  );
};

export default SlideGame;
