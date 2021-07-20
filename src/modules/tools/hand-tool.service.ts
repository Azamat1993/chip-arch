import { Injectable } from "@angular/core";
import { TOOLS } from "../enums/tools";
import { Tool } from "../interfaces/tool";
import { Point } from "../models/point";
import { AreaDimensionService } from "../services/area-dimension.service";
import { ToolMapService } from "../services/tool-map.service";
import { GenericTool } from "./generic-tool.service";

@Injectable({
    providedIn: 'root',
})
export class HandToolService extends GenericTool implements Tool {
    public readonly toolName = TOOLS.HAND;

    constructor(
        private readonly areaDimensionService: AreaDimensionService,
        toolMapService: ToolMapService,
    ) {
        super(toolMapService);
    }

    public onDrag(newPoint: Point) {
        this.areaDimensionService.addToCurrentDimension(newPoint);
    }
}