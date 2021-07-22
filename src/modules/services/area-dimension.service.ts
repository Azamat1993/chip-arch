import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Settings } from "../interfaces/settings";
import { Point } from "../models/point";
import { DragService } from "./drag.service";
import { SettingsService } from "./settings.service";

@Injectable({
    providedIn: 'root',
})
export class AreaDimensionService {
    public currentDimension$: Observable<Point>;

    private currentDimension: Point;
    private settings: Settings;

    constructor(
        private readonly settingsService: SettingsService,
    ) {
        this.currentDimension$ = this.settingsService.listenToSetting(settings => settings.dimension);
        this.currentDimension$.subscribe((dimension: Point) => {
            this.currentDimension = dimension;
        })
        this.settingsService.settings$.subscribe(settings => this.settings = settings);
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

    public getOffsetX(x: number) {
        return Math.floor(this.settings.width / 2) - x;
    }

    public getOffsetY(y: number) {
        return Math.floor(this.settings.height / 2) - y;
    }
}