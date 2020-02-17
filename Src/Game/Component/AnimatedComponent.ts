namespace VERVE {

    export class AnimatedComponent implements IComponent{
        private _material:Material;
        private _geometry:Geometry;
        private _buffer:TextureBuffer;
        private _transform:Transform;
        private _localMatrix:Matrix4X4;
        private _row:number
        private _column:number;
        private _frameWidth:number;
        private _frameHeight:number;
        public _frameSequence:Array<{x:number, y:number}> = [];
        public frameTime:number = 200;
        public parent: GameObject;
        public isLoading: boolean = true;
        public startAnimation:boolean = false;
        private _totalTime:number = 0;
        public onClick = ()=>{};
        public isMouseEnable = false;
        private _shape:IShape;
        private _clickEvent:ClickEvent;
       // temp might  be change later;
        // private _physicsObject:PhysicsObject;
        // private _buttonEvent:ButtonEvent;
        //
        public get buffer(): TextureBuffer {
            return this._buffer;
        }
        public set buffer(value: TextureBuffer) {
            this._buffer = value;
        }
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
        constructor(width:number, height:number, row:number, column:number, material:Material) {
            this._geometry = new PlaneGeometry(width, height);
            this._material = material;
            this._transform = new Transform();
            this._row = row;
            this._column = column;
            this.getWidthAndHeight();
          
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
          this.isMouseEnable = true;
        //   this._shape.load(renderer.gl);
        }
        public enableMouse(eventManager:EventManager):void {
            eventManager.addEvent(this._clickEvent)
        }
        public disableMouse(eventManager:EventManager):void {
            eventManager.removeEvent(this._clickEvent);
        }
        private getWidthAndHeight():void {
            this._frameWidth = 1/this._column;
            this._frameHeight = 1/this._row;
        }
        public setFrameSequence(frameSequence:Array<{x:number, y:number}>):void {
            for(let f of frameSequence) {
                if(f.x>this._column) {
                    console.error(`${f.x} is out of range in frame sequnce`)
                }
                if(f.y>this._row) {
                    console.error(`${f.y} is out of range in frame sequunce`)
                }
                
            }

            this._frameSequence = frameSequence;
            this._num =0;
            console.log("setting the frame")
        }
        public load(gl: WebGLRenderingContext): void {
            this._buffer = new TextureBuffer(gl);
            this._buffer.loadData(this._geometry.data, this._geometry.indices,
                [  0, 0, 
                   this._frameWidth, 0, 
                   this._frameWidth, this._frameHeight, 
                   0, this._frameHeight
                ]
                 );
            this._material.texture = new Texture(gl);
            if(this._material instanceof TextureMaterial) {
                this._material.loadTexture();
            }
            this._material.texture.active();
         
        }
        private changeFrame(x:number, y:number):void {
            let data = [
                (x)*this._frameWidth,     (y)*this._frameHeight, 
                (x+1)*this._frameWidth,   (y)*this._frameHeight, 
                (x+1)*this._frameWidth,   (y+1)*this._frameHeight, 
                (x)*this._frameWidth,     (y+1)*this._frameHeight
            ]
            if(this._buffer!=undefined) {
                // this._material.texture.active();
                this.buffer.changeTextureChord(data); // might be change later;
            }
        }
        private _num =0;
        // temp 
        public update(delta:number): void {
            // this._physicsObject.update(delta);
            // let pos = this._physicsObject.getPos();
            // if(pos.x<50) {
            //     console.log(pos)
            //     console.log(this._transform.position)
            // }
            // this._transform.position.x = pos.x;
            // this._transform.position.y = pos.y;
            // this._buttonEvent.update();
            // if(this._buttonEvent.isClicked) {
            //     // do something with mouse event.
            //     this._buttonEvent.phyObj.position.set(this._buttonEvent.getMousePos.x, this._buttonEvent.getMousePos.y);
                
                
            // }
            this._localMatrix = this._transform.getTranformationMatrix();
            if(this.startAnimation) {
                this._totalTime += delta;
                if(this._totalTime>this.frameTime) {
                    this._totalTime = 0;
                    let frameNum = this._frameSequence[this._num];
                    this.changeFrame(frameNum.x-1, frameNum.y-1);
                    this._num++;
                    if(this._num>=this._frameSequence.length) {
                        this._num =0;
                    }
                    
                }
                
            }
        //   if(this.isMouseEnable) {
        //     // this._shape.position.set(this.parent.x+this.x, this.parent.y+this.y) ;
        //     // console.log("sdf")
        //   }
        }
        public render(render: Renderer): void {
            let model = Matrix4X4.multiply(this.parent.worldMatrix, this._localMatrix)
            let modelLocation = render.shader.getUniformLocation("u_model");
            render.gl.uniformMatrix4fv(modelLocation, false, new Float32Array(model.data));
            this._material.loadUniform(render.gl, render.shader);
            this._material.texture.active();
            this._buffer.bind();
            this._buffer.draw();
            
            // degub
            // this._shape.render(render);

        }
        
    }
}