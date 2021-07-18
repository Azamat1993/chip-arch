import { Injectable } from "@angular/core";
import { fromEvent, Subject } from "rxjs";
import { switchMap, takeUntil, tap } from "rxjs/operators";
import { Point } from "../models/point";
import { ClickEventEmitterService } from "./click-event-emitter.service";

@Injectable({
    providedIn: 'root',
})
export class DragEventEmitterService {
    private readonly dragStartInternal$ = new Subject<MouseEvent>();
    private readonly dragEndInternal$ = new Subject<MouseEvent>();
    private readonly dragInternal$ = new Subject<DragEvent>();

    public readonly dragStart$ = this.dragStartInternal$.asObservable();
    public readonly dragEnd$ = this.dragEndInternal$.asObservable();
    public readonly drag$ = this.dragInternal$.asObservable();
    constructor(
        private clickEventEmitter: ClickEventEmitterService,
    ) {
        this.clickEventEmitter.mouseDown$.pipe(
            tap(event => this.dragStartInternal$.next(event)),
            switchMap(() => {
                return fromEvent(window, 'mousemove').pipe(
                    takeUntil(this.clickEventEmitter.mouseUp$.pipe(
                        tap(event => this.dragEndInternal$.next(event)),
                    ))
                );
            }),
        ).subscribe((event: DragEvent) => {
            this.dragInternal$.next(event);
        });
    }
}