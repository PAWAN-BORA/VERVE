namespace VERVE {

    export class Sprite {
        private _buffer:Buffer;
        private _data:number[] = []; 
        private _gl:WebGLRenderingContext;
        constructor(gl:WebGLRenderingContext, width:number, height:number) {
            this._gl = gl;
            this.makeData();
        }

        public load():void {
            this._buffer = new Buffer(this._gl);
            this._buffer.loadData(this._data);
        }
        private makeData() {
            this._data = [
              // x,   y, 
                0.0, 1.0, 0.0,
                -1.0, -1.0, 0.0,
                1.0, -1.0, 0.0 
            ]

        }
        public update():void {

        }
        public render():void {
            this._buffer.bind();
            this._buffer.draw();
        }
    }
}