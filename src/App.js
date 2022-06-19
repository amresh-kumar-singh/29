import "./App.css";
import Game from "./Components/Game";
import Online from "./Components/Controls/Online";
import GameProvider from "./context/game";
import Start from "./Start";

function App() {
  return (
    <div className="App">
      <GameProvider>
        <Online />
        <Game />
        {/* <Start /> */}
      </GameProvider>
    </div>
  );
}

export default App;
