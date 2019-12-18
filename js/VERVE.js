var VERVE;
(function (VERVE) {
    class Canvas {
        getCanvas(canvasId) {
            let canvas;
            if (canvasId == undefined) {
                canvas = document.createElement("canvas");
                if (canvas == undefined) {
                    throw new Error("Error in initialising canvas");
                }
                VERVE.gl = canvas.getContext("webgl", { alpha: false });
                if (VERVE.gl == undefined) {
                    throw new Error("Error in webgl context!");
                }
                return canvas;
            }
            else {
                canvas = document.getElementById(canvasId);
                if (canvas == undefined) {
                    throw new Error(`${canvasId} is not defined`);
                }
                VERVE.gl = canvas.getContext("webgl", { alpha: false });
                if (VERVE.gl == undefined) {
                    throw new Error("Error in webgl context!");
                }
                return canvas;
            }
        }
    }
    VERVE.Canvas = Canvas;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class Renderer {
        constructor(CanvasId) {
            this.canvas = new VERVE.Canvas().getCanvas(CanvasId);
        }
        update() {
        }
        render() {
            VERVE.gl.clearColor(Math.random(), Math.random(), Math.random(), 1);
            VERVE.gl.clear(VERVE.gl.COLOR_BUFFER_BIT || VERVE.gl.DEPTH_BUFFER_BIT);
        }
    }
    VERVE.Renderer = Renderer;
})(VERVE || (VERVE = {}));
let renderer = new VERVE.Renderer("canvas");
function start() {
    requestAnimationFrame(start);
    renderer.render();
}
start();
//# sourceMappingURL=VERVE.js.map