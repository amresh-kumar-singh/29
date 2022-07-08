import { useEffect, useState } from "react";

import("./start.css");
function Start({ setStartGame }) {
  const [themeStatus, setThemeStatus] = useState(
    localStorage.getItem("29-card-game")
  );
  const [gameStatus, setGameStatus] = useState(
    localStorage.getItem("29-card-game_game")
  );

  const handleNewGame = () => {
    localStorage.removeItem("29-card-game_game");
    setGameStatus(true);
  };
  const handleResetTheme = () => {
    localStorage.removeItem("29-card-game");
    setThemeStatus(null);
  };
  useEffect(() => {
    gameStatus === true && setStartGame(true);
    // eslint-disable-next-line
  }, [gameStatus]);
  return (
    <div className="start">
      <main>
        {gameStatus && (
          <button className="btn" onClick={() => setStartGame(true)}>
            <span>Resume</span>
          </button>
        )}
        <button className="btn" onClick={handleNewGame}>
          New Game
        </button>
        {themeStatus && (
          <button className="btn" onClick={handleResetTheme}>
            Reset Theme
          </button>
        )}
        {/* <button className="btn">Help</button>
        <button className="btn">Credits</button> */}
      </main>
    </div>
  );
}

export default Start;
