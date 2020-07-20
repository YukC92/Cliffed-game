var MissBlock = function (className) {
    BlockBase.call(this, className);
    this.className = 'miss';
}
MissBlock.prototype = new BlockBase();

MissBlock.prototype.playOn = function (player) {

    player.clearMoveId(true);
    player.moveUp(this.movepx, this.movesp);

    this.animation();

    this.hasCheckMove = true;

    var that = this;
    setTimeout(function () {
        that.end();
        that.hasCheckPlayon = true;
        player.clearMoveId(true);
        player.moveDown();
    }, 500);
}
MissBlock.prototype.checkMoveOut = function (player) {

    var pdiv = player.div, bdiv = this.div;

    if (pdiv.offsetLeft <= bdiv.offsetLeft - pdiv.clientWidth || pdiv.offsetLeft >= bdiv.offsetLeft + bdiv.clientWidth) {
        player.clearMoveId(true);
        player.moveDown();
        this.hasCheckMove = false;
        this.hasCheckPlayon = true;
    }
}