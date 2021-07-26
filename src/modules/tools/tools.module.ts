import { NgModule } from "@angular/core";
import { ArrowToolService } from "./arrow-tool.service";
import { HandToolService } from "./hand-tool.service";

@NgModule({})
export class ToolsModule {
    constructor(
        hand: HandToolService,
        arrow: ArrowToolService, 
    ) {}
}