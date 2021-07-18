import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Point } from "../models/point";
import { DragEventEmitterService } from "./drag-event-emitter.service";
import { PositionService } from "./position.service";

@Injectable({
    providedIn: 'root',
})
export class DragService {
    public dragStartPos$: Observable<Point>;
    public dragEndPos$: Observable<Point>;
    public dragPos$: Observable<Point>;
    constructor(
        private readonly dragEventEmitter: DragEventEmitterService,
        private readonly positionService: PositionService<MouseEvent>,
    ) {
        this.dragStartPos$ = this.dragEventEmitter.dragStart$.pipe(
            map(this.positionService.getPosFromEvent),
        );
        this.dragEndPos$ = this.dragEventEmitter.dragEnd$.pipe(
            map(this.positionService.getPosFromEvent),
        );
        this.dragPos$ = this.dragEventEmitter.drag$.pipe(
            map(this.positionService.getPosFromEvent),
        );
    }
}