import { Injectable } from "@angular/core";
import { Renderable } from "../interfaces/renderable";
import { Settings } from "../interfaces/settings";
import { SettingsService } from "../services/settings.service";

@Injectable({
    providedIn: 'root',
})
export class CanvasService implements Renderable {
    private settings: Settings;
    constructor(
        private readonly settingsService: SettingsService,
    ) {
        this.settingsService.settings$.subscribe((settings: Settings) => {
            this.settings = settings;
        });
    }

    public render() {
        const {
            width,
            height,
            context,
        } = this.settings;
        context.clearRect(0, 0, width, height);
    }
}