const oBox = document.getElementById("box");

let disX = 0;
let disY = 0;

let prevX = 0;
let prevY = 0;
let iSpeedX = 0;
let iSpeedY = 0;

let timer = null;

oBox.onmousedown = (e) => {
  disX = e.clientX - oBox.offsetLeft;
  disY = e.clientY - oBox.offsetTop;

  // 记录按下的第一个坐标
  prevX = e.clientX;
  prevY = e.clientY;

  document.onmousemove = (ev) => {
    oBox.style.left = ev.clientX - disX + "px";
    oBox.style.top = ev.clientY - disY + "px";

    // 记录当前坐标与前一个点的坐标的差值
    iSpeedX = ev.clientX - prevX;
    iSpeedY = ev.clientY - prevY;

    // 拖动过程中,不断更新当前点之前的一个点坐标
    prevX = ev.clientX;
    prevY = ev.clientY;

    //------------------------------
    // 路径
    const oPath = document.createElement("div");
    oPath.className = "path";
    document.body.appendChild(oPath);
    oPath.style.left = ev.clientX + "px";
    oPath.style.top = ev.clientY + "px";
    //------------------------------
  };
  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    startMove();
  };
  return false;
};

function startMove() {
  clearInterval(timer);
  timer = setInterval(() => {
    // 重力值
    iSpeedY += 3;

    let L = oBox.offsetLeft + iSpeedX;
    let T = oBox.offsetTop + iSpeedY;

    if (T > document.documentElement.clientHeight - oBox.offsetHeight) {
      T = document.documentElement.clientHeight - oBox.offsetHeight;
      iSpeedY *= -1; // 改变方向
      iSpeedY *= 0.75; // 速度降低

      // 到底了停下来
      iSpeedX *= 0.75;
    } else if (T < 0) {
      T = 0;
      iSpeedY *= -1;
      iSpeedY *= 0.75;
    }
    if (L > document.documentElement.clientWidth - oBox.offsetWidth) {
      L = document.documentElement.clientWidth - oBox.offsetWidth;
      iSpeedX *= -1;
      iSpeedX *= 0.75;
    } else if (L < 0) {
      L = 0;
      iSpeedX *= -1;
      iSpeedX *= 0.75;
    }

    console.log(iSpeedX, iSpeedY);
    oBox.style.left = L + "px";
    oBox.style.top = T + "px";

    if (Math.abs(iSpeedX) < 0.02) {
      clearInterval(timer);
    }
  }, 30);
}
