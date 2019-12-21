var VERVE;
(function (VERVE) {
    class Buffer {
        constructor(gl) {
            this._data = [];
            this._indices = [];
            this._gl = gl;
            this._vertexBuffer = gl.createBuffer();
            this._textureBuffer = gl.createBuffer();
            this._indexBuffer = gl.createBuffer();
        }
        loadData(data, indices) {
            this._data = data;
            this._indices = indices;
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._textureBuffer);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), this._gl.STATIC_DRAW);
            this._gl.vertexAttribPointer(1, 2, this._gl.FLOAT, false, 0, 0);
            this._gl.enableVertexAttribArray(1);
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(this._data), this._gl.STATIC_DRAW);
            this._gl.vertexAttribPointer(0, 2, this._gl.FLOAT, false, 0, 0);
            this._gl.enableVertexAttribArray(0);
            this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
            this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this._indices), this._gl.STATIC_DRAW);
        }
        enableVertex(location) {
        }
        bind(texture) {
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
            this._gl.vertexAttribPointer(0, 2, this._gl.FLOAT, false, 0, 0);
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._textureBuffer);
            this._gl.vertexAttribPointer(1, 2, this._gl.FLOAT, false, 0, 0);
        }
        unbind() {
            this._gl.disableVertexAttribArray(0);
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null);
        }
        draw() {
            this._gl.drawElements(this._gl.TRIANGLES, this._indices.length, this._gl.UNSIGNED_SHORT, 0);
        }
    }
    VERVE.Buffer = Buffer;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class Sprite {
        constructor(gl, shader, width, height) {
            this._data = [];
            this._indices = [];
            this._gl = gl;
            this._shader = shader;
            this.makeData(width / 100);
            this._texture = new VERVE.Texture(gl);
        }
        load(image) {
            this._buffer = new VERVE.Buffer(this._gl);
            this._buffer.loadData(this._data, this._indices);
            if (image != undefined)
                this._texture.load(image);
        }
        makeData(num = 0) {
            this._data = [
                -0.5, 0.5,
                0.5, 0.5,
                0.5, -0.5,
                -0.5, -0.5,
            ];
            for (let i = 0; i < this._data.length; i++) {
                this._data[i] += num;
            }
            console.log(this._data);
            this._indices = [
                0, 1, 2, 2, 3, 0
            ];
        }
        update() {
        }
        render() {
            this._texture.active();
            this._buffer.bind(this._texture);
            this._buffer.draw();
        }
    }
    VERVE.Sprite = Sprite;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class Texture {
        constructor(gl) {
            this._gl = gl;
            this._texture = gl.createTexture();
            this.bind();
            this._gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 0]));
            this.unbind();
        }
        bind() {
            this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
        }
        unbind() {
            this._gl.bindTexture(this._gl.TEXTURE_2D, undefined);
        }
        load(image) {
            this.bind();
            this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, this._gl.RGBA, this._gl.UNSIGNED_BYTE, image);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.LINEAR);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.LINEAR);
            this.unbind();
            console.log("completing");
        }
        active() {
            this.bind();
            this._gl.activeTexture(this._gl.TEXTURE0);
        }
    }
    VERVE.Texture = Texture;
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
        }
        init() {
            this._shader = new VERVE.BasicShader(this.gl);
            this._shader.bind();
        }
        temClass() {
            this._sprite = new VERVE.Sprite(this.gl, this._shader, 100, 100);
            this._sprite2 = new VERVE.Sprite(this.gl, this._shader, 0, 100);
            this._sprite.load(imageForTexture);
            this._sprite2.load();
        }
        update() {
        }
        render() {
            this.gl.clearColor(1, 0, 1, 1);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT);
            this._sprite2.render();
            this._sprite.render();
        }
    }
    VERVE.Renderer = Renderer;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class Shader {
        constructor(name, gl) {
            this._attributes = {};
            this._uniforms = {};
            this._name = name;
            this._gl = gl;
        }
        getAttributeLocation(name) {
            if (this._attributes[name] == undefined) {
                throw new Error(`attribute ${name} dose not exist in the shader ${this._name}`);
            }
            return this._attributes[name];
        }
        getUniformLocation(name) {
            if (this._uniforms[name] == undefined) {
                throw new Error(`unfiorm ${name} dose not exist in the shader ${this._name}`);
            }
            return this._uniforms[name];
        }
        laod(vertexSource, fragmentSource) {
            let vertexShader = this.loadShader(vertexSource, this._gl.VERTEX_SHADER);
            let fragmentShader = this.loadShader(fragmentSource, this._gl.FRAGMENT_SHADER);
            this.makeProgram(vertexShader, fragmentShader);
            this.detectedAttributes();
            this.detectedUniforms();
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
        detectedAttributes() {
            let totalAttributes = this._gl.getProgramParameter(this._program, this._gl.ACTIVE_ATTRIBUTES);
            for (let i = 0; i < totalAttributes; i++) {
                let attribute = this._gl.getActiveAttrib(this._program, i);
                if (attribute == undefined) {
                    console.log("breaking the system attribute");
                    break;
                }
                this._attributes[attribute.name] = this._gl.getAttribLocation(this._program, attribute.name);
            }
        }
        detectedUniforms() {
            let totalUniforms = this._gl.getProgramParameter(this._program, this._gl.ACTIVE_UNIFORMS);
            for (let i = 0; i < totalUniforms; i++) {
                let uniform = this._gl.getActiveUniform(this._program, i);
                if (uniform == undefined) {
                    console.log("breaking the system uniform");
                    break;
                }
                this._uniforms[uniform.name] = this._gl.getUniformLocation(this._program, uniform.name);
            }
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
        attribute vec2 a_coordinate;
        attribute vec2 a_textureCoord;
        varying vec2 v_textureColor;
        uniform float u_zCoord;
        void main() {
            v_textureColor = a_textureCoord;
            gl_Position = vec4(a_coordinate, u_zCoord, 1.0);
        }
        `;
            this._fragmentSource = `
        precision mediump float;
        varying vec2 v_textureColor;
        uniform sampler2D sampler;
        
        void main() {
            //gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            gl_FragColor = texture2D(sampler, v_textureColor);
        }
        `;
            this.laod(this._vertexSource, this._fragmentSource);
        }
    }
    VERVE.BasicShader = BasicShader;
})(VERVE || (VERVE = {}));
let imageForTexture = new Image();
imageForTexture.src = `Assets/Textures/star2.png`;
imageForTexture.onload = () => {
    renderer.temClass();
    start();
};
let renderer = new VERVE.Renderer("canvas");
function start() {
    requestAnimationFrame(start);
    renderer.render();
}
window.onload = () => {
    console.log(imageForTexture);
};
//# sourceMappingURL=VERVE.js.map