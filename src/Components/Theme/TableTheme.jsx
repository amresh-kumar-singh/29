import { List, ListItem, ListItemButton, Typography } from "@mui/material";
import gradient from "../../utils/gradient";
import { ThemeState } from "../../context/theme";

const TableTheme = () => {
  const { theme, setTheme } = ThemeState();

  return (
    <List sx={{ display: "flex", flexDirection: "column", padding: 0 }}>
      {Object.entries(gradient).map(([name, color], index) => (
        <ListItem key={name} sx={{ padding: "3px" }}>
          <ListItemButton
            sx={{
              backgroundImage: `linear-gradient(${color})`,
              display: "flex",
              justifyContent: "space-between",
            }}
            onClick={() =>
              setTheme((prev) => {
                return { ...prev, table: color };
              })
            }
          >
            <Typography sx={{ mixBlendMode: "diffrent" }}>
              {name.replaceAll("_", " ")}
            </Typography>
            {theme.table === color && (
              <Typography
                variant="h5"
                sx={{ fontWeight: "500", color: "white" }}
              >
                ✓
              </Typography>
            )}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default TableTheme;
