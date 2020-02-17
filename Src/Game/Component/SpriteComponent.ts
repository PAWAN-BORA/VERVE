namespace VERVE {
    
    export class SpriteComponent implements IComponent{
        private _geometry:Geometry;
        private _material:Material;
        private _buffer: TextureBuffer;
        private _transform:Transform;
        private _localMatrix:Matrix4X4;
        public parent:GameObject;
        public onClick = ()=>{};
        private _shape:IShape;
        private _clickEvent:ClickEvent;
        public get buffer(): TextureBuffer {
            return this._buffer;
        }
        public set buffer(value: TextureBuffer) {
            this._buffer = value;
        }
        // temp code
        // public x;
        // public y;
        // public rotate;
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
        public isLoading:boolean = true;
        constructor(geometry:Geometry, material:Material) {
            this._geometry = geometry;
            this._material = material;
            this._transform = new Transform();
            // this._buffer = new Buffer(this._geometry, this._material);
            // this.x = this._transform.position.x;
            // this.y = this._transform.position.y;
            // this.rotate = this._transform.rotation.z;
            
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
        //   this._shape.load(renderer.gl);
        }
        public enableMouse(eventManager:EventManager):void {
            eventManager.addEvent(this._clickEvent)
        }
        public disableMouse(eventManager:EventManager):void {
            eventManager.removeEvent(this._clickEvent);
        }
        public load(gl:WebGLRenderingContext):void {
            this._buffer = new TextureBuffer(gl);
            this._buffer.loadData(this._geometry.data, this._geometry.indices);
            this._material.texture = new Texture(gl);
            if(this._material instanceof TextureMaterial) {
                this._material.loadTexture();
            }
            this._material.texture.active();
            // this._localMatrix = this._transform.getTranformationMatrix();
        }
        public update(delta:number):void {
            this._localMatrix = this._transform.getTranformationMatrix();
        }
        public render(render:Renderer):void {
            // this._sprite.load(renderer.gl);
            // this._sprite.draw();
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