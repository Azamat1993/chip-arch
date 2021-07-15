import { Injectable } from "@angular/core";
import { fromEvent, Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ClickEventEmitterService {
    private readonly mouseDownInternal$ = new Subject<MouseEvent>();
    private readonly mouseUpInterval$ = new Subject<MouseEvent>();

    public readonly mouseDown$ = this.mouseDownInternal$.asObservable();
    public readonly mouseUp = this.mouseUpInterval$.asObservable();

    constructor() {
        fromEvent(window, 'mousedown').subscribe((event: MouseEvent) => {
            this.mouseDownInternal$.next(event);
        });
        fromEvent(window, 'mouseup').subscribe((event: MouseEvent) => {
            this.mouseUpInterval$.next(event);
        });
    }
}