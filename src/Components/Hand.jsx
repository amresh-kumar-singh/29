import * as React from "react";
import Stack from "@mui/material/Stack";
import ImageListItem from "@mui/material/ImageListItem";
import { GameState } from "../context/game";

export default function Hand({ style, cards, setSouth, south }) {
  // console.log("cards:", cards);
  const { setTable } = GameState();
  console.log("style: ", style);
  const handleTurn = (item) => {
    console.log(item);
    setTable((prev) => [...prev, item]);
    setSouth((prev) => prev.filter((ele) => ele !== item));
  };

  return (
    <Stack
      direction={"row"}
      sx={{
        width: "55%",
        zIndex: "2",
        ...style,
      }}
    >
      {cards.map((item) => (
        <ImageListItem key={item}>
          <img
            src={`cards/Game/${item}.png`}
            alt={item}
            onClick={() => handleTurn(item)}
          />
        </ImageListItem>
      ))}
    </Stack>
  );
}
