import { useEffect, useState } from "react";

import GameBoard from "./components/GameBoard/GameBoard";

import "./styles/_reset.scss";

function App() {
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="app">
      <div className="app__container">
        <div className="app__content">
          <div className="gamefield">
            <button
              onClick={handleStartGame}
              className="gamefield__start-button"
            >
              Start the game
            </button>
            {gameStarted ? <GameBoard /> : <div>123</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
