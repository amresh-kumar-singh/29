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
import { useEffect, useRef, useState } from "react";
import PlayerAvatar from "./PlayerAvatar";
import useDevice from "../hooks/useDevice";

import Fullscreen from "./Controls/Fullscreen";
import PWA from "./Controls/PWA";
import Color from "./Color";
import useSave from "../hooks/useSave";
import usePair from "../hooks/usePair";
import useBotColor from "../hooks/useBotColor";
import playersArr from "../utils/playersArr";

const Game = () => {
  const {
    gameCards,
    players,
    call,
    color: [, colorCard],
    setColor,
  } = GameState();
  const [displayAuction, setDisplayAuction] = useState(0);
  const [seventh, setSeventh] = useState(null);
  const [currentBidder, setCurrentBidder] = useState(null);
  const timerRef = useRef();

  const deal = useDeal();
  const shuffle = useShuffle();
  const deviceType = useDevice();
  const { colorType, colorPicker, clearBotColor } = useBotColor();
  usePair();
  useSave(); //for development disabled it

  const handleShuffle = () => {
    shuffle();
  };

  const handleDeal = () => {
    setDisplayAuction(deal());
  };
  // Automatically deal when color card is set
  useEffect(() => {
    if (colorCard) {
      gameCards.length === 16 && deal();
      clearBotColor();
      setCurrentBidder(null);
    }
  }, [colorCard]);

  useEffect(() => {
    if (
      displayAuction === 0 &&
      call.call > 16 &&
      colorCard === "7th" &&
      players[playersArr[call.caller]].length === 8
    ) {
      let colorPlayerCards = players[playersArr[call.caller]];
      // let filteredCard = colorPlayerCards.filter((item, i) => i !== 6);
      let color = colorPlayerCards[6];
      setSeventh(color);
      setColor((prev) => [prev[0], `2${color[1]}`]);
      timerRef.current = setTimeout(() => {
        setSeventh(null);
      }, 1500);
      // setPlayers((prev) => ({
      //   ...prev,
      //   [playersArr[call.caller]]: filteredCard,
      // }));
    }
  }, [players[playersArr[call.caller]]]);
  return (
    <GameThemeProvider>
      <Box sx={{ position: "relative", height: "100vh", width: "100vw" }}>
        {/* Development */}
        {[1, 2, 3].map((item) => {
          return <Hand player={item} key={item} seventh={seventh} />;
        })}
        {/* Production */}
        <Hand player={0} seventh={seventh} />;
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
          // disabled={gameCards.length === 0 }
          disabled={gameCards.length !== 32}
        >
          Deal
        </Button>
        {deviceType === "Mobile" && <Fullscreen />}
        <PWA />
        <Scoreboard />
        <PlayerAvatar orientation="north" currentBidder={currentBidder} />
        <PlayerAvatar orientation="east" currentBidder={currentBidder} />
        <PlayerAvatar orientation="west" currentBidder={currentBidder} />
        {displayAuction === 1 && (
          <Auction
            setDisplayAuction={setDisplayAuction}
            colorPicker={colorPicker}
            setCurrentBidder={setCurrentBidder}
          />
        )}
        {displayAuction === 2 && (
          <Color setDisplayAuction={setDisplayAuction} colorType={colorType} />
        )}
      </Box>
    </GameThemeProvider>
  );
};

export default Game;
