export type PlayedBy = "Player" | "AI" | "Empty";

export interface FieldCell {
  isSelected: boolean;
  playedBy: PlayedBy;
  id: number;
  moveCount: number;
}
