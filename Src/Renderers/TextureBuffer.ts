namespace VERVE {

    export class TextureBuffer extends Buffer {
        private _textureBuffer:WebGLBuffer;

        constructor(gl:WebGLRenderingContext) {
            super(gl);
            this._textureBuffer = gl.createBuffer();
        }
        public loadData(data:number[], indices:number[]) {
            super.loadData(data, indices);
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._textureBuffer);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), this._gl.STATIC_DRAW);
            this._gl.vertexAttribPointer(1, 2, this._gl.FLOAT, false, 0, 0,); // temp might be;
            // this._gl.enableVertexAttribArray(1);
        }
        public bind():void {
            super.bind();
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._textureBuffer);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), this._gl.STATIC_DRAW);
            this._gl.vertexAttribPointer(1, 2, this._gl.FLOAT, false, 0, 0,); // temp might be;
            this._gl.enableVertexAttribArray(1);        }
    }
}