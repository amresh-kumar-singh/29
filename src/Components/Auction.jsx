import { Box, Grid, Stack, Typography } from "@mui/material";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { GameState } from "../context/game";
import useBotColor from "../hooks/useBotColor";
import playersArr from "../utils/playersArr";
import "./component.css";

let arr = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];

const Auction = ({ setDisplayAuction, colorPicker, setCurrentBidder }) => {
  const { call, setCall, dealer } = GameState();
  const [bidder, setBidder] = useState([(dealer + 1) % 4, (dealer + 2) % 4]);
  const [visited, setVisited] = useState([]);
  // const { colorPicker } = useBotColor();
  const timerRef = useRef();
  useEffect(() => {
    setCurrentBidder(bidder[0]);
  }, [bidder[0]]);

  useEffect(() => {
    if (bidder[0] !== 0) {
      const choice = colorPicker(bidder[0]);
      console.log("inside Bot effetc", choice);
      timerRef.current = setTimeout(() => {
        call.call < choice[1] && choice[1] !== 0
          ? handleCall(call.call < 17 ? 17 : call.call + 1)
          : handlePass();
      }, 1500);
    }
    return () => clearTimeout(timerRef.current);
  }, [bidder[0]]);

  const handleCall = (item) => {
    setCall((prev) => {
      return {
        ...prev,
        call: item,
        caller: bidder[0],
      };
    });
    setBidder((prev) => [prev[1], prev[0]]);
  };

  const handlePass = () => {
    //bidder[0] is one who called pass
    setVisited((prev) => [...prev, bidder[0]]);
    // console.log(bidder);
    if (bidder[0] === dealer || bidder[1] === dealer) {
      if (call.call < 16) {
        setCall({ call: 17, caller: dealer });
      }
      // Unmoundt Auction component
      // console.log("Bidding Done");
      setDisplayAuction(2);
      return;
    }
    if (call.call < 16) {
      setBidder((prev) => [bidder[1], (bidder[1] + 1) % 4]);
      return;
    }
    if (
      (bidder[0] + 1) % 4 !== bidder[1] &&
      visited.indexOf((bidder[0] + 1) % 4) === -1
    ) {
      setBidder((prev) => [(bidder[0] + 1) % 4, bidder[1]]);
    } else if (visited.indexOf((bidder[1] + 1) % 4) === -1) {
      setBidder((prev) => [(bidder[1] + 1) % 4, bidder[1]]);
    }
  };

  return (
    <Grid container spacing={4} className="auction">
      <Grid
        item
        xs={12}
        component="span"
        sx={{ fontFamily: "auto", cursor: "auto !important" }}
      >
        {playersArr[bidder[0]]}
      </Grid>
      {arr.map((element) => {
        return (
          <Grid
            item
            xs={2}
            component="span"
            key={element}
            className={element <= call.call ? "visited" : ""}
            onClick={() => element > call.call && handleCall(element)}
          >
            {element}
          </Grid>
        );
      })}
      <Grid
        item
        xs={4}
        component="span"
        onClick={handlePass}
        sx={{ marginLeft: "4% !important" }}
      >
        Pass
      </Grid>
    </Grid>
  );
};

export default Auction;
