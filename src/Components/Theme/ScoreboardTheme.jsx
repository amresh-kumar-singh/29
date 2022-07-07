import { List, ListItem, Typography } from "@mui/material";
import { ThemeState } from "../../context/theme";
import { scoreboard } from "../../utils/theme";

const ScoreboardTheme = () => {
  const { theme, setTheme } = ThemeState();

  return (
    <List sx={{ margin: "0 15px" }}>
      {Object.entries(scoreboard).map(([name, style], i) => {
        return (
          <ListItem
            key={i}
            style={{
              justifyContent: "space-between",
              padding: "10px",
              background: "#" + style.background,
              borderBottom: "1px solid white",
              cursor: "pointer",
            }}
            onClick={() =>
              setTheme((prev) => {
                return {
                  ...prev,
                  scoreboard: {
                    background: style.background,
                    color: style.color,
                  },
                };
              })
            }
          >
            <Typography sx={{ color: "#" + style.color }}>
              Score Board {name}
            </Typography>
            {theme.scoreboard.background === style.background && (
              <Typography style={{ color: "#" + style.color }}>
                &#x2713;
              </Typography>
            )}
          </ListItem>
        );
      })}
    </List>
  );
};
export default ScoreboardTheme;
