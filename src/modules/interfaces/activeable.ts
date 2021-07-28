import { Point } from "../models/point";

export interface Activable {
    move(point: Point): void;
    click(point: Point): void;
    release(point: Point): void;
}