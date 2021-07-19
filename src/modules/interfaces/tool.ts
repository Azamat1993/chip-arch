import { TOOLS } from "../enums/tools";
import { Point } from "../models/point";

export interface Tool {
    toolName: TOOLS;
    onDrag(newPoint: Point): void;
    onClick(newPoint: Point): void;
    onRelease(newPoint: Point): void;
}