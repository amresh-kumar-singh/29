import { useEffect, useState } from "react";

const useInstall = () => {
  const [install, setInstall] = useState(false);

  useEffect(() => {
    function beforeInstall(e) {
      e.preventDefault();
      setInstall(e);
      console.log(typeof e);
    }
    if ("standalone" in navigator && window.navigator.standalone) {
      console.log("installed on IOS");
      setInstall(false);
    } else if (matchMedia("(display-mode: standalone)").matches) {
      console.log("Installed on Android or Desktop");
      setInstall(false);
    } else {
      window.addEventListener("beforeinstallprompt", beforeInstall);
      console.log("Running from browser");
    }

    return () =>
      window.removeEventListener("beforeinstallprompt", beforeInstall);
  }, []);

  function handleInstall() {
    install?.prompt();
    install?.userChoice.then((choice) => {
      if (choice.outcome === "accepted") {
        console.log("installed");
        setInstall(false);
      } else {
        console.log("cancled");
      }
    });
  }
  return { handleInstall, install, setInstall };
};

export default useInstall;
