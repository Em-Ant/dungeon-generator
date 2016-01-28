/**
* DUNGEON MAP GENERATOR v0.1 by EmAnt - 2016
* -----------------------------------------------
*
* It adds a Global Object 'DungeonGenerator', which has a
* function memeber 'generate'.
*
* Usage:
*
* {Array[Array]} floorMap =
*   DungeonGenerator.generate({Object} * config);
*
* config = {
*   rows: default 30,
*   cols: default 50,
*   minRoomSize: default 3,
*   maxRoomSize: default 6,
*   padding: map padding - default 2,
*   wall : symbol for wall - default 'o',
*   empty: symbol for empty - default '.',
*   rooms: expected rooms - default 15
*   attempts: max attempts placing rooms - default 500
* }
*
* @param {Object} config
* @return {Array[Array]} floorMap
*/

var DungeonGenerator = (function(){

  var MAXSIZE, MINSIZE, ROWS, COLS, BORDER, ATTEMPTS, WALL, EMPTY, ROOMS

  function isNotOverlapping(floorMap, room) {
    for (var i = room.row - 1; i < room.row + room.h + 1  ; i++ ) {
      for (var j = room.col-1; j < room.col + room.w +1; j++) {
        if (floorMap[i][j] !== WALL) return false;
      }
    }
    return true;
  }

  function linkStraightH(floorMap, r1, r2){
    var inc = r1.col < r2.col ? 1 : -1;
    for (var i = r1.col; i !== r2.col; i+=inc) {
      floorMap[r1.row][i] = EMPTY;
    }
  };

  function linkStraightV(floorMap, r1, r2){
    var inc = r1.row < r2.row ? 1 : -1;
    for (var i = r1.row; i !== r2.row; i+=inc) {
      floorMap[i][r1.col] = EMPTY;
    }
  };

  function link2Steps(floorMap, r1, r2) {
    // TOP LEFT
    var flipCoin = Math.random()*2;
    if(r1.row > r2.row && r1.col > r2.col) {
      if (flipCoin) {
        // V First
        for (var i = r1.row; i != r2.row + r2.h-2; i--)
          floorMap[i][r1.col] = EMPTY;
        for (var i = r1.col;  i != r2.col + r2.w-2; i--)
          floorMap[r2.row+r2.h-1][i] = EMPTY;
      } else {
        // H First
        for (var i = r1.col; i != r2.col + r2.w-2; i--)
          floorMap[r1.row][i] = EMPTY;
        for (var i = r1.row;  i != r2.row + r2.h-2; i--)
          floorMap[i][r2.col-r2.w-1] = EMPTY;
      }
    // TOP RIGHT
    } else if(r1.row > r2.row && r1.col < r2.col) {
        if (flipCoin) {
          // V First
          for (var i = r1.row; i != r2.row + r2.h-2; i--)
            floorMap[i][r1.col+r1.w-2] = EMPTY;
          for (var i = r1.col + r1.w-2;  i != r2.col; i++)
            floorMap[r2.row+r2.h-1][i] = EMPTY;
        } else {
          // H First
          for (var i = r1.col; i != r2.col + r2.w-2; i--)
            floorMap[r1.row][i] = EMPTY;
          for (var i = r1.row + r1.h-2;  i != r2.row; i++)
            floorMap[i][r2.col+r2.w-1] = EMPTY;
        }
    } else {
      return false;
    }
    return true;
  };

  function linkRooms(floorMap, r1, r2) {
    if (r1.row >= r2.row && r1.row < r2.row + r2.h) {
      linkStraightH(floorMap, r1, r2);
    } else if (r2.row >= r1.row && r2.row < r1.row + r1.h) {
      linkStraightH(floorMap, r2, r1);
    } else if (r1.col >= r2.col && r1.col < r2.col + r2.w) {
      linkStraightV(floorMap, r1, r2);
    } else if (r2.col >= r1.col && r2.col < r1.col + r1.w) {
      linkStraightV(floorMap, r2, r1);
    } else {
      if(!link2Steps(floorMap, r1, r2))
        link2Steps(floorMap, r2, r1);
    }
  }

  function addRoom(floorMap) {
    var h = Math.floor(Math.random()*(MAXSIZE - MINSIZE + 1)) + MINSIZE;
    var w = Math.floor(Math.random()*(MAXSIZE - MINSIZE + 1)) + MINSIZE;
    var room = {
      h: h,
      w: w,
      row: Math.floor(Math.random()*(ROWS - h - 2 * BORDER + 1)) + BORDER,
      col: Math.floor(Math.random()*(COLS - w - 2 * BORDER + 1)) + BORDER
    };
    if (isNotOverlapping(floorMap, room)){
      for (var i = room.row; i < room.row + room.h; i++) {
        for (var j = room.col; j < room.col + room.w; j++) {
          floorMap[i][j] = EMPTY;
        }
      }
      return room;
    } else return false;
  };

  var DungeonGenerator = {
    generate: function(config) {

      var cfg = config ? config : {};

      ROWS = cfg.rows || 30;
      COLS = cfg.cols || 50;
      MAXSIZE = cfg.maxRoomSize || 6;
      MINSIZE= cfg.minRoomSize || 3;
      BORDER = cfg.padding || 2;
      WALL = cfg.wall || 'x';
      EMPTY = cfg.empty || '.';
      ATTEMPTS = cfg.attempts || 500;
      ROOMS = cfg.rooms || 15;

      var floorMap = [];
      for (var i = 0; i < ROWS; i++) {
        var r = [];
        for (j = 0; j < COLS; j++) {
          r.push(WALL);
        }
        floorMap.push(r);
      }

      var roomsToLink = [];
      var roomsLinked = [];
      var i = 0;
      var r = 0;
      while (i < ATTEMPTS && r < ROOMS){
        var newRooom = addRoom(floorMap);
        if(newRooom) {
          roomsToLink.push(newRooom);
          r++;
        }
        i++;
      }

      roomsLinked.push(roomsToLink.pop());
      while(roomsToLink.length) {
        var r1 = roomsLinked[roomsLinked.length-1];
        var r2 = roomsToLink.pop();
        linkRooms(floorMap,r1,r2);
        roomsLinked.push(r2);
        r1 = r2;
      }
      return floorMap;
    }
  };
  return DungeonGenerator;
})();
