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
    class Color {
        constructor(r = 0, g = 0, b = 0, a = 255) {
            this._r = r;
            this._g = g;
            this._b = b;
            this._a = a;
        }
        toFloatArray() {
            return [this._r / 255, this._g / 255, this._b / 255, this._a / 255];
        }
        static getColor(color) {
            let r, g, b, a = 255;
            if (color.charAt(0) === "#") {
                let value = color.split("#")[1];
                r = parseInt(value.substring(0, 2), 16);
                g = parseInt(value.substring(2, 4), 16);
                b = parseInt(value.substring(4, 6), 16);
                return new Color(r, g, b);
            }
            else if (color.substring(0, 4) === "rbga") {
                let value = color.split("rbga")[1].slice(1, -1);
                let colors = value.split(",");
                r = parseInt(colors[0]);
                if (isNaN(r)) {
                    throw new Error(`wrong rbga format: red value is not defined`);
                }
                g = parseInt(colors[1]);
                if (isNaN(g)) {
                    throw new Error(`wrong rbga format: green value is not defined`);
                }
                b = parseInt(colors[2]);
                if (isNaN(b)) {
                    throw new Error(`wrong rbga format: blue value is not defined`);
                }
                a = parseInt(colors[3]);
                if (isNaN(a)) {
                    throw new Error(`wrong rbga format: alpah value is not defined`);
                }
                return new Color(r, g, b, a);
            }
            else if (color.substring(0, 3) === "rbg") {
                let value = color.split("rbga")[1].slice(1, -1);
                let colors = value.split(",");
                r = parseInt(colors[0]);
                if (isNaN(r)) {
                    throw new Error(`wrong rbga format: red value is not defined`);
                }
                g = parseInt(colors[1]);
                if (isNaN(g)) {
                    throw new Error(`wrong rbga format: green value is not defined`);
                }
                b = parseInt(colors[2]);
                if (isNaN(b)) {
                    throw new Error(`wrong rbga format: blue value is not defined`);
                }
                return new Color(r, g, b);
            }
            console.error(`color format "${color}" is incorrect. setting white for the color`);
            return new Color(255, 255, 255);
        }
    }
    VERVE.Color = Color;
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
    class CircleGeometry extends VERVE.Geometry {
        constructor(radius, segments) {
            super();
            this.setData(radius, segments);
        }
        setData(radius, segments) {
            let angle = 2 * Math.PI / segments;
            let data = [];
            data.push(0, 0);
            for (let i = 0; i < segments; i++) {
                let x = radius * Math.cos(angle * i);
                let y = radius * Math.sin(angle * i);
                data.push(x, y);
            }
            this._data = data;
            let indices = [];
            for (let i = 0; i < segments; i++) {
                let t1 = 0, t2 = i + 1, t3;
                if (i === segments - 1) {
                    t3 = 1;
                }
                else {
                    t3 = i + 2;
                }
                indices.push(t1, t2, t3);
            }
            this._indices = indices;
        }
    }
    VERVE.CircleGeometry = CircleGeometry;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class EllipseGeometry extends VERVE.Geometry {
        constructor(r1, r2, segments) {
            super();
            this.setData(r1, r2, segments);
        }
        setData(r1, r2, segments) {
            let angle = 2 * Math.PI / segments;
            let data = [];
            data.push(0, 0);
            for (let i = 0; i < segments; i++) {
                let x = r1 * Math.cos(angle * i);
                let y = r2 * Math.sin(angle * i);
                data.push(x, y);
            }
            this._data = data;
            let indices = [];
            for (let i = 0; i < segments; i++) {
                let t1 = 0, t2 = i + 1, t3;
                if (i === segments - 1) {
                    t3 = 1;
                }
                else {
                    t3 = i + 2;
                }
                indices.push(t1, t2, t3);
            }
            this._indices = indices;
        }
    }
    VERVE.EllipseGeometry = EllipseGeometry;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class PlaneGeometry extends VERVE.Geometry {
        constructor(width, height) {
            super();
            this._data = [
                -width / 2, -height / 2,
                width / 2, -height / 2,
                width / 2, height / 2,
                -width / 2, height / 2
            ];
            this._indices = [
                0, 1, 2,
                2, 3, 0,
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
        }
        update() {
        }
        draw() {
            this._buffer.bind();
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
            this._gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));
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
    class Material {
        get texture() {
            return this._texture;
        }
        set texture(value) {
            this._texture = value;
        }
    }
    VERVE.Material = Material;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class BasicMaterial extends VERVE.Material {
        constructor(color) {
            super();
            this._color = VERVE.Color.getColor(color);
        }
        set color(value) {
            this._color = VERVE.Color.getColor(value);
        }
        loadUniform(gl, shader) {
            let colorLocation = shader.getUniformLocation("u_color");
            gl.uniform4fv(colorLocation, new Float32Array(this._color.toFloatArray()));
        }
    }
    VERVE.BasicMaterial = BasicMaterial;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class TextureMaterial extends VERVE.Material {
        constructor(image) {
            super();
            this._image = image;
        }
        loadTexture() {
            this._texture.load(this._image);
        }
        loadUniform(gl, shader) {
            let colorLocation = shader.getUniformLocation("u_color");
            gl.uniform4f(colorLocation, 1, 1, 1, 1);
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
        constructor() {
            this._component = [];
            this.isLoading = true;
            this._transform = new VERVE.Transform();
            this.worldMatrix = this._transform.getTranformationMatrix();
        }
        get scene() {
            return this._scene;
        }
        set scene(value) {
            this._scene = value;
        }
        get x() {
            return this._transform.position.x;
        }
        set x(value) {
            this._transform.position.x = value;
        }
        get y() {
            return this._transform.position.y;
        }
        set y(value) {
            this._transform.position.y = value;
        }
        get rotate() {
            return this._transform.rotation.z;
        }
        set rotate(value) {
            this._transform.rotation.z = value;
        }
        load(gl) {
            for (let c of this._component) {
                if (c.isLoading) {
                    c.load(gl);
                    c.isLoading = false;
                }
            }
            this.isLoading = false;
        }
        addComponent(component) {
            this._component.push(component);
            component.parent = this;
        }
        removeComponent(component) {
            let index = this._component.indexOf(component);
            if (index !== -1) {
                this._component.splice(index, 1);
            }
        }
        update() {
            this.worldMatrix = this._transform.getTranformationMatrix();
            for (let c of this._component) {
                c.update();
            }
        }
        render(render) {
            for (let c of this._component) {
                c.render(render);
            }
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
        addObject(gameObject) {
            this._gameObject.push(gameObject);
        }
        update() {
            for (let g of this._gameObject) {
                g.update();
            }
        }
        render(renderer) {
            for (let g of this._gameObject) {
                g.render(renderer);
            }
        }
    }
    VERVE.Scene = Scene;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class ShapeComponent {
        constructor(geometry, material) {
            this.isLoading = true;
            this._geometry = geometry;
            this._material = material;
            this._transform = new VERVE.Transform();
        }
        get x() {
            return this._transform.position.x;
        }
        set x(val) {
            this._transform.position.x = val;
        }
        get y() {
            return this._transform.position.y;
        }
        set y(val) {
            this._transform.position.y = val;
        }
        get rotate() {
            return this._transform.rotation.z;
        }
        set rotate(val) {
            this._transform.rotation.z = val;
        }
        load(gl) {
            this._buffer = new VERVE.Buffer(gl);
            this._buffer.loadData(this._geometry.data, this._geometry.indices);
            this._material.texture = new VERVE.Texture(gl);
        }
        update() {
            this._localMatrix = this._transform.getTranformationMatrix();
        }
        render(render) {
            let model = VERVE.Matrix4X4.multiply(this.parent.worldMatrix, this._localMatrix);
            let modelLocation = render.shader.getUniformLocation("u_model");
            render.gl.uniformMatrix4fv(modelLocation, false, new Float32Array(model.data));
            this._material.loadUniform(render.gl, render.shader);
            this._material.texture.active();
            this._buffer.bind();
            this._buffer.draw();
            this._buffer.unbind();
        }
    }
    VERVE.ShapeComponent = ShapeComponent;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class SpriteComponent {
        constructor(geometry, material) {
            this.isLoading = true;
            this._geometry = geometry;
            this._material = material;
            this._transform = new VERVE.Transform();
        }
        get buffer() {
            return this._buffer;
        }
        set buffer(value) {
            this._buffer = value;
        }
        get x() {
            return this._transform.position.x;
        }
        set x(val) {
            this._transform.position.x = val;
        }
        get y() {
            return this._transform.position.y;
        }
        set y(val) {
            this._transform.position.y = val;
        }
        get rotate() {
            return this._transform.rotation.z;
        }
        set rotate(val) {
            this._transform.rotation.z = val;
        }
        load(gl) {
            this._buffer = new VERVE.TextureBuffer(gl);
            this._buffer.loadData(this._geometry.data, this._geometry.indices);
            this._material.texture = new VERVE.Texture(gl);
            if (this._material instanceof VERVE.TextureMaterial) {
                this._material.loadTexture();
            }
            this._material.texture.active();
        }
        update() {
            this._localMatrix = this._transform.getTranformationMatrix();
        }
        render(render) {
            let model = VERVE.Matrix4X4.multiply(this.parent.worldMatrix, this._localMatrix);
            let modelLocation = render.shader.getUniformLocation("u_model");
            render.gl.uniformMatrix4fv(modelLocation, false, new Float32Array(model.data));
            this._material.loadUniform(render.gl, render.shader);
            this._material.texture.active();
            this._buffer.bind();
            this._buffer.draw();
        }
    }
    VERVE.SpriteComponent = SpriteComponent;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class Buffer {
        constructor(gl) {
            this._data = [];
            this._indices = [];
            this._gl = gl;
            this._vertexBuffer = gl.createBuffer();
            this._indexBuffer = gl.createBuffer();
        }
        loadData(data, indices) {
            this._data = data;
            this._indices = indices;
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(this._data), this._gl.STATIC_DRAW);
            this._gl.vertexAttribPointer(0, 2, this._gl.FLOAT, false, 0, 0);
            this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
            this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this._indices), this._gl.STATIC_DRAW);
        }
        bind() {
            this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
            this._gl.vertexAttribPointer(0, 2, this._gl.FLOAT, false, 0, 0);
            this._gl.enableVertexAttribArray(0);
        }
        unbind() {
            this._gl.disableVertexAttribArray(0);
            this._gl.disableVertexAttribArray(1);
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
            this.shader = new VERVE.BasicShader(this.gl);
            this.shader.bind();
            this.gl.enable(this.gl.BLEND);
            this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
        }
        tempFun() {
        }
        setCamera(camera) {
            let projectionLocation = this.shader.getUniformLocation("u_projectionView");
            this.gl.uniformMatrix4fv(projectionLocation, false, new Float32Array(camera.projection.data));
            let colorLocation = this.shader.getUniformLocation("u_color");
            this.gl.uniform4f(colorLocation, 1, 1, 1, 1);
        }
        loadObject(gameObject) {
            if (gameObject.isLoading) {
                gameObject.load(this.gl);
                console.log("working");
                gameObject.isLoading = false;
            }
        }
        update() {
            scene.update();
        }
        render(scene) {
            this.gl.clearColor(0, 1, 1, 1);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT);
            for (let object of scene._gameObject) {
                this.loadObject(object);
            }
            scene.render(this);
        }
    }
    VERVE.Renderer = Renderer;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class TextureBuffer extends VERVE.Buffer {
        constructor(gl) {
            super(gl);
            this._textureBuffer = gl.createBuffer();
        }
        loadData(data, indices) {
            super.loadData(data, indices);
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._textureBuffer);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), this._gl.STATIC_DRAW);
            this._gl.vertexAttribPointer(1, 2, this._gl.FLOAT, false, 0, 0);
        }
        bind() {
            super.bind();
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._textureBuffer);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), this._gl.STATIC_DRAW);
            this._gl.vertexAttribPointer(1, 2, this._gl.FLOAT, false, 0, 0);
            this._gl.enableVertexAttribArray(1);
        }
    }
    VERVE.TextureBuffer = TextureBuffer;
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
        uniform mat4 u_projectionView;
        uniform mat4 u_model;
        void main() {
            v_textureColor = a_textureCoord;
            gl_Position = u_projectionView*u_model*vec4(a_coordinate, u_zCoord, 1.0);
        }
        `;
            this._fragmentSource = `
        precision mediump float;
        varying vec2 v_textureColor;
        uniform sampler2D sampler;
        uniform vec4 u_color;
        void main() {
            //gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
            // vec4 color = vec4(1.0, 1.0, 1.0, 1.0);
            gl_FragColor = texture2D(sampler, v_textureColor)*u_color;
            // gl_FragColor = color*u_color;
            // gl_FragColor.rgb *= gl_FragColor.a;
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
let camera = new VERVE.Camera(0, renderer.canvas.width, renderer.canvas.height, 0);
let renderer2 = new VERVE.Renderer();
document.body.appendChild(renderer2.canvas);
renderer2.setCamera(camera);
renderer.setCamera(camera);
let scene = new VERVE.Scene();
let gameObject = new VERVE.GameObject();
let geomentry = new VERVE.PlaneGeometry(500, 500);
let material = new VERVE.BasicMaterial("#ff0000");
let texture = new VERVE.TextureMaterial(imageForTexture);
let spriteComponent = new VERVE.ShapeComponent(geomentry, material);
let geomentry2 = new VERVE.PlaneGeometry(200, 200);
let spriteComponent2 = new VERVE.SpriteComponent(geomentry2, texture);
spriteComponent2.x = 200;
spriteComponent2.y = 50;
let circle = new VERVE.CircleGeometry(100, 8);
let circleMaterial = new VERVE.BasicMaterial("#ff2556");
let spriteComponent3 = new VERVE.ShapeComponent(circle, circleMaterial);
let ellipse = new VERVE.EllipseGeometry(280, 100, 100);
let ellipseMaterial = new VERVE.BasicMaterial("#05a478");
let ellispeComponent = new VERVE.ShapeComponent(ellipse, ellipseMaterial);
let gameObject2 = new VERVE.GameObject();
gameObject2.addComponent(ellispeComponent);
gameObject2.addComponent(spriteComponent3);
gameObject2.x = 400;
gameObject2.y = 300;
gameObject.x = 300;
gameObject.y = 300;
spriteComponent3.rotate = Math.PI / 4;
spriteComponent2.rotate = 20;
scene.addObject(gameObject2);
scene.addObject(gameObject);
gameObject.addComponent(spriteComponent2);
gameObject.addComponent(spriteComponent);
let scene2 = new VERVE.Scene();
scene2.addObject(gameObject);
let updating = true;
material.color = "rbga(255, 255, 0, 40)";
function start() {
    requestAnimationFrame(start);
    if (updating)
        renderer.update();
    renderer.render(scene);
    gameObject.rotate += 0.01;
    ellispeComponent.rotate -= 0.01;
    spriteComponent3.rotate += 0.01;
    spriteComponent2.rotate += Math.PI / 180 * 1;
}
VERVE.Color.getColor("rbga(255, 45, 78, 20)");
window.onload = () => {
    console.log(imageForTexture);
    renderer.tempFun();
    start();
};
//# sourceMappingURL=VERVE.js.map