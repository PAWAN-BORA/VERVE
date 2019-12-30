namespace VERVE {

    export class ButtonEvent {
        public shape:IShape;
        public isClicked:boolean =false;
        public hover:boolean = false;
        constructor(shape:IShape) {
            this.shape = shape;
        }
        public onMousedown(point:Vector2):void {
            if(this.shape.pointInShape(point.x, point.y)) {
                console.log("onMouseDown");
                this.isClicked = true
            }
        }
        public onMousemove(point:Vector2):void {
            if(this.shape.pointInShape(point.x, point.y)) {
                console.log("onMouseMove");
            }
            if(this.isClicked) {
                this.shape.position.x = point.x;
                this.shape.position.y = point.y; 
            }
        }
        public onMouseup(point:Vector2):void {
            if(this.shape.pointInShape(point.x, point.y)) {
                console.log("onMouseUp");
            }
            this.isClicked = false;
        }
        public load(): void {
            MouseManager.addEvent(this);
        }
    }
}