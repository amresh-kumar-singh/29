import React, { useEffect, useRef, useState } from "react";
import Stack from "@mui/material/Stack";
import ImageListItem from "@mui/material/ImageListItem";
import useTurn from "../hooks/useTurn";
import { GameState } from "../context/game";

import "./component.css";
import playersArr from "../utils/playersArr";
import useBot from "../hooks/useBot";

export default function Hand({ player }) {
  const { initialPlayer, table, players, gameCards, currentPlayer } =
    GameState();
  const timer = useRef();
  const turn = useTurn();
  const [error, setError] = useState(false);
  const bot = useBot();
  // useEffect(() => {
  //   console.log("inside bot useffect", currentPlayer, initialPlayer, table);
  //   if (
  //     currentPlayer !== 0 &&
  //     table !== undefined &&
  //     players[playersArr[currentPlayer]].length !== 0 &&
  //     !table[currentPlayer]
  //   ) {
  //     console.log(currentPlayer);
  //     timer.current = setTimeout(() => {
  //       bot(currentPlayer);
  //     }, 1500);
  //   }
  //   return () => clearTimeout(timer.current);
  //   //what if current player is same as initial player
  // }, [currentPlayer]);

  const handleClick = (player, item) => {
    setError(false);
    if (table[initialPlayer]) {
      if (
        players[playersArr[player]].some(
          (item) => item[1] === table[initialPlayer][1]
        )
      ) {
        if (item[1] === table[initialPlayer][1]) {
          turn(player, item);
        } else {
          setError(true);
        }
      } else {
        turn(player, item);
      }
    } else {
      if (player === initialPlayer) {
        turn(player, item);
      }
      // console.log("not Your turn: ", playersArr[player]);
    }
  };

  return (
    <Stack
      direction={"row"}
      className={"player-" + playersArr[player]}
      sx={{
        zIndex: "2",
        // ...rotate[playersArr[player]],
      }}
    >
      {(players[playersArr[player]].length
        ? players[playersArr[player]]
        : gameCards.slice(player * 8, player * 8 + 8)
      ).map((item) => (
        <ImageListItem
          key={item}
          className={
            error && item && item[1] === table[initialPlayer][1]
              ? "alert-border"
              : ""
          }
        >
          <img
            src={`cards/Game/${item}.png`}
            alt={item}
            onClick={() => handleClick(player, item)}
          />
        </ImageListItem>
      ))}
    </Stack>
  );
}
