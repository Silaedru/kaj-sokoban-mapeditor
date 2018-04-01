
const MapObject = {
    FLOOR: 0,
    WALL: 1,
    CRATE: 2,
    TARGET: 3,
    PLAYER: 4
};

const MapObjectColor = ["#ffffff", "#000000", "#9C927A", "#00aecd", "#ae0000"];

class SokobanMap {
    transformPositionToCoords(position) {
        return {
            x: position % this._width,
            y: Math.floor(position / this._width)
        }
    }

    transformCoordsToPosition(x, y) {
        return y * this._width + x;
    }

    setTile(x, y, type) {
        this._mapObject[this.transformCoordsToPosition(x, y)] = type;
    }

    getTiles() {
        return this._mapObject.map((tile, index) => {
            return {
                coords: this.transformPositionToCoords(index),
                tile: tile
            }
        });
    }

    getTile(x, y) {
        return this._mapObject[this.transformCoordsToPosition(x, y)];
    }

    asJson() {
        const walls = [];
        const targets = [];
        const crates = [];
        let player = null;

        this._mapObject.forEach((object, position) => {
           switch (object) {
               case MapObject.WALL:
                   walls.push(position);
                   break;

               case MapObject.TARGET:
                   targets.push(position);
                   break;

               case MapObject.CRATE:
                   crates.push(position);
                   break;

               case MapObject.PLAYER:
                   player = position;
                   break;
           }
        });

        return {
            width: this._width,
            height: this._height,
            walls: walls,
            crates: crates,
            targets: targets,
            player: player
        };
    }

    constructor(width, height) {
        this._width = width;
        this._height = height;

        this._mapObject = Array.apply(null, Array(width * height)).map(() => MapObject.FLOOR);
    }
}