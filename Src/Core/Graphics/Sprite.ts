namespace VERVE {

    export class Sprite {
        private _buffer:Buffer;
        private _data:number[] = []; 
        private _indices:number[] = [];
        // private _gl:WebGLRenderingContext;
        private _shader:Shader;
        private _texture:Texture;
        private _width:number;
        private _height:number;
        constructor(geometry:Geometry, material:Material) {
            // this._gl = gl;
            // this._shader = shader;
            // this._width = width;
            // this._height = height;
            // this.makeData();
            this._data = geometry.data;
            this._indices = geometry.indices;
            // this._texture = material.texture;
            // this._texture = new Texture(gl);
        }

        public load(gl:WebGLRenderingContext):void {
            this._buffer = new Buffer(gl);
            this._buffer.loadData(this._data, this._indices);
            // let vertex = this._shader.getAttributeLocation("a_coordinate");
            // let texture = this._shader.getAttributeLocation("a_textureCoord");
            // this._buffer.enableVertex(vertex);
            // this._buffer.enableVertex(texture);
            this._texture.load(imageForTexture);
            this._texture.active();
        }
        // private makeData() {
        //     // this._data = [
        //     //     // x,      y,   
        //     //     0.0,     0.0,
        //     //      0.5,     0.0,
        //     //      0.5,    0.5,
        //     //     0.0,    0.5, 
        //     // ];
            
        //     this._data = [
        //         //  x,               y,   
        //         0,                  0,
        //         this._width,        0,
        //         this._width,        this._height,
        //         0,                  this._height, 
        //     ];
        //     this._indices = [
        //         0, 1, 2, 2, 3, 0
        //     ]

        // }
        public update():void {

        }
        public draw():void {
            this._buffer.bind(this._texture);
            this._buffer.draw();
        }
    }
}