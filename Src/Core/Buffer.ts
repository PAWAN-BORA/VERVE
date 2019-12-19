namespace VERVE {

    export class Buffer {
        private _data:number[] = [];
        private _gl:WebGLRenderingContext;
        private _buffer:WebGLBuffer;
        constructor(gl:WebGLRenderingContext) {
            this._gl = gl;
            this._buffer = gl.createBuffer();
        }
        public loadData(data:number[]) {
            this._data = data;
        }
        public bind() {
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._buffer);
            // the below line will be changed later as you don't have to set every time while you are binding buffer;
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(this._data), this._gl.STATIC_DRAW);
            this._gl.vertexAttribPointer(0, 3, this._gl.FLOAT, false, 3*4, 0); // temp;
            this._gl.enableVertexAttribArray(0);
        }
        public unbind():void {
            this._gl.disableVertexAttribArray(0) // temp;
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null)
        }

        public draw():void {
            this._gl.drawArrays(this._gl.TRIANGLES, 0, 3);
        }
    }
}