import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tool } from "../interfaces/tool";
import { Point } from "../models/point";
import { ClickService } from "./click.service";
import { DragService } from "./drag.service";
import { SettingsService } from "./settings.service";

@Injectable({
    providedIn: 'root',
})
export class ToolService {
    public currentTool$: Observable<Tool>;
    
    private currentTool: Tool;

    constructor(
        private readonly dragService: DragService,
        private readonly clickService: ClickService,
        private readonly settingsService: SettingsService,
    ) {
        this.currentTool$ = this.settingsService.listenToSetting(settings => settings.tool);
        this.currentTool$.subscribe(tool => this.currentTool = tool);

        this.dragService.dragPos$.subscribe(this.handleDrag.bind(this));

        this.clickService.clickPos$.subscribe(this.handleClick.bind(this));
        this.clickService.releasePos$.subscribe(this.handleRelease.bind(this));
    }

    public setTool(tool: Tool) {
        this.settingsService.updateSettings({
            tool,
        });
    }

    private handleDrag(pos: Point) {
        this.currentTool.onDrag(pos);
    }

    private handleClick(pos: Point) {
        this.currentTool.onClick(pos);
    }

    private handleRelease(pos: Point) {
        this.currentTool.onRelease(pos);
    }
}