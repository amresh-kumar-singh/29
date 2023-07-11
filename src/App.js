import "./App.css";
import Game from "./Components/Game";
import Online from "./Components/Controls/Online";
import GameProvider from "./context/game";
import Start from "./Start";
import { useState } from "react";
import PWA from "./Components/Controls/PWA";

function App() {
  const [startGame, setStartGame] = useState(false);
  //1
  return (
    <div className="App">
      <Online />
      <PWA />
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
