namespace VERVE {

    export interface IShape{
        position:Vector2;
        rotation:number;
        meterRadius:number;
        pointInShape(x:number, y:number):boolean;
        intersect(shape:IShape):boolean;
       
    }
}