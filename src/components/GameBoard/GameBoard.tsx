import { useEffect, useState } from "react";

import generateRandomEmptyCell from "../../utils/generateRandomEmptyCell";
import { FieldCell, PlayedBy } from "../../types/FieldCell";
import checkWinCondition from "../../utils/checkWinCondition";

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

  const handleAIMove = (arrayAfterPlayerMove: FieldCell[]) => {
    const emptyCells = arrayAfterPlayerMove.filter((cell) => !cell.isSelected);
    const AIMove = generateRandomEmptyCell(emptyCells);

    const cellsAfterAIMove: FieldCell[] = arrayAfterPlayerMove.map(
      (cell, index) => {
        if (AIMove.id === index) {
          return {
            isSelected: true,
            playedBy: "AI" as PlayedBy,
            id: AIMove.id,
            moveCount: 3,
          };
        }

        return cell;
      }
    );

    return cellsAfterAIMove;
  };

  const handleCellClick = (i: number) => {
    if (gameFields[i].isSelected) {
      return;
    }

    const playerMove = handlePlayerMove(i);
    const playerWon = checkWinCondition(playerMove, "Player");

    if (playerWon) {
      setGameFields(playerMove);
      return;
    }

    const aiMove = handleAIMove(playerMove);
    const aiWon = checkWinCondition(aiMove, "AI");

    if (aiWon) {
      setGameFields(aiMove);
      return;
    } else {
      setGameFields(aiMove);
    }
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
