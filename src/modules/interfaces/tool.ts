import { Point } from "../models/point";

export interface Tool {
    onDrag(newPoint: Point): void;
    onClick(newPoint: Point): void;
    onRelease(newPoint: Point): void;
}