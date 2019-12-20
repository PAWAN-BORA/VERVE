namespace VERVE {
    export class Texture {
        private _texture:WebGLTexture;
        private _gl:WebGLRenderingContext;
        constructor(gl:WebGLRenderingContext) {
            this._gl = gl;
            this._texture = gl.createTexture();
            this.bind();
            this._gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 0]));
            this.unbind();
        }
        private bind():void {
            this._gl.bindTexture(this._gl.TEXTURE_2D, this._texture);
        }
        private unbind():void {
            this._gl.bindTexture(this._gl.TEXTURE_2D, undefined);
        }
        public load(image:TexImageSource):void {
            this.bind();
            this._gl.texImage2D(this._gl.TEXTURE_2D, 0, this._gl.RGBA, this._gl.RGBA, this._gl.UNSIGNED_BYTE, image);
           
            

            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_S, this._gl.CLAMP_TO_EDGE);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_WRAP_T, this._gl.CLAMP_TO_EDGE);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MIN_FILTER, this._gl.LINEAR);
            this._gl.texParameteri(this._gl.TEXTURE_2D, this._gl.TEXTURE_MAG_FILTER, this._gl.LINEAR);
            this.unbind();
        }
        public active():void {
            this.bind();
            this._gl.activeTexture(this._gl.TEXTURE0) // doubt why it is used?;
        }
    }
}