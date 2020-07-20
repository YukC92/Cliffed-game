var NormalBlock = function () {
    BlockBase.call(this);
    this.className = 'normal';
}
NormalBlock.prototype = new BlockBase();

NormalBlock.prototype.playOn = function (player) {
    player.clearMoveId(true);
    player.moveUp(this.movepx, this.movesp);
    this.animation();
    this.hasCheckMove = true;
}
NormalBlock.prototype.checkMoveOut = function (player) {

    var pdiv = player.div, bdiv = this.div;
    if (pdiv.offsetLeft <= bdiv.offsetLeft - pdiv.clientWidth || pdiv.offsetLeft >= bdiv.offsetLeft + bdiv.clientWidth) {
        player.clearMoveId(true);
        player.moveDown();
        this.hasCheckMove = false;
        this.hasCheckPlayon = true;
    }
}
