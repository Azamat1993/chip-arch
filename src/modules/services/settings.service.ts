import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { delay, distinctUntilChanged, map, tap } from "rxjs/operators";
import { Settings } from "../interfaces/settings";
import { Point } from "../models/point";
import { LocalStorageService } from "./local-storage.service";
import { UpdatesService } from "./updates.service";

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
        private readonly updatesService: UpdatesService,
    ) {
        this.setInitialSettings();
        this.settings$.pipe(
            tap(settings => this.setSettingsToStorage(settings)),
            tap(settings => this.settings = settings),
        ).subscribe(() => this.updatesService.detectChanges());
    }

    public resetSettings() {
        this.setSettings(this.getDefaultSettings());
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

    private setSettingsToStorage(settings: Settings) {
        this.localStorageService.set(this.localStorageKey, this.getSettingsToStore(settings))
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
            step: 15,
        };
    }

    private getSettingsFromStore(): Partial<Settings> {
        const settings = this.localStorageService.get<Settings>(this.localStorageKey);

        if (settings) {
            if (settings.dimension) {
                settings.dimension = new Point(settings.dimension.x, settings.dimension.y);
            }

            return settings;
        }
        return null;
    }

    private getSettingsToStore(settings: Settings): Partial<Settings> {
        const keysToIgnore = {
            tool: true,
            element: true,
            context: true,
            activeItem: true,
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