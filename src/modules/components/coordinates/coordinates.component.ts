import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { AreaDimensionService } from "src/modules/services/area-dimension.service";

@Component({
    selector: 'app-coordinates',
    templateUrl: './coordinates.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoordinatesComponent {
    public readonly coordinates$ = this.areaDimensionService.currentDimension$;
    constructor(
        private readonly areaDimensionService: AreaDimensionService,
    ) {}
}