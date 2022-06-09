import { Box } from "@mui/system";
import Hand from "./Hand";
import rotate from "../utils/rotate";
import GameTable from "./GameTable/GameTable";
import TableStyle from "./GameTable/TableStyle";
import GameThemeProvider from "../context/theme";
import { GameState } from "../context/game";
import useShuffle from "../hooks/useShuffle";
import { Button } from "@mui/material";
import { useState } from "react";
import PlayerCards from "./GameTable/PlayerCards";
import TableCards from "./GameTable/TableCards";

const Game = () => {
  const { gameCards, setGameCards } = GameState();
  const shuffle = useShuffle();
  const [round, setRound] = useState(1);
  const [south, setSouth] = useState([]);
  const [north, setNorth] = useState([]);
  const [east, setEast] = useState([]);
  const [west, setWest] = useState([]);
  const handleShuffle = () => {
    shuffle();
  };

  console.log("round: ", round);
  // console.log("south: ", south);
  // console.log("north: ", north);
  // console.log("east: ", east);
  // console.log("west: ", west);
  // console.log("game", gameCards);

  const handleDeal = () => {
    setSouth((prev) => [...prev, ...gameCards.slice(0, 4)]);
    setNorth((prev) => [...prev, ...gameCards.slice(4, 8)]);
    setEast((prev) => [...prev, ...gameCards.slice(8, 12)]);
    setWest((prev) => [...prev, ...gameCards.slice(12, 16)]);
    if (round === 1) {
      setGameCards(gameCards.slice(16));
      setRound(2);
    } else {
      setGameCards([]);
      setRound(1);
    }
  };
  return (
    <GameThemeProvider>
      <Box sx={{ position: "relative", height: "100vh", width: "100vw" }}>
        <Hand
          style={rotate.south}
          cards={south.length ? south : gameCards.slice(0, 8)}
          setSouth={setSouth}
          south={south}
        />
        <Hand
          style={rotate.north}
          cards={north.length ? north : gameCards.slice(8, 16)}
        />
        <Hand
          style={rotate.east}
          cards={east.length ? east : gameCards.slice(16, 24)}
        />
        <Hand
          style={rotate.west}
          cards={west.length ? west : gameCards.slice(24)}
        />
        <GameTable />
        <TableStyle />
        <Button
          variant="contained"
          onClick={handleShuffle}
          sx={{ zIndex: 3 }}
          disabled={gameCards.length === 0 || south.length > 0}
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
      </Box>
    </GameThemeProvider>
  );
};
export default Game;
