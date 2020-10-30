//------------三个参数：当前物体，属性名，目标样式-----------------
function startMove(obj, attr, iTarget) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var cur = 0;
    //获取物体要改变的属性
    //透明度，属性值都为小数的,Math.round：四舍五入
    if (attr == "opacity") {
      cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
    } else {
      //其他，属性值都为整数的
      cur = parseInt(getStyle(obj, attr));
    }
    //速度
    var speed = (iTarget - cur) / 6;
    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
    //到达指定值清除定时器
    if (cur == iTarget) {
      clearInterval(obj.timer);
    } else {
      if (attr == "opacity") {
        obj.style.opacity = (cur + speed) / 100;
      } else {
        obj.style[attr] = cur + speed + "px";
      }
    }
  }, 30);
}
//-------------获取不在行间的样式--------------------
function getStyle(obj, name) {
  if (obj.currentStyle) {
    return obj.currentStyle[name];
  } else {
    return getComputedStyle(obj, false)[name];
  }
}
