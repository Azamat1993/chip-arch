import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { distinctUntilChanged, map, tap } from "rxjs/operators";
import { Settings } from "../interfaces/settings";
import { Point } from "../models/point";
import { LocalStorageService } from "./local-storage.service";

type ListenSettingFn<R> = (settings: Settings) => R;
@Injectable({
    providedIn: 'root',
})
export class SettingsService {
    private settings: Settings;
    private readonly localStorageKey = 'settings';

    private readonly settingsInternal$ = new ReplaySubject<Settings>(1);
    public readonly settings$ = this.settingsInternal$.asObservable();

    constructor(
        private readonly localStorageService: LocalStorageService,
    ) {
        this.setInitialSettings();
        this.settings$.pipe(
            tap(settings => this.localStorageService.set(this.localStorageKey, this.getSettingsToStore(settings))),
        ).subscribe(settings => this.settings = settings);
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

    private setInitialSettings() {
        let settingsFromLocalStorage = this.getSettingsFromStore();

        if (!settingsFromLocalStorage) {
            settingsFromLocalStorage = this.getDefaultSettings();
        }

        this.updateSettings(settingsFromLocalStorage);
    }

    private getDefaultSettings(): Settings {
        return {
            element: null,
            width: 0,
            height: 0,
            context: null,
            zoom: 1,
            activeItem: null,
            dimension: new Point(0, 0),
            tool: null,
        };
    }

    private getSettingsFromStore(): Partial<Settings> {
        const settings = this.localStorageService.get<Settings>(this.localStorageKey);
        let dimension = null;

        if (settings.dimension) {
            dimension = new Point(settings.dimension.x, settings.dimension.y);
        }
        return {
            ...settings,
            dimension,
        };
    }

    private getSettingsToStore(settings: Settings): Partial<Settings> {
        const keysToIgnore = {
            tool: true,
            element: true,
            context: true,
        };
        const result = {};

        Object.keys(settings).forEach(key => {
            if (!keysToIgnore[key]) {
                result[key] = settings[key];
            }
        });

        return result;
    }
}