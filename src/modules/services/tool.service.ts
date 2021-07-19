import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Tool } from "../interfaces/tool";
import { Point } from "../models/point";
import { HandToolService } from "../tools/hand-tool.service";
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
        private readonly handToolService: HandToolService,
    ) {
        this.currentTool$.subscribe(tool => this.currentTool = tool);
        this.dragService.dragPos$.subscribe(this.handleDrag.bind(this));
        this.currentToolInternal$.next(this.handToolService);
    }

    public setTool(tool: Tool) {
        this.currentToolInternal$.next(tool);
    }

    private handleDrag(pos: Point) {
        this.currentTool.onDrag(pos);
    }
}