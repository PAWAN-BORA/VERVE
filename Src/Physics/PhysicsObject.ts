namespace VERVE {
    
    export class PhysicsObject {
        public shape:IShape;
        private _type:"static" | "dynamic" = "dynamic";
        private _velocity: Vector2;
       
        private _mass: number = 1;
        public get mass(): number {
            return this._mass;
        }
        // public set mass(value: number) {
        //     this._mass = value;
        // }
        private _restitution: number = 0.8;
        public get restitution(): number {
            return this._restitution;
        }
        public set restitution(value: number) {
            this._restitution = value;
        }

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
        constructor(pos:Vector2, vel:Vector2=new Vector2()) {
            this._position = pos;
            this._velocity = vel;
            // temp code
            // this.shape = new Rectangle(this.position, 100, 100);
            this.shape = new Circle(this.position, 10);
            console.log(this._position , "thsids isd isd fsif");
            let geometry = new CircleGeometry(10, 90);
            let r = Math.floor(Math.random()*255);
            let g = Math.floor(Math.random()*255);
            let b = Math.floor(Math.random()*255);
            let material = new BasicMaterial(`rgb(${r}, ${g}, ${b})`)
            this._shapeComponent = new ShapeComponent(geometry, material);
        }
        public getPos():Vector2 {
            return this._position;
        }
        public update():void {
            this._position.add(this._velocity);
            // this.shape.x = this._position.x;
            // this.shape.y = this._position.y;
            this._shapeComponent.x = this.position.x;
            this._shapeComponent.y = this.position.y;
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