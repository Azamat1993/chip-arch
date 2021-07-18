import { Injectable } from "@angular/core";
import { merge, Subject } from "rxjs";
import { distinctUntilChanged, filter, map, switchMap } from "rxjs/operators";
import { SettingsService } from "./settings.service";

@Injectable({
    providedIn: 'root',
})
export class EventRegistrerService {
    constructor(
        private readonly settingsService: SettingsService
    ) {}

    public register(eventFn: Function) {
        this.settingsService.settings$.pipe(
            map(settings => settings.element),
            filter(element => !!element),
            distinctUntilChanged(),
            switchMap(element => {
                return eventFn(element);
            }),
        ).subscribe(({ subject, event }) => {
            subject.next(event);
        });
    }
}