import { Injectable } from "@angular/core";
import { fromEvent, merge, Subject } from "rxjs";
import { distinctUntilChanged, filter, map, switchMap } from "rxjs/operators";
import { EventRegistrerService } from "./event-registrer.service";

@Injectable({
    providedIn: 'root',
})
export class ClickEventEmitterService {
    private readonly mouseDownInternal$ = new Subject<MouseEvent>();
    private readonly mouseUpInternal$ = new Subject<MouseEvent>();

    public readonly mouseDown$ = this.mouseDownInternal$.asObservable();
    public readonly mouseUp$ = this.mouseUpInternal$.asObservable();

    constructor(
        private readonly eventRegistrer: EventRegistrerService,
    ) {
        this.eventRegistrer.register(element => {
            return fromEvent(element, 'mousedown').pipe(
                map(event => ({
                    subject: this.mouseDownInternal$,
                    event,
                }))
            );
        });

        this.eventRegistrer.register(element => {
            return fromEvent(element, 'mouseup').pipe(
                map(event => ({
                    subject: this.mouseUpInternal$,
                    event,
                }))
            );
        });
    }
}