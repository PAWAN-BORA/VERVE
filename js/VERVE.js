var VERVE;
(function (VERVE) {
    class Buffer {
        constructor(gl) {
            this._data = [];
            this._gl = gl;
            this._buffer = gl.createBuffer();
        }
        loadData(data) {
            this._data = data;
        }
        bind() {
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffer);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(this._data), this._gl.STATIC_DRAW);
            this._gl.vertexAttribPointer(0, 3, this._gl.FLOAT, false, 3 * 4, 0);
            this._gl.enableVertexAttribArray(0);
        }
        unbind() {
            this._gl.disableVertexAttribArray(0);
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null);
        }
        draw() {
            this._gl.drawArrays(this._gl.TRIANGLES, 0, 3);
        }
    }
    VERVE.Buffer = Buffer;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class Sprite {
        constructor(gl, width, height) {
            this._data = [];
            this._gl = gl;
            this.makeData();
        }
        load() {
            this._buffer = new VERVE.Buffer(this._gl);
            this._buffer.loadData(this._data);
        }
        makeData() {
            this._data = [
                0.0, 1.0, 0.0,
                -1.0, -1.0, 0.0,
                1.0, -1.0, 0.0
            ];
        }
        update() {
        }
        render() {
            this._buffer.bind();
            this._buffer.draw();
        }
    }
    VERVE.Sprite = Sprite;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class Canvas {
        constructor(canvasId) {
            this.canvas;
            if (canvasId == undefined) {
                this.canvas = document.createElement("canvas");
                if (this.canvas == undefined) {
                    throw new Error("Error in initialising canvas");
                }
                this.context = this.canvas.getContext("webgl", { alpha: false });
                if (this.context == undefined) {
                    throw new Error("Error in webgl context!");
                }
            }
            else {
                this.canvas = document.getElementById(canvasId);
                if (this.canvas == undefined) {
                    throw new Error(`${canvasId} is not defined`);
                }
                this.context = this.canvas.getContext("webgl", { alpha: false });
                if (this.context == undefined) {
                    throw new Error("Error in webgl context!");
                }
            }
        }
        getCanvas() {
            return this.canvas;
        }
        getContext() {
            return this.context;
        }
    }
    VERVE.Canvas = Canvas;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class Renderer {
        constructor(CanvasId) {
            let canvasData = new VERVE.Canvas(CanvasId);
            this.canvas = canvasData.getCanvas();
            this.gl = canvasData.getContext();
            this.init();
            this._sprite = new VERVE.Sprite(this.gl, 100, 100);
            this._sprite.load();
        }
        init() {
            this._shader = new VERVE.BasicShader(this.gl);
            this._shader.bind();
        }
        update() {
        }
        render() {
            this.gl.clearColor(1, 0, 1, 1);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT);
            this._sprite.render();
        }
    }
    VERVE.Renderer = Renderer;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class Shader {
        constructor(name, gl) {
            this._name = name;
            this._gl = gl;
        }
        laod(vertexSource, fragmentSource) {
            let vertexShader = this.loadShader(vertexSource, this._gl.VERTEX_SHADER);
            let fragmentShader = this.loadShader(fragmentSource, this._gl.FRAGMENT_SHADER);
            this.makeProgram(vertexShader, fragmentShader);
        }
        bind() {
            this._gl.useProgram(this._program);
        }
        loadShader(source, shaderType) {
            let shader = this._gl.createShader(shaderType);
            this._gl.shaderSource(shader, source);
            this._gl.compileShader(shader);
            if (!this._gl.getShaderParameter(shader, this._gl.COMPILE_STATUS)) {
                throw new Error(`An error occurred compiling the ${this._name} shader: ${this._gl.getShaderInfoLog(shader)}`);
            }
            return shader;
        }
        makeProgram(vertexShader, fragmentShader) {
            this._program = this._gl.createProgram();
            this._gl.attachShader(this._program, vertexShader);
            this._gl.attachShader(this._program, fragmentShader);
            this._gl.linkProgram(this._program);
        }
    }
    VERVE.Shader = Shader;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class BasicShader extends VERVE.Shader {
        constructor(gl) {
            super("Basic", gl);
            this._vertexSource = `
        attribute vec3 v_coordinate; 
        void main() {
            gl_Position = vec4(v_coordinate, 1.0);
        }
        `;
            this._fragmentSource = `
        precision mediump float;

        void main() {
            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
        `;
            this.laod(this._vertexSource, this._fragmentSource);
        }
    }
    VERVE.BasicShader = BasicShader;
})(VERVE || (VERVE = {}));
let renderer = new VERVE.Renderer("canvas");
function start() {
    requestAnimationFrame(start);
    renderer.render();
}
start();
//# sourceMappingURL=VERVE.js.map