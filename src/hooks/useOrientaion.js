const useOrientation = () => {
  function lock(orientation) {
    console.log("lock");
    const doc = document.documentElement;
    if (doc.requestFullscreen) {
      doc.requestFullscreen();
    } else if (doc.mozRequestFullscreen) {
      doc.mozRequestFullscreen();
    } else if (doc.webkitRequestFullscreen) {
      doc.webkitRequestFullscreen();
    } else if (doc.msRequestFullscreen) {
      doc.msRequestFullscreen();
    }
    // window.screen.orientation.lock(orientation);
  }

  function unlock() {
    // window.screen.orientation.unlock();
    console.log("unlock");
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozExitFullscreen) {
      document.mozExitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }

  return { lock, unlock };
};

export default useOrientation;
