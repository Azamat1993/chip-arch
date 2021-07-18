import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Point } from "../models/point";
import { DragService } from "./drag.service";
import { SettingsService } from "./settings.service";

@Injectable({
    providedIn: 'root',
})
export class AreaDimensionService {
    private currentDimension: Point;

    constructor(
        private readonly settingsService: SettingsService,
    ) {
        this.settingsService.listenToSetting(settings => settings.dimension).subscribe((dimension: Point) => {
            this.currentDimension = dimension;
        })
    }

    public setCurrentDimension(point: Point) {
        this.settingsService.updateSettings({
            dimension: point,
        });
    }

    public addToCurrentDimension(point: Point) {
        this.settingsService.updateSettings({
            dimension: this.currentDimension ? this.currentDimension.add(point) : point,
        });
    }
}