namespace VERVE {

    export class ClickEvent {
        public shape:IShape;
        public isClicked:boolean =false;
        public hover:boolean = false;
        public getMousePos:Vector2 = new Vector2();
        public parent:IComponent;
        constructor(shape:IShape) {
            this.shape = shape;
        }
        public onMousedown(point:Vector2):void {
            if(this.shape.pointInShape(point.x, point.y)) {   
                this.isClicked = true;
            }
        }
        public onMousemove(point:Vector2):void {
            
            if(this.isClicked) {
                
            }
            if(this.shape.pointInShape(point.x, point.y)) {
               this.hover = true;
            } else {
                this.hover = false;
            }
            if(this.hover) {
                renderer.canvas.style.cursor = "pointer";
               
            } else {
                renderer.canvas.style.cursor = "auto";
            }
        }
        public onMouseup(point:Vector2):void {
            if(this.shape.pointInShape(point.x, point.y)) {
               
              
            } 
            
            if(this.isClicked) {
                this.parent.onClick();
                
            }
            this.isClicked = false;
            
        }

        // for debuggine purpose;

        public update():void {
            // this.shape.position.x = this.getMousePos.x;
            // this.shape.position.y = this.getMousePos.y;  
        }
        public render():void {

        }

       
    }
}