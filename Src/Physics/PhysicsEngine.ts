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
                if(!this._objects[i].isCollidable) {
                    continue;
                }
                for(let j=i+1; j<this._objects.length; j++) {
                    if(this.num<4) {
                        console.log(this._objects[i].body.shape)
                        this.num++;
                    }
                    if(!this._objects[j].isCollidable) {
                        continue;
                    }   
                    if(this._objects[i].body.shape.intersect(this._objects[j].body.shape)) {
                        this.checkPostionAfterCollistion(this._objects[i], this._objects[j]);
                    }
                }
            }
        }
        private num=0;
        private checkPostionAfterCollistion(obj1:PhysicsObject, obj2:PhysicsObject) {
            

            let res = Math.max(obj1.body.restitution, obj2.body.restitution);
            let relVel = Vector2.subtract(obj2.velocity, obj1.velocity);
            let colliVec = Vector2.subtract(obj2.position, obj1.position);
            colliVec.normalize();
            let velocityAlongNormal = colliVec.dotProduct(relVel)
            if(velocityAlongNormal>0) {
                return;
            }
            let j = -(1+res)*(velocityAlongNormal);
            j = j/(obj1.body.inverseMass+obj2.body.inverseMass);
            let implus = colliVec.scalarMultiply(j)
            
            obj1.velocity.subtract(implus.scalarMultiply(obj1.body.inverseMass));
            obj2.velocity.add(implus.scalarMultiply(obj2.body.inverseMass));

            
        }
        public update():void {
            for(let o of this._objects){
                o.update();
                // temp 
                let pos = o.getPos();
                if(pos.x>renderer.width || pos.x<0) {
                    o.velocity.x = -o.velocity.x;
                }
                if(pos.y>renderer.height || pos.y<0) {
                    o.velocity.y = -o.velocity.y;
                }
    
                //
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