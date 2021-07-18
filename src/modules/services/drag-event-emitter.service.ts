import { Injectable } from "@angular/core";
import { fromEvent, Subject } from "rxjs";
import { switchMap, takeUntil } from "rxjs/operators";
import { Point } from "../models/point";
import { ClickEventEmitterService } from "./click-event-emitter.service";

@Injectable({
    providedIn: 'root',
})
export class DragEventEmitterService {
    private readonly dragPosInternal$ = new Subject<DragEvent>();
    public readonly drag$ = this.dragPosInternal$.asObservable();
    constructor(
        private clickEventEmitter: ClickEventEmitterService,
    ) {
        this.clickEventEmitter.mouseDown$.pipe(
            switchMap(() => {
                return fromEvent(window, 'mousemove').pipe(
                    takeUntil(this.clickEventEmitter.mouseUp$)
                );
            }),
        ).subscribe((event: DragEvent) => {
            this.dragPosInternal$.next(event);
        });
    }
}