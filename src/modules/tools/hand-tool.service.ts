import { Injectable } from "@angular/core";
import { TOOLS } from "../enums/tools";
import { Tool } from "../interfaces/tool";
import { Point } from "../models/point";
import { ActiveItemService } from "../services/active-item.service";
import { AreaDimensionService } from "../services/area-dimension.service";
import { ToolMapService } from "../services/tool-map.service";
import { GenericTool } from "./generic-tool.service";

@Injectable({
    providedIn: 'root',
})
export class HandToolService extends GenericTool implements Tool {
    public readonly toolName = TOOLS.HAND;

    constructor(
        protected readonly areaDimensionService: AreaDimensionService,
        protected readonly activeItemService: ActiveItemService,
        toolMapService: ToolMapService,
    ) {
        super(activeItemService);
        toolMapService.register(this.toolName, this);
    }

    public onDrag(point: Point) {
        if (this.activeItem) {
            this.activeItemService.moveCurrentItem(point);
        } else {
            this.areaDimensionService.addToCurrentDimension(point);
        }
    }
}