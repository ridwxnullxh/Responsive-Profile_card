// Live clock only - upload and toggle logic removed
const timeEl = document.getElementById("userTime");
function updateTime() {
  if (!timeEl) return;
  timeEl.textContent = Date.now();
}
updateTime();
setInterval(updateTime, 1000);
