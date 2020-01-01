namespace VERVE {

    export abstract class Material {
       protected _texture;
       protected _color: Color = new Color(255, 255, 255);
        // private get color(): Color {
        //     return this._color;
        // }
        public set color(value: string) {
            if(Color.getColor(value)!=undefined) {
                this._color = Color.getColor(value);
            }
        }
        public get texture() {
            return this._texture;
        }
        public set texture(value) {
            this._texture = value;
        }
        public abstract loadUniform(gl:WebGLRenderingContext, shader:Shader):void;

    }
}