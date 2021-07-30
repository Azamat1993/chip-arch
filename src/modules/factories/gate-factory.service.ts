import { Injectable } from "@angular/core";
import { BaseConfig } from "../interfaces/base-config";
import { Generic } from "../pieces/generic";
import { GenericGate } from "../pieces/generic-gate";
import { ActiveItemService } from "../services/active-item.service";
import { ClickService } from "../services/click.service";
import { SettingsService } from "../services/settings.service";
import { UpdatesService } from "../services/updates.service";

@Injectable({
    providedIn: 'root',
})
export class GateFactoryService {
    constructor(
        private readonly clickService: ClickService,
        private readonly activeItemService: ActiveItemService,
        private readonly updatesService: UpdatesService,
        private readonly settingsService: SettingsService,
    ) {}

    public create<T>(config: BaseConfig, className: typeof GenericGate): GenericGate<T> {
        return new className(
            config,
            this.clickService,
            this.activeItemService,
            this.updatesService,
            this.settingsService,
        );
    }
}