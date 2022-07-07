export default function sWorkerDev() {
  let path = `${process.env.PUBLIC_URL}/sWorker.js`;
  window.document.addEventListener("DOMContentLoaded", function () {
    navigator.serviceWorker.register(path).then((res) => {
      // console.warn("res: ", res);
    });
  });
}
