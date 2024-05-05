import { FieldCell } from "../types/FieldCell";

function generateRandomEmptyCell(arrayOfEmptyCells: FieldCell[]) {
  const minCeiled = Math.ceil(0);
  const maxFloored = Math.floor(arrayOfEmptyCells.length);
  let randomIndex = Math.floor(
    Math.random() * (maxFloored - minCeiled) + minCeiled
  );
  return arrayOfEmptyCells[randomIndex];
}

export default generateRandomEmptyCell;
