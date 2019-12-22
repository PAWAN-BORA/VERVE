namespace VERVE {

    export abstract class Material {
       protected _texture;
        public get texture() {
            return this._texture;
        }
        public set texture(value) {
            this._texture = value;
        }
        public abstract loadUniform(gl:WebGLRenderingContext, shader:Shader):void;

    }
}