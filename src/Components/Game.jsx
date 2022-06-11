import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Hand from "./Hand";
import GameTable from "./GameTable/GameTable";
import TableStyle from "./GameTable/TableStyle";
import GameThemeProvider from "../context/theme";
import { GameState } from "../context/game";
import useShuffle from "../hooks/useShuffle";

import useDeal from "../hooks/useDeal";
import Scoreboard from "./Scoreboard";
import Auction from "./Auction";
import { useState } from "react";

const Game = () => {
  const { gameCards, players } = GameState();
  const deal = useDeal();
  const shuffle = useShuffle();
  const [displayAuction, setDisplayAuction] = useState(0);

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
        <TableStyle />

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

        <Scoreboard />

        {displayAuction === 1 && (
          <Auction setDisplayAuction={setDisplayAuction} />
        )}
      </Box>
    </GameThemeProvider>
  );
};

export default Game;
