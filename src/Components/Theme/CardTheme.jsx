import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import { cardsPattern } from "../../utils/theme";

import "../Cards/cardStyle.css";
import "./theme.css";
import { ThemeState } from "../../context/theme";

const CardTheme = () => {
  const { theme, setTheme } = ThemeState();
  return (
    <List
      sx={{
        height: "55vh",
        width: "20vw",
        display: "grid",
        padding: "revert",
        gridTemplateColumns: "repeat(3, 1fr)",
      }}
      className="wrapper card-theme"
    >
      {Object.entries(cardsPattern).map(([key, name], index) => (
        <ListItem sx={{ padding: "3px" }} key={key}>
          <div
            className={`pattern close ${key} card-theme-item`}
            onClick={() =>
              setTheme((prev) => {
                return { ...prev, card: key };
              })
            }
          >
            <div
              className="title"
              style={{
                fontSize: "75%",
                borderRadius: "initial",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                height: theme.card === key ? "100%" : "25%",
              }}
            >
              {name} {theme.card === key && <p>{"\n"}✓</p>}
            </div>
          </div>
        </ListItem>
      ))}
    </List>
  );
};

export default CardTheme;
