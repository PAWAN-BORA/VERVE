namespace VERVE {

    export class ShapeComponent implements IComponent   {
        private _geometry:Geometry;
        private _material:Material;
        private _buffer: Buffer;
        private _transform:Transform;
        private _localMatrix:Matrix4X4;
        public parent: GameObject;
        public isLoading: boolean = true;
        public get x(){
            return this._transform.position.x;
        }
        public set x(val:number){
            this._transform.position.x = val;
        }
        public get y(){
            return this._transform.position.y;
        }
        public set y(val:number){
            this._transform.position.y = val;
        }
        public get rotate(){
            return this._transform.rotation.z;
        }
        public set rotate(val:number) {
            
            this._transform.rotation.z = val;
        }
        constructor(geometry:Geometry, material:Material) {
            this._geometry = geometry;
            this._material = material;
            this._transform = new Transform();
        }
        load(gl: WebGLRenderingContext): void {
            this._buffer = new Buffer(gl);
            this._buffer.loadData(this._geometry.data, this._geometry.indices);
            this._material.texture = new Texture(gl);
        }
        update(): void {
            this._localMatrix = this._transform.getTranformationMatrix();
        }
        render(render: Renderer): void {
            let model = Matrix4X4.multiply(this.parent.worldMatrix, this._localMatrix)
            let modelLocation = render.shader.getUniformLocation("u_model");
            render.gl.uniformMatrix4fv(modelLocation, false, new Float32Array(model.data));
            this._material.loadUniform(render.gl, render.shader);
            this._material.texture.active();
            this._buffer.bind();
            this._buffer.draw();
            this._buffer.unbind();
        }
        
    }
}