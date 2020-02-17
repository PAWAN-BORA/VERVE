namespace VERVE {

    export class EventManager implements IEventManager{
        public clickEvents:ClickEvent[] = []
        constructor() {
            
        }
        public addEvent(clickEvent:ClickEvent):void {
            let index = this.clickEvents.indexOf(clickEvent);
            if(index!==-1) {
                console.warn("button is already exits: "+clickEvent);
                return;
            }
            this.clickEvents.push(clickEvent);
        }
        public removeEvent(clickEvent:ClickEvent):void {
            let index = this.clickEvents.indexOf(clickEvent);
            if(index!==-1) {
                this.clickEvents.splice(index, 1);
            }
        }
        public onMousedown(point:Vector2): void {
            for(const b of this.clickEvents) {
                b.onMousedown(point);
            }
        }
        public onMouseMove(point:Vector2): void {
            for(const b of this.clickEvents) {
                b.onMousemove(point);
                if(b.hover) {
                    break;
                }
            }
        }
        public onMouseUp(point:Vector2): void {
            for(const b of this.clickEvents) {
                b.onMouseup(point);
            }
        }
    }
}