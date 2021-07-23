import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Activable } from "../interfaces/activeable";
import { ClickService } from "./click.service";
import { SettingsService } from "./settings.service";

@Injectable({
    providedIn: 'root',
})
export class ActiveItemService {
    public current$: Observable<Activable>;

    private firstActiveItem: Activable = null;

    constructor(
        private readonly settingsService: SettingsService,
        private readonly clickService: ClickService,
    ) {
        this.current$ = this.settingsService.listenToSetting(settings => settings.activeItem);
        this.clickService.clickPos$.pipe(
            switchMap(() => this.clickService.releasePos$),
        ).subscribe(() => {
            console.log('the first item is', this.firstActiveItem);
            if (this.firstActiveItem) {
                this.settingsService.updateSettings({
                    activeItem: this.firstActiveItem,
                });
            }
            this.firstActiveItem = null;
        });
    }
    
    public setCurrentItem(item: Activable) {
        this.firstActiveItem = item;
    }
}