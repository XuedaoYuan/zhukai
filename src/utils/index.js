// 全屏元素
export function handleRequestFullScreen(domElement) {
  if (domElement.requestFullscreen) {
    domElement.requestFullscreen();
  } else if (domElement.webkitRequestFullScreen) {
    domElement.webkitRequestFullScreen();
  } else if (domElement.mozRequestFullScreen) {
    domElement.mozRequestFullScreen();
  } else {
    domElement.msRequestFullscreen();
  }
}
// 退出全屏
export function handleExitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExiFullscreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  }
}
