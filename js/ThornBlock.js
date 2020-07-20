var ThornBlock = function () {

    BlockBase.call(this);
    this.className = 'thorn';
}
ThornBlock.prototype = new BlockBase();

ThornBlock.prototype.playOn = function (player) {

    player.clearMoveId(true);
    player.wasDead();
}
