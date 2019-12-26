namespace VERVE {
    export interface IComponent {
        parent:GameObject;
        isLoading:boolean;
        load(gl:WebGLRenderingContext):void;
        update(delta:number):void;
        render(render:Renderer):void;
    }
}