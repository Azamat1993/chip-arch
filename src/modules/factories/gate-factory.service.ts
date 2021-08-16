import { Injectable } from "@angular/core";
import { BaseConfig } from "../interfaces/base-config";
import { Settings } from "../interfaces/settings";
import { Point } from "../models/point";
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
    private settings: Settings;

    constructor(
        private readonly clickService: ClickService,
        private readonly activeItemService: ActiveItemService,
        private readonly updatesService: UpdatesService,
        private readonly settingsService: SettingsService,
    ) {
        this.settingsService.settings$.subscribe(settings => this.settings = settings);
    }

    public create<T>(config: BaseConfig, className: typeof GenericGate): GenericGate<T> {
        const result = new className(
            {
                ...config,
                position: new Point(
                    this.settings.dimension.x - config.width,
                    this.settings.dimension.y - config.height,
                )
            },
            this.clickService,
            this.activeItemService,
            this.updatesService,
            this.settingsService,
        );

        this.activeItemService.setFocusedItem(result);

        return result;
    }
}