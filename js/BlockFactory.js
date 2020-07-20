
Array.prototype.remove = function (obj) {

    for (var i = 0, l = this.length; i < l; i++) {
        if (this[i] == obj || this[i].div == null) {
            this.splice(i, 1);
            break;
        }
    }
    return this;
}


var BlockFactory = {
    gamePanel: null,
    player: null,
    blockList: [],
    init: function (gamePanel, player) {
        this.gamePanel = gamePanel;
        this.player = player;
    },
    createBlock: function () {
        var randomBlock = Math.floor(Math.random() * 10 + 1), block;
        switch (randomBlock) {
            case 1: ;
            case 2: ;
            case 3: ;
            case 4: ;
            case 5: block = new NormalBlock(); break;
            case 6: ;
            case 7: block = new MissBlock(); break;
            case 8: ;
            case 9: block = new FlipBlock(); break;
            case 10: block = new ThornBlock(); break;
        }
        var randomPosition = Math.floor(Math.random() * 5 + 1);
        this.setBlock(block, randomPosition);
    },
    createFirstBlock: function () {
        var block = new NormalBlock();
        this.setBlock(block, 3);
    },
    setBlock: function (block, position) {

        var that = this;

        block.init();
        block.setPosition(this.gamePanel, position);
        block.onCheckPlayerOn = function () { return this.checkPlayerOn(that.player); }
        block.onPlayOn = function () { this.playOn(that.player); }
        block.onCheckMoveOut = function () { this.checkMoveOut(that.player); }
        block.onEnd = function () { that.blockList.remove(this); }

        block.animation();

        this.blockList.push(block);
    },
    stopBlock: function () {
        for (var i = 0, l = this.blockList.length; i < l; i++) {
            this.blockList[i].stopMove();
        }
    },

    removeBlock: function () {
        for (var i = 0, l = this.blockList.length; i < l; i++) {
            var b = this.blockList.pop();
            this.gamePanel.removeChild(b.div);
            b.div = null;
            b = null;
        }
    }
}
