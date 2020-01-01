/// <reference path="../Math/Vector2.ts"/>
namespace VERVE {

    export abstract class MouseManager {
        private static _cvs:HTMLCanvasElement;
        private static _width:number;
        private static _height:number;
        private static _buttonEvent:ButtonEvent[] = [];
        private static _mousePos:Vector2 = new Vector2();
        public static addEvent(MouseEvent:ButtonEvent):void {
            this._buttonEvent.push(MouseEvent);
        }
        public static removeEvent(MouseEvent:ButtonEvent):void {
            let index = this._buttonEvent.indexOf(MouseEvent);
            if(index!==-1) {
                this._buttonEvent.splice(index, 1);
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
        private static getPoints(event:MouseEvent):void {
            let rect = MouseManager._cvs.getBoundingClientRect();
            let ratioX = MouseManager._width/MouseManager._cvs.width;
            let ratioY = MouseManager._height/MouseManager._cvs.height;
            let x = (event.x-rect.left)*ratioX;
            let y = (event.y -rect.top)*ratioY;
            this._mousePos.set(x, y);
            
        }
        public static mousedown(event:MouseEvent):void {
           MouseManager.getPoints(event);
            for(let i of MouseManager._buttonEvent) {
                i.onMousedown(MouseManager._mousePos);
            }
        }

        public static mousemove(event:MouseEvent):void {
            MouseManager.getPoints(event);
            for(let i of MouseManager._buttonEvent) {
                i.onMousemove(MouseManager._mousePos);
            }
        }
        public static mouseup(event:MouseEvent):void {
            MouseManager.getPoints(event);
            for(let i of MouseManager._buttonEvent) {
                i.onMouseup(MouseManager._mousePos);
            }

        }
    }
}