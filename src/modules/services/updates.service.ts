import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime, shareReplay, tap } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class UpdatesService {
    private readonly updatesInternal$ = new Subject<void>();
    private readonly updatesForCanvasInternal$ = new Subject<void>();

    public readonly updates$ = this.updatesInternal$.asObservable().pipe(
        debounceTime(10),
        shareReplay(1),
    );
    public readonly updatesForCanvas$ = this.updatesForCanvasInternal$.asObservable().pipe(
        shareReplay(1),
    );

    constructor() {
        this.updates$.subscribe(() => {
            this.updatesForCanvasInternal$.next();
        });
    }

    public detectChanges() {
        requestAnimationFrame(() => {
            this.updatesInternal$.next();
        });
    }
}