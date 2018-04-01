

class CanvasGridRenderer {
    calculateCoordinateTransformation(x, y) {
        const cellWidth = Math.floor(this._canvas.width / this._gridWidth);
        const cellHeight = Math.floor(this._canvas.height / this._gridHeight);

        return {
            width: cellWidth,
            height: cellHeight,
            x: x*cellWidth,
            y: y*cellHeight
        }
    }

    calculateReverseCoordinateTransformation(x, y) {
        const cellWidth = Math.floor(this._canvas.width / this._gridWidth);
        const cellHeight = Math.floor(this._canvas.height / this._gridHeight);

        return {
            x: Math.min(Math.floor(x/cellWidth), this._gridWidth - 1),
            y: Math.min(Math.floor(y/cellHeight), this._gridHeight - 1)
        }
    }

    clear() {
        const context = this._canvas.getContext("2d");
        context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }

    render(color, x, y) {
        const context = this._canvas.getContext("2d");
        const coords = this.calculateCoordinateTransformation(x, y);

        context.beginPath();
        context.rect(coords.x, coords.y, coords.width, coords.height);
        context.fillStyle = color;
        context.strokeStyle = "#550000";
        context.stroke();
        context.fill();
    }

    resizeCanvas() {
        const maxCellDimension = 40;
        const canvasContainer = this._canvas.parentElement;

        const cellDimension = Math.min(Math.floor(canvasContainer.offsetWidth / this._gridWidth), maxCellDimension);

        this._canvas.width = cellDimension * this._gridWidth;
        this._canvas.height = cellDimension * this._gridHeight;
    }

    constructor(canvas, gridWidth, gridHeight) {
        this._canvas = canvas;
        this._gridWidth = gridWidth;
        this._gridHeight = gridHeight;

        this.resizeCanvas();
        window.addEventListener("resize", () => this.resizeCanvas(), false);
    }
}

function render(renderer, map) {
    renderer.clear();

    window.requestAnimationFrame(() =>{
        map.getTiles().forEach(tile => {
            renderer.render(MapObjectColor[tile.tile], tile.coords.x, tile.coords.y);
        });
    });
}