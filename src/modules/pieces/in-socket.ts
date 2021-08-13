import { Point } from "../models/point";
import { Generic } from "./generic";
import { GenericGate } from "./generic-gate";
import { GenericSocket } from "./generic-socket";

export class InSocket extends GenericSocket<any> {
    public click(point: Point) {

    }

    public release(point: Point) {
        
    }

    // @Overriden
    public setParent(parent: GenericGate<any>) {
        super.setParent(parent);

        parent.inSockets.addSocket(this);
    }
}