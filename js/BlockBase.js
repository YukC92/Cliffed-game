
var BlockBase = function () {
    this.div = null;
    this.className = "";
    this.hasCheckMove = false;
    this.moveId = 0;
}
BlockBase.prototype = {
    hasCheckPlayon: true,
    movepx: 3,
    movesp: 35,
    gamePanel: null,
    site: {
        1: 0,
        2: 55,
        3: 110,
        4: 165,
        5: 220
    },
    init: function () {

        this.div = document.createElement('div');
        this.div.className = this.className;
        this.div.style.width = '80px';
        this.div.style.height = '10px';
    },
    setPosition: function (gamePanel, type) {

        if (!this.gamePanel) this.gamePanel = gamePanel;

        this.div.style.left = this.site[type] + 'px';
        this.div.style.top = this.gamePanel.offsetHeight + 'px';

        this.gamePanel.appendChild(this.div);
    },
    animation: function () {

        var that = this;
        var process = function () {
            if (!that.div) return;
            var top = that.div.offsetTop - that.movepx;

            that.div.style.top = top + 'px';
            var isPlayerOn = that.hasCheckPlayon && that.onCheckPlayerOn();
            if (that.hasCheckMove) that.onCheckMoveOut();
            if (top <= -that.div.offsetHeight && !isPlayerOn) {
                that.end();
            }
            else if (isPlayerOn) {
                that.stopMove();
                that.onPlayOn();
            }
        }
        this.moveId = setInterval(process, this.movesp);
    },
    stopMove: function () {
        clearTimeout(this.moveId);
    },
    end: function () {
        this.stopMove();
        this.gamePanel.removeChild(this.div);
        this.div = null;
        this.onEnd();
    },
    onEnd: function () { },
    checkPlayerOn: function (player) {
        if (player.isFlip) return false;

        var pdiv = player.div, bdiv = this.div;
        if (pdiv.offsetLeft > bdiv.offsetLeft - pdiv.clientWidth && pdiv.offsetLeft < bdiv.offsetLeft + bdiv.clientWidth) {
            if ((pdiv.offsetTop + pdiv.clientHeight <= bdiv.offsetTop) &&
                (pdiv.offsetTop + pdiv.clientHeight + player.movepy + player.g > bdiv.offsetTop - this.movepx)) {

                pdiv.style.top = (bdiv.offsetTop - pdiv.offsetHeight) + 'px';
                this.hasCheckPlayon = false;
                return true;
            }
        }
        return false;
    },
    checkMoveOut: function (player) { },
    playOn: function (player) { },
    onCheckMoveOut: function () { },
    onCheckPlayerOn: function () { },
    onPlayOn: function () { }
}
