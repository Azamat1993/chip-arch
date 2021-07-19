import { Injectable } from "@angular/core";
import { TOOLS } from "../enums/tools";
import { Tool } from "../interfaces/tool";
import { Point } from "../models/point";
import { ToolMapService } from "../services/tool-map.service";

@Injectable({
    providedIn: 'root',
})
export class ArrowToolService implements Tool {
    public readonly toolName: TOOLS.ARROW;

    constructor(
        private readonly toolMapService: ToolMapService,
    ) {
        this.toolMapService.register(this.toolName, this);
    }

    public onClick(point: Point) {

    }

    public onRelease(point: Point) {

    }

    public onDrag(point: Point) {
        // do nothing
    }
}