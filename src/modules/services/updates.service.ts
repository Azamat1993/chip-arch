import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class UpdatesService {
    private readonly updatesInternal$ = new Subject<void>();
    public readonly updates$ = this.updatesInternal$.asObservable();

    public triggetUpdate() {
        this.updatesInternal$.next();
    }
}