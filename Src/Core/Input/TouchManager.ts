/// <reference path="../Math/Vector2.ts"/>
namespace VERVE {

    export abstract class TouchManager {
        private static _cvs:HTMLCanvasElement;
        private static eventManager:IEventManager;
        private static _mousePos:Vector2 = new Vector2();
        public static setEventManger(eventManager:IEventManager):void {
            TouchManager.eventManager = eventManager;
        }
        public static initialise(renderer:Renderer):void {
            TouchManager._cvs = renderer.canvas;
            TouchManager._cvs.addEventListener("touchstart", TouchManager.touchstart);
            TouchManager._cvs.addEventListener("touchmove", TouchManager.tocuhmove);
            TouchManager._cvs.addEventListener("toucend", TouchManager.touchend);
        }
        private static getPoints(event:TouchEvent):void {
            let rect = TouchManager._cvs.getBoundingClientRect();
            let ratioX = TouchManager._cvs.width/rect.width;
            let ratioY = TouchManager._cvs.height/rect.height;
            let x = (event.touches[0].clientX-rect.left)*ratioX;
            let y = (event.touches[0].clientY -rect.top)*ratioY;
            TouchManager._mousePos.set(x, y);
            
        }
        
        public static touchstart(event:TouchEvent):void {
            TouchManager.getPoints(event);
           TouchManager.eventManager.onMousedown(TouchManager._mousePos)
        }

        public static tocuhmove(event:TouchEvent):void {
            TouchManager.getPoints(event);
            TouchManager.eventManager.onMouseMove(TouchManager._mousePos)
        }
        public static touchend(event:TouchEvent):void {
            let rect = TouchManager._cvs.getBoundingClientRect();
            let ratioX = TouchManager._cvs.width/rect.width;
            let ratioY = TouchManager._cvs.height/rect.height;
            let x = (event.changedTouches[0].clientX-rect.left)*ratioX;
            let y = (event.changedTouches[0].clientY -rect.top)*ratioY;
            TouchManager._mousePos.set(x, y);
            TouchManager.eventManager.onMouseUp(TouchManager._mousePos);

        }
    }
}