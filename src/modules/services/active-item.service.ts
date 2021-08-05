import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { shareReplay, switchMap } from "rxjs/operators";
import { Activable } from "../interfaces/activeable";
import { Point } from "../models/point";
import { ClickService } from "./click.service";
import { SettingsService } from "./settings.service";

@Injectable({
    providedIn: 'root',
})
export class ActiveItemService {
    public current$: Observable<Activable>;
    public focused$: Observable<Activable>;

    private current: Activable;

    constructor(
        private readonly settingsService: SettingsService,
        private readonly clickService: ClickService,
    ) {
        this.current$ = this.settingsService.listenToSetting(settings => settings.activeItem).pipe(
            shareReplay(1),
        );
        this.focused$ = this.settingsService.listenToSetting(settings => settings.focusedItem).pipe(
            shareReplay(1),
        );
        this.clickService.clickPos$.subscribe(() => {
            this.settingsService.updateSettings({
                focusedItem: null,
            });
        });
        this.clickService.releasePos$.subscribe(() => {
            this.settingsService.updateSettings({
                activeItem: null,
            });
        });
        this.current$.subscribe(item => this.current = item);
    }
    
    public setCurrentItem(item: Activable) {
        this.settingsService.updateSettings({
            activeItem: item,
            focusedItem: item,
        });
    }

    public moveCurrentItem(point: Point) {
        this.current.move(point);
    }

    public isSame(item: Activable) {
        return item === this.current;
    }
}