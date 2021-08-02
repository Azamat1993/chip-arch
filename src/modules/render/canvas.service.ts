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
    private readonly initialStep = 15;
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
        const { width, height, context, dimension } = this.settings;

        const centerX = (Math.floor(width / 2) - dimension.x);
        const centerY = (Math.floor(height / 2) - dimension.y);

        const left = 0.5 - Math.ceil(width / this.step) * this.step;
        const top = 0.5 - Math.ceil(height / this.step) * this.step;

        const right = width;
        const bottom = height;

        context.clearRect(0, 0, width, height);
        context.beginPath();

        for (let x = centerX; x >= 0; x -= this.step) {
            context.moveTo(x, top);
            context.lineTo(x, bottom);
        }

        for(let x = centerX + this.step; x < right; x += this.step) {
            context.moveTo(x, top);
            context.lineTo(x, bottom);
        }

        for (let y = centerY; y < bottom; y += this.step) {
            context.moveTo(left, y);
            context.lineTo(right, y);
        }

        for(let y = centerY - this.step; y >= 0; y -= this.step) {
            context.moveTo(left, y);
            context.lineTo(right, y);
        }

        context.strokeStyle = "#888";
        context.stroke();
    }
}