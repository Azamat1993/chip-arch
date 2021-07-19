import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";
import { Settings } from "../interfaces/settings";
import { ValueOf } from "../interfaces/value-of";

type ListenSettingFn<R> = (settings: Settings) => R;
@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    private settings: Settings;

    private readonly settingsInternal$ = new ReplaySubject<Settings>(1);
    public readonly settings$ = this.settingsInternal$.asObservable();

    constructor() {
        this.settings$.subscribe(settings => this.settings = settings);
    }

    public setSettings(settings: Settings) {
        this.settingsInternal$.next(settings);
    }

    public updateSettings(settings: Partial<Settings>) {
        this.settingsInternal$.next({
            ...this.settings,
            ...settings,
        });
    }

    public listenToSetting<R>(getFn: ListenSettingFn<R>): Observable<R> {
        return this.settings$.pipe(
            map(getFn),
            distinctUntilChanged(),
        );
    }
}