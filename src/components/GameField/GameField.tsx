import cn from "classnames";

import "./GameField.scss";

interface IGameFieldProps {
  onCellClick: (i: number) => void;
  index: number;
  cellState: boolean;
}

const GameField: React.FC<IGameFieldProps> = ({
  onCellClick,
  index,
  cellState,
}) => {
  return (
    <div
      onClick={() => onCellClick(index)}
      className={cn("gameboard__gamefield gamefield", {
        "active-gamefield-cross": cellState,
      })}
    ></div>
  );
};

export default GameField;
