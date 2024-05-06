import { FieldCell, PlayedBy } from "../types/FieldCell";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinCondition(cells: FieldCell[], character: PlayedBy): boolean {
  for (const combo of winningCombinations) {
    if (
      combo.every(
        (index) =>
          cells[index].isSelected && cells[index].playedBy === character
      )
    ) {
      return true;
    }
  }
  return false;
}

export default checkWinCondition;
