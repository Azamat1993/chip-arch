import { PIECE_TYPE } from "../enums/piece-type";
import { Point } from "../models/point";
import { Generic } from "./generic";
import { GenericSocket } from "./generic-socket";
import { InSocket } from "./in-socket";
import { OutSocket } from "./out-socket";
import { SocketManager } from "./socket-manager";

// @todo make it abstract
export  class GenericGate<T> extends Generic<T> {
    public readonly inSockets = new SocketManager<InSocket>();
    public readonly outSockets = new SocketManager<OutSocket>();

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