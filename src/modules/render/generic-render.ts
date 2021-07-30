import { BaseConfig } from "../interfaces/base-config";
import { Renderable } from "../interfaces/renderable";
import { Settings } from "../interfaces/settings";
import { SettingsService } from "../services/settings.service";
import { UpdatesService } from "../services/updates.service";

export abstract class GenericRender implements Renderable {
    protected settings: Settings;
    constructor(
        protected readonly settingsService: SettingsService,
        protected readonly updatesService: UpdatesService,
    ) {
        this.settingsService.settings$.subscribe((settings: Settings) => {
            this.settings = settings;
        });

        this.updatesService.updates$.subscribe(() => {
            this.render();
        });
    }

    public abstract render(config?: BaseConfig): void;
}