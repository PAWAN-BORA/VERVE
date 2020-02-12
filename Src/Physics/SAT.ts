let showData = false;
namespace VERVE {

    export abstract class SAT {
        // tmep 
        // private static phyObj = new VERVE.PhysicsObject(new Vector2(100, 100), new Vector2(0, 0));
        // private static body = new VERVE.Body("circle", {restitution:0.2, density:1});
        // public static load():void {
        //     SAT.phyObj.addBody(SAT.body, { radius:10, width:110, height:20, rotate:0});
        //     SAT.phyObj.load(renderer.gl);
        // }
        //
        constructor() {
           
        }

        public static checkCollision(shape1:IShape, shape2:IShape):boolean {
            if(shape1 instanceof Rectangle && shape2 instanceof Rectangle) {
                return this.collisionBetweenRects(shape1, shape2)
            } else if(shape1 instanceof Circle && shape2 instanceof Rectangle) {
                return this.rectAndCircleCollision(shape2, shape1);
            } else if(shape1 instanceof Rectangle && shape2 instanceof Circle) {
                return this.rectAndCircleCollision(shape1, shape2);
            } else if(shape1 instanceof Circle && shape2 instanceof Circle) {
                return this.collisionBetweenCircles(shape1, shape2);
            }
            
        }
        private static collisionBetweenRects(rect1:Rectangle, rect2:Rectangle):boolean {
            let isColliding:boolean;
            let axes1 = rect1.getNormal();
            
            isColliding =  this.collisionAgainAxis(axes1, rect1, rect2);
            if(!isColliding) {
                return false;
            }
            let axes2 = rect2.getNormal();
            isColliding = this.collisionAgainAxis(axes2, rect1, rect2);
            if(!isColliding) {
                return false;
            }
           
            return true;
        }
        private static collisionBetweenCircles(circle1:Circle, circle2:Circle):boolean {
            let vec = Vector2.subtract(circle1.position, circle2.position);
            let dis = vec.magnitude();
            if(dis<circle1.radius+circle2.radius) {
                return true;
            }
            return false;
        }
        private static rectAndCircleCollision(rect:Rectangle, circle:Circle):boolean {
            

            let angle = rect.rotation;
            let circlePos = Vector2.subtract(rect.position, circle.position);
            circlePos.rotate(-angle);
            circlePos.add(rect.position);
            let x:number, y:number;

            if(circlePos.x<rect.position.x-rect.width/2) {
                y = clamp(rect.position.y-rect.height/2, rect.position.y+rect.height/2, circlePos.y)
                x = rect.position.x-rect.width/2;

            } else if(circlePos.x>rect.position.x+rect.width/2) {
                y = clamp(rect.position.y-rect.height/2, rect.position.y+rect.height/2, circlePos.y)
                x = rect.position.x+rect.width/2;

            } else if(circlePos.y<rect.position.y-rect.height/2) {
                x = clamp(rect.position.x-rect.width/2, rect.position.x+rect.width/2, circlePos.x);
                y = rect.position.y-rect.height/2

            } else if(circlePos.y>rect.position.y+rect.height/2) {
                x = clamp(rect.position.x-rect.width/2, rect.position.x+rect.width/2, circlePos.x);
                y = rect.position.y+rect.height/2

            } else {
                
                return true;
            }
            if(dist(x, y, circlePos.x, circlePos.y)<circle.radius) {
                
               return true;
            } else {
                return false;
            }
           
        }
        
        private static collisionAgainAxis(axes:Vector2[], rect1:Rectangle, rect2:Rectangle):boolean {
            let isColliding:Array<boolean> = [];
            for(let a of axes) {
                let rect1Proj:{min:number, max:number}, rect2Proj:{min:number, max:number};
                rect1Proj = this.minMaxProjection(a, rect1);
                rect2Proj = this.minMaxProjection(a, rect2);
                if((rect1Proj.max>rect2Proj.min && rect1Proj.min<rect2Proj.max)) {
                    isColliding.push(true);
                } else {
                    isColliding.push(false);
                }
            }
            for(let b of isColliding){
                if(!b) {
                    return false;
                }
            }
            return true;
        }
        private static minMaxProjection(axis:Vector2, rect:Rectangle):{min:number, max:number} {
            let min = rect.getCorner(0).dotProduct(axis);
            let max = rect.getCorner(0).dotProduct(axis);
            for(let i=1; i<4; i++) {
                let currProj = rect.getCorner(i).dotProduct(axis)
                if(min>currProj) {
                    min = currProj;
                }
                if(max<currProj){
                    max = currProj;
                }
            }

            return {
                min:min,
                max:max
            }
        }
    }
}