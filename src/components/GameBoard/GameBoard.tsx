import { useEffect, useState } from "react";

import generateRandomEmptyCell from "../../utils/generateRandomEmptyCell";
import { FieldCell, PlayedBy } from "../../types/FieldCell";

import GameField from "../GameField/GameField";

import "./GameBoard.scss";

const NUMBER_OF_FIELDS = 9;

const INITIAL_CELL: Omit<FieldCell, "id"> = {
  isSelected: false,
  playedBy: "Empty",
  moveCount: 0,
};

const GameBoard = () => {
  const [gameFields, setGameFields] = useState<FieldCell[]>([]);

  useEffect(() => {
    const newArray: FieldCell[] = Array(NUMBER_OF_FIELDS)
      .fill(false)
      .map((_, index) => {
        return {
          ...INITIAL_CELL,
          id: index,
        };
      });

    setGameFields(newArray);
  }, []);

  const handleCellClick = (i: number) => {
    if (gameFields[i].isSelected) {
      return;
    }

    const playerMove = gameFields.map((cell, index) => {
      if (index === i) {
        return {
          ...cell,
          isSelected: true,
          playedBy: "Player" as PlayedBy,
          moveCount: 3,
        };
      } else if (cell.moveCount === 1) {
        return { ...INITIAL_CELL, id: cell.id };
      } else if (cell.moveCount > 0) {
        return { ...cell, moveCount: cell.moveCount - 1 };
      }
      return cell;
    });

    const emptyCells = playerMove.filter((cell) => !cell.isSelected);
    const AIMove = generateRandomEmptyCell(emptyCells);

    if (!AIMove) {
      setGameFields(playerMove);
      return;
    }

    const finallArray: FieldCell[] = playerMove.map((cell, index) => {
      if (AIMove.id === index) {
        return {
          isSelected: true,
          playedBy: "AI" as PlayedBy,
          id: AIMove.id,
          moveCount: 3,
        };
      }

      return cell;
    });

    setGameFields(finallArray);
  };

  return (
    <div className="gameboard">
      {gameFields.map((cell, index) => (
        <GameField
          key={index}
          onCellClick={handleCellClick}
          index={index}
          cellState={cell}
        />
      ))}
    </div>
  );
};

export default GameBoard;
