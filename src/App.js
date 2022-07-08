import "./App.css";
import Game from "./Components/Game";
import Online from "./Components/Controls/Online";
import GameProvider from "./context/game";
import Start from "./Start";
import { useState } from "react";

function App() {
  const [startGame, setStartGame] = useState(false);
  return (
    <div className="App">
      <Online />
      {!startGame ? (
        <Start setStartGame={setStartGame} />
      ) : (
        <GameProvider>
          <Game setStartGame={setStartGame} />
        </GameProvider>
      )}
    </div>
  );
}

export default App;
