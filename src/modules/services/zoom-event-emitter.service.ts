import { Injectable } from "@angular/core";
import { fromEvent, Subject } from "rxjs";
import { debounceTime, throttleTime } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class ZoomEventEmitterService {
    private readonly zoomEventInterval$ = new Subject<number>();

    public readonly zoomEvent$ = this.zoomEventInterval$.asObservable();

    constructor() {
        this.addEventEmitter();
    }

    private addEventEmitter() {
        fromEvent(window, 'wheel').pipe(
            debounceTime(100),
        ).subscribe((event: WheelEvent) => {
            this.zoomEventInterval$.next(event.deltaY);
        });
    }
}