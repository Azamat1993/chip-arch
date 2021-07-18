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
    public dragPos$: Observable<Point>;
    constructor(
        private readonly dragEventEmitter: DragEventEmitterService,
        private readonly positionService: PositionService<MouseEvent>,
    ) {
        this.dragPos$ = this.dragEventEmitter.drag$.pipe(
            map(this.positionService.getPosFromEvent),
        );
    }
}