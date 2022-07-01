import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { GameState } from "../context/game";
import useBotColor from "../hooks/useBotColor";
import { useEffect } from "react";

const itemData = ["2C", "2D", "2S", "2H", "red_joker", "7th"];

export default function Color({ setDisplayAuction, colorType }) {
  const { setColor, setTable, call } = GameState();
  // const { colorType } = useBotColor();
  useEffect(() => {
    if (call.caller !== 0) {
      let item = colorType(call.caller);
      console.log("colorby", call.caller);
      handleColor(item);
    }
  }, []);
  function handleColor(item) {
    setColor((prev) => [prev[0], item]);
    setDisplayAuction(0);
    setTable([]);
    console.log("color", item);
  }
  return (
    <ImageList
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
      cols={3}
      gap={0}
    >
      {itemData.map((item) => (
        <ImageListItem key={item}>
          <img
            alt={item}
            src={`cards/Score/${item}.png`}
            loading="lazy"
            style={{
              height: "16vmin",
              objectFit: "contain",
              cursor: "pointer",
            }}
            onClick={() => {
              handleColor(item);
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
