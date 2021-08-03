import { Injectable } from "@angular/core";
import { Activable } from "../interfaces/activeable";
import { BaseConfig } from "../interfaces/base-config";
import { InSocket } from "../pieces/in-socket";
import { ActiveItemService } from "../services/active-item.service";
import { ClickService } from "../services/click.service";
import { SettingsService } from "../services/settings.service";
import { UpdatesService } from "../services/updates.service";

@Injectable({
    providedIn: 'root',
})
export class SocketFactoryService {
    protected activeItem: Activable;

    constructor(
        private readonly clickService: ClickService,
        private readonly activeItemService: ActiveItemService,
        private readonly updatesService: UpdatesService,
        private readonly settingsService: SettingsService,
    ) {
        this.activeItemService.current$.subscribe((item: Activable) => {
            this.activeItem = item;
        });
    }

    public create(config: BaseConfig) {
        console.log('the active item is', this.activeItem);
        if (this.activeItem) {
            return new InSocket(
                config,
                this.clickService,
                this.activeItemService,
                this.updatesService,
                this.settingsService,
            );
        }
        return null;
    }
}