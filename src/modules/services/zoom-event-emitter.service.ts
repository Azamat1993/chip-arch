import { Injectable } from "@angular/core";
import { fromEvent, Observable } from "rxjs";
import { debounceTime, map } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class ZoomEventEmitterService {
    public zoomEvent$: Observable<number>;

    constructor() {
        this.zoomEvent$ = fromEvent<WheelEvent>(window, 'wheel').pipe(
            debounceTime(100),
            map((event: WheelEvent) => event.deltaY)
        );
    }
}