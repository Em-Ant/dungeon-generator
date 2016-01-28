
var floorMap = DungeonGenerator.generate({
  maxRoomSize:5,
  minRoomSize:5,
  rooms: 22,
  empty: '\u00a0',
  rows: 40,
  cols: 60
});

var el = document.getElementById('view');
floorMap.forEach(function(e){
  var txt = e.join('');
  append(el,txt);
})

function append(el, text) {
  var p = document.createElement('p');
  var t = document.createTextNode(text);
  p.appendChild(t);
  el.appendChild(p);
}
