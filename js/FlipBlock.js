
var FlipBlock = function (className) {
    BlockBase.call(this, className);
    this.className = 'flip';
}
FlipBlock.prototype = new BlockBase();

FlipBlock.prototype.playOn = function (player) {

    player.clearMoveId(true);
    player.flip();

    this.hasCheckPlayon = true;

    this.animation();
}