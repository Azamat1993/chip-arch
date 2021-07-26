import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Activable } from "../interfaces/activeable";
import { Point } from "../models/point";
import { ClickService } from "./click.service";
import { SettingsService } from "./settings.service";

@Injectable({
    providedIn: 'root',
})
export class ActiveItemService {
    public current$: Observable<Activable>;

    private current: Activable;

    constructor(
        private readonly settingsService: SettingsService,
        private readonly clickService: ClickService,
    ) {
        this.current$ = this.settingsService.listenToSetting(settings => settings.activeItem);
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
        });
    }

    public moveCurrentItem(point: Point) {
        // this.current.move(point);
    }
}