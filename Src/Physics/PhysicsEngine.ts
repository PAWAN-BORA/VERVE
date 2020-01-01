namespace VERVE {

    export class PhysicsEngine {
        private _objects:PhysicsObject[] = [];
        
        constructor() {
            
        }
        public addObjects(object:PhysicsObject):void {
            this._objects.push(object);
        }
        public removeObject(object:PhysicsObject):void {
            let index = this._objects.indexOf(object);
            if(index!==-1) {
                this._objects.splice(index, 1);
            } else {
                throw new Error(`physics objects dose not exist`);
            }
        }
        private checkCollision():void {
            for(let i=0; i<this._objects.length; i++) {
                for(let j=i+1; j<this._objects.length; j++) {
                    // console.log(this._objects[i].shape);
                    if(this._objects[i].shape.intersect(this._objects[j].shape)) {
                        // console.log("colliding");
                        this.checkPostionAfterCollistion(this._objects[i], this._objects[j]);
                    }
                }
            }
        }
        private checkPostionAfterCollistion(obj1:PhysicsObject, obj2:PhysicsObject) {
            // formula is wrong;    
            let res:number = 0.5;
            let finVel1 = new Vector2(), finVel2 = new Vector2();
            let delV = obj1.velocity.x - obj2.velocity.x;
            let leftSide = obj1.mass*obj1.velocity.x + obj2.mass*obj2.velocity.x;
            // console.log(delV);
            // let equ1 = obj1.mass*finVel1.x + obj2.mass*finVel1.x; // shuold be modified.
            finVel1.x = (leftSide - obj2.mass*(res)*delV)/(obj1.mass+obj2.mass);
            finVel2.x = res*delV+finVel1.x;
            obj1.velocity.x = finVel1.x;
            obj2.velocity.x = finVel2.x;
            console.log(obj1.velocity.x, obj2.velocity.x);
            
        }
        public update():void {
            for(let o of this._objects){
                o.update();
            }
            this.checkCollision();
        }

        // debug code 
        public isLoading = true;
        public load(gl:WebGLRenderingContext) {
            for(let o of this._objects){
                o.load(gl);
            }
        }
        public render(renderer:Renderer):void {
            for(let o of this._objects){
                o.render(renderer);
            }
        }
    }
}