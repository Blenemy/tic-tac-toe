import { useEffect, useState } from "react";

import GameField from "../GameField/GameField";

import "./GameBoard.scss";

const NUMBER_OF_FIELDS = 9;

const GameBoard = () => {
  const [gameFields, setGameFields] = useState<boolean[]>([]);

  useEffect(() => {
    const newArray = Array(NUMBER_OF_FIELDS).fill(false);
    setGameFields(newArray);
  }, []);

  const handleCellClick = (i: number) => {
    const modifiedArray = gameFields.map((item, index) =>
      index === i ? true : item
    );

    setGameFields(modifiedArray);
  };

  return (
    <div className="gameboard">
      {gameFields.map((cellState, index) => (
        <GameField
          key={index}
          onCellClick={handleCellClick}
          index={index}
          cellState={cellState}
        />
      ))}
    </div>
  );
};

export default GameBoard;
