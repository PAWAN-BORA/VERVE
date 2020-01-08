namespace VERVE {
    
    export class PhysicsObject {
        private _type:"static" | "dynamic" = "dynamic";
        private _velocity: Vector2;
       
        private _mass: number = 1;
        public body:Body;
        

        // temp code;
        private _shapeComponent:ShapeComponent;
        public isLoading = true;
        //
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
        public addBody(body:Body) {
            this.body = body;
            // temp code;
           
            // if(body.type=="circle") {
            //     console.log(this.position);
            //     this.body.shape = new Circle(this.position, 10);
            // }
            this.body.shape.position = this._position;
            let radius:number;
            if(this.body.shape instanceof Circle) {
                radius = this.body.shape.radius;
            }
            let geometry = new CircleGeometry(radius, 90);
            let r = Math.floor(Math.random()*255);
            let g = Math.floor(Math.random()*255);
            let b = Math.floor(Math.random()*255);
            let material = new BasicMaterial(`rgb(${r}, ${g}, ${b})`)
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
                // this.shape.x = this._position.x;
                // this.shape.y = this._position.y;
                this._shapeComponent.x = this.position.x;
                this._shapeComponent.y = this.position.y;
            }
            this._shapeComponent.update(23);
            
        }
        // temp debug code;
        public load(gl:WebGLRenderingContext) {
            this._shapeComponent.load(gl);
        }
        public render(renderer:Renderer):void { 
            this._shapeComponent.render(renderer);
        }
        
    }
}