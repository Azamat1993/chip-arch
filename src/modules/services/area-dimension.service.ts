import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Point } from "../models/point";
import { DragService } from "./drag.service";

@Injectable({
    providedIn: 'root',
})
export class AreaDimensionService {
    private readonly currentDimensionInternal$ = new Subject<Point>();

    public readonly currentDimension$ = this.currentDimensionInternal$.asObservable();

    constructor(
        private readonly dragService: DragService,
    ) {
        
    }
}