import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { GameState } from "../context/game";

const itemData = ["2C", "2D", "2S", "2H", "red_joker"];

export default function Color({ setDisplayAuction }) {
  const { setColor } = GameState();
  const handleColor = (item) => {
    setColor(item);
    setDisplayAuction(0);
    console.log("color", item);
  };
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
      <span
        style={{
          background: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "500",
          borderRadius: "3px",
          border: "1px solid grey",
          cursor: "pointer",
        }}
        onClick={() => handleColor("7")}
      >
        <span>
          <p style={{ fontWeight: "800", fontSize: "xx-large", margin: 0 }}>
            7<sup style={{ fontWeight: "400" }}>th</sup>
          </p>
          <p style={{ margin: 0 }}> Card</p>
        </span>
      </span>
    </ImageList>
  );
}
