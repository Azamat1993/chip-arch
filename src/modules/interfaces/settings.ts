import { Point } from "../models/point";
import { Activable } from "./activeable";
import { Tool } from "./tool";

export interface Settings {
    element: HTMLElement,
    width: number;
    height: number;
    context: CanvasRenderingContext2D;
    zoom: number;
    activeItem: Activable;
    focusedItem: Activable;
    dimension: Point;
    tool: Tool;
    step: number;
}