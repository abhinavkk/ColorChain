var game = new Phaser.Game(1000, 1000, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.spritesheet('tiles', 'images/tiles.png', 50, 50);
}

// var tiles = new Array(10);
// for(var i = 0; i < 10; i++)
// {
// 	tiles[i] = new Array(10);
// }
var tiles;
var text;
var x;
var y;
var turn = 1;
var player1 = 0;
var player2 = 0;
var text1;
var text2;
var count_moves = 0;

function create() {
	game.stage.background = 0x5d5d5d;

	tiles = game.add.group();
	text1 = game.add.text(800, 200, "Player 1 = 0", { font: "65px Arial", fill: "#ff0044", align: "center" });
	text2 = game.add.text(800, 400, "Player 2 = 0", { font: "65px Arial", fill: "#ff0044", align: "center" });
	text1.anchor.set(0.5);
	text2.anchor.set(0.5);
	text1.inputEnabled = true;
	text2.inputEnabled = true;
	for(x = 0; x < 10; x++)
	{
		for(y = 0; y < 10; y++)
		{
			var tile = tiles.create(100 + (50*y), 100 + (50*x), 'tiles');
			tile.inputEnabled = true;
			tile.frame = 0;
			tile.events.onInputDown.add(boxcolor);
			setTilePos(tile, x, y);
		}
	}
}
function setTilePos(tile, x, y) {
	tile.posX = x;
	tile.posY = y;
	tile.id = calcTileId(x, y);
}
function calcTileId(posX, posY) {
	return posX + posY*10;
}
function update() { 
}
function countSameColorTiles(startTile, moveX, moveY) {
	var curX = startTile.posX + moveX;
	var curY = startTile.posY + moveY;
	var count = 0;

	while (curX >= 0 && curY >= 0 && curX < 10 && curY < 10 && (getTileColor(getTile(curX, curY)) === getTileColor(startTile)))
	{
		count++;
		curX += moveX;
		curY += moveY;
	}
	return count;
}
function getTileColor(tile) {
	return tile.frame;
}
function getTile(posX, posY) {
	return tiles.iterate("id", calcTileId(posX, posY), Phaser.Group.RETURN_CHILD);
}
function check(tile) {
	var countUp = countSameColorTiles(tile, 0, -1);
	var countDown = countSameColorTiles(tile, 0, 1);
	var countLeft = countSameColorTiles(tile, -1, 0);
	var countRight = countSameColorTiles(tile, 1, 0);
	
	var countHoriz = countLeft + countRight + 1;
	var countVert = countUp + countDown + 1;
	var points = 0;

	if(countHoriz >= 3)
		points += countHoriz;
	else if (countVert >= 3)
		points += countVert;
	return points;
}
function boxcolor(item, pointer) {
	if(turn == 1)
	{
		item.frame = 1;
		turn = 0;
		item.inputEnabled = false;
		player1 += check(item);
		text1.text = "Player 1 = " + player1;
		count_moves++;
		if(count_moves === 100)
		{
			if(player1 > player2)
				setTimeout(function(){alert('Player 1 wins!')},500);
			else if(player1 < player2)
				setTimeout(function(){alert('Player 2 wins!')},500)
			else
				setTimeout(function(){alert('Match Drawn!')},500)
		}
		return;
	}
	if(turn == 0)
	{
		item.frame = 2;
		turn = 1;
		item.inputEnabled = false;
		player2 += check(item);
		text2.text = "Player 2 = " + player2;
		count_moves++;
		{
			if(player1 > player2)
				setTimeout(function(){alert('Player 1 wins!')},500);
			else if(player1 < player2)
				setTimeout(function(){alert('Player 2 wins!')},500)
			else
				setTimeout(function(){alert('Match Drawn!')},500)
		}
		return;
	}
}

