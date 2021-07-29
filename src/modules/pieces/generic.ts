import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Activable } from "../interfaces/activeable";
import { BaseConfig } from "../interfaces/base-config";
import { Renderable } from "../interfaces/renderable";
import { Point } from "../models/point";
import { ActiveItemService } from "../services/active-item.service";
import { ClickService } from "../services/click.service";

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

    protected readonly destroy$ = new Subject<void>();
    protected readonly parentChanged$ = new Subject<Generic<T>>();

    constructor(
        protected readonly config: BaseConfig,
        protected readonly renderService: Renderable,
        protected readonly clickService: ClickService,
        protected readonly activeItemService: ActiveItemService,
    ) {
        this.width = config.width || this.defaultWidth;
        this.height = config.height || this.defaultHeight;
        this.position = config.position ? new Point(config.position.x, config.position.y) : this.defaultPosition;
        this.parent = this;

        this.clickService.clickPos$.pipe(
            takeUntil(this.destroy$),
        ).subscribe(this.handleClick.bind(this));

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

    protected handleClick(point: Point) {
        if (this.isInside(point, this)) {
            this.activeItemService.setCurrentItem(this);
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

    protected draw() {
        this.renderService.render(this.config);
    }

    public abstract create<R>(config: R): T;

    protected isInside(point: Point, boundary: Generic<any>): boolean {
        return point.x >= boundary.position.x
            && point.x <= (boundary.position.x + boundary.width)
            && point.y >= boundary.position.y
            && point.y <= (boundary.position.y + boundary.height);
    }
}