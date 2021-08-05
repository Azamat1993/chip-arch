import { Injectable } from "@angular/core";
import { Activable } from "../interfaces/activeable";
import { BaseConfig } from "../interfaces/base-config";
import { InSocket } from "../pieces/in-socket";
import { ActiveItemService } from "../services/active-item.service";
import { ClickService } from "../services/click.service";
import { SettingsService } from "../services/settings.service";
import { UpdatesService } from "../services/updates.service";
import { GenericSocketFactory } from "./generic-socket-factory.service";

@Injectable({
    providedIn: 'root',
})
export class InSocketFactoryService extends GenericSocketFactory {
    constructor(
        protected readonly clickService: ClickService,
        protected readonly activeItemService: ActiveItemService,
        protected readonly updatesService: UpdatesService,
        protected readonly settingsService: SettingsService,
    ) {
        super(activeItemService);
    }

    public create(config: BaseConfig) {
        if (this.focusedItem) {
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