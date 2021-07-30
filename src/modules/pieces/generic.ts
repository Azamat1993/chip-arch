import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Activable } from "../interfaces/activeable";
import { BaseConfig } from "../interfaces/base-config";
import { Settings } from "../interfaces/settings";
import { Point } from "../models/point";
import { ActiveItemService } from "../services/active-item.service";
import { ClickService } from "../services/click.service";
import { SettingsService } from "../services/settings.service";
import { UpdatesService } from "../services/updates.service";

export abstract class Generic<T> implements Activable {
    protected readonly moveInternal$ = new Subject<Point>();

    public readonly move$ = this.moveInternal$.asObservable();

    protected width: number;
    protected height: number;
    protected position: Point;

    protected defaultWidth = 50;
    protected defaultHeight = 50;
    protected defaultPosition = new Point(0, 0);

    protected parent: Generic<T>;
    protected settings: Settings;

    protected readonly destroy$ = new Subject<void>();
    protected readonly parentChanged$ = new Subject<Generic<T>>();

    constructor(
        protected readonly config: BaseConfig,
        protected readonly clickService: ClickService,
        protected readonly activeItemService: ActiveItemService,
        protected readonly updatesService: UpdatesService,
        protected readonly settingsService: SettingsService,
    ) {
        this.width = config.width || this.defaultWidth;
        this.height = config.height || this.defaultHeight;
        this.position = config.position ? new Point(config.position.x, config.position.y) : this.defaultPosition;
        this.parent = this;

        this.settingsService.settings$.pipe(
            takeUntil(this.destroy$),
        ).subscribe((settings: Settings) => {
            this.settings = settings;
        });

        this.clickService.clickPos$.pipe(
            takeUntil(this.destroy$),
        ).subscribe(this.handleClick.bind(this));

        this.clickService.releasePos$.pipe(
            takeUntil(this.destroy$),
        ).subscribe(this.handleRelease.bind(this));

        this.move$.pipe(
            takeUntil(this.destroy$)
        ).subscribe((point: Point) => {
            this.activeItemService.moveCurrentItem(point);
        });

        this.parentChanged$.pipe(
            takeUntil(this.destroy$),
        ).subscribe((parent: Generic<T>) => {
            this.parent = parent;
        });

        this.updatesService.updates$.pipe(
            takeUntil(this.destroy$),
        ).subscribe(() => {
            this.render();
        });
    }

    public move(diffPoint: Point): void {
        if (this.hasParent()) {
            const offsetPoint = this.position.add(diffPoint);
            
            if (this.isInside(offsetPoint, this.getParent())) {
                this.moveInternal$.next(offsetPoint);
            }
        } else {
            this.moveInternal$.next(diffPoint);
        }
    }

    public abstract click(point: Point): void;

    public abstract release(point: Point): void;

    public destroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    protected render() {
        const { context } = this.settings;

        context.fillStyle = 'blue';
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    protected handleClick(point: Point) {
        if (this.isInside(point, this)) {
            this.activeItemService.setCurrentItem(this);
            if (this.click) {
                this.click(point);
            }
        }
    }

    protected handleRelease(point: Point) {
        if (this.isInside(point, this)) {
            if (this.release) {
                this.release(point);
            }
        }
    }

    protected hasParent() {
        return this.getParent() !== this.parent;
    }

    protected setParent(parent: Generic<T>) {
        this.parentChanged$.next(parent);

        if (parent !== this.parent) {
            this.parent.move$.pipe(
                takeUntil(this.destroy$),
                takeUntil(this.parentChanged$),
            ).subscribe((point: Point) => {
                this.moveInternal$.next(point);
            });
        }
    }

    protected getParent(): Generic<T> {
        let parent = this.parent;

        while (parent.parent !== parent) {
            parent = parent.parent;
        }
        
        this.parent = parent;

        return parent;
    }
    protected isInside(point: Point, boundary: Generic<any>): boolean {
        return point.x >= boundary.position.x
            && point.x <= (boundary.position.x + boundary.width)
            && point.y >= boundary.position.y
            && point.y <= (boundary.position.y + boundary.height);
    }
}