import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function RadioControl({ setValue, value }) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="avatar-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value={0} control={<Radio />} label="Player" />
        <FormControlLabel value={1} control={<Radio />} label="West" />
        <FormControlLabel value={2} control={<Radio />} label="North" />
        <FormControlLabel value={3} control={<Radio />} label="East" />
      </RadioGroup>
    </FormControl>
  );
}
