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
                   
                    if(!this._objects[j].isCollidable) {
                        continue;
                    }   
                    // if(this._objects[i].body.shape.intersect(this._objects[j].body.shape)) {
                    //     // console.log("colliding")
                    //     this.checkPositionWithoutAngularMomentum(this._objects[i], this._objects[j]);
                    // }
                    if(this._objects[i].body.shape.sat.checkCollision(this._objects[i].body.shape, this._objects[j].body.shape)) {
                        // console.log("colliding")
                        this.checkPostionAfterCollistion(this._objects[i], this._objects[j]);
                        // this.checkPositionWithoutAngularMomentum(this._objects[i], this._objects[j]);
                    }
                }
            }
        }
        private checkPositionWithoutAngularMomentum(obj1:PhysicsObject, obj2:PhysicsObject):void {
            let res = Math.max(obj1.body.restitution, obj2.body.restitution);
            let relVel = Vector2.subtract(obj2.velocity, obj1.velocity);
            let colliVec = Vector2.subtract(obj2.position, obj1.position);
            colliVec.normalize();
            let velocityAlongNormal = colliVec.dotProduct(relVel);
            if(velocityAlongNormal>0) {
                return;
            }
            let j = -(1+res)*(velocityAlongNormal);
            j = j/(obj1.body.inverseMass+obj2.body.inverseMass);
            let implus = colliVec.clone().scalarMultiply(j)
            obj1.velocity.subtract(implus.clone().scalarMultiply(obj1.body.inverseMass));
            obj2.velocity.add(implus.clone().scalarMultiply(obj2.body.inverseMass)); 
        }
        private checkPostionAfterCollistion(obj1:PhysicsObject, obj2:PhysicsObject) {
            
            let res = Math.max(obj1.body.restitution, obj2.body.restitution);
            let relVel = Vector2.subtract(obj2.velocity, obj1.velocity);
            let colliVec = Vector2.subtract(obj2.position, obj1.position);
            colliVec.normalize();
            let obj1RadiusVec = colliVec.clone().scalarMultiply(obj1.body.shape.meterRadius);
            let obj2RadiusVec = colliVec.clone().scalarMultiply(obj2.body.shape.meterRadius);
            let contVec = relVel.clone().normalize();//new Vector2(-colliVec.y, -colliVec.x);
            let velocityAlongNormal = colliVec.dotProduct(relVel);
            if(velocityAlongNormal>0) {
                return;
            }
            let obj1tou = obj1RadiusVec.crossProduct(colliVec);
            obj1tou = Math.pow(obj1tou, 2)*obj1.body.inverseInertia;
            let obj2tou = obj2RadiusVec.crossProduct(colliVec);
            obj2tou = Math.pow(obj2tou, 2)*obj2.body.inverseInertia;

            let j = -(1+res)*(velocityAlongNormal);
            let deno = obj1.body.inverseMass+obj2.body.inverseMass + obj1tou + obj2tou;
            j = j/deno;
            let implus = colliVec.clone().scalarMultiply(j)
            obj1.velocity.subtract(implus.clone().scalarMultiply(obj1.body.inverseMass));
            obj1.angularVelocity -= obj1.body.inverseInertia*Vector2.crossProduct(contVec, implus);
          
            obj2.velocity.add(implus.clone().scalarMultiply(obj2.body.inverseMass));   
            obj2.angularVelocity += obj2.body.inverseInertia*Vector2.crossProduct(contVec, implus);
           
        }
        public update():void {
            for(let o of this._objects){
                o.update();
                // temp 
                let pos = o.getPos();
                if(pos.x>renderer.width || pos.x<0) {
                    o.velocity.x = -o.velocity.x;
                    if(o.body.shape instanceof Rectangle) {
                        // console.log(o.body.shape.cornerVecs());
                    }
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