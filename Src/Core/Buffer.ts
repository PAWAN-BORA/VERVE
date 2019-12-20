namespace VERVE {

    export class Buffer {
        private _data:number[] = [];
        private _indices:number[] = [];
        private _gl:WebGLRenderingContext;
        private _vertexBuffer:WebGLBuffer;
        private _indexBuffer:WebGLBuffer;
        private _textureBuffer:WebGLBuffer;
        constructor(gl:WebGLRenderingContext) {
            this._gl = gl;
            this._vertexBuffer = gl.createBuffer();
            this._textureBuffer = gl.createBuffer(); 
            this._indexBuffer = gl.createBuffer();

        }
        public loadData(data:number[], indices:number[]) {
            this._data = data;
            this._indices = indices;
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(this._data), this._gl.STATIC_DRAW);
            this._gl.vertexAttribPointer(0, 2, this._gl.FLOAT, false, 0, 0); // temp might be;
            this._gl.enableVertexAttribArray(0);

            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._textureBuffer);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), this._gl.STATIC_DRAW);
            this._gl.vertexAttribPointer(1, 2, this._gl.FLOAT, false, 0, 0,); // temp might be;
            this._gl.enableVertexAttribArray(1);

            this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
            this._gl.bufferData(this._gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this._indices), this._gl.STATIC_DRAW);

            
        }
        public enableVertex(location:number) {
            this._gl.vertexAttribPointer(location, 2, this._gl.FLOAT, false, 2*4, 0); // temp might be;
            this._gl.enableVertexAttribArray(location);
            // this._gl.vertexAttribPointer(1, 2, this._gl.FLOAT, false, 2*4, 0); // temp might be;
            // this._gl.enableVertexAttribArray(1);
        }
        public bind(texture:Texture) {
            this._gl.bindBuffer(this._gl.ELEMENT_ARRAY_BUFFER, this._indexBuffer);


            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._vertexBuffer);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array(this._data), this._gl.STATIC_DRAW);
            this._gl.vertexAttribPointer(0, 2, this._gl.FLOAT, false, 0, 0); // temp might be;
            this._gl.enableVertexAttribArray(0);

            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, this._textureBuffer);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), this._gl.STATIC_DRAW);
            this._gl.vertexAttribPointer(1, 2, this._gl.FLOAT, false, 0, 0,); // temp might be;
            this._gl.enableVertexAttribArray(1);
            // this._gl.vertexAttribPointer(0, 2, this._gl.FLOAT, false, 2*4, 0); // temp might be;
            // this._gl.enableVertexAttribArray(0);
            // this._gl.vertexAttribPointer(1, 2, this._gl.FLOAT, false, 2*4, 2*4); // temp might be;
            // this._gl.enableVertexAttribArray(1);
            // texture.active();
            // this._gl.vertexAttribPointer(0, 3, this._gl.FLOAT, false, 3*4, 0); // temp;
            // this._gl.enableVertexAttribArray(0);
        }
        public unbind():void {
            this._gl.disableVertexAttribArray(0) // temp;
            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null)
        }

        public draw():void {
            // this._gl.drawArrays(this._gl.TRIANGLES, 0, 3);
            this._gl.drawElements(this._gl.TRIANGLES, this._indices.length, this._gl.UNSIGNED_SHORT, 0);
        }
    }
}