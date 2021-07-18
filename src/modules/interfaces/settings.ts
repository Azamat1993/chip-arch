import { Point } from "../models/point";
import { Activable } from "./activeable";

export interface Settings {
    element: HTMLElement,
    width: number;
    height: number;
    context: CanvasRenderingContext2D;
    zoom: number;
    activeItem: Activable;
    dimension: Point;
}