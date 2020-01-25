namespace VERVE {

    export class ButtonEvent {
        public phyObj:PhysicsObject;
        public isClicked:boolean =false;
        public hover:boolean = false;
        public getMousePos:Vector2 = new Vector2();
        constructor(phyObj:PhysicsObject) {
            this.phyObj = phyObj;
        }
        public onMousedown(point:Vector2):void {
            if(this.phyObj.body.shape.pointInShape(point.x, point.y)) {
                // console.log("onMouseDown");
                this.getMousePos.set(point.x, point.y);
                this.isClicked = true
            }
        }
        public onMousemove(point:Vector2):void {
            
            if(this.phyObj.body.shape.pointInShape(point.x, point.y)) {
                // console.log("onMouseMove");
            }
            if(this.isClicked) {
                // this.shape.position.x = point.x;
                // this.shape.position.y = point.y; 
                this.getMousePos.set(point.x, point.y);
            }
        }
        public onMouseup(point:Vector2):void {
            if(this.phyObj.body.shape.pointInShape(point.x, point.y)) {
                // console.log("onMouseUp");
            }
            this.isClicked = false;
        }
        public update():void {
            // this.shape.position.x = this.getMousePos.x;
            // this.shape.position.y = this.getMousePos.y;  
        }
        public load(): void {
            MouseManager.addEvent(this);
        }
    }
}