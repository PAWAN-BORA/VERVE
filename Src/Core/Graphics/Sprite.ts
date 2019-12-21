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
            this.makeData(width/100);
            this._texture = new Texture(gl);
        }

        public load(image?:HTMLImageElement):void {
            
            this._buffer = new Buffer(this._gl);
            this._buffer.loadData(this._data, this._indices);
            // let vertex = this._shader.getAttributeLocation("a_coordinate");
            // let texture = this._shader.getAttributeLocation("a_textureCoord");
            // this._buffer.enableVertex(vertex);
            // this._buffer.enableVertex(texture);
            // this._texture.active();
            if(image!=undefined)
            this._texture.load(image);
           
        }
        private makeData(num:number=0) {
            this._data = [
                // x,      y,   
                -0.5,     0.5,
                 0.5,     0.5,
                 0.5,    -0.5,
                -0.5,    -0.5, 
            ];
            for(let i=0; i<this._data.length; i++) {
                this._data[i] += num;
                // console.log(d)
            }
            console.log(this._data)
            this._indices = [
                0, 1, 2, 2, 3, 0
            ]

        }
        public update():void {

        }
        public render():void {
            // this._texture.bind();
            this._texture.active();
            this._buffer.bind(this._texture);
            this._buffer.draw();
        }
    }
}