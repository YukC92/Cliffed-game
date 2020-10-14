

var Game = {
    gamePanel: null,
    player: null,
    second: 0,
    startBtn: null,
    createBlockId: 0,
    init: function () {

        this.gamePanel = document.getElementById('gamePanel');
        this.gamePanel.focus();

        document.body.onkeydown = function (e) { Game.keydown(e); };
        document.body.onkeyup = function (e) { Game.keyup(e); };

        this.startPlayer();
        this.startBlock();
    },
    startPlayer: function () {
        this.player = new Player();

        this.player.setPosition(this.gamePanel);
        this.player.gameOver = function () { Game.gameOver(); };

        this.player.moveDown();
    },
    startBlock: function () {

        var that = this, time = document.all ? 1100 : 800;

        BlockFactory.init(this.gamePanel, this.player);

        BlockFactory.createFirstBlock();

        this.createBlockId = setInterval(function () {
            if (that.player.isLive) {
                BlockFactory.createBlock();
                that.addsecond();
            }
        }, time);
    },
    keydown: function (e) {

        e = e || window.event;
        if (e.keyCode == 37 || e.keyCode == 39) {

            if (e.preventDefault) e.preventDefault();
            else e.returnValue = false;

            this.player.keydown(e);
        }
    },
    keyup: function (e) {

        e = e || window.event;

        if (e.keyCode == 37 || e.keyCode == 39 || e.keyCode == 38) {
            this.player.keyup(e);
        }

    },
    addsecond: function () {
        this.second += 1;
        document.getElementById('score').innerHTML = this.second;
    },
    gameOver: function () {
        BlockFactory.stopBlock();
        document.body.onkeydown = null;
        document.body.onkeyup = null;
        Game.startBtn.style.display = '';
        clearInterval(this.createBlockId);
        var audio = document.getElementById("myAudio");
        audio.pause();
        audio.currentTime = 0;
        alert(`Game end. You survived ${this.second} seconds`);
    },
    reset: function () {
        BlockFactory.removeBlock();
        this.gamePanel.removeChild(this.player.div);
        this.gamePanel = null;
        this.player = null;
        this.second = 0;
    },

    
}
function Start(btn) {
    if (!Game.startBtn) {
        Game.startBtn = btn;

    }
    else Game.reset();
    Game.startBtn.style.display = 'none';
    Game.init();
};
