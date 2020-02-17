namespace VERVE {

    export interface IEventManager {
        onMousedown(point:Vector2):void 
        onMouseMove(point:Vector2):void
        onMouseUp(point:Vector2):void
    }
}