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
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(this._data), this._gl.STATIC_DRAW);
            this._gl.vertexAttribPointer(0, 2, this._gl.FLOAT, false, 0, 0);
            this._gl.enableVertexAttribArray(0);
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._textureBuffer);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), this._gl.STATIC_DRAW);
            this._gl.vertexAttribPointer(1, 2, this._gl.FLOAT, false, 0, 0);
            this._gl.enableVertexAttribArray(1);
            this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
            this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this._indices), this._gl.STATIC_DRAW);
        }
        enableVertex(location) {
            this._gl.vertexAttribPointer(location, 2, this._gl.FLOAT, false, 2 * 4, 0);
            this._gl.enableVertexAttribArray(location);
        }
        bind(texture) {
            this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
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
    class Camera {
        constructor(left, right, bottom, top) {
            this.projection = VERVE.Matrix4X4.orthographic(left, right, bottom, top, 0, 100);
        }
    }
    VERVE.Camera = Camera;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class Geometry {
        constructor() {
            this._data = [];
            this._indices = [];
            this._vertices = [];
        }
        get data() {
            return this._data;
        }
        get indices() {
            return this._indices;
        }
        makeData() {
            this._data = [];
            for (let v of this._vertices) {
                this._data.push(v.x, v.y);
            }
        }
    }
    VERVE.Geometry = Geometry;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class PlaneGeometry extends VERVE.Geometry {
        constructor(width, height) {
            super();
            this._data = [
                0, 0,
                width, 0,
                width, height,
                0, height
            ];
            this._indices = [
                0, 1, 2,
                2, 0, 1,
            ];
        }
    }
    VERVE.PlaneGeometry = PlaneGeometry;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class Sprite {
        constructor(geometry, material) {
            this._data = [];
            this._indices = [];
            this._data = geometry.data;
            this._indices = geometry.indices;
        }
        load(gl) {
            this._buffer = new VERVE.Buffer(gl);
            this._buffer.loadData(this._data, this._indices);
            this._texture.load(imageForTexture);
            this._texture.active();
        }
        update() {
        }
        draw() {
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
    class Material {
    }
    VERVE.Material = Material;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class BasicMaterial extends VERVE.Material {
        constructor(color) {
            super();
            this._color = color;
        }
    }
    VERVE.BasicMaterial = BasicMaterial;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class TextureMaterial extends VERVE.Material {
        constructor(texture) {
            super();
            this._texture = texture;
        }
    }
    VERVE.TextureMaterial = TextureMaterial;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class Matrix4X4 {
        constructor() {
            this._data = [];
            this._data = [
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1,
            ];
        }
        get data() {
            return this._data;
        }
        static orthographic(left, right, bottom, top, near, far) {
            let mat = new Matrix4X4();
            let width = right - left;
            let height = bottom - top;
            let depth = far - near;
            mat._data[0] = 2.0 / width;
            mat._data[5] = -2.0 / height;
            mat._data[10] = -2.0 / depth;
            mat._data[12] = -(right + left) / width;
            mat._data[13] = (top + bottom) / height;
            mat._data[14] = (far + near) / depth;
            return mat;
        }
        static translation(position) {
            let mat = new Matrix4X4();
            mat._data[12] = position.x;
            mat._data[13] = position.y;
            mat._data[14] = position.z;
            return mat;
        }
        static rotationZ(angle) {
            let mat = new Matrix4X4();
            let c = Math.cos(angle);
            let s = Math.sin(angle);
            mat._data[0] = c;
            mat._data[1] = s;
            mat._data[4] = -s;
            mat._data[5] = c;
            return mat;
        }
        static scale(scale) {
            let mat = new Matrix4X4();
            mat._data[0] = scale.x;
            mat._data[5] = scale.y;
            mat._data[10] = scale.z;
            return mat;
        }
        static multiply(a, b) {
            let mat = new Matrix4X4();
            let a11 = a._data[0], a12 = a._data[4], a13 = a._data[8], a14 = a._data[12];
            let a21 = a._data[1], a22 = a._data[5], a23 = a._data[9], a24 = a._data[13];
            let a31 = a._data[2], a32 = a._data[6], a33 = a._data[10], a34 = a._data[14];
            let a41 = a._data[3], a42 = a._data[7], a43 = a._data[11], a44 = a._data[15];
            let b11 = b._data[0], b12 = b._data[4], b13 = b._data[8], b14 = b._data[12];
            let b21 = b._data[1], b22 = b._data[5], b23 = b._data[9], b24 = b._data[13];
            let b31 = b._data[2], b32 = b._data[6], b33 = b._data[10], b34 = b._data[14];
            let b41 = b._data[3], b42 = b._data[7], b43 = b._data[11], b44 = b._data[15];
            mat._data[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
            mat._data[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
            mat._data[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
            mat._data[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
            mat._data[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
            mat._data[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
            mat._data[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
            mat._data[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
            mat._data[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
            mat._data[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
            mat._data[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
            mat._data[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
            mat._data[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
            mat._data[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
            mat._data[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
            mat._data[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
            return mat;
        }
        static inverse(matrix) {
        }
    }
    VERVE.Matrix4X4 = Matrix4X4;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class Transform {
        constructor(position = new VERVE.Vector3, rotation = new VERVE.Vector3(), scale = VERVE.Vector3.one()) {
            this.position = position;
            this.rotation = rotation;
            this.scale = scale;
        }
        getTranformationMatrix() {
            let trasnlate = VERVE.Matrix4X4.translation(this.position);
            let rotate = VERVE.Matrix4X4.rotationZ(this.rotation.z);
            let scale = VERVE.Matrix4X4.scale(this.scale);
            return VERVE.Matrix4X4.multiply(VERVE.Matrix4X4.multiply(trasnlate, rotate), scale);
        }
    }
    VERVE.Transform = Transform;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class Vector2 {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        toArray() {
            return [this.x, this.y];
        }
    }
    VERVE.Vector2 = Vector2;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class Vector3 {
        constructor(x = 0, y = 0, z = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
        static one() {
            let vec = new Vector3();
            vec.x = 1;
            vec.y = 1;
            vec.z = 1;
            return vec;
        }
        Add(v) {
            this.x += v.x;
            this.y += v.y;
            this.z += v.z;
            return this;
        }
    }
    VERVE.Vector3 = Vector3;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class GameObject {
        constructor(parameters) {
        }
    }
    VERVE.GameObject = GameObject;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class Scene {
        constructor() {
            this._gameObject = [];
        }
        BeforeRender(renderer) {
        }
        addObject(SpriteComponent) {
            this._gameObject.push(SpriteComponent);
        }
        update() {
        }
        render() {
            for (let g of this._gameObject) {
                g.render();
                console.log(45);
            }
        }
    }
    VERVE.Scene = Scene;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class SpriteComponent {
        constructor(geometry, material) {
            this._geometry = geometry;
            this._material = material;
            this._sprite = new VERVE.Sprite(this._geometry, this._material);
        }
        update() {
        }
        render() {
            this._sprite.draw();
        }
    }
    VERVE.SpriteComponent = SpriteComponent;
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
        tempFun() {
        }
        update() {
        }
        render(scene) {
            this.gl.clearColor(1, 0, 1, 1);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT);
            scene.BeforeRender(this);
            scene.render();
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
            console.log(totalAttributes);
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
        uniform mat4 u_projectionView;
        void main() {
            v_textureColor = a_textureCoord;
            gl_Position = u_projectionView*vec4(a_coordinate, u_zCoord, 1.0);
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
let renderer = new VERVE.Renderer("canvas");
let scene = new VERVE.Scene();
let geomentry = new VERVE.PlaneGeometry(500, 500);
let spriteComponent = new VERVE.SpriteComponent(geomentry, undefined);
scene.addObject(spriteComponent);
function start() {
    requestAnimationFrame(start);
    renderer.render(scene);
}
window.onload = () => {
    console.log(imageForTexture);
    renderer.tempFun();
    start();
};
//# sourceMappingURL=VERVE.js.map