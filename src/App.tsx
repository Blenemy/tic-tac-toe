import { useState } from "react";

import GameBoard from "./components/GameBoard/GameBoard";

import "./styles/_reset.scss";
import "./App.scss";

function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="tic-tac-toe">
          {gameStarted ? (
            <GameBoard />
          ) : (
            <button
              onClick={handleStartGame}
              className="tic-tac-toe__start-button"
            >
              Start the game
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
