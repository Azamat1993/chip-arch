import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { delay } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})
export class UpdatesService {
    private readonly updatesInternal$ = new Subject<void>();
    public readonly updates$ = this.updatesInternal$.asObservable();
    public readonly delayedUpdates$ = this.updates$.pipe(
        delay(0),
    );

    public detectChanges() {
        requestAnimationFrame(() => {
            this.updatesInternal$.next();
        });
    }
}