namespace VERVE {

    export class Rectangle implements IShape{
        public position:Vector2;
        public width:number;
        public height:number;
        public rotation:number = 0;
        public meterRadius:number;
       
        private cornerPos = [
            {x:1,  y:1},
            {x:1,  y:-1},
            {x:-1, y:-1},
            {x:-1, y:1},
        ]
        constructor(position:Vector2, width:number, height:number) {
            this.position = position;
            this.width = width;
            this.height = height;
            this.meterRadius = Math.sqrt(Math.pow(width/2, 2)+Math.pow(height/2, 2))/3.2;
            // console.log(this.radius);
        }

        public cornerVecs():Vector2[] {
            let vecs = [];
            for(let i=0; i<4; i++) {
                let vec = new Vector2(this.position.x+this.cornerPos[i].x*this.width/2, this.position.y+this.cornerPos[i].y*this.height/2);
                let corner = Vector2.subtract(vec, this.position);
                corner.rotate(this.rotation);
                // console.log(vec);
                corner.add(this.position);
                vecs[i] = corner;
            }
            return vecs;
            // throw new Error('method not implemented porperly');

        }
        /**
         * @gerDirCorner is the corner of vector with origin rectangle center. 
         */
        public getDirCorner(i:number):Vector2 {
            if(i>4) {
                throw new Error(`Threr are only 4 corners in a rectangle, so i should be less than 4: ${i}`);
            }
            let vec = new Vector2(this.position.x+this.cornerPos[i].x*this.width/2, this.position.y+this.cornerPos[i].y*this.height/2);
            let corner = Vector2.subtract(this.position, vec);
            corner.rotate(this.rotation);
            
            return corner;
        }
        public getCorner(i:number):Vector2 {
            if(i>4) {
                throw new Error(`Threr are only 4 corners in a rectangle, so i should be less than 4: ${i}`);
            }
            let vec = new Vector2(this.position.x+this.cornerPos[i].x*this.width/2, this.position.y+this.cornerPos[i].y*this.height/2);
            let corner = Vector2.subtract(vec, this.position);
            corner.rotate(this.rotation);
            corner.add(this.position);
            if(this.num<4) {
                console.log(corner);
                this.num++
            }
            return corner;
        }
        public num=0;
        public getNormal():Vector2[] {
            let normals = [];
            let c1 = this.getCorner(0);
            let c2 = this.getCorner(1);
            let c3 = this.getCorner(2)
            let norm = Vector2.subtract(c2, c1);
            norm.normalize();
            let norm2 = Vector2.subtract(c3, c2);
            norm2.normalize();
            normals.push(norm);
            normals.push(norm2);
            return normals;
        }
        public minMaxProjection(axix:Vector2):{min:number, max:number} {
            for(let i=0; i<4; i++) {

            }
            return;
        }
        public diagonalVecs():Vector2[] {
            let vecs = [];
            
            for(let i=0; i<4; i++) {
                let vec = new Vector2(this.position.x+this.cornerPos[i].x*this.width/2, this.position.y+this.cornerPos[i].y*this.height/2);
                let corner = Vector2.subtract(vec, this.position);
                corner.rotate(this.rotation);
                vecs[i] = corner;
            }
            return vecs;
        }
        public pointInShape(x:number, y:number):boolean{
            if(Math.abs(this.position.x-x)<this.width/2 && Math.abs(this.position.y-y)<this.height/2) {
                // console.log(this.position.x, this.position.x)
                return true;
            }
            return false;
        }
        public intersect(shape:IShape):boolean {
            if(shape instanceof Rectangle) {
                return this.intesetWithRectangle(shape);
            } else if(shape instanceof Circle) {
                return this.intersectWithCircle(shape);
            }
        }
        public rotate(angle:number) {

        }
        
        public intesetWithRectangle(rect:Rectangle):boolean {
            let xl = Math.max(this.position.x-this.width/2, rect.position.x-rect.width/2);
            let xr = Math.min(this.position.x+this.width/2, rect.position.x+rect.width/2);
            let yt = Math.max(this.position.y-this.height/2, rect.position.y-rect.height/2);
            let yb = Math.min(this.position.y+this.height/2, rect.position.y+rect.height/2);
            if(xl<xr && yt<yb) {
                return true;
            }
            return false;
        }
        public intersectWithCircle(circle:Circle):boolean {
            
            let x:number, y:number;
            if(circle.position.x<this.position.x-this.width/2) {
                y = clamp(this.position.y-this.height/2, this.position.y+this.height/2, circle.position.y)
                x = this.position.x-this.width/2;
            } else if(circle.position.x>this.position.x+this.width/2) {
                y = clamp(this.position.y-this.height/2, this.position.y+this.height/2, circle.position.y)
                x = this.position.x+this.width/2;
            } else if(circle.position.y<this.position.y-this.height/2) {
                x = clamp(this.position.x-this.width/2, this.position.x+this.width/2, circle.position.x);
                y = this.position.y-this.height/2
            } else if(circle.position.y>this.position.y+this.height/2) {
                x = clamp(this.position.x-this.width/2, this.position.x+this.width/2, circle.position.x);
                y = this.position.y+this.height/2
            } else {
                return true;
            }
            if(dist(x, y, circle.position.x, circle.position.y)<circle.radius) {
                
                return true;
            } else {
                return false;
            }
        }
       
        
    }
}