import { Button } from "@mui/material";
import { useEffect } from "react";
import "./App.css";
import Game from "./Components/Game";
import GameProvider from "./context/game";
import useDevice from "./hooks/useDevice";
import useOrientation from "./hooks/useOrientaion";
import useWindowResize from "./hooks/useWindowResize";

function App() {
  const { lock, unlock } = useOrientation();
  const windowSize = useWindowResize();
  const deviceType = useDevice();

  const handlePortrait = () => {
    console.log(windowSize.height, windowSize.width);
    if (windowSize.height > windowSize.width) {
      console.log("locking");
      lock("landscape");
    }
  };
  return (
    <div className="App">
      <GameProvider>
        {deviceType === "Mobile" && windowSize.height > windowSize.width ? (
          <Button onClick={handlePortrait}>Please Rotate Screen</Button>
        ) : (
          <Game />
        )}
      </GameProvider>
    </div>
  );
}

export default App;
