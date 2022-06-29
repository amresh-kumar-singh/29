import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import ImageListItem from "@mui/material/ImageListItem";
import useTurn from "../hooks/useTurn";
import { GameState } from "../context/game";

import "./component.css";
import playersArr from "../utils/playersArr";

export default function Hand({ player }) {
  const { initialPlayer, table, players, gameCards } = GameState();
  const turn = useTurn();
  const [error, setError] = useState(false);

  const handleClick = (player, item) => {
    setError(false);
    //ErrorDuring Development
    //Hand.jsx:37  Uncaught TypeError: Cannot read properties of null (reading '1')
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
        : gameCards.length === 32
        ? gameCards.slice(player * 8, player * 8 + 8)
        : []
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
