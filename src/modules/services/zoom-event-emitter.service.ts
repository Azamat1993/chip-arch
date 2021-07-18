import { Injectable } from "@angular/core";
import { fromEvent, Observable, Subject } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
import { EventRegistrerService } from "./event-registrer.service";

@Injectable({
    providedIn: 'root',
})
export class ZoomEventEmitterService {
    private readonly zoomEventInternal$ = new Subject<number>();
    public readonly zoomEvent$ = this.zoomEventInternal$.asObservable();

    constructor(
        private readonly eventRegistrer: EventRegistrerService,
    ) {
        this.eventRegistrer.register(element =>
            fromEvent<WheelEvent>(element, 'wheel').pipe(
                debounceTime(100),
                map((event: WheelEvent) => event.deltaY),
                map(event => ({
                    subject: this.zoomEventInternal$,
                    event,
                })),
            )
        );
    }
}