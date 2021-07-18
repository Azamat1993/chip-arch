import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Point } from "../models/point";
import { DragEventEmitterService } from "./drag-event-emitter.service";
import { PositionService } from "./position.service";

@Injectable({
    providedIn: 'root',
})
export class DragService {
    public dragPos$: Observable<Point>;
    
    private prevX: number = 0;
    private prevY: number = 0;
    constructor(
        private readonly dragEventEmitter: DragEventEmitterService,
        private readonly positionService: PositionService<MouseEvent>,
    ) {
        this.dragEventEmitter.dragStart$.pipe(
            map(this.positionService.getPosFromEvent),
        ).subscribe(this.setPrevCoords.bind(this));
        this.dragEventEmitter.dragEnd$.pipe(
            map(this.positionService.getPosFromEvent),
        ).subscribe(this.setPrevCoords.bind(this));
        this.dragPos$ = this.dragEventEmitter.drag$.pipe(
            map(this.positionService.getPosFromEvent),
            map((pos: Point) => {
                const dx = pos.x - this.prevX;
                const dy = pos.y - this.prevY;
                
                this.prevX = pos.x;
                this.prevY = pos.y;

                return new Point(dx, dy);
            }),
        );
    }

    private setPrevCoords(pos: Point) {
        this.prevX = pos.x;
        this.prevY = pos.y;
    }
}