import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";

import { Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeState } from "../context/theme";
import { lazy } from "react";
const Accord = lazy(() => import("./Theme/Accord"));

export default function TableStyle() {
  const { setTheme } = ThemeState();
  const [state, setState] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState((prev) => !prev);
  };

  return (
    <div>
      <React.Fragment>
        <Button
          variant="contained"
          onClick={toggleDrawer()}
          // variant="contained"
          // endIcon={<StyleIcon />}
          style={{
            display: state && "none",
            position: "absolute",
            right: "1%",
            top: "1%",
            zIndex: 3,
          }}
        >
          Theme
        </Button>
        <Drawer anchor="right" open={state} onClose={() => setState(false)}>
          <Button sx={{}} onClick={toggleDrawer()} endIcon={<CloseIcon />}>
            Theme
          </Button>
          <Divider />
          <React.Suspense fallback="<div>Loading...</div>">
            <Accord setTheme={setTheme} />
          </React.Suspense>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
