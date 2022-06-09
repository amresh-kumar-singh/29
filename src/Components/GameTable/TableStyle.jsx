import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import StyleIcon from "@mui/icons-material/Style";

import Accord from "../Theme/Accord";
import { Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ThemeState } from "../../context/theme";
import "./button.css";

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
        <button
          className="button noselect"
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
        </button>
        <Drawer anchor="right" open={state} onClose={() => setState(false)}>
          {/* {list()} */}
          <Button sx={{}} onClick={toggleDrawer()} endIcon={<CloseIcon />}>
            Table Theme
          </Button>
          <Divider />
          <Accord setTheme={setTheme} />
        </Drawer>
      </React.Fragment>
    </div>
  );
}
