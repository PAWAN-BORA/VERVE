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
            // obj1.position.x -= obj1.velocity.x 
            // obj2.position.x -= obj2.velocity.x 

            let restituion = Math.max(obj1.restitution, obj2.restitution);


            let res:number = 1;
            let finVel1 = new Vector2(), finVel2 = new Vector2();
            let relVel = Vector2.subtract(obj1.velocity, obj2.velocity);

            let colliVec = Vector2.subtract(obj2.position, obj1.position);
            let dirfirst = relVel.dotProduct(colliVec)
            if(dirfirst<0) {
                return;
            }

            let delV = obj2.velocity.x - obj1.velocity.x;

            let leftSide = obj1.mass*obj1.velocity.x + obj2.mass*obj2.velocity.x;
            let firstVel = obj1.velocity.clone();
            firstVel.scalarMultiply(obj1.mass)
            let secondVel = obj2.velocity.clone();
            secondVel.scalarMultiply(obj2.mass);
            let leftVect = Vector2.add(firstVel, secondVel); 
            // console.log(leftVect, leftSide);
            let finObj1Vel:Vector2, finObj2Vel:Vector2;
            // console.log(delV, colliVec);
            // let equ1 = obj1.mass*finVel1.x + obj2.mass*finVel1.x; // shuold be modified.
            finVel1.x = (leftSide - obj2.mass*(res)*delV)/(obj1.mass+obj2.mass);
            finVel2.x = res*delV+finVel1.x;

            // relVelocity.scalarMultiply(obj2.mass*res);
            finObj1Vel = leftVect.subtract(relVel.clone().scalarMultiply(obj2.mass*res)).scalarMultiply(1/(obj1.mass+obj2.mass));
            finObj2Vel = relVel.clone().scalarMultiply(res).add(finObj1Vel);
            // console.log(finObj1Vel, finVel1);
            // console.log(finObj2Vel, finVel2);
            // finVel1.x *= colliVec.x;
            // finVel1.y *= colliVec.y;
            // finVel2.x *= colliVec.x;
            // finVel2.y *= colliVec.y;
            // finVel1.multiply(colliVec);
            // finVel2.multiply(colliVec);
            // let delVec = new Vector2(delV, 0);
            // let speed = colliVec.dotProduct(delVec);
            // console.log(speed, delV);
            // console.log(speed*colliVec.x, speed*colliVec.y);
            // console.log(finVel1.x, finVel2.x)
            // console.log(finVel2.x*colliVec.x, speed*colliVec.y);

            // console.log(finVel1)
            // obj1.velocity.x = speed*colliVec.x;
            // obj1.velocity.y = speed*colliVec.y;
            // obj2.velocity.x -= speed*colliVec.x;
            // obj2.velocity.y -= speed*colliVec.y;
            // finVel1.x = finVel1.x*colliVec.x;
            // finVel1.y = finVel1.y*colliVec.y;
            // finVel2.x = finVel2.x*colliVec.x;
            // finVel2.y = finVel2.y*colliVec.y;
            let dir = Vector2.subtract(finObj1Vel, finObj2Vel);
            
            let diresign = colliVec.dotProduct(dir);
            // if(diresign>0) {
            //     // console.log("--------------------->",dir);
            //     return;
            // }
            if((finObj1Vel.x<0 && finObj2Vel.x<0) || (finObj1Vel.x>0 && finObj2Vel.x>0) || (finObj1Vel.y - finObj2Vel.y)>0) {
                // console.log("exiting")
                // return;
            }
            obj1.velocity.set(finObj1Vel.x, finObj1Vel.y);
            obj2.velocity.set(finObj2Vel.x, finObj2Vel.y);
            
            // obj1.velocity.x = finVel2.x;
            // obj1.velocity.y = finVel1.y;
            // obj2.velocity.x = finVel1.x;
            // console.log(finVel1.x);
            // obj2.velocity.y = finVel2.y;
            // console.log(obj1.velocity.x, obj2.velocity.x);
            
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