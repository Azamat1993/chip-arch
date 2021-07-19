import { Injectable } from "@angular/core";
import { TOOLS } from "../enums/tools";
import { Tool } from "../interfaces/tool";
import { Point } from "../models/point";
import { AreaDimensionService } from "../services/area-dimension.service";
import { ToolMapService } from "../services/tool-map.service";

@Injectable({
    providedIn: 'root',
})
export class HandToolService implements Tool {
    public readonly toolName = TOOLS.HAND;

    constructor(
        private readonly areaDimensionService: AreaDimensionService,
        private readonly toolMapService: ToolMapService,
    ) {
        this.toolMapService.register(this.toolName, this);
    }

    public onDrag(newPoint: Point) {
        this.areaDimensionService.addToCurrentDimension(newPoint);
    }

    public onClick() {
        // do nothing
    }

    public onRelease() {
        // do nothing
    }
}