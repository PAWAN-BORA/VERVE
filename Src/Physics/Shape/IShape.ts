namespace VERVE {

    export interface IShape{
        position:Vector2;
        pointInShape(x:number, y:number):boolean;
        intersect(shape:IShape):boolean;
    }
}