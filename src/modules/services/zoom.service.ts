import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { ZoomEventEmitterService } from "./zoom-event-emitter.service";

@Injectable({
    providedIn: 'root',
})
export class ZoomService {
    private readonly lowerBound = 0;
    private readonly upperBound = 10;

    private currentZoomValue = this.lowerBound;

    private readonly currentZoomInterval$ = new ReplaySubject<number>(1);

    public readonly currentZoom$ = this.currentZoomInterval$.asObservable();

    constructor(private readonly zoomEventEmitter: ZoomEventEmitterService) {
        this.zoomEventEmitter.zoomEvent$.pipe(
            map(this.getStep.bind(this)),
            map(this.getZoomFromStep.bind(this)),
            startWith(this.lowerBound),
            distinctUntilChanged(),
        ).subscribe((zoom: number) => {
            this.currentZoomInterval$.next(zoom);
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
        return delta > 0 ? -1 : 1;
    }
}