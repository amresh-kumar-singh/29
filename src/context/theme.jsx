import { createContext, useContext } from "react";
import useStorage from "../hooks/useStorage";
import gradient from "../utils/gradient";

const Context = createContext();

export default function GameThemeProvider({ children }) {
  const [theme, setTheme] = useStorage("29-card-game", {
    table: gradient.Dusty_Grass,
    card: "one",
    scoreboard: {
      background: "292826",
      color: "F9D342",
    },
  });

  return (
    <Context.Provider value={{ theme, setTheme }}>{children}</Context.Provider>
  );
}

export function ThemeState() {
  return useContext(Context);
}
