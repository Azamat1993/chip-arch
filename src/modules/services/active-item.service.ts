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

    private current: Activable;

    constructor(
        private readonly settingsService: SettingsService,
    ) {
        this.current$ = this.settingsService.listenToSetting(settings => settings.activeItem).pipe(
            shareReplay(1),
        );
        this.current$.subscribe(item => this.current = item);
    }
    
    public setCurrentItem(item: Activable) {
        this.settingsService.updateSettings({
            activeItem: item,
        });
    }

    public moveCurrentItem(point: Point) {
        this.current.move(point);
    }

    public isSame(item: Activable) {
        return item === this.current;
    }
}