import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CanvasComponent } from "./canvas/canvas.component";
import { CoordinatesComponent } from "./coordinates/coordinates.component";

const COMPONENTS = [
    CanvasComponent,
    CoordinatesComponent,
];
@NgModule({
    imports: [CommonModule],
    declarations: COMPONENTS,
    exports: COMPONENTS,
})
export class ComponentsModule {}