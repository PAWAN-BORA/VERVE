/// <reference path="../Math/Vector2.ts"/>
namespace VERVE {

    export abstract class MouseManager {
        private static _cvs:HTMLCanvasElement;
        private static eventManager:IEventManager;
        private static _mousePos:Vector2 = new Vector2();
        public static setEventManger(eventManager:IEventManager):void {
            MouseManager.eventManager = eventManager;
        }
        public static initialise(renderer:Renderer):void {
            MouseManager._cvs = renderer.canvas;
            MouseManager._cvs.addEventListener("mousedown", MouseManager.mousedown);
            MouseManager._cvs.addEventListener("mousemove", MouseManager.mousemove);
            MouseManager._cvs.addEventListener("mouseup", MouseManager.mouseup);
        }
        private static getPoints(event:MouseEvent):void {
            let rect = MouseManager._cvs.getBoundingClientRect();
            let ratioX = MouseManager._cvs.width/rect.width;
            let ratioY = MouseManager._cvs.height/rect.height;
            let x = (event.x-rect.left)*ratioX;
            let y = (event.y -rect.top)*ratioY;
            MouseManager._mousePos.set(x, y);
            
        }
        public static mousedown(event:MouseEvent):void {
            MouseManager.getPoints(event);
           MouseManager.eventManager.onMousedown(MouseManager._mousePos)
        }

        public static mousemove(event:MouseEvent):void {
            MouseManager.getPoints(event);
            MouseManager.eventManager.onMouseMove(MouseManager._mousePos)
        }
        public static mouseup(event:MouseEvent):void {
            MouseManager.getPoints(event);
            MouseManager.eventManager.onMouseUp(MouseManager._mousePos);
           

        }
    }
}