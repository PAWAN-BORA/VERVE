namespace VERVE {
    export class BitmapText {
        private _geometry:Geometry;
        private _material:Material;
        private _buffer:TextureBuffer;
        private _textureIndices:number[];
        constructor(geometry:Geometry, indices:number[], material:Material) {

            this._geometry = geometry;
            this._material = material;
            this._textureIndices = indices;
        }
        public load(gl:WebGLRenderingContext):void {
            this._buffer = new TextureBuffer(gl);
            this._buffer.loadData(this._geometry.data, this._geometry.indices, this._textureIndices);
            this._material.texture = new Texture(gl);
            if(this._material instanceof TextureMaterial) {
                this._material.loadTexture();
            }
            this._material.texture.active();
        }
        public draw(model:Matrix4X4):void {
            // let modelLocation = render.shader.getUniformLocation("u_model");
            // render.gl.uniformMatrix4fv(modelLocation, false, new Float32Array(model.data));
            // this._material.loadUniform(render.gl, render.shader);
            this._material.texture.active();
            this._buffer.bind();
            this._buffer.draw();
        }
    }
}