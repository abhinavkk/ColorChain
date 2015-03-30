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
var cnt = 0;

function create() {
	game.stage.background = 0x5d5d5d;

	tiles = game.add.group();

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
function check(tile) {
	var countUp = countSameColorTiles(gem, 0, -1);
	var countDown = countSameColorTiles(gem, 0, 1);
	var countLeft = countSameColorTiles(gem, -1, 0);
	var countRight = countSameColorTiles(gem, 1, 0);
	
	var countHoriz = countLeft + countRight + 1;
	var countVert = countUp + countDown + 1;
}
function boxcolor(item, pointer) {
	if(turn == 1)
	{
		item.frame = 1;
		turn = 0;
		item.inputEnabled = false;
		check(item);
		// cnt = 0;
		// check_horizontal_left(item.position.x);
		// check_horizontal_right(item.position.x);
		// cnt = 0;
		// check_vertical_up(item.position.y);
		// check_vertical_down(item.position.y);
		// cnt = 0;
		// check_diagonal_prim_up(item.position.x, item.poistion.y);
		// check_diagonal_prim_down(item.position.x, item.position.y);
		// cnt = 0;
		// check_diagonal_notprim_up(item.position.x, item.position.y);
		// check_diagonal_notprim_down(item.position.x, item.position.y);
		return;
	}
	if(turn == 0)
	{
		item.frame = 2;
		turn = 1;
		item.inputEnabled = false;
		check(item);
		// cnt = 0;
		// check_horizontal_left(item.position.x);
		// check_horizontal_right(item.position.x);
		// cnt = 0;
		// check_vertical_up(item.position.y);
		// check_vertical_down(item.position.y);
		// cnt = 0;
		// check_diagonal_prim_up(item.position.x, item.poistion.y);
		// check_diagonal_prim_down(item.position.x, item.position.y);
		// cnt = 0;
		// check_diagonal_notprim_up(item.position.x, item.position.y);
		// check_diagonal_notprim_down(item.position.x, item.position.y);
		return;
	}
}
// function check_horizontal_left() {
// 	if()
// }
