
var FlipBlock = function (className) {
    BlockBase.call(this, className);
    this.className = 'flip';
}
FlipBlock.prototype = new BlockBase();

FlipBlock.prototype.playOn = function (player) {

    player.clearMoveId(true);
    player.flip();
    var audio = document.getElementById('flip-sound')
    audio.play()
    this.hasCheckPlayon = true;

    this.animation();
}