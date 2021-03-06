import { Injectable } from "@angular/core";
import { Observable, ReplaySubject } from "rxjs";
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { SettingsService } from "./settings.service";
import { ZoomEventEmitterService } from "./zoom-event-emitter.service";

@Injectable({
    providedIn: 'root',
})
export class ZoomService {
    public currentZoom$: Observable<number>;

    private readonly step = 0.2;

    private readonly lowerBound = 1;
    private readonly upperBound = 3;

    private currentZoomValue = this.lowerBound;

    constructor(
        private readonly zoomEventEmitter: ZoomEventEmitterService,
        private readonly settingsService: SettingsService,
    ) {
        this.currentZoom$ = this.settingsService.listenToSetting(settings => settings.zoom);
        this.currentZoom$.subscribe((zoom: number) => {
            this.currentZoomValue = zoom;
        });

        this.zoomEventEmitter.zoomEvent$.pipe(
            map(this.getStep.bind(this)),
            map(this.getZoomFromStep.bind(this)),
            startWith(this.lowerBound),
            distinctUntilChanged(),
        ).subscribe((zoom: number) => {
            this.settingsService.updateSettings({
                zoom,
            });
        });
    }

    private getZoomFromStep(step: number) {
        this.currentZoomValue += step;
        
        if (this.currentZoomValue > this.upperBound) {
            this.currentZoomValue = this.upperBound;
        }

        if (this.currentZoomValue < this.lowerBound) {
            this.currentZoomValue = this.lowerBound;
        }

        return this.currentZoomValue;
    }

    private getStep(delta: number) {
        return (delta > 0 ? -1 : 1) * this.step;
    }
}