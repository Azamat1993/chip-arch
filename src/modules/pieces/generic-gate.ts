import { PIECE_TYPE } from "../enums/piece-type";
import { Point } from "../models/point";
import { Generic } from "./generic";

// @todo make it abstract
export  class GenericGate<T> extends Generic<T> {
    protected readonly type = PIECE_TYPE.GATE;

    public move(diffPoint: Point): void {
        if (this.canMove(diffPoint)) {
            super.move(diffPoint);
        }
    }

    public click(point: Point) {

    }

    public release(point: Point) {
        
    }

    protected canMove(diffPoint: Point): boolean {
        const { x, y } = diffPoint;

        return true;
    }
}