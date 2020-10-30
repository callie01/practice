//------------startMove(oDiv,{width:400,height:400},function(){})-----------------
function startMove(obj, json, fnEnd) {
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    var bStop = true; //假设所有值都已到达
    for (var attr in json) {
      var cur = 0;
      //1.获取物体要改变的属性
      //透明度，属性值都为小数的,Math.round：四舍五入
      if (attr == "opacity") {
        cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
      } else {
        //其他，属性值都为整数的
        cur = parseInt(getStyle(obj, attr));
      }
      //2.速度
      var speed = (json[attr] - cur) / 6;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      //3.到达指定值清除定时器
      if (cur != json[attr]) bStop = false;
      if (attr == "opacity") {
        obj.style.opacity = (cur + speed) / 100;
      } else {
        obj.style[attr] = cur + speed + "px";
      }
    }
    if (bStop) {
      clearInterval(obj.timer);
      if (fnEnd) fnEnd();
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
