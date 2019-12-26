namespace VERVE {

    export class TextureBuffer extends Buffer {
        private _textureBuffer:WebGLBuffer;
        private _textrueCord:number[];

        constructor(gl:WebGLRenderingContext) {
            super(gl);
            this._textureBuffer = gl.createBuffer();
        }
        public loadData(data:number[], indices:number[], textureCord:number[]=[0, 0, 1, 0, 1, 1, 0, 1]) {
            super.loadData(data, indices);
            this._textrueCord = textureCord;
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._textureBuffer);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(this._textrueCord), this._gl.STATIC_DRAW);
            this._gl.vertexAttribPointer(1, 2, this._gl.FLOAT, false, 0, 0,); // temp might be;
            // this._gl.enableVertexAttribArray(1);
        }
        public changeTextureChord(data:number[]):void {
            this._textrueCord = data;
            // should be modifed;
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(this._textrueCord), this._gl.STATIC_DRAW);
        }
        public bind():void {
            super.bind();
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._textureBuffer);
            this._gl.vertexAttribPointer(1, 2, this._gl.FLOAT, false, 0, 0,); // temp might be;
            this._gl.enableVertexAttribArray(1);        }
    }
}