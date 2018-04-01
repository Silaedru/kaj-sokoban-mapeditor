
let map = null;
let renderer = null;

function resizeMap() {
    const width = parseInt(document.querySelector("#width").value);
    const height = parseInt(document.querySelector("#height").value);
    let oldTiles = null;

    if (map !== null)
        oldTiles = map.getTiles();

    map = new SokobanMap(width, height);
    renderer = new CanvasGridRenderer(document.querySelector("canvas"), width, height);

    if (oldTiles !== null) {
        oldTiles.forEach(tile => {
            if (tile.coords.x < width && tile.coords.y < height)
                map.setTile(tile.coords.x, tile.coords.y, tile.tile);
        });
    }

    render(renderer, map);
}

function handleClick(mouseX, mouseY) {
    let tile = parseInt(Array.apply(null, document.querySelectorAll("input[name='tile']")).filter(radio => radio.checked)[0].value);
    const coords = renderer.calculateReverseCoordinateTransformation(mouseX, mouseY);


    if (tile === MapObject.PLAYER) {
        map._mapObject = map._mapObject.map(mapTile => {

            if (mapTile === MapObject.PLAYER)
                return MapObject.FLOOR;

            return mapTile;
        });
    }

    if (map.getTile(coords.x, coords.y) === tile)
        tile = MapObject.FLOOR;

    map.setTile(coords.x, coords.y, tile);

    render(renderer, map);
}