import { Component, OnInit } from "@angular/core";
import { TOOLS } from "src/modules/enums/tools";
import { Tool } from "src/modules/interfaces/tool";
import { ToolMapService } from "src/modules/services/tool-map.service";
import { ToolService } from "src/modules/services/tool.service";

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
    public tools: Array<[TOOLS, Tool]>;

    constructor(
        private readonly toolMapService: ToolMapService,
        private readonly toolService: ToolService,
    ) {}

    public ngOnInit() {
        this.tools = this.toolMapService.getRegisteredItems();
    }

    public clickTool(tool: Tool) {
        this.toolService.setTool(tool[1]);
    }
}