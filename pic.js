var tjoePlayer = {
  // --------------------------初始
  init: function(){
    this.config();
    this.getNode();
  },
  // --------------------------获取节点
  getNode: function(){
    var box = document.getElementById('tjoe-player');
    var imgs = box.getElementsByClassName('tjoe-pic');
    if(tjoePlayer.iHover){
      this.hoverStop();  //------------------------------------------悬停
      this.outStart();
    }
    if(tjoePlayer.iBtn){
      this.nextPicPosition(box);
    }
    if(tjoePlayer.iDot){
      this.setDot();
    }
    this.setOutline(box, imgs);
    this.setBefore(imgs);
    this.setProcess(imgs);
  },
  // --------------------------图片外盒子处理
  setOutline: function(box, imgs){
    var iHeight = box.offsetHeight;
    var iWidth = box.offsetWidth;
    box.style.backgroundColor = "#2C2C27";
    for(var i=0; i<imgs.length; i++){
      imgs[i].style.height = iHeight + 'px';
      imgs[i].style.width = iWidth + 'px';
    }
  },
  // --------------------------轮播前初始化
  setBefore: function(imgs){
    for(var i=0; i<imgs.length; i++){
      imgs[i].style.position = "absolute";
      imgs[i].style.opacity = 0;
    }
    imgs[0].style.opacity = 1;
  },
  // --------------------------发生轮播
  setProcess: function(imgs){
    if(tjoePlayer.iHover){
      tjoePlayer.hoverStop(); //------------------------------------------悬停
    }
    tjoePlayer.timeId1 = setInterval(tjoePlayer.theProcess, tjoePlayer.iTime);
  },
  // 图片计数器
  i: 0,
  // --------------------------实现图片轮播
  timeId1: null,
  theProcess: function(){
    var i = parseInt(tjoePlayer.i);
    var imgs = document.getElementById('tjoe-player').getElementsByClassName('tjoe-pic');
    if(tjoePlayer.iDot){
      var dotsBox = document.getElementById('tjoe-dot');
      var dots = dotsBox.getElementsByTagName('img');
    }
    i += 1;
    tjoePlayer.i = i;
   
    if(i >= imgs.length){
      tjoePlayer.i = i = 0;
    }

    if(i === 0){
      imgs[imgs.length-1].style.opacity = 0;
      tjoePlayer.tempObj = imgs[0];
      if(tjoePlayer.iDot){
        dots[imgs.length-1].setAttribute("src", tjoePlayer.imgName + "/dot1.png");
        dots[0].setAttribute("src", tjoePlayer.imgName + "/dot2.png");
      }
      clearInterval(tjoePlayer.timeId3);
      tjoePlayer.timeId3 = setInterval(tjoePlayer.graduate, 10);
    }else{
      imgs[i-1].style.opacity = 0;
      tjoePlayer.tempObj = imgs[i];
      if(tjoePlayer.iDot){
        dots[i-1].setAttribute("src", tjoePlayer.imgName + "/dot1.png");
        dots[i].setAttribute("src", tjoePlayer.imgName + "/dot2.png");
      }
      clearInterval(tjoePlayer.timeId3);
      tjoePlayer.timeId3 = setInterval(tjoePlayer.graduate, 10);
    }
  },
  // --------------------------渐变对象
  tempObj: {},
  // 渐变计数器
  x: 0,
  // --------------------------实现渐变
  timeId3: null,
  graduate: function(){
    var x = tjoePlayer.x;
    var img = tjoePlayer.tempObj;
    x += 0.1;
    tjoePlayer.x = x;
    img.style.opacity = x;

    if(x >= 1){
      tjoePlayer.x = x = 0;
      clearInterval(tjoePlayer.timeId3);
      return;
    }
  },


  // ---------  扩展功能 ---------- //
  // ----- 悬停 ----- //
  stopFlag: 0,
  box: document.getElementById('tjoe-player'),
  hoverStop: function(){
    tjoePlayer.box.addEventListener("mouseover", tjoePlayer.hoverEvent, false);
  },
  hoverEvent: function(){
    tjoePlayer.stopFlag = 1;
    clearInterval(tjoePlayer.timeId1);
    // console.log("in");
    if(tjoePlayer.stopFlag === 2){
      tjoePlayer.box.removeEventListener("mouseout", tjoePlayer.outEvent);
      tjoePlayer.stopFlag = 0;
    }
  },
  outStart: function(){
    tjoePlayer.box.addEventListener("mouseout", tjoePlayer.outEvent, false);
  },
  outEvent: function(){
    tjoePlayer.stopFlag = 2;
    // console.log("out");
    tjoePlayer.box.removeEventListener("mouseover", tjoePlayer.hoverEvent);
    tjoePlayer.setProcess();
  },

  // ----- 下一个 ----- //
  btns: document.getElementById('tjoe-player').getElementsByClassName('tjoe-btn'),
  nextPicPosition: function(box){
    var iHeight = box.offsetHeight;
    var iWidth = box.offsetWidth;
    var btns = tjoePlayer.btns;
    for(var i=0; i<btns.length; i++){
      btns[i].style.position = "absolute";
      btns[i].style.zIndex = 2;
      btns[i].style.cursor = "pointer";
      btns[i].style.width = "50px";
      btns[i].style.height = "50px";
      btns[i].style.marginTop = iHeight/2 - 25 + "px";
    }
    btns[1].style.marginLeft = iWidth - 50 + "px";

    btns[0].addEventListener("click", tjoePlayer.upPic, false);
    btns[1].addEventListener("click", tjoePlayer.nextPic, false);
  },
  // -----------上一个
  upPic: function(){
    var i = tjoePlayer.i;
    var imgs = document.getElementById('tjoe-player').getElementsByClassName('tjoe-pic');
    if(tjoePlayer.iDot){
      var dotsBox = document.getElementById('tjoe-dot');
      var dots = dotsBox.getElementsByTagName('img');
    }

    i -= 1;
    tjoePlayer.i = i;
    
    if(i === -1){
      tjoePlayer.i = i = imgs.length - 1;
    }


    if(i === (imgs.length - 1)){
      imgs[0].style.opacity = 0;
      tjoePlayer.tempObj = imgs[imgs.length-1];
      if(tjoePlayer.iDot){
        dots[0].setAttribute("src", tjoePlayer.imgName + "/dot1.png");
        dots[imgs.length-1].setAttribute("src", tjoePlayer.imgName + "/dot2.png");
      }
      clearInterval(tjoePlayer.timeId3);
      tjoePlayer.timeId3 = setInterval(tjoePlayer.graduate, 10);
    }else{
      imgs[i+1].style.opacity = 0;
      tjoePlayer.tempObj = imgs[i];
      if(tjoePlayer.iDot){
        dots[i+1].setAttribute("src", tjoePlayer.imgName + "/dot1.png");
        dots[i].setAttribute("src", tjoePlayer.imgName + "/dot2.png");
      }
      clearInterval(tjoePlayer.timeId3);
      tjoePlayer.timeId3 = setInterval(tjoePlayer.graduate, 10);
    }
  },
  // ------------下一个
  nextPic: function(){
    tjoePlayer.theProcess();
  },

  // ------------导航点
  setDot: function(){
    var box = document.getElementById('tjoe-player');
    var iHeight = box.offsetHeight;
    var iWidth = box.offsetWidth;
    var imgs = box.getElementsByClassName('tjoe-pic');
    var dotsBox = document.getElementById('tjoe-dot');

    dotsBox.style.width = imgs.length * (10 + 5) + "px";

    var dWidth = dotsBox.offsetWidth;

    dotsBox.style.position = "absolute";
    dotsBox.style.marginTop = iHeight - 20 + "px";
    dotsBox.style.marginLeft = iWidth/2 - dWidth/2 + "px";

    for(var i=0; i<imgs.length; i++){
      var dot = document.createElement('img');
      dot.setAttribute("src", tjoePlayer.imgName + "/dot1.png");
      dot.setAttribute("name", i);
      dot.style.position = "absolute";
      dot.style.zIndex = 2;
      dot.style.width = "10px";
      dot.style.height = "10px";
      dot.style.cursor = "pointer";
      dot.style.marginLeft = i * (10+5) + "px";
      dotsBox.appendChild(dot);
      dot.addEventListener("mouseover", tjoePlayer.dotHover, false);
      dot.addEventListener("mouseout", tjoePlayer.dotOut, false);
    }

    var dots = dotsBox.getElementsByTagName('img');

    dots[tjoePlayer.i].setAttribute("src", tjoePlayer.imgName + "/dot2.png");
  },

  dotHover: function(){
    var imgs = document.getElementById('tjoe-player').getElementsByClassName('tjoe-pic');
    var dotsBox = document.getElementById('tjoe-dot');
    var dots = dotsBox.getElementsByTagName('img');
    
    tjoePlayer.i = this.name;
    tjoePlayer.tempObj = imgs[tjoePlayer.i];

    clearInterval(tjoePlayer.timeId1);
    clearInterval(tjoePlayer.timeId3);

    for(var i=0; i<imgs.length; i++){
      dots[i].setAttribute("src", tjoePlayer.imgName + "/dot1.png");
      imgs[i].style.opacity = 0;
    }

    this.setAttribute("src", tjoePlayer.imgName + "/dot2.png");
    
    tjoePlayer.timeId3 = setInterval(tjoePlayer.graduate, 10);
  },

  dotOut: function(){
    var dotsBox = document.getElementById('tjoe-dot');
    var dots = dotsBox.getElementsByTagName('img');

    dots[tjoePlayer.i].setAttribute("src", tjoePlayer.imgName + "/dot2.png");
  },

  config:function(){
    //悬停
    this.iHover = true;
    //左右按钮
    this.iBtn = true;
    //导航点
    this.iDot = true;
    //轮播时间
    this.iTime = 3000;
    //图片文件夹名
    this.imgName = "images";
  },

};

tjoePlayer.init();