import { Injectable } from "@angular/core";
import { BaseConfig } from "../interfaces/base-config";
import { SettingsService } from "../services/settings.service";
import { UpdatesService } from "../services/updates.service";
import { ZoomService } from "../services/zoom.service";
import { GenericRender } from "./generic-render";

@Injectable({
    providedIn: 'root',
})
export class CanvasService extends GenericRender {
    private readonly initialStep = 10;
    private step = this.initialStep;

    constructor(
        settingsService: SettingsService,
        updatesService: UpdatesService,
        private readonly zoomService: ZoomService,
    ) {
        super(settingsService, updatesService);

        this.zoomService.currentZoom$.subscribe((zoom: number) => {
            this.step = this.initialStep * zoom;
        });
    }

    public render() {
        this.drawGrid();
    }

    private drawGrid() {
        const { width, height, context } = this.settings;
        let left = 0.5 - Math.ceil(width / this.step) * this.step;
        let top = 0.5 - Math.ceil(height / this.step) * this.step;
        let right = 2 * width;
        let bottom = 2 * height;
        context.clearRect(left, top, right - left, bottom - top);
        context.beginPath();
        for (let x = left; x < right; x += this.step) {
            context.moveTo(x, top);
            context.lineTo(x, bottom);
        }
        for (let y = top; y < bottom; y += this.step) {
            context.moveTo(left, y);
            context.lineTo(right, y);
        }
        context.strokeStyle = "#888";
        context.stroke();
    }
}