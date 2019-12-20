namespace VERVE {

    export class Sprite {
        private _buffer:Buffer;
        private _data:number[] = []; 
        private _indices:number[] = [];
        private _gl:WebGLRenderingContext;
        private _shader:Shader;
        private _texture:Texture;
        constructor(gl:WebGLRenderingContext, shader:Shader, width:number, height:number) {
            this._gl = gl;
            this._shader = shader;
            this.makeData();
            this._texture = new Texture(gl);
        }

        public load():void {
            this._buffer = new Buffer(this._gl);
            this._buffer.loadData(this._data, this._indices);
            let vertex = this._shader.getAttributeLocation("a_coordinate");
            let texture = this._shader.getAttributeLocation("a_textureCoord");
            this._buffer.enableVertex(vertex);
            // this._buffer.enableVertex(texture);
            // this._texture.load(imageForTexture);
            this._texture.active();
        }
        private makeData() {
            this._data = [
                // x,      y,   
                -0.5,     0.5,
                 0.5,     0.5,
                 0.5,    -0.5,
                -0.5,    -0.5, 
            ];

            this._indices = [
                0, 1, 2, 2, 3, 0
            ]

        }
        public update():void {

        }
        public render():void {
            this._buffer.bind(this._texture);
            this._buffer.draw();
        }
    }
}