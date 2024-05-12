import cn from "classnames";

import { FieldCell } from "../../types/FieldCell";

import "./GameField.scss";

interface IGameFieldProps {
  onCellClick: (i: number) => void;
  index: number;
  cellState: FieldCell;
}

const GameField: React.FC<IGameFieldProps> = ({
  onCellClick,
  index,
  cellState,
}) => {
  if (cellState.moveCount === 0) {
    return (
      <div
        onClick={() => onCellClick(index)}
        className="gameboard__gamefield gamefield"
      ></div>
    );
  }

  return (
    <div
      onClick={() => onCellClick(index)}
      className={cn("gameboard__gamefield gamefield", {
        "active-gamefield-cross": cellState.playedBy === "Player",
        "active-gamefield-circle": cellState.playedBy === "AI",
        "active-gamefield-transparent": cellState.moveCount === 1,
      })}
    ></div>
  );
};

export default GameField;
