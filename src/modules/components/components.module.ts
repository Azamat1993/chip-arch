import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ToolsModule } from "../tools/tools.module";
import { CanvasComponent } from "./canvas/canvas.component";
import { CoordinatesComponent } from "./coordinates/coordinates.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";

const COMPONENTS = [
    CanvasComponent,
    CoordinatesComponent,
    ToolbarComponent,
];
@NgModule({
    imports: [
        CommonModule,
        ToolsModule,    
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class ComponentsModule {}