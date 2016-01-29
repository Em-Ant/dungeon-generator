
# DUNGEON MAP GENERATOR v0.1 by EmAnt - 2016

**!! WARNING: Development version.**
**No input data validation included.**
---

### Description

It adds a Global Object `DungeonGenerator`, which has a function memeber `generate`.

### Usage:

Include it in your `index.html` scripts :

```HTML
...
<script type="text/javascript" src="./js/dungeon-generator.js"></script>
...
```
then generate a map :
```JS
floorMap = DungeonGenerator.generate(config);
```

```
{Array[Array[{Object} cell]]} floorMap =
   DungeonGenerator.generate({Object} config);

 @param {Object} config - configuration object

 config = {
   rows: default 31 - better if odd,
   cols: default 51 - better if odd,
   minRoomSize: default 3 - odd only,
   maxRoomSize: default 7 - odd only,
   padding: map padding - default 2,
   wall : symbol for wall - default 'x',
   empty: symbol for empty - default '.',
   rooms: expected rooms - default 15
   maxAttempts: max attempts placing rooms - default 500
 }

 @return {Array[Array[{Object} cell]]} - Matrix of cell objects

 cell = {
   char : cell character,
   row : cell row position,
   col : cell column position
 }
 ```

Test it live on my [Codepen](http://codepen.io/Em-Ant/pen/jWxVGK).
