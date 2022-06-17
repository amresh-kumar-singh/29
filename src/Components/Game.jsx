import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Hand from "./Hand";
import GameTable from "./GameTable/GameTable";
import Theme from "./Theme";
import GameThemeProvider from "../context/theme";
import { GameState } from "../context/game";
import useShuffle from "../hooks/useShuffle";

import useDeal from "../hooks/useDeal";
import Scoreboard from "./Scoreboard";
import Auction from "./Auction";
import { useState } from "react";
import PlayerAvatar from "./PlayerAvatar";

import useDevice from "../hooks/useDevice";
import useFullScreen from "../hooks/useFullScreen";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const Game = () => {
  const { gameCards, players } = GameState();
  const deal = useDeal();
  const shuffle = useShuffle();
  const [displayAuction, setDisplayAuction] = useState(0);
  const { fullscreen, exitFullscreen } = useFullScreen();
  const [screenStatus, setScreenStatus] = useState(false);
  const deviceType = useDevice();

  const handleScreenStatus = () => {
    if (screenStatus) {
      setScreenStatus(false);
      exitFullscreen();
    } else {
      setScreenStatus(true);
      fullscreen("landscape");
    }
  };
  const handleShuffle = () => {
    shuffle();
  };

  const handleDeal = () => {
    setDisplayAuction(deal());
  };

  return (
    <GameThemeProvider>
      <Box sx={{ position: "relative", height: "100vh", width: "100vw" }}>
        {[0, 1, 2, 3].map((item) => {
          return <Hand player={item} key={item} />;
        })}

        <GameTable />
        <Theme />

        <Button
          variant="contained"
          onClick={handleShuffle}
          sx={{ zIndex: 3, margin: "20px" }}
          disabled={gameCards.length === 0 || players.south.length > 0}
        >
          Shuffle
        </Button>

        <Button
          variant="contained"
          onClick={handleDeal}
          sx={{ zIndex: 3 }}
          disabled={gameCards.length === 0}
        >
          Deal
        </Button>

        {deviceType === "Mobile" && (
          <Button
            variant="contained"
            onClick={handleScreenStatus}
            color="secondary"
            size="large"
            sx={{ position: "absolute", top: "12%", right: "1%" }}
          >
            {screenStatus ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </Button>
        )}

        <Scoreboard />
        <PlayerAvatar imgSrc="g2" orientation="north" />
        <PlayerAvatar imgSrc="g3" orientation="east" />
        <PlayerAvatar imgSrc="g4" orientation="west" />

        {displayAuction === 1 && (
          <Auction setDisplayAuction={setDisplayAuction} />
        )}
      </Box>
    </GameThemeProvider>
  );
};

export default Game;
