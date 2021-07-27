import { BaseConfig } from "../interfaces/base-config";
import { Renderable } from "../interfaces/renderable";
import { Settings } from "../interfaces/settings";
import { SettingsService } from "../services/settings.service";

export abstract class GenericRender implements Renderable {
    protected settings: Settings;
    constructor(
        protected readonly settingsService: SettingsService,
    ) {
        this.settingsService.settings$.subscribe((settings: Settings) => {
            this.settings = settings;
        });
    }

    public abstract render(config?: BaseConfig): void;
}