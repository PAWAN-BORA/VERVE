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
            else if (color.substring(0, 4) === "rgba") {
                let value = color.split("rgba")[1].slice(1, -1);
                let colors = value.split(",");
                r = parseInt(colors[0]);
                if (isNaN(r)) {
                    throw new Error(`wrong rgba format: red value is not defined`);
                }
                g = parseInt(colors[1]);
                if (isNaN(g)) {
                    throw new Error(`wrong rgba format: green value is not defined`);
                }
                b = parseInt(colors[2]);
                if (isNaN(b)) {
                    throw new Error(`wrong rgba format: blue value is not defined`);
                }
                a = parseInt(colors[3]);
                if (isNaN(a)) {
                    throw new Error(`wrong rgba format: alpah value is not defined`);
                }
                return new Color(r, g, b, a);
            }
            else if (color.substring(0, 3) === "rgb") {
                let value = color.split("rgb")[1].slice(1, -1);
                let colors = value.split(",");
                r = parseInt(colors[0]);
                if (isNaN(r)) {
                    throw new Error(`wrong rgba format: red value is not defined`);
                }
                g = parseInt(colors[1]);
                if (isNaN(g)) {
                    throw new Error(`wrong rgba format: green value is not defined`);
                }
                b = parseInt(colors[2]);
                if (isNaN(b)) {
                    throw new Error(`wrong rgba format: blue value is not defined`);
                }
                return new Color(r, g, b);
            }
            console.error(`color format "${color}" is incorrect.`);
            return undefined;
        }
    }
    VERVE.Color = Color;
})(VERVE || (VERVE = {}));
function randomInt(a, b) {
    if (a > b) {
        throw Error(`${a} should be less than ${b}`);
    }
    else {
        let totalNumber = b - a + 1;
        let x = Math.floor(Math.random() * totalNumber + a);
        return x;
    }
}
function randomIntArray(a, b) {
    if (a > b) {
        throw Error(`${a} should be less than ${b}`);
    }
    else {
        let array = [];
        let totalNumber = b - a + 1;
        for (let i = 0; i < totalNumber; i++) {
            let randomNum = randomInt(a, b);
            for (let j = 0; j < array.length; j++) {
                if (randomNum == array[j]) {
                    randomNum = randomInt(a, b);
                    j = -1;
                }
            }
            array.push(randomNum);
        }
        return array;
    }
}
function ranIntArrayInRange(num, range) {
    if (num > (range[1] - range[0])) {
        throw Error(`${num} should be less than the range of numbers`);
    }
    else {
        let array = [];
        for (let i = 0; i < num; i++) {
            let randomNum = randomInt(range[0], range[1]);
            for (let j = 0; j < array.length; j++) {
                if (randomNum == array[j]) {
                    randomNum = randomInt(range[0], range[1]);
                    j = -1;
                }
            }
            array.push(randomNum);
        }
        return array;
    }
}
function TwoDArray(row, column) {
    this.row = row;
    this.coloumn = column;
    let array = new Array(row);
    for (let j = 0; j < row; j++) {
        array[j] = new Array(column);
    }
    return array;
}
function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
}
function clamp(min, max, val) {
    if (val < min) {
        return min;
    }
    else if (val > max) {
        return max;
    }
    else {
        return val;
    }
}
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
            this.origin = new VERVE.Vector2();
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
        setOrigin() {
        }
    }
    VERVE.PlaneGeometry = PlaneGeometry;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    function getNumber(field) {
        return Number(field.split("=")[1]);
    }
    class FontGlyph {
        constructor() {
        }
        static getGlyphFromField(field) {
            let fontFlyph = new FontGlyph();
            fontFlyph.id = getNumber(field[1]);
            fontFlyph.x = getNumber(field[2]);
            fontFlyph.y = getNumber(field[3]);
            fontFlyph.width = getNumber(field[4]);
            fontFlyph.height = getNumber(field[5]);
            fontFlyph.xOffset = getNumber(field[6]);
            fontFlyph.yOffset = getNumber(field[7]);
            fontFlyph.xAdvanced = getNumber(field[8]);
            return fontFlyph;
        }
    }
    VERVE.FontGlyph = FontGlyph;
    class BitmapFont {
        constructor(content, path, fun) {
            this._glyphs = {};
            this._path = path;
            this.loadFun = fun;
            this.prossesFontFile(content);
        }
        get name() {
            return this._name;
        }
        set name(value) {
            this._name = value;
        }
        get width() {
            return this._width;
        }
        get height() {
            return this._height;
        }
        getGlyph(char) {
            let code = char.charCodeAt(0);
            return this._glyphs[code];
        }
        measureText() {
        }
        prossesFontFile(content) {
            let charCount = 0;
            let lines = content.split('\n');
            for (let line of lines) {
                let data = line.replace(/\s\s+/g, ' ');
                let fields = data.split(' ');
                switch (fields[0]) {
                    case "info":
                        break;
                    case "common":
                        this._width = getNumber(fields[3]);
                        this._height = getNumber(fields[4]);
                        break;
                    case "page":
                        let str = this._path.split('/');
                        str.pop();
                        let path = str.join('/').concat('/', fields[2].split("=")[1].replace(/"/g, ""));
                        this.fontImage = new Image();
                        this.fontImage.src = path;
                        this.fontImage.onload = () => {
                            if (this.loadFun !== undefined) {
                                this.loadFun();
                            }
                        };
                    case "chars":
                        charCount = getNumber(fields[1]);
                        break;
                    case "char":
                        let glyph = FontGlyph.getGlyphFromField(fields);
                        this._glyphs[glyph.id] = glyph;
                        break;
                    default:
                        break;
                }
            }
            let num = 0;
            for (let glyph in this._glyphs) {
                if (this._glyphs.hasOwnProperty(glyph)) {
                    num++;
                }
            }
            if (charCount !== num) {
                throw new Error(`font file reported existence of ${charCount} glyph, but only ${num} were found.`);
            }
        }
    }
    VERVE.BitmapFont = BitmapFont;
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
    class Vector2 {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }
        static add(v1, v2) {
            let vec = new Vector2();
            vec.x = v1.x + v2.x;
            vec.y = v1.y + v2.y;
            return vec;
        }
        static subtract(v1, v2) {
            let vec = new Vector2();
            vec.x = v1.x - v2.x;
            vec.y = v1.y - v2.y;
            return vec;
        }
        static dotProduct(v1, v2) {
            return v1.x * v2.x + v1.y * v2.y;
        }
        static crossProduct(v1, v2) {
            return v1.x * v2.y - v1.y * v2.x;
        }
        toArray() {
            return [this.x, this.y];
        }
        add(vector) {
            this.x += vector.x;
            this.y += vector.y;
            return this;
        }
        subtract(vector) {
            this.x -= vector.x;
            this.y -= vector.y;
            return this;
        }
        multiply(vector) {
            this.x *= vector.x;
            this.y *= vector.y;
            return this;
        }
        divide(vector) {
            this.x /= vector.x;
            this.y /= vector.y;
            return this;
        }
        set(x, y) {
            this.x = x;
            this.y = y;
        }
        scalarMultiply(scalar) {
            this.x *= scalar;
            this.y *= scalar;
            return this;
        }
        inverse() {
            this.x *= -1;
            this.y *= -1;
        }
        rotate(ang) {
            let x = this.x * Math.cos(ang) - this.y * Math.sin(ang);
            let y = this.x * Math.sin(ang) + this.y * Math.cos(ang);
            this.x = x;
            this.y = y;
        }
        magnitude() {
            return Math.sqrt(Math.pow((this.x), 2) + Math.pow((this.y), 2));
        }
        magSquare() {
            return Math.pow((this.x), 2) + Math.pow((this.y), 2);
        }
        dotProduct(vec) {
            return this.x * vec.x + this.y * vec.y;
        }
        crossProduct(vec) {
            return this.x * vec.y - this.y * vec.x;
        }
        normalize() {
            let magnitude = this.magnitude();
            if (magnitude === 0) {
                return this;
            }
            this.x = this.x / magnitude;
            this.y = this.y / magnitude;
            return this;
        }
        clone() {
            return new Vector2(this.x, this.y);
        }
    }
    VERVE.Vector2 = Vector2;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class MouseManager {
        static setEventManger(eventManager) {
            MouseManager.eventManager = eventManager;
        }
        static initialise(renderer) {
            MouseManager._cvs = renderer.canvas;
            MouseManager._cvs.addEventListener("mousedown", MouseManager.mousedown);
            MouseManager._cvs.addEventListener("mousemove", MouseManager.mousemove);
            MouseManager._cvs.addEventListener("mouseup", MouseManager.mouseup);
        }
        static getPoints(event) {
            let rect = MouseManager._cvs.getBoundingClientRect();
            let ratioX = MouseManager._cvs.width / rect.width;
            let ratioY = MouseManager._cvs.height / rect.height;
            let x = (event.x - rect.left) * ratioX;
            let y = (event.y - rect.top) * ratioY;
            MouseManager._mousePos.set(x, y);
        }
        static mousedown(event) {
            MouseManager.getPoints(event);
            MouseManager.eventManager.onMousedown(MouseManager._mousePos);
        }
        static mousemove(event) {
            MouseManager.getPoints(event);
            MouseManager.eventManager.onMouseMove(MouseManager._mousePos);
        }
        static mouseup(event) {
            MouseManager.getPoints(event);
            MouseManager.eventManager.onMouseUp(MouseManager._mousePos);
        }
    }
    MouseManager._mousePos = new VERVE.Vector2();
    VERVE.MouseManager = MouseManager;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class TouchManager {
        static setEventManger(eventManager) {
            TouchManager.eventManager = eventManager;
        }
        static initialise(renderer) {
            TouchManager._cvs = renderer.canvas;
            TouchManager._cvs.addEventListener("touchstart", TouchManager.touchstart);
            TouchManager._cvs.addEventListener("touchmove", TouchManager.tocuhmove);
            TouchManager._cvs.addEventListener("toucend", TouchManager.touchend);
        }
        static getPoints(event) {
            let rect = TouchManager._cvs.getBoundingClientRect();
            let ratioX = TouchManager._cvs.width / rect.width;
            let ratioY = TouchManager._cvs.height / rect.height;
            let x = (event.touches[0].clientX - rect.left) * ratioX;
            let y = (event.touches[0].clientY - rect.top) * ratioY;
            TouchManager._mousePos.set(x, y);
        }
        static touchstart(event) {
            TouchManager.getPoints(event);
            TouchManager.eventManager.onMousedown(TouchManager._mousePos);
        }
        static tocuhmove(event) {
            TouchManager.getPoints(event);
            TouchManager.eventManager.onMouseMove(TouchManager._mousePos);
        }
        static touchend(event) {
            let rect = TouchManager._cvs.getBoundingClientRect();
            let ratioX = TouchManager._cvs.width / rect.width;
            let ratioY = TouchManager._cvs.height / rect.height;
            let x = (event.changedTouches[0].clientX - rect.left) * ratioX;
            let y = (event.changedTouches[0].clientY - rect.top) * ratioY;
            TouchManager._mousePos.set(x, y);
            TouchManager.eventManager.onMouseUp(TouchManager._mousePos);
        }
    }
    TouchManager._mousePos = new VERVE.Vector2();
    VERVE.TouchManager = TouchManager;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class AudioLoader {
        constructor() {
        }
        static load(path, name, fun = () => { }) {
            let audio = new Audio();
            audio.onloadeddata = () => {
                AudioLoader.sounds[name] = new VERVE.Sound(audio);
                fun();
            };
            audio.src = path;
        }
    }
    AudioLoader.sounds = {};
    VERVE.AudioLoader = AudioLoader;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class FontLoader {
        constructor() {
        }
        static load(path, name, fun = () => { }) {
            let request = new XMLHttpRequest();
            request.onreadystatechange = () => {
                if (request.readyState == 4 && request.status === 200) {
                    let content = request.responseText;
                    let bitmapFont = new VERVE.BitmapFont(content, path, fun);
                    bitmapFont.name = name;
                    FontLoader.bitmapFont[name] = bitmapFont;
                }
            };
            request.open("GET", path);
            request.send();
        }
    }
    FontLoader.bitmapFont = {};
    VERVE.FontLoader = FontLoader;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class Sound {
        constructor(audio) {
            this._audio = audio;
        }
        play() {
            this.stop();
            this._audio.play();
        }
        stop() {
            this.pause();
            this._audio.currentTime = 0;
        }
        pause() {
            this._audio.pause();
        }
    }
    VERVE.Sound = Sound;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class TextureLoader {
        constructor() {
        }
        static load(path, name, fun = () => { }) {
            let image = new Image();
            image.onload = () => {
                TextureLoader.image[name] = image;
                fun();
            };
            image.onerror = () => {
                throw new Error('Error in loading image: ' + name);
            };
            image.src = path;
        }
    }
    TextureLoader.image = {};
    VERVE.TextureLoader = TextureLoader;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class Material {
        constructor() {
            this._color = new VERVE.Color(255, 255, 255);
        }
        set color(value) {
            if (VERVE.Color.getColor(value) != undefined) {
                this._color = VERVE.Color.getColor(value);
            }
        }
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
        changeTexture(image) {
            this._image = image;
            this.loadTexture();
        }
        loadUniform(gl, shader) {
            let colorLocation = shader.getUniformLocation("u_color");
            gl.uniform4fv(colorLocation, new Float32Array(this._color.toFloatArray()));
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
        scale(x, y) {
            this._transform.scale.x = x;
            this._transform.scale.y = y;
        }
        load(gl) {
            for (let c of this._component) {
                if (c.isLoading) {
                    c.load(gl);
                    c.isLoading = false;
                }
            }
            this.isLoading = false;
            this.update(0);
        }
        addComponent(component) {
            if (component == undefined) {
                throw new Error(`component is not define`);
            }
            let index = this._component.indexOf(component);
            if (index !== -1) {
                console.warn(`component already exits in the game object: ${component}`);
                return;
            }
            this._component.push(component);
            component.parent = this;
            this.isLoading = true;
        }
        removeComponent(component) {
            let index = this._component.indexOf(component);
            if (index !== -1) {
                this._component.splice(index, 1);
            }
        }
        update(delta) {
            this.worldMatrix = this._transform.getTranformationMatrix();
            for (let c of this._component) {
                c.update(delta);
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
            this._gameObjects = [];
            this.isLoading = true;
        }
        get gameObjects() {
            return this._gameObjects;
        }
        set gameObjects(value) {
            this._gameObjects = value;
        }
        BeforeRender(renderer) {
        }
        addObject(gameObject) {
            if (gameObject == undefined) {
                throw new Error(`game object is not define`);
            }
            let index = this._gameObjects.indexOf(gameObject);
            if (index !== -1) {
                console.warn(`game object already exits in the scene: ${gameObject}`);
                return;
            }
            this._gameObjects.push(gameObject);
        }
        removeObject(gameObject) {
            let index = this._gameObjects.indexOf(gameObject);
            if (index !== -1) {
                this._gameObjects.splice(index, 1);
            }
        }
        update(delta) {
            for (let g of this._gameObjects) {
                g.update(delta);
            }
        }
        render(renderer) {
            for (let g of this._gameObjects) {
                g.render(renderer);
            }
        }
    }
    VERVE.Scene = Scene;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class AnimatedComponent {
        constructor(width, height, row, column, material) {
            this._frameSequence = [];
            this.frameTime = 200;
            this.isLoading = true;
            this.startAnimation = false;
            this._totalTime = 0;
            this.onClick = () => { };
            this.isMouseEnable = false;
            this._num = 0;
            this._geometry = new VERVE.PlaneGeometry(width, height);
            this._material = material;
            this._transform = new VERVE.Transform();
            this._row = row;
            this._column = column;
            this.getWidthAndHeight();
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
        scale(x, y) {
            this._transform.scale.x = x;
            this._transform.scale.y = y;
        }
        setMouse(name, eventManager, { radius = undefined, width = undefined, height = undefined, rX = undefined, rY = undefined }) {
            if (name === "circle") {
                if (radius == undefined) {
                    throw new Error("for circular shape radius must be defined");
                }
                this._shape = new VERVE.Circle(new VERVE.Vector2(this.x + this.parent.x, this.y + this.parent.y), radius);
                this._clickEvent = new VERVE.ClickEvent(this._shape);
                this._clickEvent.parent = this;
                eventManager.addEvent(this._clickEvent);
            }
            else if (name === "rectangle") {
                if (width == undefined) {
                    throw new Error("for retangular shape width must be defined");
                }
                else if (height === undefined) {
                    throw new Error("for rectangular shape height must be defined");
                }
                this._shape = new VERVE.Rectangle(new VERVE.Vector2(this.x + this.parent.x, this.y + this.parent.y), width, height);
                this._clickEvent = new VERVE.ClickEvent(this._shape);
                this._clickEvent.parent = this;
                eventManager.addEvent(this._clickEvent);
            }
            else if (name === "ellispe") {
            }
            else {
                throw new Error("The shape must be cirlce or rectangle but you define: " + name);
            }
            this.isMouseEnable = true;
        }
        enableMouse(eventManager) {
            eventManager.addEvent(this._clickEvent);
        }
        disableMouse(eventManager) {
            eventManager.removeEvent(this._clickEvent);
        }
        getWidthAndHeight() {
            this._frameWidth = 1 / this._column;
            this._frameHeight = 1 / this._row;
        }
        setFrameSequence(frameSequence) {
            for (let f of frameSequence) {
                if (f.x > this._column) {
                    console.error(`${f.x} is out of range in frame sequnce`);
                }
                if (f.y > this._row) {
                    console.error(`${f.y} is out of range in frame sequunce`);
                }
            }
            this._frameSequence = frameSequence;
            this._num = 0;
            console.log("setting the frame");
        }
        load(gl) {
            this._buffer = new VERVE.TextureBuffer(gl);
            this._buffer.loadData(this._geometry.data, this._geometry.indices, [0, 0,
                this._frameWidth, 0,
                this._frameWidth, this._frameHeight,
                0, this._frameHeight
            ]);
            this._material.texture = new VERVE.Texture(gl);
            if (this._material instanceof VERVE.TextureMaterial) {
                this._material.loadTexture();
            }
            this._material.texture.active();
        }
        changeFrame(x, y) {
            let data = [
                (x) * this._frameWidth, (y) * this._frameHeight,
                (x + 1) * this._frameWidth, (y) * this._frameHeight,
                (x + 1) * this._frameWidth, (y + 1) * this._frameHeight,
                (x) * this._frameWidth, (y + 1) * this._frameHeight
            ];
            if (this._buffer != undefined) {
                this.buffer.changeTextureChord(data);
            }
        }
        update(delta) {
            this._localMatrix = this._transform.getTranformationMatrix();
            if (this.startAnimation) {
                this._totalTime += delta;
                if (this._totalTime > this.frameTime) {
                    this._totalTime = 0;
                    let frameNum = this._frameSequence[this._num];
                    this.changeFrame(frameNum.x - 1, frameNum.y - 1);
                    this._num++;
                    if (this._num >= this._frameSequence.length) {
                        this._num = 0;
                    }
                }
            }
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
    VERVE.AnimatedComponent = AnimatedComponent;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class ShapeComponent {
        constructor(geometry, material) {
            this.onClick = () => { };
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
        scale(x, y) {
            this._transform.scale.x = x;
            this._transform.scale.y = y;
        }
        setMouse(name, eventManager, { radius = undefined, width = undefined, height = undefined, rX = undefined, rY = undefined }) {
            if (name === "circle") {
                if (radius == undefined) {
                    throw new Error("for circular shape radius must be defined");
                }
                this._shape = new VERVE.Circle(new VERVE.Vector2(this.x + this.parent.x, this.y + this.parent.y), radius);
                this._clickEvent = new VERVE.ClickEvent(this._shape);
                this._clickEvent.parent = this;
                eventManager.addEvent(this._clickEvent);
            }
            else if (name === "rectangle") {
                if (width == undefined) {
                    throw new Error("for retangular shape width must be defined");
                }
                else if (height === undefined) {
                    throw new Error("for rectangular shape height must be defined");
                }
                this._shape = new VERVE.Rectangle(new VERVE.Vector2(this.x + this.parent.x, this.y + this.parent.y), width, height);
                this._clickEvent = new VERVE.ClickEvent(this._shape);
                this._clickEvent.parent = this;
                eventManager.addEvent(this._clickEvent);
            }
            else if (name === "ellispe") {
            }
            else {
                throw new Error("The shape must be cirlce or rectangle but you define: " + name);
            }
        }
        enableMouse(eventManager) {
            eventManager.addEvent(this._clickEvent);
        }
        disableMouse(eventManager) {
            eventManager.removeEvent(this._clickEvent);
        }
        load(gl) {
            this._buffer = new VERVE.Buffer(gl);
            this._buffer.loadData(this._geometry.data, this._geometry.indices);
            this._material.texture = new VERVE.Texture(gl);
        }
        update(delta) {
            this._localMatrix = this._transform.getTranformationMatrix();
        }
        render(render) {
            let model;
            if (this.parent == undefined) {
                model = this._localMatrix;
            }
            else {
                model = VERVE.Matrix4X4.multiply(this.parent.worldMatrix, this._localMatrix);
            }
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
            this.onClick = () => { };
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
        scale(x, y) {
            this._transform.scale.x = x;
            this._transform.scale.y = y;
        }
        setMouse(name, eventManager, { radius = undefined, width = undefined, height = undefined, rX = undefined, rY = undefined }) {
            if (name === "circle") {
                if (radius == undefined) {
                    throw new Error("for circular shape radius must be defined");
                }
                this._shape = new VERVE.Circle(new VERVE.Vector2(this.x + this.parent.x, this.y + this.parent.y), radius);
                this._clickEvent = new VERVE.ClickEvent(this._shape);
                this._clickEvent.parent = this;
                eventManager.addEvent(this._clickEvent);
            }
            else if (name === "rectangle") {
                if (width == undefined) {
                    throw new Error("for retangular shape width must be defined");
                }
                else if (height === undefined) {
                    throw new Error("for rectangular shape height must be defined");
                }
                this._shape = new VERVE.Rectangle(new VERVE.Vector2(this.x + this.parent.x, this.y + this.parent.y), width, height);
                this._clickEvent = new VERVE.ClickEvent(this._shape);
                this._clickEvent.parent = this;
                eventManager.addEvent(this._clickEvent);
            }
            else if (name === "ellispe") {
            }
            else {
                throw new Error("The shape must be cirlce or rectangle but you define: " + name);
            }
        }
        enableMouse(eventManager) {
            eventManager.addEvent(this._clickEvent);
        }
        disableMouse(eventManager) {
            eventManager.removeEvent(this._clickEvent);
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
        update(delta) {
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
    class TextComponent {
        constructor(text, fontName) {
            this.onClick = () => { };
            this.isLoading = true;
            this._text = text;
            this._transform = new VERVE.Transform();
            this._BitmapFont = VERVE.FontLoader.bitmapFont[fontName];
            this._material = new VERVE.TextureMaterial(this._BitmapFont.fontImage);
            this._material.color = "#000000";
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
        scale(x, y) {
            this._transform.scale.x = x;
            this._transform.scale.y = y;
        }
        center() {
            this._transform.position.x = -this._width / 2;
        }
        changeFont(fontName) {
            this._BitmapFont = VERVE.FontLoader.bitmapFont[fontName];
            this._material.changeTexture(this._BitmapFont.fontImage);
            this.changeText(this._text);
        }
        set color(color) {
            this._material.color = color;
        }
        setMouse(name, eventManager, { radius = undefined, width = undefined, height = undefined, rX = undefined, rY = undefined }) {
            if (name === "circle") {
                if (radius == undefined) {
                    throw new Error("for circular shape radius must be defined");
                }
                this._shape = new VERVE.Circle(new VERVE.Vector2(this.x + this.parent.x, this.y + this.parent.y), radius);
                this._clickEvent = new VERVE.ClickEvent(this._shape);
                this._clickEvent.parent = this;
                eventManager.addEvent(this._clickEvent);
            }
            else if (name === "rectangle") {
                if (width == undefined) {
                    throw new Error("for retangular shape width must be defined");
                }
                else if (height === undefined) {
                    throw new Error("for rectangular shape height must be defined");
                }
                this._shape = new VERVE.Rectangle(new VERVE.Vector2(this.x + this.parent.x, this.y + this.parent.y), width, height);
                this._clickEvent = new VERVE.ClickEvent(this._shape);
                this._clickEvent.parent = this;
                eventManager.addEvent(this._clickEvent);
            }
            else if (name === "ellispe") {
            }
            else {
                throw new Error("The shape must be cirlce or rectangle but you define: " + name);
            }
        }
        enableMouse(eventManager) {
            eventManager.addEvent(this._clickEvent);
        }
        disableMouse(eventManager) {
            eventManager.removeEvent(this._clickEvent);
        }
        changeText(text) {
            this._text = text;
            let vertexData = [];
            let textrueData = [];
            let indicesData = [];
            let x = 0, y = 0, indiNum = 0;
            for (let i = 0; i < this._text.length; i++) {
                let glyph = this._BitmapFont.getGlyph(this._text.charAt(i));
                let left = x + glyph.xOffset;
                let top = y + glyph.yOffset;
                let data = [
                    left, top,
                    left + glyph.width, top,
                    left + glyph.width, top + glyph.height,
                    left, top + glyph.height,
                ];
                let textrue = [
                    glyph.x / this._BitmapFont.width, glyph.y / this._BitmapFont.height,
                    (glyph.x + glyph.width) / this._BitmapFont.width, glyph.y / this._BitmapFont.height,
                    (glyph.x + glyph.width) / this._BitmapFont.width, (glyph.y + glyph.height) / this._BitmapFont.height,
                    (glyph.x) / this._BitmapFont.width, (glyph.y + glyph.height) / this._BitmapFont.height,
                ];
                let indices = [
                    0 + indiNum, 1 + indiNum, 2 + indiNum,
                    2 + indiNum, 3 + indiNum, 0 + indiNum
                ];
                for (let d of data) {
                    vertexData.push(d);
                }
                for (let t of textrue) {
                    textrueData.push(t);
                }
                for (let i of indices) {
                    indicesData.push(i);
                }
                x += glyph.xAdvanced;
                indiNum += 4;
            }
            this._width = x;
            this._buffer.loadData(vertexData, indicesData, textrueData);
        }
        load(gl) {
            this._buffer = new VERVE.TextureBuffer(gl);
            let vertexData = [];
            let textrueData = [];
            let indicesData = [];
            console.log(this._BitmapFont.width, this._BitmapFont.height);
            let x = 0, y = 0, indiNum = 0;
            for (let i = 0; i < this._text.length; i++) {
                let glyph = this._BitmapFont.getGlyph(this._text.charAt(i));
                let left = x + glyph.xOffset;
                let top = y + glyph.yOffset;
                let data = [
                    left, top,
                    left + glyph.width, top,
                    left + glyph.width, top + glyph.height,
                    left, top + glyph.height,
                ];
                let textrue = [
                    glyph.x / this._BitmapFont.width, glyph.y / this._BitmapFont.height,
                    (glyph.x + glyph.width) / this._BitmapFont.width, glyph.y / this._BitmapFont.height,
                    (glyph.x + glyph.width) / this._BitmapFont.width, (glyph.y + glyph.height) / this._BitmapFont.height,
                    (glyph.x) / this._BitmapFont.width, (glyph.y + glyph.height) / this._BitmapFont.height,
                ];
                let indices = [
                    0 + indiNum, 1 + indiNum, 2 + indiNum,
                    2 + indiNum, 3 + indiNum, 0 + indiNum
                ];
                for (let d of data) {
                    vertexData.push(d);
                }
                for (let t of textrue) {
                    textrueData.push(t);
                }
                for (let i of indices) {
                    indicesData.push(i);
                }
                x += glyph.xAdvanced;
                indiNum += 4;
            }
            this._width = x;
            this._buffer.loadData(vertexData, indicesData, textrueData);
            this._material.texture = new VERVE.Texture(gl);
            if (this._material instanceof VERVE.TextureMaterial) {
                this._material.loadTexture();
            }
        }
        update(delta) {
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
    VERVE.TextComponent = TextComponent;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class ClickEvent {
        constructor(shape) {
            this.isClicked = false;
            this.hover = false;
            this.getMousePos = new VERVE.Vector2();
            this.shape = shape;
        }
        onMousedown(point) {
            if (this.shape.pointInShape(point.x, point.y)) {
                this.isClicked = true;
            }
        }
        onMousemove(point) {
            if (this.isClicked) {
            }
            if (this.shape.pointInShape(point.x, point.y)) {
                this.hover = true;
            }
            else {
                this.hover = false;
            }
            if (this.hover) {
                renderer.canvas.style.cursor = "pointer";
            }
            else {
                renderer.canvas.style.cursor = "auto";
            }
        }
        onMouseup(point) {
            if (this.shape.pointInShape(point.x, point.y)) {
            }
            if (this.isClicked) {
                this.parent.onClick();
            }
            this.isClicked = false;
        }
        update() {
        }
        render() {
        }
    }
    VERVE.ClickEvent = ClickEvent;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class EventManager {
        constructor() {
            this.clickEvents = [];
        }
        addEvent(clickEvent) {
            let index = this.clickEvents.indexOf(clickEvent);
            if (index !== -1) {
                console.warn("button is already exits: " + clickEvent);
                return;
            }
            this.clickEvents.push(clickEvent);
        }
        removeEvent(clickEvent) {
            let index = this.clickEvents.indexOf(clickEvent);
            if (index !== -1) {
                this.clickEvents.splice(index, 1);
            }
        }
        onMousedown(point) {
            for (const b of this.clickEvents) {
                b.onMousedown(point);
            }
        }
        onMouseMove(point) {
            for (const b of this.clickEvents) {
                b.onMousemove(point);
                if (b.hover) {
                    break;
                }
            }
        }
        onMouseUp(point) {
            for (const b of this.clickEvents) {
                b.onMouseup(point);
            }
        }
    }
    VERVE.EventManager = EventManager;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class Body {
        constructor(type, { restitution = undefined, density = undefined }) {
            this.type = type;
            this.offset = new VERVE.Vector2();
            this.restitution = restitution;
            if (restitution > 1) {
                console.warn(`restitution should be between 0 and 1: ${restitution}->setting default 1`);
                this.restitution = 1;
            }
            else if (restitution < 0) {
                console.warn(`restitution should be between 0 and 1: ${restitution}->setting default 1`);
                this.restitution = 0;
            }
            this.density = density;
        }
        get inertia() {
            return this._inertia;
        }
        set inertia(value) {
            if (value === undefined) {
                this.inverseInertia = 0;
                this._inertia = value;
            }
            else {
                this.inverseInertia = Math.round((1 / value) * 100000) / 100000;
                this._inertia = value;
            }
        }
        get mass() {
            return this._mass;
        }
        set mass(value) {
            if (value == undefined) {
                this.inverseMass = 0;
                this._mass = value;
            }
            else {
                this.inverseMass = Math.round((1 / value) * 100000) / 100000;
                this._mass = value;
            }
        }
    }
    VERVE.Body = Body;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class PhysicsEngine {
        constructor() {
            this._activeObjects = [];
            this._staticObjects = [];
        }
        addObjects(object) {
            if (object.type === "static") {
                this._staticObjects.push(object);
            }
            else if (object.type === "dynamic") {
                this._activeObjects.push(object);
            }
            else {
                throw new Error("object type in incorrect: " + object.type);
            }
        }
        removeObject(object) {
            let index;
            if (object.type === "static") {
                index = this._staticObjects.indexOf(object);
                if (index !== -1) {
                    this._staticObjects.splice(index, 1);
                }
                else {
                    throw new Error(`physics objects dose not exist`);
                }
            }
            else if (object.type === "dynamic") {
                index = this._activeObjects.indexOf(object);
                if (index !== -1) {
                    this._activeObjects.splice(index, 1);
                }
                else {
                    throw new Error(`physics objects dose not exist`);
                }
            }
        }
        checkCollision() {
            for (let i = 0; i < this._activeObjects.length; i++) {
                if (!this._activeObjects[i].isCollidable) {
                    continue;
                }
                for (let j = i + 1; j < this._activeObjects.length; j++) {
                    if (!this._activeObjects[i].isCollidable) {
                        continue;
                    }
                    if (this._activeObjects[i].body.shape.intersect(this._activeObjects[j].body.shape)) {
                        this.checkPositionWithoutAngularMomentum(this._activeObjects[i], this._activeObjects[j]);
                    }
                }
            }
            for (const a of this._activeObjects) {
                for (const s of this._staticObjects) {
                    if (a.body.shape.intersect(s.body.shape)) {
                        this.checkPositionWithoutAngularMomentum(a, s);
                    }
                }
            }
        }
        checkPositionWithoutAngularMomentum(obj1, obj2) {
            let res;
            if (obj1.type === "static") {
                res = obj2.body.restitution;
            }
            else if (obj2.type === "static") {
                res = obj1.body.restitution;
            }
            else {
                res = Math.max(obj1.body.restitution, obj2.body.restitution);
            }
            let relVel = VERVE.Vector2.subtract(obj2.velocity, obj1.velocity);
            let colliVec = VERVE.Vector2.subtract(obj2.position, obj1.position);
            colliVec.normalize();
            let velocityAlongNormal = colliVec.dotProduct(relVel);
            if (velocityAlongNormal > 0) {
                return;
            }
            let j = -(1 + res) * (velocityAlongNormal);
            j = j / (obj1.body.inverseMass + obj2.body.inverseMass);
            let implus = colliVec.clone().scalarMultiply(j);
            obj1.velocity.subtract(implus.clone().scalarMultiply(obj1.body.inverseMass));
            obj2.velocity.add(implus.clone().scalarMultiply(obj2.body.inverseMass));
        }
        checkPostionAfterCollistion(obj1, obj2) {
            let res;
            if (obj1.type === "static") {
                res = obj2.body.restitution;
            }
            else if (obj2.type === "static") {
                res = obj1.body.restitution;
            }
            else {
                res = Math.max(obj1.body.restitution, obj2.body.restitution);
            }
            let relVel = VERVE.Vector2.subtract(obj2.velocity, obj1.velocity);
            let colliVec = VERVE.Vector2.subtract(obj2.position, obj1.position);
            colliVec.normalize();
            let obj1RadiusVec = colliVec.clone().scalarMultiply(obj1.body.shape.meterRadius);
            let obj2RadiusVec = colliVec.clone().scalarMultiply(obj2.body.shape.meterRadius);
            let contVec = relVel.clone().normalize();
            let velocityAlongNormal = colliVec.dotProduct(relVel);
            if (velocityAlongNormal > 0) {
                return;
            }
            let obj1tou = obj1RadiusVec.crossProduct(colliVec);
            obj1tou = Math.pow(obj1tou, 2) * obj1.body.inverseInertia;
            let obj2tou = obj2RadiusVec.crossProduct(colliVec);
            obj2tou = Math.pow(obj2tou, 2) * obj2.body.inverseInertia;
            let j = -(1 + res) * (velocityAlongNormal);
            let deno = obj1.body.inverseMass + obj2.body.inverseMass + obj1tou + obj2tou;
            j = j / deno;
            let implus = colliVec.clone().scalarMultiply(j);
            obj1.velocity.subtract(implus.clone().scalarMultiply(obj1.body.inverseMass));
            obj1.angularVelocity -= obj1.body.inverseInertia * VERVE.Vector2.crossProduct(contVec, implus);
            obj2.velocity.add(implus.clone().scalarMultiply(obj2.body.inverseMass));
            obj2.angularVelocity += obj2.body.inverseInertia * VERVE.Vector2.crossProduct(contVec, implus);
        }
        update() {
            for (let o of this._activeObjects) {
                o.update();
                let pos = o.getPos();
                if (pos.x > renderer.width || pos.x < 0) {
                    o.velocity.x = -o.velocity.x;
                }
                if (pos.y > renderer.height || pos.y < 0) {
                    o.velocity.y = -o.velocity.y;
                }
            }
            this.checkCollision();
        }
        load(gl) {
            for (const a of this._activeObjects) {
                a.load(gl);
            }
            for (const s of this._staticObjects) {
                s.load(gl);
            }
        }
        render(renderer) {
            for (let o of this._activeObjects) {
                o.render(renderer);
            }
            for (const s of this._staticObjects) {
                s.render(renderer);
            }
        }
    }
    VERVE.PhysicsEngine = PhysicsEngine;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class PhysicsObject {
        constructor(pos, vel = new VERVE.Vector2(), type = "dynamic") {
            this._angularVelocity = 0;
            this._rotate = 0;
            this._isCollidable = false;
            this._position = pos;
            this._velocity = vel;
            this._type = type;
        }
        get type() {
            return this._type;
        }
        set type(value) {
            this._type = value;
        }
        get velocity() {
            return this._velocity;
        }
        set velocity(value) {
            this._velocity = value;
        }
        get position() {
            return this._position;
        }
        set position(value) {
            this._position = value;
        }
        get angularVelocity() {
            return this._angularVelocity;
        }
        set angularVelocity(value) {
            this._angularVelocity = value;
        }
        get rotate() {
            return this._rotate;
        }
        set rotate(value) {
            this._rotate = value;
        }
        get isCollidable() {
            return this._isCollidable;
        }
        set isCollidable(value) {
            if (this.body == undefined) {
                throw new Error(`Body of physicsObject is undefined. can not set for collision`);
            }
            this._isCollidable = value;
        }
        addBody(body, { radius = undefined, offset = undefined, width = undefined, height = undefined, rotate = 0 }) {
            this.body = body;
            if (body.type == "circle") {
                if (radius == undefined) {
                    throw new Error('For circular body radius must be defined');
                }
                body.shape = new VERVE.Circle(new VERVE.Vector2(), radius);
                let area = Math.round(Math.PI * radius * radius) / 1000;
                body.mass = area * body.density;
                body.inertia = body.mass * Math.pow(body.shape.meterRadius, 2);
            }
            else if (body.type == "rectangle") {
                if (width == undefined || height == undefined) {
                    throw new Error('For rectangular shape height and width must be defined');
                }
                body.shape = new VERVE.Rectangle(new VERVE.Vector2(), width, height);
                let area = Math.round(width * height) / 1000;
                body.mass = area * body.density;
                body.inertia = body.mass * Math.pow(body.shape.meterRadius, 2);
            }
            if (offset != undefined) {
                body.offset = offset;
            }
            body.shape.rotation = rotate;
            this._rotate = rotate;
            this._isCollidable = true;
            if (this._type === "static") {
                this.body.mass = undefined;
                this.body.inertia = undefined;
                this._velocity.set(0, 0);
            }
            this.body.shape.position.x = this.body.offset.x + this.position.x;
            this.body.shape.position.y = this.body.offset.y + this.position.y;
            this.body.shape.rotation = this._rotate;
        }
        getPos() {
            return this._position;
        }
        update() {
            if (Math.abs(this._velocity.x) < 0.1) {
                this._velocity.x = 0;
            }
            if (Math.abs(this._velocity.y) < 0.1) {
                this._velocity.y = 0;
            }
            if (this._velocity.x !== 0 || this._velocity.y !== 0) {
                this._rotate += this._angularVelocity;
                if (this._rotate >= 2 * Math.PI) {
                    this._rotate -= 2 * Math.PI;
                }
                this._position.add(this._velocity);
            }
            else {
            }
            this.body.shape.position.x = this.body.offset.x + this.position.x;
            this.body.shape.position.y = this.body.offset.y + this.position.y;
            this.body.shape.rotation = this._rotate;
        }
        updateCom() {
            this._shapeComponent.x = this.position.x;
            this._shapeComponent.y = this.position.y;
            this._shapeComponent.rotate = this._rotate;
            this._shapeComponent.update(23);
        }
        load(gl) {
            let r = Math.floor(Math.random() * 255);
            let g = Math.floor(Math.random() * 255);
            let b = Math.floor(Math.random() * 255);
            let material = new VERVE.BasicMaterial(`rgb(${r}, ${g}, ${b})`);
            let geometry;
            if (this.body.shape instanceof VERVE.Rectangle) {
                geometry = new VERVE.PlaneGeometry(this.body.shape.width, this.body.shape.height);
            }
            else if (this.body.shape instanceof VERVE.Circle) {
                geometry = new VERVE.CircleGeometry(this.body.shape.radius, 40);
            }
            this._shapeComponent = new VERVE.ShapeComponent(geometry, material);
            this._shapeComponent.load(gl);
        }
        render(renderer) {
            this.updateCom();
            this._shapeComponent.render(renderer);
        }
    }
    VERVE.PhysicsObject = PhysicsObject;
})(VERVE || (VERVE = {}));
let showData = false;
var VERVE;
(function (VERVE) {
    class SAT {
        constructor() {
        }
        static checkCollision(shape1, shape2) {
            if (shape1 instanceof VERVE.Rectangle && shape2 instanceof VERVE.Rectangle) {
                return this.collisionBetweenRects(shape1, shape2);
            }
            else if (shape1 instanceof VERVE.Circle && shape2 instanceof VERVE.Rectangle) {
                return this.rectAndCircleCollision(shape2, shape1);
            }
            else if (shape1 instanceof VERVE.Rectangle && shape2 instanceof VERVE.Circle) {
                return this.rectAndCircleCollision(shape1, shape2);
            }
            else if (shape1 instanceof VERVE.Circle && shape2 instanceof VERVE.Circle) {
                return this.collisionBetweenCircles(shape1, shape2);
            }
        }
        static collisionBetweenRects(rect1, rect2) {
            let isColliding;
            let axes1 = rect1.getNormal();
            isColliding = this.collisionAgainAxis(axes1, rect1, rect2);
            if (!isColliding) {
                return false;
            }
            let axes2 = rect2.getNormal();
            isColliding = this.collisionAgainAxis(axes2, rect1, rect2);
            if (!isColliding) {
                return false;
            }
            return true;
        }
        static collisionBetweenCircles(circle1, circle2) {
            let vec = VERVE.Vector2.subtract(circle1.position, circle2.position);
            let dis = vec.magnitude();
            if (dis < circle1.radius + circle2.radius) {
                return true;
            }
            return false;
        }
        static rectAndCircleCollision(rect, circle) {
            let angle = rect.rotation;
            let circlePos = VERVE.Vector2.subtract(rect.position, circle.position);
            circlePos.rotate(-angle);
            circlePos.add(rect.position);
            let x, y;
            if (circlePos.x < rect.position.x - rect.width / 2) {
                y = clamp(rect.position.y - rect.height / 2, rect.position.y + rect.height / 2, circlePos.y);
                x = rect.position.x - rect.width / 2;
            }
            else if (circlePos.x > rect.position.x + rect.width / 2) {
                y = clamp(rect.position.y - rect.height / 2, rect.position.y + rect.height / 2, circlePos.y);
                x = rect.position.x + rect.width / 2;
            }
            else if (circlePos.y < rect.position.y - rect.height / 2) {
                x = clamp(rect.position.x - rect.width / 2, rect.position.x + rect.width / 2, circlePos.x);
                y = rect.position.y - rect.height / 2;
            }
            else if (circlePos.y > rect.position.y + rect.height / 2) {
                x = clamp(rect.position.x - rect.width / 2, rect.position.x + rect.width / 2, circlePos.x);
                y = rect.position.y + rect.height / 2;
            }
            else {
                return true;
            }
            if (dist(x, y, circlePos.x, circlePos.y) < circle.radius) {
                return true;
            }
            else {
                return false;
            }
        }
        static collisionAgainAxis(axes, rect1, rect2) {
            let isColliding = [];
            for (let a of axes) {
                let rect1Proj, rect2Proj;
                rect1Proj = this.minMaxProjection(a, rect1);
                rect2Proj = this.minMaxProjection(a, rect2);
                if ((rect1Proj.max > rect2Proj.min && rect1Proj.min < rect2Proj.max)) {
                    isColliding.push(true);
                }
                else {
                    isColliding.push(false);
                }
            }
            for (let b of isColliding) {
                if (!b) {
                    return false;
                }
            }
            return true;
        }
        static minMaxProjection(axis, rect) {
            let min = rect.getCorner(0).dotProduct(axis);
            let max = rect.getCorner(0).dotProduct(axis);
            for (let i = 1; i < 4; i++) {
                let currProj = rect.getCorner(i).dotProduct(axis);
                if (min > currProj) {
                    min = currProj;
                }
                if (max < currProj) {
                    max = currProj;
                }
            }
            return {
                min: min,
                max: max
            };
        }
    }
    VERVE.SAT = SAT;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class Circle {
        constructor(position, radius) {
            this.position = position;
            this.radius = radius;
            this.meterRadius = radius / 3.8;
        }
        pointInShape(x, y) {
            let dis = Math.sqrt(Math.pow((this.position.x - x), 2) + Math.pow((this.position.y - y), 2));
            let vec = new VERVE.Vector2(x, y);
            vec.subtract(this.position);
            dis = vec.magnitude();
            if (dis < this.radius) {
                return true;
            }
            return false;
        }
        intersect(shape) {
            if (shape instanceof Circle) {
                return this.intersectWithCircle(shape);
            }
            if (shape instanceof VERVE.Rectangle) {
                return this.intersectWithRectangle(shape);
            }
        }
        intersectWithCircle(shape) {
            let vec = new VERVE.Vector2(shape.position.x, shape.position.y);
            vec.subtract(this.position);
            let dis = vec.magnitude();
            if (dis < this.radius + shape.radius) {
                return true;
            }
            return false;
        }
        intersectWithRectangle(rect) {
            return rect.intersectWithCircle(this);
        }
        load(gl) {
            let material = new VERVE.BasicMaterial("#000000");
            let geometry = new VERVE.CircleGeometry(this.radius, 20);
            this._shapeComponent = new VERVE.ShapeComponent(geometry, material);
            this._shapeComponent.load(gl);
            this._shapeComponent.update(0);
        }
        render(render) {
            this._shapeComponent.x = this.position.x;
            this._shapeComponent.y = this.position.y;
            this._shapeComponent.update(10);
            this._shapeComponent.render(render);
        }
    }
    VERVE.Circle = Circle;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class Ellispse {
        constructor(position, rX, rY) {
            this.position = position;
            this.rX = rX;
            this.rY = rY;
            this.meterRadius = rX + rY / 7.6;
        }
        pointInShape(x, y) {
            let leftEquation = (x - this.position.x) * Math.cos(this.rotation) + (y - this.position.y) * Math.sin(this.rotation);
            let rightEuqation = (x - this.position.x) * Math.sin(this.rotation) - (y - this.position.y) * Math.cos(this.rotation);
            let leftValue = Math.pow(leftEquation, 2) / Math.pow(this.rX, 2);
            let rightValue = Math.pow(rightEuqation, 2) / Math.pow(this.rY, 2);
            return leftValue + rightValue <= 1;
        }
    }
    VERVE.Ellispse = Ellispse;
})(VERVE || (VERVE = {}));
var VERVE;
(function (VERVE) {
    class Rectangle {
        constructor(position, width, height) {
            this.rotation = 0;
            this.cornerPos = [
                { x: 1, y: 1 },
                { x: 1, y: -1 },
                { x: -1, y: -1 },
                { x: -1, y: 1 },
            ];
            this.num = 0;
            this.position = position;
            this.width = width;
            this.height = height;
            this.meterRadius = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2)) / 3.2;
        }
        cornerVecs() {
            let vecs = [];
            for (let i = 0; i < 4; i++) {
                let vec = new VERVE.Vector2(this.position.x + this.cornerPos[i].x * this.width / 2, this.position.y + this.cornerPos[i].y * this.height / 2);
                let corner = VERVE.Vector2.subtract(vec, this.position);
                corner.rotate(this.rotation);
                corner.add(this.position);
                vecs[i] = corner;
            }
            return vecs;
        }
        getDirCorner(i) {
            if (i > 4) {
                throw new Error(`Threr are only 4 corners in a rectangle, so i should be less than 4: ${i}`);
            }
            let vec = new VERVE.Vector2(this.position.x + this.cornerPos[i].x * this.width / 2, this.position.y + this.cornerPos[i].y * this.height / 2);
            let corner = VERVE.Vector2.subtract(this.position, vec);
            corner.rotate(this.rotation);
            return corner;
        }
        getCorner(i) {
            if (i > 4) {
                throw new Error(`Threr are only 4 corners in a rectangle, so i should be less than 4: ${i}`);
            }
            let vec = new VERVE.Vector2(this.position.x + this.cornerPos[i].x * this.width / 2, this.position.y + this.cornerPos[i].y * this.height / 2);
            let corner = VERVE.Vector2.subtract(vec, this.position);
            corner.rotate(this.rotation);
            corner.add(this.position);
            if (this.num < 4) {
                console.log(corner);
                this.num++;
            }
            return corner;
        }
        getNormal() {
            let normals = [];
            let c1 = this.getCorner(0);
            let c2 = this.getCorner(1);
            let c3 = this.getCorner(2);
            let norm = VERVE.Vector2.subtract(c2, c1);
            norm.normalize();
            let norm2 = VERVE.Vector2.subtract(c3, c2);
            norm2.normalize();
            normals.push(norm);
            normals.push(norm2);
            return normals;
        }
        minMaxProjection(axix) {
            for (let i = 0; i < 4; i++) {
            }
            return;
        }
        diagonalVecs() {
            let vecs = [];
            for (let i = 0; i < 4; i++) {
                let vec = new VERVE.Vector2(this.position.x + this.cornerPos[i].x * this.width / 2, this.position.y + this.cornerPos[i].y * this.height / 2);
                let corner = VERVE.Vector2.subtract(vec, this.position);
                corner.rotate(this.rotation);
                vecs[i] = corner;
            }
            return vecs;
        }
        pointInShape(x, y) {
            if (Math.abs(this.position.x - x) < this.width / 2 && Math.abs(this.position.y - y) < this.height / 2) {
                return true;
            }
            return false;
        }
        intersect(shape) {
            if (shape instanceof Rectangle) {
                return this.intesetWithRectangle(shape);
            }
            else if (shape instanceof VERVE.Circle) {
                return this.intersectWithCircle(shape);
            }
        }
        rotate(angle) {
        }
        intesetWithRectangle(rect) {
            let xl = Math.max(this.position.x - this.width / 2, rect.position.x - rect.width / 2);
            let xr = Math.min(this.position.x + this.width / 2, rect.position.x + rect.width / 2);
            let yt = Math.max(this.position.y - this.height / 2, rect.position.y - rect.height / 2);
            let yb = Math.min(this.position.y + this.height / 2, rect.position.y + rect.height / 2);
            if (xl < xr && yt < yb) {
                return true;
            }
            return false;
        }
        intersectWithCircle(circle) {
            let x, y;
            if (circle.position.x < this.position.x - this.width / 2) {
                y = clamp(this.position.y - this.height / 2, this.position.y + this.height / 2, circle.position.y);
                x = this.position.x - this.width / 2;
            }
            else if (circle.position.x > this.position.x + this.width / 2) {
                y = clamp(this.position.y - this.height / 2, this.position.y + this.height / 2, circle.position.y);
                x = this.position.x + this.width / 2;
            }
            else if (circle.position.y < this.position.y - this.height / 2) {
                x = clamp(this.position.x - this.width / 2, this.position.x + this.width / 2, circle.position.x);
                y = this.position.y - this.height / 2;
            }
            else if (circle.position.y > this.position.y + this.height / 2) {
                x = clamp(this.position.x - this.width / 2, this.position.x + this.width / 2, circle.position.x);
                y = this.position.y + this.height / 2;
            }
            else {
                return true;
            }
            if (dist(x, y, circle.position.x, circle.position.y) < circle.radius) {
                return true;
            }
            else {
                return false;
            }
        }
        load(gl) {
            let material = new VERVE.BasicMaterial("#000000");
            let geometry = new VERVE.PlaneGeometry(this.width, this.height);
            this._shapeComponent = new VERVE.ShapeComponent(geometry, material);
            this._shapeComponent.load(gl);
            this._shapeComponent.update(0);
        }
        render(render) {
            this._shapeComponent.x = this.position.x;
            this._shapeComponent.y = this.position.y;
            this._shapeComponent.update(10);
            this._shapeComponent.render(render);
        }
    }
    VERVE.Rectangle = Rectangle;
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
        constructor(width = 2, height = 2, CanvasId) {
            this._startTime = 0;
            this._frames = 0;
            this._totalTime = 0;
            this.width = width;
            this.height = height;
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
        showFPS(delta) {
            this._totalTime += delta;
            this._frames++;
            if (this._totalTime > 1000) {
                console.log(this._frames);
                this._totalTime = 0;
                this._frames = 0;
            }
        }
        setInputEvents() {
            VERVE.MouseManager.initialise(this);
        }
        update() {
            let endTime = performance.now();
            let delta = endTime - this._startTime;
            scene.update(delta);
            this.showFPS(delta);
            this._startTime = endTime;
        }
        render(scene) {
            this.gl.clearColor(0, 1, 1, 1);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT || this.gl.DEPTH_BUFFER_BIT);
            for (let object of scene.gameObjects) {
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
        loadData(data, indices, textureCord = [0, 0, 1, 0, 1, 1, 0, 1]) {
            super.loadData(data, indices);
            this._textrueCord = textureCord;
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._textureBuffer);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(this._textrueCord), this._gl.STATIC_DRAW);
            this._gl.vertexAttribPointer(1, 2, this._gl.FLOAT, false, 0, 0);
        }
        changeTextureChord(data) {
            this._textrueCord = data;
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._textureBuffer);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(this._textrueCord), this._gl.STATIC_DRAW);
        }
        bind() {
            super.bind();
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._textureBuffer);
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
let spriteImage = new Image();
spriteImage.src = `Assets/Textures/spriteSheet.png`;
let renderer = new VERVE.Renderer(800, 600, "canvas");
renderer.setInputEvents();
let camera = new VERVE.Camera(0, renderer.width, renderer.height, 0);
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
let updating = false;
material.color = "rgba(255, 255, 0, 40)";
let animateMaterial = new VERVE.TextureMaterial(spriteImage);
let animateSprite = new VERVE.AnimatedComponent(108, 140, 2, 8, animateMaterial);
animateSprite.startAnimation = true;
let frameSequence1 = [
    { x: 1, y: 1 },
    { x: 2, y: 1 },
    { x: 3, y: 1 },
    { x: 4, y: 1 },
    { x: 5, y: 1 },
    { x: 6, y: 1 },
    { x: 7, y: 1 },
    { x: 8, y: 1 },
];
let frameSequence2 = [
    { x: 1, y: 2 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 4, y: 2 },
    { x: 5, y: 2 },
    { x: 6, y: 2 },
    { x: 7, y: 2 },
    { x: 8, y: 2 },
];
let frameSequence3 = [
    { x: 1, y: 2 },
];
animateSprite.setFrameSequence(frameSequence1);
animateSprite.frameTime = 100;
let gameObject3 = new VERVE.GameObject();
gameObject3.x = 320;
gameObject3.y = 190;
let phyPos = new VERVE.Vector2(400, 200);
let physicsObject = new VERVE.PhysicsObject(phyPos, new VERVE.Vector2(5, 0));
let body = new VERVE.Body("rectangle", { restitution: 0.2, density: 1 });
physicsObject.addBody(body, { width: 110, height: 20, rotate: 0 });
let phy2 = new VERVE.Vector2(200, 210);
let physicsObject2 = new VERVE.PhysicsObject(phy2, new VERVE.Vector2(0, 0), "static");
let body2 = new VERVE.Body("circle", { restitution: 1.0, density: 1 });
physicsObject2.addBody(body2, { radius: 40, width: 50, height: 50, rotate: 0 });
gameObject3.addComponent(animateSprite);
scene.addObject(gameObject3);
console.log(physicsObject.body.shape);
let eventManager = new VERVE.EventManager();
VERVE.MouseManager.setEventManger(eventManager);
animateSprite.onClick = () => {
    console.log("clicked on sprite componetn");
};
let physicesEngine = new VERVE.PhysicsEngine();
let physics = [];
let types = ["rectangle", "circle"];
let phyType = ["dynamic", "static"];
for (let i = 0; i < 600; i++) {
    let x = Math.floor(Math.random() * 8) - 4;
    let y = Math.floor(Math.random() * 8) - 4;
    let pos = new VERVE.Vector2(randomInt(0, 800), randomInt(0, 600));
    let phy = new VERVE.PhysicsObject(pos, new VERVE.Vector2(x, y), phyType[randomInt(0, 1)]);
    let body = new VERVE.Body(types[randomInt(0, 1)], { restitution: 1, density: 1 });
}
physicesEngine.load(renderer.gl);
function start() {
    requestAnimationFrame(start);
    if (updating) {
        renderer.update();
        physicesEngine.update();
    }
    renderer.render(scene);
    physicesEngine.render(renderer);
    gameObject.rotate += 0.01;
    gameObject4.rotate += 0.01;
    ellispeComponent.rotate -= 0.01;
    spriteComponent3.rotate += 0.01;
    spriteComponent2.rotate += Math.PI / 180 * 1;
    let pos = physicsObject.getPos();
    let pos2 = physicsObject2.getPos();
}
VERVE.Color.getColor("rgba(255, 45, 78, 20)");
window.onload = () => {
    console.log(imageForTexture);
    renderer.tempFun();
    start();
};
let textComponent;
let content;
let gameObject4 = new VERVE.GameObject();
gameObject4.x = 300;
gameObject4.y = 200;
let fontImage = new Image();
fontImage.src = `Assets/Font/font_0.png`;
let text = "THIS IS TEXT";
VERVE.FontLoader.load("Assets/Font/font.fnt", "arial", () => {
    textComponent = new VERVE.TextComponent(text, "arial");
    gameObject4.addComponent(textComponent);
    VERVE.FontLoader.load("Assets/Font/comic_sans.fnt", "comic", () => {
        textComponent.changeFont("comic");
        textComponent.changeText("Text has been changed");
    });
});
scene.addObject(gameObject4);
//# sourceMappingURL=VERVE.js.map