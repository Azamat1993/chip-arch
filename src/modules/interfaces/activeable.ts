import { Point } from "../models/point";

export interface Activable {
    move(point: Point): void;
}