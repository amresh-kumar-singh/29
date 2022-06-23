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

import Fullscreen from "./Controls/Fullscreen";
import PWA from "./Controls/PWA";
import Color from "./Color";

const Game = () => {
  const { gameCards, players } = GameState();
  const deal = useDeal();
  const shuffle = useShuffle();
  const [displayAuction, setDisplayAuction] = useState(0);
  const deviceType = useDevice();

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
        {/* Suffle */}
        <Button
          variant="contained"
          onClick={handleShuffle}
          sx={{ zIndex: 3, margin: "20px" }}
          disabled={gameCards.length === 0 || players.south.length > 0}
        >
          Shuffle
        </Button>
        {/* Deal */}
        <Button
          variant="contained"
          onClick={handleDeal}
          sx={{ zIndex: 3 }}
          disabled={gameCards.length === 0}
        >
          Deal
        </Button>

        {deviceType === "Mobile" && <Fullscreen />}
        <PWA />
        <Scoreboard />
        <PlayerAvatar imgSrc="g2" orientation="north" />
        <PlayerAvatar imgSrc="g3" orientation="east" />
        <PlayerAvatar imgSrc="g4" orientation="west" />

        {displayAuction === 1 && (
          <Auction setDisplayAuction={setDisplayAuction} />
        )}

        {displayAuction === 2 && (
          <Color setDisplayAuction={setDisplayAuction} />
        )}
      </Box>
    </GameThemeProvider>
  );
};

export default Game;
