import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { Settings } from "../interfaces/settings";

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
}