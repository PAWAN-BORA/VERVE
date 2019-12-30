namespace VERVE {

    export abstract class MouseManager {
        private static _cvs:HTMLCanvasElement;
        private static _width:number;
        private static _height:number;
        private static _mouseEvents:ButtonEvent[] = [];

        public static addEvent(MouseEvent:ButtonEvent):void {
            this._mouseEvents.push(MouseEvent);
        }
        public static removeEvent(MouseEvent:ButtonEvent):void {
            let index = this._mouseEvents.indexOf(MouseEvent);
            if(index!==-1) {
                this._mouseEvents.splice(index, 1);
            }
        }
        public static initialise(renderer:Renderer):void {
            MouseManager._cvs = renderer.canvas;
            MouseManager._width = renderer.width;
            MouseManager._height = renderer.height;
            MouseManager._cvs.addEventListener("mousedown", MouseManager.mousedown);
            MouseManager._cvs.addEventListener("mousemove", MouseManager.mousemove);
            MouseManager._cvs.addEventListener("mouseup", MouseManager.mouseup);
        }
        private static getPoints(event:MouseEvent):Vector2 {
            let rect = MouseManager._cvs.getBoundingClientRect();
            let ratioX = MouseManager._width/MouseManager._cvs.width;
            let ratioY = MouseManager._height/MouseManager._cvs.height;
            let x = (event.x-rect.left)*ratioX;
            let y = (event.y -rect.top)*ratioY;
            return new Vector2(x, y)
        }
        public static mousedown(event:MouseEvent):void {
            let point = MouseManager.getPoints(event);
            for(let i of MouseManager._mouseEvents) {
                i.onMousedown(point);
            }
        }

        public static mousemove(event:MouseEvent):void {
            let point = MouseManager.getPoints(event);
            for(let i of MouseManager._mouseEvents) {
                i.onMousemove(point);
            }
        }
        public static mouseup(event:MouseEvent):void {
            let point = MouseManager.getPoints(event);
            for(let i of MouseManager._mouseEvents) {
                i.onMouseup(point);
            }

        }
    }
}