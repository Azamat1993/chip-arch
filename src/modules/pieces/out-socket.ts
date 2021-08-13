import { Point } from "../models/point";
import { GenericGate } from "./generic-gate";
import { GenericSocket } from "./generic-socket";

export class OutSocket extends GenericSocket<any> {
    public click(point: Point) {

    }

    public release(point: Point) {
        
    }

    // @Overriden
    public setParent(parent: GenericGate<any>) {
        super.setParent(parent);
    
        parent.outSockets.addSocket(this);
    }
}