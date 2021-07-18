import { Injectable } from "@angular/core";
import { fromEvent, Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class ClickEventEmitterService {
    public mouseDown$: Observable<MouseEvent>;
    public mouseUp$: Observable<MouseEvent>;

    constructor() {
        this.mouseDown$ = fromEvent<MouseEvent>(window, 'mousedown');
        this.mouseUp$ = fromEvent<MouseEvent>(window, 'mouseup');
    }
}