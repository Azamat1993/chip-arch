import { Injectable } from "@angular/core";
import { BaseConfig } from "../interfaces/base-config";
import { SettingsService } from "../services/settings.service";
import { GenericRender } from "./generic-render";

@Injectable({
    providedIn: 'root',
})
export class PieceService extends GenericRender {
    constructor(
        settingsService: SettingsService,
    ) {
        super(settingsService);
    }

    public render(config: BaseConfig) {
        const {
            context,
        } = this.settings;
        context.strokeStyle = 'black';
        context.fillRect(config.position.x, config.position.y, config.width, config.height);
    }
}