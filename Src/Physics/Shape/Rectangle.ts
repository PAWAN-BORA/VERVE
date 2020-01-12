namespace VERVE {

    export class Rectangle implements IShape{
        public position:Vector2;
        public width:number;
        public height:number;
        public rotation:number = 0;
        constructor(position:Vector2, width:number, height:number) {
            this.position = position;
            this.width = width;
            this.height = height;
        }
        public cornerVecs():Vector2[] {
            let vecs = [];
            // let vec = new Vector2(this.position.x+this.width/2, this.position.y-this.height/2);
            // let corner = Vector2.subtract(this.position, vec);
            // corner.rotate(this.rotation);
            // corner.add(this.position)
            // vecs.push(corner);
            let corPos = [
                {x:1, y:1},
                {x:1, y:-1},
                {x:-1, y:-1},
                {x:-1, y:1},
            ]
            for(let i=0; i<4; i++) {
                let vec = new Vector2(this.position.x+corPos[i].x*this.width/2, this.position.y+corPos[i].y*this.height/2);
                let corner = Vector2.subtract(vec, this.position);
                corner.rotate(this.rotation);
                // console.log(vec);
                corner.add(this.position);
                vecs[i] = corner;
            }
            return vecs;
            // throw new Error('method not implemented porperly');

        }
        public pointInShape(x:number, y:number):boolean{
            // let centerX = this.position.x+this.width/2
            // let centerY = this.position.y+this.height/2
            // if(Math.abs(centerX-x)<this.width/2 && Math.abs(centerY-y)<this.height/2) {
            //     console.log(centerX, this.position.x)
            //     return true;
            // }
            if(Math.abs(this.position.x-x)<this.width/2 && Math.abs(this.position.y-y)<this.height/2) {
                // console.log(this.position.x, this.position.x)
                return true;
            }
            return false;
        }
        public intersect(shape:IShape):boolean {
            if(shape instanceof Rectangle) {
                return this.intesetWithRectangle(shape);
            }
        }
        public rotate(angle:number) {

        }
        
        private intesetWithRectangle(rect:Rectangle):boolean {
            let xl = Math.max(this.position.x-this.width/2, rect.position.x-rect.width/2);
            let xr = Math.min(this.position.x+this.width/2, rect.position.x+rect.width/2);
            let yt = Math.max(this.position.y-this.height/2, rect.position.y-rect.height/2);
            let yb = Math.min(this.position.y+this.height/2, rect.position.y+rect.height/2);
            if(xl<xr && yt<yb) {
                return true;
            }
            return false;
        }
        
    }
}