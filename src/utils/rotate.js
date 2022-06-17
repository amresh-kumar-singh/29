const rotate = {
  south: {
    position: "absolute",
    bottom: "0%",
    left: "50%",
    transform: "translate(-50%, 0%)",
    width: "fit-content",
    height: "24vh",
  },
  north: {
    position: "absolute",
    top: "0%",
    left: "50%",
    transform: "translate(-50%, 0%)",
    height: "12%",
    width: "fit-content",
  },
  west: {
    position: "absolute",
    left: "0%",
    top: "0%",
    height: "12%",
    width: "fit-content",
    transformOrigin: "left",
    transform: " rotate(90deg) translate(0px, -50%)",
  },
  east: {
    position: "absolute",
    right: "0%",
    top: "50%",
    height: "12%",
    width: "fit-content",
    transform: "rotate(-90deg) translate(0%, -10%)",
  },
};

export default rotate;
