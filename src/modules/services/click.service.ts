import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Point } from "../models/point";
import { ClickEventEmitterService } from "./click-event-emitter.service";

@Injectable({
    providedIn: 'root',
})
export class ClickService {
    private readonly clickPosInterval$ = new Subject<Point>();
    private readonly releasePosInterval$ = new Subject<Point>();

    public readonly clickPos$ = this.clickPosInterval$.asObservable();
    public readonly releasePos$ = this.releasePosInterval$.asObservable();

    constructor(private readonly clickEventEmitter: ClickEventEmitterService) {
        this.clickEventEmitter.mouseDown$.pipe(
            map(this.getPosFromMouseEvent.bind(this)),
        ).subscribe((pos: Point) => {
            this.clickPosInterval$.next(pos);
        });

        this.clickEventEmitter.mouseUp$.pipe(
            map(this.getPosFromMouseEvent.bind(this)),
        ).subscribe((pos: Point) => {
            this.releasePosInterval$.next(pos);
        });
    }

    private getPosFromMouseEvent(event: MouseEvent) {
        return new Point(this.getX(event), this.getY(event));
    }

    private getX(event: MouseEvent) {
        return event.offsetX;
    }

    private getY(event: MouseEvent) {
        return event.offsetY;
    }
}