import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Point } from "../models/point";
import { ClickEventEmitterService } from "./click-event-emitter.service";
import { PositionService } from "./position.service";

@Injectable({
    providedIn: 'root',
})
export class ClickService {
    public clickPos$: Observable<Point>;
    public releasePos$: Observable<Point>;

    constructor(
        private readonly clickEventEmitter: ClickEventEmitterService,
        private readonly positionService: PositionService<MouseEvent>,
    ) {
        this.clickPos$ = this.clickEventEmitter.mouseDown$.pipe(
            map(this.positionService.getPosFromEvent),
        );

        this.releasePos$ = this.clickEventEmitter.mouseUp$.pipe(
            map(this.positionService.getPosFromEvent),
        );
    }
}