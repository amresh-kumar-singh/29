import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TableTheme from "./TableTheme";
import CardTheme from "./CardTheme";
import ScoreboardTheme from "./ScoreboardTheme";
import Avatar from "./Avatar";
import RadioControl from "./RadioControl";

export default function Accord() {
  const [expanded, setExpanded] = React.useState("");
  const [value, setValue] = React.useState(0);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Table Theme</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableTheme />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Card Themes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CardTheme />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Scoreoard theme</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0, margin: 0 }}>
          <ScoreboardTheme />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography>Avatar</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0, margin: 0, width: "inherit" }}>
          <RadioControl value={value} setValue={setValue} />

          <Avatar value={value} setValue={setValue} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
