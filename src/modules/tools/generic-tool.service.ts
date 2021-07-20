import { Tool } from "../interfaces/tool";
import { Point } from "../models/point";
import { ToolMapService } from "../services/tool-map.service";

export abstract class GenericTool implements Tool {
    public readonly toolName;

    constructor(
        private readonly toolMapService: ToolMapService,
    ) {
        if (!this.toolName) {
            throw new Error('Tool name was not provided!');
        }
        this.toolMapService.register(this.toolName, this);
    }

    public onDrag(newPoint: Point) {
        // implement
    }

    public onClick(newPoint: Point) {
        // implement
    }

    public onRelease(newPoint: Point) {
        // implement
    }
}