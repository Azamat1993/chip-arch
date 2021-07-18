import { Injectable } from "@angular/core";
import { fromEvent, merge, Subject } from "rxjs";
import { map, switchMap, takeUntil, tap } from "rxjs/operators";
import { Point } from "../models/point";
import { ClickEventEmitterService } from "./click-event-emitter.service";
import { EventRegistrerService } from "./event-registrer.service";

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
        private readonly clickEventEmitter: ClickEventEmitterService,
        private readonly eventRegistrer: EventRegistrerService,
    ) {
        this.eventRegistrer.register(element =>
            this.clickEventEmitter.mouseDown$.pipe(
                tap(event => this.dragStartInternal$.next(event)),
                switchMap(() => {
                    return fromEvent(element, 'mousemove').pipe(
                        takeUntil(
                            merge(
                                this.clickEventEmitter.mouseUp$,
                                fromEvent(element, 'mouseleave')
                            ).pipe(
                                tap(event => this.dragEndInternal$.next(event))
                            ),
                        ),
                    );
                }),
                map(event => ({
                    subject: this.dragInternal$,
                    event,
                }))
            )
        );
    }
}