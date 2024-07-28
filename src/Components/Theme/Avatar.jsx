import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { avatars } from "../../utils/theme";
import { ThemeState } from "../../context/theme";
import playersArr from "../../utils/playersArr";
import { Typography } from "@mui/material";
import "./theme.css";

export default function Avatar({ value }) {
  const { theme, setTheme } = ThemeState();
  const handleChange = (item) => {
    setTheme((prev) => {
      return {
        ...prev,
        // eslint-disable-next-line
        avatar: prev.avatar.map((ele, i) => (i == value ? item : ele)),
      };
    });
  };

  return (
    <ImageList
      className="theme-avatar"
      sx={{ width: "20vw", height: "auto", paddingLeft: "40px" }}
      cols={3}
    >
      {avatars.map((item) => (
        <ImageListItem
          key={item}
          onPointerUp={() => handleChange(item)}
          sx={{ cursor: "pointer", position: "relative" }}
        >
          <img
            src={`avatar/${item}.svg`}
            alt={item}
            loading="lazy"
            style={{ borderRadius: "50%", background: "black" }}
          />
          {(value === 0 || value) && item === theme.avatar[value] && (
            <Typography
              className="avatar-text"
              sx={{
                textAlign: "center",
                bottom: "7%",
                width: "70%",
                lineHeight: 1,
                borderRadius: "0 0 35px 35px",
              }}
            >
              {playersArr[value]}
            </Typography>
          )}
        </ImageListItem>
      ))}
    </ImageList>
  );
}
