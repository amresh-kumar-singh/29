export default function sWorkerDev() {
  let path = `${process.env.PUBLIC_URL}/sWorker.js`;
  window.document.addEventListener("DOMContentLoaded", function () {
    navigator.serviceWorker.register(path).then((res) => {
      console.warn("res: ", res);
    });

    // if ("standalone" in navigator && window.navigator.standalone) {
    //   console.log("installed on IOS");
    // } else if (matchMedia("(display-mode: standalone)").matches) {
    //   // matchMedia("(display-mode: standalone)").matches;
    //   console.log("Installed on Android or Desktop");
    // } else {
    //   console.log("Running from browser");
    // }
  });
}
