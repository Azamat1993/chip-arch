import { Tool } from "../interfaces/tool";
import { Point } from "../models/point";

export abstract class GenericTool implements Tool {
    public readonly toolName;

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