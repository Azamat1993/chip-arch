import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from "@angular/core";
import { debounceTime } from "rxjs/operators";
import { CanvasService } from "src/modules/render/canvas.service";
import { ClickService } from "src/modules/services/click.service";
import { SettingsService } from "src/modules/services/settings.service";
import { UpdatesService } from "src/modules/services/updates.service";

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrls: ['./canvas.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CanvasComponent implements AfterViewInit {
    @ViewChild('canvasRef') public canvasRef: ElementRef;

    public ctx: CanvasRenderingContext2D;

    constructor(
        private readonly updatesService: UpdatesService,
        private readonly settingsService: SettingsService,
        private readonly canvasService: CanvasService,
    ) {}

    public ngAfterViewInit(): void {
        this.settingsService.updateSettings({
            element: this.canvasRef.nativeElement,
            width: this.canvasRef.nativeElement.offsetWidth,
            height: this.canvasRef.nativeElement.offsetHeight,
            context: this.canvasRef.nativeElement.getContext('2d'),
        });
        this.updatesService.updates$.pipe(
            debounceTime(10),
        ).subscribe(() => {
            this.canvasService.render();
        });

        setTimeout(() => {
            this.updatesService.triggetUpdate();
        }, 1000);
    }
}