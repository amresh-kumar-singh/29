const useFullScreen = () => {
  function fullscreen() {
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

  function exitFullscreen() {
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
  return { fullscreen, exitFullscreen };
};

export default useFullScreen;
