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
import usePair from "../hooks/usePair";
import useBotColor from "../hooks/useBotColor";
import playersArr from "../utils/playersArr";
import cards from "../utils/cards";
import StartGame from "./StartGame";
import ExitGame from "./ExitGame";

const Game = ({ setStartGame }) => {
  const {
    gameCards,
    players,
    call,
    color: [, colorCard],
    setColor,
  } = GameState();
  const [start, setStart] = useState(false);
  const [suffleCount, setSuffleCount] = useState(false);
  const timer = useRef();
  const [displayAuction, setDisplayAuction] = useState(0);
  const [seventh, setSeventh] = useState(null);
  const [currentBidder, setCurrentBidder] = useState(null);
  const timerRef = useRef();

  const deal = useDeal();
  const shuffle = useShuffle();
  const deviceType = useDevice();
  const { colorType, colorPicker, clearBotColor } = useBotColor();
  usePair();

  const handleShuffle = () => {
    setStart(true);
    if (gameCards.length !== 32) return;
    const rand =
      JSON.stringify(gameCards) === JSON.stringify(cards.game)
        ? 5
        : (Math.random() * 5 + 1) | 0;
    setSuffleCount(rand);
  };

  useEffect(() => {
    if (suffleCount >= 0 && suffleCount !== false && gameCards.length === 32) {
      shuffle();
      setSuffleCount((prev) => prev - 1);
    }
    if (suffleCount === -1 && gameCards.length === 32) {
      timer.current = setTimeout(() => {
        handleDeal();
      }, 500);
    }
    return () => clearTimeout(timer.current);
    // eslint-disable-next-line
  }, [suffleCount]);

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
    if (!colorCard && gameCards.length === 32) {
      setStart(false);
    }
    // eslint-disable-next-line
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
    // eslint-disable-next-line
  }, [players[playersArr[call.caller]]]);

  return (
    <GameThemeProvider>
      <Box sx={{ position: "relative", height: "100vh", width: "100vw" }}>
        {/* Production */}
        {start && gameCards.length !== 32 && (
          <Hand player={0} seventh={seventh} />
        )}
        <GameTable />
        <Theme />

        {/* Start Game */}
        {!start && <StartGame handleShuffle={handleShuffle} />}
        <ExitGame setStartGame={setStartGame} />
        {deviceType === "Mobile" && <Fullscreen />}
        <PWA />
        <Scoreboard />
        <PlayerAvatar orientation="north" currentBidder={currentBidder} />
        <PlayerAvatar orientation="east" currentBidder={currentBidder} />
        <PlayerAvatar orientation="west" currentBidder={currentBidder} />
        <PlayerAvatar orientation="south" currentBidder={currentBidder} />
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
