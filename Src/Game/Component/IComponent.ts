namespace VERVE {
    export interface IComponent {
        parent:GameObject;
        isLoading:boolean;
        load(gl:WebGLRenderingContext):void;
        update():void;
        render(render:Renderer):void;
    }
}