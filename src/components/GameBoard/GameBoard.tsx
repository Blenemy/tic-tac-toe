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
    const startingCellsToPlay: FieldCell[] = Array(NUMBER_OF_FIELDS)
      .fill(false)
      .map((_, index) => {
        return {
          ...INITIAL_CELL,
          id: index,
        };
      });

    setGameFields(startingCellsToPlay);
  }, []);

  const handlePlayerMove = (i: number) => {
    const cellsAfterPlayersMove = gameFields.map((cell, index) => {
      if (index === i) {
        return {
          ...cell,
          isSelected: true,
          playedBy: "Player" as PlayedBy,
          moveCount: 3,
        };
      }

      if (cell.moveCount === 1) {
        return { ...INITIAL_CELL, id: cell.id };
      }

      if (cell.moveCount > 0) {
        return { ...cell, moveCount: cell.moveCount - 1 };
      }

      return cell;
    });

    return cellsAfterPlayersMove;
  };

  const handleAIMove = (arrayAfterPlayMove: FieldCell[]) => {
    const emptyCells = arrayAfterPlayMove.filter((cell) => !cell.isSelected);
    const AIMove = generateRandomEmptyCell(emptyCells);

    if (!AIMove) {
      setGameFields(arrayAfterPlayMove);
      return;
    }

    const finallArray: FieldCell[] = arrayAfterPlayMove.map((cell, index) => {
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

  const handleCellClick = (i: number) => {
    if (gameFields[i].isSelected) {
      return;
    }

    const playerMove = handlePlayerMove(i);
    handleAIMove(playerMove);
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
