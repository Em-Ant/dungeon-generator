

var el = document.getElementById('view');

function append(el, text) {
  var p = document.createElement('p');
  var t = document.createTextNode(text);
  p.appendChild(t);
  el.appendChild(p);
}

function updateMap(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
  var floorMap = DungeonGenerator.generate({
    maxRoomSize: 7,
    minRoomSize: 7,
    padding: 2,
    rooms: 25,
    rows: 41,
    cols: 61
  });

  floorMap.forEach(function(e){
    var txt = e.map(function(cell){
      return cell.cellType === 'wall' ? 'x' : '\u00a0'})
      .join('');
    append(el,txt);
    }
  )
};

document.getElementById('generate').addEventListener('click',function(){
  updateMap(el);
})

updateMap(el);
