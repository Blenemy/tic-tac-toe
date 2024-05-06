import { FieldCell } from "../types/FieldCell";

const STARTING_INDEX = 0;

function generateRandomEmptyCell(arrayOfEmptyCells: FieldCell[]): FieldCell {
  const minCeiled = Math.ceil(STARTING_INDEX);
  const maxFloored = Math.floor(arrayOfEmptyCells.length);
  const randomIndex = Math.floor(
    Math.random() * (maxFloored - minCeiled) + minCeiled
  );

  return arrayOfEmptyCells[randomIndex];
}

export default generateRandomEmptyCell;
