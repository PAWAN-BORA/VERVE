namespace VERVE {

    export class Rectangle implements IShape{
        public position:Vector2;
        public width:number;
        public height:number;

        constructor(position:Vector2, width:number, height:number) {
            this.position = position;
            this.width = width;
            this.height = height;
        }
        public pointInShape(x:number, y:number):boolean{
            let centerX = this.position.x+this.width/2
            let centerY = this.position.y+this.height/2
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