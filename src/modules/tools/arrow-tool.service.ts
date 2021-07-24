import { Injectable } from "@angular/core";
import { TOOLS } from "../enums/tools";
import { Tool } from "../interfaces/tool";
import { Point } from "../models/point";
import { ActiveItemService } from "../services/active-item.service";
import { ToolMapService } from "../services/tool-map.service";
import { GenericTool } from "./generic-tool.service";

@Injectable({
    providedIn: 'root',
})
export class ArrowToolService extends GenericTool implements Tool {
    public readonly toolName = TOOLS.ARROW;

    constructor(
        toolMapService: ToolMapService,
        activeItemService: ActiveItemService,
    ) {
        super(activeItemService);
        toolMapService.register(this.toolName, this);
    }
    
    public onClick(point: Point) {

    }

    public onRelease(point: Point) {
        
    }
}