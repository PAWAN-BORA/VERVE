namespace VERVE {

    export class TextComponent implements IComponent {
        private _text:string;
        private _geometry:Geometry;
        private _material:Material;
        private _buffer: TextureBuffer;
        private _transform:Transform;
        private _localMatrix:Matrix4X4;
        private _BitmapFont:BitmapFont;
        private _bitmapText:BitmapText[] = [];
        public parent: GameObject;
        public isLoading: boolean = true;
        public get x(){
            return this._transform.position.x;
        }
        public set x(val:number){
            this._transform.position.x = val;
        }
        public get y(){
            return this._transform.position.y;
        }
        public set y(val:number){
            this._transform.position.y = val;
        }
        public get rotate(){
            return this._transform.rotation.z;
        }
        public set rotate(val:number) {
            
            this._transform.rotation.z = val;
        }
        public scale(x:number, y:number) {
            this._transform.scale.x = x;
            this._transform.scale.y = y;
        }
        constructor(text:string, data:string) {
            this._text = text;
            this._transform = new Transform();
            this._material = new BasicMaterial("#445566");
            this._BitmapFont = new BitmapFont(data);
        }
        private getGlyphs():void {
            
        }
        public load(gl: WebGLRenderingContext): void {
            // this._buffer = new TextureBuffer(gl);
            // this._buffer.loadData(this._geometry.data, this._geometry.indices);
            // this._material.texture = new Texture(gl);
            // if(this._material instanceof TextureMaterial) {
            //     this._material.loadTexture();
            // }
            // this._material.texture.active();
           
            for(let i=0; i<this._text.length; i++) {
                let glyph =  this._BitmapFont.getGlyph(this._text.charAt(i));
                console.log(glyph.width, glyph.height);
                let geometry = new PlaneGeometry(glyph.width, glyph.height);  
                let indices = [
                    glyph.x/256,                 glyph.y/256,
                    (glyph.x+glyph.width)/256,   glyph.y/256,
                    (glyph.x+glyph.width)/256,   (glyph.y+glyph.height)/256,
                    (glyph.x)/256,   (glyph.y+glyph.height)/256,
                ]
                this._bitmapText[i] = new BitmapText(geometry, indices, this._material);
                this._bitmapText[i].load(gl);
             }
             console.log(this._bitmapText);
        }
        public update(delta: number): void {
            this._localMatrix = this._transform.getTranformationMatrix();
        }   
        public render(render: Renderer): void {
            let model = Matrix4X4.multiply(this.parent.worldMatrix, this._localMatrix)
            let modelLocation = render.shader.getUniformLocation("u_model");
            render.gl.uniformMatrix4fv(modelLocation, false, new Float32Array(model.data));
            this._material.loadUniform(render.gl, render.shader);
            for(let b of this._bitmapText) {
                b.draw(model);
            }
        }
    }
}