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

    private currentDimension: Point;

    constructor() {
        this.currentDimension$.subscribe(pos => this.currentDimension = pos);
    }

    public setCurrentDimension(point: Point) {
        this.currentDimensionInternal$.next(point);
    }

    public addToCurrentDimension(point: Point) {
        this.currentDimensionInternal$.next(
            this.currentDimension.add(point),
        );
    }
}