import { Injectable } from "@angular/core";
import { Tool } from "../interfaces/tool";
import { Point } from "../models/point";
import { AreaDimensionService } from "../services/area-dimension.service";

@Injectable({
    providedIn: 'root',
})
export class HandToolService implements Tool {
    constructor(
        private readonly areaDimensionService: AreaDimensionService,
    ) {}

    public onDrag(newPoint: Point) {
        this.areaDimensionService.addToCurrentDimension(newPoint);
    }
}