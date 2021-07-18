import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Tool } from "../interfaces/tool";
import { Point } from "../models/point";
import { DragService } from "./drag.service";

@Injectable({
    providedIn: 'root',
})
export class ToolService {
    private readonly currentToolInternal$ = new Subject<Tool>();
    public readonly currentTool$ = this.currentToolInternal$.asObservable();
    
    private currentTool: Tool;

    constructor(
        private readonly dragService: DragService,
    ) {
        this.currentTool$.subscribe(tool => this.currentTool = tool);
        this.dragService.dragPos$.subscribe(this.handleDrag.bind(this));
    }

    public setTool(tool: Tool) {
        this.currentToolInternal$.next(tool);
    }

    private handleDrag(pos: Point) {
        this.currentTool.onDrag(pos);
    }
}