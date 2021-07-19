import { Injectable } from "@angular/core";
import { Tool } from "../interfaces/tool";
import { Point } from "../models/point";

@Injectable({
    providedIn: 'root',
})
export class ArrowToolService implements Tool {
    public onClick(point: Point) {

    }

    public onRelease(point: Point) {
        
    }

    public onDrag(point: Point) {
        // do nothing
    }
}