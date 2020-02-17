namespace VERVE {

    export class TextComponent implements IComponent {
        private _text:string;
        private _geometry:Geometry;
        private _material:TextureMaterial;
        private _buffer: TextureBuffer;
        private _transform:Transform;
        private _localMatrix:Matrix4X4;
        private _BitmapFont:BitmapFont;
        private _width:number;
        private _height:number;
        public onClick = ()=>{};
        private _shape:IShape;
        private _clickEvent:ClickEvent;
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
        constructor(text:string, fontName:string) {
            this._text = text;
            this._transform = new Transform();
            this._BitmapFont = FontLoader.bitmapFont[fontName];
            this._material = new TextureMaterial(this._BitmapFont.fontImage);
            this._material.color = "#000000";  
        }
        public center():void {
            this._transform.position.x = -this._width/2;
        }
        public changeFont(fontName:string):void {
            this._BitmapFont = FontLoader.bitmapFont[fontName];
            this._material.changeTexture(this._BitmapFont.fontImage);
            this.changeText(this._text);
        }
        public set color(color:string) {
            this._material.color = color;
        }
        public setMouse(name:"circle"|"rectangle"|"ellispe", eventManager:EventManager, {radius=undefined, width=undefined, height=undefined, rX=undefined, rY=undefined}):void {
            
            if(name==="circle") {
                if(radius==undefined) {
                    throw new Error("for circular shape radius must be defined");
                }
                this._shape = new Circle(new Vector2(this.x+this.parent.x, this.y+this.parent.y), radius); 
                this._clickEvent = new ClickEvent(this._shape);
                this._clickEvent.parent = this;
                eventManager.addEvent(this._clickEvent);

            } else if(name==="rectangle") {
                if(width==undefined) {
                    throw new Error("for retangular shape width must be defined");
                } else if(height===undefined) {
                    throw new Error("for rectangular shape height must be defined");
                }
                this._shape = new Rectangle(new Vector2(this.x+this.parent.x, this.y+this.parent.y), width, height); 
                this._clickEvent = new ClickEvent(this._shape);
                this._clickEvent.parent = this;
                eventManager.addEvent(this._clickEvent);

            } else if(name==="ellispe") {
                // if(rX==undefined) {
                //     throw new Error("for elliptical shape rX(major axis) must be defined");
                // } else if(rY==undefined) {
                //     throw new Error("for elliptical shape rY(minor axis) must be defined");
                // }
                // let shape = new Ellispse(new Vector2(this.x, this.y), rX, rY); 
                // let clickEvent = new ClickEvent(shape);
                // clickEvent.parent = this;
            } else {
                throw new Error("The shape must be cirlce or rectangle but you define: "+name);
            }
          
        }
        public enableMouse(eventManager:EventManager):void {
            eventManager.addEvent(this._clickEvent)
        }
        public disableMouse(eventManager:EventManager):void {
            eventManager.removeEvent(this._clickEvent);
        }
        public changeText(text:string):void {
            this._text = text;
            let vertexData = [];
            let textrueData = [];
            let indicesData = [];
            let x = 0, y = 0, indiNum = 0;
            for(let i=0; i<this._text.length; i++) {
                let glyph =  this._BitmapFont.getGlyph(this._text.charAt(i));
                let left = x+glyph.xOffset;
                let top = y+glyph.yOffset;
                let data = [
                    left,               top,
                    left+glyph.width,   top,
                    left+glyph.width,   top+glyph.height,
                    left,               top+glyph.height,
                ];  
                let textrue = [
                    glyph.x/this._BitmapFont.width,                 glyph.y/this._BitmapFont.height,
                    (glyph.x+glyph.width)/this._BitmapFont.width,   glyph.y/this._BitmapFont.height,
                    (glyph.x+glyph.width)/this._BitmapFont.width,   (glyph.y+glyph.height)/this._BitmapFont.height,
                    (glyph.x)/this._BitmapFont.width,               (glyph.y+glyph.height)/this._BitmapFont.height,
                ]
                let indices = [
                    0+indiNum, 1+indiNum, 2+indiNum, 
                    2+indiNum, 3+indiNum, 0+indiNum
                ]
                for(let d of data) {
                    vertexData.push(d)
                }
                for(let t of textrue) {
                    textrueData.push(t);
                }
                for(let i of indices) {
                    indicesData.push(i);
                }
                x += glyph.xAdvanced;
                indiNum += 4;
            }
            this._width = x;
            this._buffer.loadData(vertexData, indicesData, textrueData);
        }
        public load(gl: WebGLRenderingContext): void {
            this._buffer = new TextureBuffer(gl);
            let vertexData = [];
            let textrueData = [];
            let indicesData = [];
            console.log(this._BitmapFont.width, this._BitmapFont.height)
            let x = 0, y = 0, indiNum = 0;
            for(let i=0; i<this._text.length; i++) {
                let glyph =  this._BitmapFont.getGlyph(this._text.charAt(i));
                let left = x+glyph.xOffset;
                let top = y+glyph.yOffset;
                let data = [
                    left,               top,
                    left+glyph.width,   top,
                    left+glyph.width,   top+glyph.height,
                    left,               top+glyph.height,
                ];  
                let textrue = [
                    glyph.x/this._BitmapFont.width,                 glyph.y/this._BitmapFont.height,  // this._BitmapFont.width should be dynamic
                    (glyph.x+glyph.width)/this._BitmapFont.width,   glyph.y/this._BitmapFont.height,
                    (glyph.x+glyph.width)/this._BitmapFont.width,   (glyph.y+glyph.height)/this._BitmapFont.height,
                    (glyph.x)/this._BitmapFont.width,   (glyph.y+glyph.height)/this._BitmapFont.height,
                ]
                let indices = [
                    0+indiNum, 1+indiNum, 2+indiNum, 
                    2+indiNum, 3+indiNum, 0+indiNum
                ]
                for(let d of data) {
                    vertexData.push(d)
                }
                for(let t of textrue) {
                    textrueData.push(t);
                }
                for(let i of indices) {
                    indicesData.push(i);
                }
                x += glyph.xAdvanced;
                indiNum += 4;
            }
            this._width = x;
            this._buffer.loadData(vertexData, indicesData, textrueData);
            this._material.texture = new Texture(gl);
            if(this._material instanceof TextureMaterial) {
                this._material.loadTexture();
            }
           
        }
        public update(delta: number): void {
            // this.loadTextData();
            this._localMatrix = this._transform.getTranformationMatrix();
        }   
        public render(render: Renderer): void {
            let model = Matrix4X4.multiply(this.parent.worldMatrix, this._localMatrix)
            let modelLocation = render.shader.getUniformLocation("u_model");
            render.gl.uniformMatrix4fv(modelLocation, false, new Float32Array(model.data));
            this._material.loadUniform(render.gl, render.shader);
            this._material.texture.active();
            this._buffer.bind();
            this._buffer.draw();
        }
    }
}