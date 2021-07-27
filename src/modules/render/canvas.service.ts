import { Injectable } from "@angular/core";
import { BaseConfig } from "../interfaces/base-config";
import { SettingsService } from "../services/settings.service";
import { GenericRender } from "./generic-render";

@Injectable({
    providedIn: 'root',
})
export class CanvasService extends GenericRender {
    constructor(
        settingsService: SettingsService,
    ) {
        super(settingsService);
    }

    public render() {
        const {
            width,
            height,
            context,
        } = this.settings;
        context.clearRect(0, 0, width, height);
        context.fillStyle = 'black';
        context.fillRect(Math.floor(width / 2) - this.settings.dimension.x, Math.floor(height / 2) - this.settings.dimension.y, 10, 10);
    }
}