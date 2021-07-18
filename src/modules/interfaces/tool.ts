import { Point } from "../models/point";

export interface Tool {
    onDrag(newPoint: Point): void;
}