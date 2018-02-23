/**
 * Created by JianJia.Zhou<jianjia.zhou@longmaster.com.cn> on 2018/2/12.
 */

function Bubble(dom){
    this.dom = dom;
    this.canvas = document.querySelector(this.dom);
    this.colors = ["#FFFFCC","#99CCCC","#FFCC99","#FFCCCC","#FF6666","#99CCCC","#99CC66"];
    this.myCanvas = this.canvas.getContext("2d");
    this.xR = 100;
    this.yR = 60;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    this.items = new Array();
    var _this = this;
    ~~function setSize(){
        window.onresize = arguments.callee;
        _this.canvasWidth = window.innerWidth;
        _this.canvasHeight = window.innerHeight;
        _this.canvas.width = _this.canvasWidth;
        _this.canvas.height = _this.canvasHeight;
    }();
    var RAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame || window.oRequestAnimationFrame
        || window.msRequestAnimationFrame || function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };

    this.start = function () {
        _this.myCanvas.clearRect(0,0,_this.canvasWidth,_this.canvasHeight);
        for(var item of _this.items){
            item.move();
        }
        RAF(_this.start);
    }
}

Bubble.prototype = {
    init:function(){
        this.x = this.random(0,this.canvasWidth);
        this.y = this.random(0,this.canvasHeight);
        this.r = this.random(1,10);
        this.R = this.r;
        this.color = this.colors[Math.floor(this.random(0,this.colors.length))];
        this.mx = this.random(-1,1);
        this.my = this.random(-1,1);
    },
    draw: function(){
        this.myCanvas.beginPath();
        this.myCanvas.arc(this.x,this.y,this.r,0,Math.PI*2);
        this.myCanvas.fillStyle = this.color;
        this.myCanvas.fill();
    },
    move:function(){
        var  xr = this.x - this.x;
        var  xr1 = this.x - this.x;
        var  yr = this.y - this.y;
        var  yr1 = this.y - this.y;
        this.x += this.mx;
        this.y += this.my;
        if(this.x + this.r >= this.canvasWidth || this.x - this.r < 0){
            this.mx = -this.mx;
        }
        if(this.y + this.r >= this.canvasHeight || this.y - this.r < 0){
            this.my = -this.my;
        }

        if(xr > this.xR || xr1 > this.xR || yr > this.yR || yr1 > this.yR){
            this.r = this.R;
        }
        this.draw()
    },
    random:function (min,max){
        return Math.random() * (max - min) + min;

    },
    events:function () {
        this.canvas.onmousemove = function(){
            this.x = event.clientX || event.screenX;
            this.y = event.clientY || event.screenY;
            for(var  item of this.items){
                var  xr = item.x - this.x;
                var  xr1 = this.x - item.x;
                var  yr = item.y - this.y;
                var  yr1 = this.y - item.y;
                if(((xr < this.xR && this.xr > 0) || (xr1 < this.xR && xr1 > 0))
                    && ((yr < this.yR && yr > 0) || (yr1 < this.yR && yr1 > 0)) ){
                    item.r = item.R;
                    item.r *= 8;
                }else{
                    item.r = item.R;
                }
            }
        }.bind(this);

        this.canvas.onmouseout = function(){
            for(var item of this.items){
                item.r = item.R;
            }
        }.bind(this);
    },
    create:function (num){
        this.events();
        for(var  i = 0;i < num; i++){
            var  item = new Bubble(this.dom);
            item.init();
            item.draw();
            this.items.push(item);
        }
    }
};