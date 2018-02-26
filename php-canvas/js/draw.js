/**
 * Created by JianJia.Zhou<jianjia.zhou@longmaster.com.cn> on 2018/2/12.
 */
/**
 * 绘制PHP
 *
 * @constructor
 */
function DrawPhp() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvasWidth = 1160;
    this.canvasHeight = 520;
    this.imgWidth = 72;
    this.imgHeight = 72;
    this.colors = ["#FF9966", "#FF6666", "#FFCCCC", "#CC9966", "#666666", "#CC9999", "#FF6666", "#FFFF66", "#99CC66"];
    this.canvas.width = this.canvasWidth;
    this.canvas.height = this.canvasHeight;
}

DrawPhp.prototype = {
    /**
     * 初始化
     */
    init: function () {
        this.pointArr = new Array();
        for (var i = 0; i < 3; i++) {
            this.digit(i, (i === 2 ? 0 : i));
        }
    },
    /**
     * 绘制文字
     *
     * @param index
     * @param num
     */
    digit: function (index, num) {
        for (var i = 0; i < data[num].length; i++) {
            for (var j = 0; j < data[num][i].length; j++) {
                if (data[num][i][j] === 1) {
                    var xPoint = index * 5 * (this.imgWidth + this.imgWidth / 10) + j * (this.imgWidth + 1);
                    var yPoint = i * (this.imgWidth + 1);
                    this.pointArr.push({x:xPoint,y:yPoint});

                    // 绘制底色
                    this.ctx.fillRect(xPoint, yPoint, this.imgWidth, this.imgHeight);
                    this.ctx.fillStyle = this.colors[Math.floor(this.random(0, this.colors.length))];
                    this.ctx.fill();
                }
            }
        }
    },
    drawImage: function (url,num) {
        var img = new Image();
        var xPoint = this.pointArr[num].x;
        var yPoint = this.pointArr[num].y;
        img.onload = function (img,xPoint,yPoint) {
            //console.log(xPoint,yPoint);
            setTimeout(function () {
                this.ctx.drawImage(img, 0, 0, 110, 110, xPoint, yPoint, this.imgWidth, this.imgHeight);
            }.bind(this),300);
        }.bind(this)(img,xPoint,yPoint);
        img.src = url;

    },
    /**
     * 随机数
     *
     * @param min
     * @param max
     * @returns {*}
     */
    random: function random(min, max) {
        return Math.random() * (max - min) + min;
    }
};