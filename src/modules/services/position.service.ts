import { Injectable } from "@angular/core";
import { Point } from "../models/point";

@Injectable({
    providedIn: 'root',
})
export class PositionService<T extends MouseEvent> {
    public getPosFromEvent = (event: T) => {
        return new Point(this.getX(event), this.getY(event));
    }

    public getX(event: T) {
        return event.offsetX;
    }

    public getY(event: T) {
        return event.offsetY;
    }
}