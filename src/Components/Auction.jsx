import { useState } from "react";
import { GameState } from "../context/game";
import playersArr from "../utils/playersArr";
import "./component.css";

let arr = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
const Auction = ({ setDisplayAuction }) => {
  const { call, setCall, dealer } = GameState();
  const [bidder, setBidder] = useState([dealer + 1, dealer + 2]);

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

  const handleBidder = () => {
    //bidder[0] is one who called pass
    if (bidder[0] === dealer || bidder[1] === dealer) {
      // Unmoundt Auction component
      console.log("Bidding Done");
      setDisplayAuction(0);
      return;
    }
    if (bidder[0] < bidder[1]) {
      setBidder((prev) =>
        call.call > 0
          ? [(bidder[1] + 1) % 4, bidder[1]]
          : [bidder[1], (bidder[1] + 1) % 4]
      );
    } else {
      setBidder((prev) => [(bidder[0] + 1) % 4, bidder[1]]);
    }
  };
  return (
    <div className="auction">
      <span>{playersArr[bidder[0]]}</span>
      {arr.map((item) => {
        return (
          <span
            key={item}
            className={item <= call.call ? "visited" : ""}
            onClick={() => item > call.call && handleCall(item)}
          >
            {item}
          </span>
        );
      })}
      <span onClick={handleBidder}>Pass</span>
    </div>
  );
};

export default Auction;
