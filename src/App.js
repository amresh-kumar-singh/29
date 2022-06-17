import { Button, IconButton } from "@mui/material";
import "./App.css";
import Game from "./Components/Game";
import GameProvider from "./context/game";

function App() {
  return (
    <div className="App">
      <GameProvider>
        <Game />
      </GameProvider>
    </div>
  );
}

export default App;
