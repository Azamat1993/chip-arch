import { Injectable } from "@angular/core";
import { Point } from "../models/point";

@Injectable({
    providedIn: 'root',
})
export class PositionService<T extends MouseEvent> {
    public getPosFromEvent = (event: T) => {
        return new Point(this.getX(event), this.getY(event));
    }

    private getX(event: T) {
        return event.offsetX;
    }

    private getY(event: T) {
        return event.offsetY;
    }
}