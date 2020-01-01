namespace VERVE {
    export class GameObject {
        private _transform:Transform;
        public   worldMatrix:Matrix4X4;
        private _modelMatrix:Matrix4X4;
        private _component:IComponent[] = []; 
        private _scene: Scene;
        public isLoading:boolean = true;
        public get scene(): Scene {
            return this._scene;
        }
        public set scene(value: Scene) {
            this._scene = value;
        }
        public get x():number {
            return this._transform.position.x;
        }
        public set x(value:number) {
            this._transform.position.x = value;
        }
        public get y():number {
            return this._transform.position.y;
        }
        public set y(value:number) {
            this._transform.position.y = value;
        }
        public get rotate():number {
            return this._transform.rotation.z;
        }
        public set rotate(value:number) {
            this._transform.rotation.z = value;
        }
        public scale(x:number, y:number) {
            this._transform.scale.x = x;
            this._transform.scale.y = y;
        }
        constructor() {
            this._transform = new Transform();
            this.worldMatrix = this._transform.getTranformationMatrix(); 
        }
        public load(gl:WebGLRenderingContext):void {
            for(let c of this._component) {
                if(c.isLoading) {
                    c.load(gl);
                    c.isLoading = false;

                }
            }
            this.isLoading = false; // should be think about this.
        } 
        public addComponent(component:IComponent):void {
            if(component==undefined) {
                throw new Error(`component is not define`)
            }
            this._component.push(component);
            component.parent = this;
            this.isLoading = true;
        }
        public removeComponent(component:IComponent):void {
            let index = this._component.indexOf(component);
            if(index!==-1){
                this._component.splice(index, 1);
            }
        }
        public update(delta:number):void {
            this.worldMatrix = this._transform.getTranformationMatrix();
            for(let c of this._component){
                c.update(delta);
            }
        }
        public render(render:Renderer):void {
            for(let c of this._component){
                c.render(render);
            }
        }
    }
}