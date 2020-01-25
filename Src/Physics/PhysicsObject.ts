namespace VERVE {
    export class PhysicsObject {
        private _type:"static" | "dynamic" = "dynamic";
        // linear component 
        private _velocity: Vector2;
        public get velocity(): Vector2 {
            return this._velocity;
        }
        public set velocity(value: Vector2) {
            this._velocity = value;
        }
        private _position: Vector2;
        public get position(): Vector2 {
            return this._position;
        }
        public set position(value: Vector2) {
            this._position = value;
        }

        // angular component
        private _angularVelocity: number = 0// Math.PI / 90; 
        public get angularVelocity(): number {
            return this._angularVelocity;
        }
        public set angularVelocity(value: number) {
            this._angularVelocity = value;
        }
       
        private _rotate: number = 0;
        public get rotate(): number {
            return this._rotate;
        }
        public set rotate(value: number) {
            this._rotate = value;
        }
        // public _torque:number =0;

        public body:Body;
        
        // temp code;
        private _shapeComponent:ShapeComponent;
        public isLoading = true;
        //
        
        
        
        private _isCollidable = false;
        public get isCollidable() {
            return this._isCollidable;
        }
        public set isCollidable(value) {
            if(this.body==undefined) {
                throw new Error(`Body of physicsObject is undefined. can not set for collision`);
            }
            this._isCollidable = value;
        }
        constructor(pos:Vector2, vel:Vector2=new Vector2()) {
            this._position = pos;
            this._velocity = vel;
            // temp code
            // this.shape = new Rectangle(this.position, 100, 100);
            // this.shape = new Circle(this.position, 5);
            let geometry = new CircleGeometry(5, 90);
            let r = Math.floor(Math.random()*255);
            let g = Math.floor(Math.random()*255);
            let b = Math.floor(Math.random()*255);
            let material = new BasicMaterial(`rgb(${r}, ${g}, ${b})`)
            this._shapeComponent = new ShapeComponent(geometry, material);
           
        }
        public addBody(body:Body, {radius=undefined, offset=undefined, width=undefined, height=undefined, rotate=0}:{radius?:number, offset?:Vector2, width?:number, height?:number, rotate?:number}) {
            this.body = body;
            // temp code;
                let geometry;
            //
            if(body.type == "circle") {
                if(radius==undefined) {
                    throw new Error('For circular body radius must be defined')
                }
                body.shape = new Circle(new Vector2(), radius);
                let area = Math.round(2*Math.PI*radius)/1000;
                body.mass = area*body.density;
                //
                geometry = new CircleGeometry(radius, 20);
                //
            } else if(body.type=="rectangle") {
                if(width==undefined || height==undefined) {
                    throw new Error('For rectangular shape height and width must be defined')
                }
                body.shape = new Rectangle(new Vector2(), width, height);
                
                let area = Math.round(width*height)/1000
                body.mass = area*body.density;
                body.inertia = body.mass*Math.pow(body.shape.meterRadius, 2);
                console.log(body.shape.meterRadius);
                geometry = new PlaneGeometry(width, height);
            }
            if(offset!=undefined) {
                body.offset = offset;
            }
            body.shape.rotation = rotate;
            this._rotate = rotate;
            console.log(body)
            // temp code;
           
            let r = Math.floor(Math.random()*255);
            let g = Math.floor(Math.random()*255);
            let b = Math.floor(Math.random()*255);
            let material = new BasicMaterial(`rgb(${r}, ${g}, ${b})`);
            this._shapeComponent = new ShapeComponent(geometry, material);
            this._isCollidable = true;
        }
        public getPos():Vector2 {
            return this._position;
        }
        public update():void {
            if(Math.abs(this._velocity.x)<0.1) {
                this._velocity.x = 0;
            }
            if(Math.abs(this._velocity.y)<0.1) {
                this._velocity.y =0;
            }
            if(this._velocity.x==0 && this._velocity.y==0) {
                // return;
              
            } else {

                this._position.add(this._velocity);

            }
            // console.log(this.angularVelocity);
            this._rotate += this._angularVelocity;

            this._shapeComponent.x = this.position.x;
            this._shapeComponent.y = this.position.y;
            this._shapeComponent.rotate = this._rotate; // temp only in rectangle;
            this.body.shape.position.x = this.body.offset.x + this.position.x;
            this.body.shape.position.y = this.body.offset.y + this.position.y;
            this.body.shape.rotation = this._rotate;
            this._shapeComponent.update(23);
            
        }
        // temp debug code;
        public num = 0;
        public load(gl:WebGLRenderingContext) {
            this._shapeComponent.load(gl);
        }
        public render(renderer:Renderer):void { 
            this._shapeComponent.render(renderer);
        }
        
    }
}