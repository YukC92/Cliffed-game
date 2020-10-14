
var Player = function () {
    this.div = null;
    this.movepy = 0;
    this.isMove = false;
    this.moveXId = 0;
    this.moveYId = 0;
    this.isLive = true;
    this.isFlip = false;

    this.init();
}

Player.prototype = {
    gamePanel: null,
    k: 0.8,
    g: 1,
    movepx: 8,
    cmovepy: 1,
    movesp: 40,
    init: function () {
        this.div = document.createElement('div');
        this.div.className = 'player';

        this.movepy = this.cmovepy;
    },

    setPosition: function (gamePanel) {

        this.gamePanel = gamePanel;

        this.gamePanel.appendChild(this.div);

        this.div.style.left = (this.gamePanel.offsetWidth - this.div.offsetWidth) / 2 + 'px';
        this.div.style.top = 70 + 'px';
    },

    keydown: function (e) {
        if (this.isMove) return;
        this.isMove = true;
        this.moveLeftRight(e.keyCode == 37 ? 'left' : 'right');

    },

    keyup: function (e) {
        this.isMove = false;
        clearInterval(this.moveXId);
        this.div.className = 'player';
    },

    moveLeftRight: function (direction) {

        var that = this;
        this.div.className = direction;
        var process = function () {
            if (!that.isLive) clearInterval(that.moveXId);
            that.div.style.left = that.div.offsetLeft + (that.movepx * (direction == 'left' ? -1 : 1)) + 'px';
            if ((that.div.offsetLeft >= that.gamePanel.clientWidth - that.div.clientWidth) && direction == 'right') {
                that.div.style.left = 0 + 'px';
            }
            else if (that.div.offsetLeft <= 0 && direction == 'left') {
                that.div.style.left = that.gamePanel.clientWidth - that.div.clientWidth + 'px';
            }
        }
        this.moveXId = setInterval(process, this.movesp);
    },

    moveDown: function () {

        var that = this;
        var process = function () {
            that.div.style.top = that.div.offsetTop + that.movepy + 'px';
            that.movepy += that.g;
            if (that.checkCrash()) {
                that.wasDead();
            }
        }
        this.moveYId = setInterval(process, this.movesp);
    },

    moveUp: function (b_movepx, b_movesp) {

        var that = this;

        var process = function () {

            that.div.style.top = that.div.offsetTop - b_movepx + 'px';
            if (that.checkCrash()) {
                that.wasDead();
            }
        }
        this.moveYId = setInterval(process, b_movesp);
    },

    flip: function () {
        if (this.isFlip) return;
        this.isFlip = true;
        var that = this, f_movepy = 25;
        var process = function () {
            f_movepy *= that.k;
            that.div.style.top = that.div.offsetTop - f_movepy + 'px';
            if (that.checkCrash()) {
                that.wasDead();
            }
            else if (f_movepy < 1) {
                that.isFlip = false;
                that.movepy = that.cmovepy;
                that.moveDown();
            }
            else {
                setTimeout(process, that.movesp);
            }
        }
        setTimeout(process, this.movesp);
    },

    checkCrash: function () {
        if (this.div.offsetTop >= this.gamePanel.offsetHeight - this.div.clientHeight || this.div.offsetTop <= 0) {
            return true;
        }
        return false;
    },

    clearMoveId: function (clearMovepy) {
        clearInterval(this.moveYId);
        if (clearMovepy) this.movepy = this.cmovepy;
    },

    wasDead: function () {
        this.clearMoveId();
        this.isLive = false;
        this.gameOver();
    },

    gameOver: function () { }
}
