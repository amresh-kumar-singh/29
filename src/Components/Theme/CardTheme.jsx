import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import cardsPattern from "../../utils/cardsPattern";

import "../Cards/cardStyle.css";
import { ThemeState } from "../../context/theme";

const selected = {};

const CardTheme = () => {
  const { theme, setTheme } = ThemeState();
  return (
    <List
      sx={{
        display: "flex",
        height: "55vh",
        width: "20vw",
        display: "grid",
        // padding: "3px",
        gridTemplateColumns: "repeat(3, 1fr)",
      }}
      className="wrapper"
    >
      {Object.entries(cardsPattern).map(([key, name], index) => (
        <ListItem sx={{ padding: "3px" }}>
          {/* <div
            className="wrapper"
            key={index}
            // style={{ width: "40px", height: "70px" }}
          > */}
          <div
            className={`pattern close ${key}`}
            style={{ height: "12vh" }}
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
          {/* </div> */}
        </ListItem>
      ))}
    </List>
  );
};

export default CardTheme;
