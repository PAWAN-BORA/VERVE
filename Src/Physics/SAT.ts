namespace VERVE {

    export class SAT {
        constructor() {
            
        }
        public checkCollision(rect1:Rectangle, rect2:Rectangle):boolean {

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
        private collisionAgainAxis(axes:Vector2[], rect1:Rectangle, rect2:Rectangle):boolean {
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
        private minMaxProjection(axis:Vector2, rect:Rectangle):{min:number, max:number} {
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