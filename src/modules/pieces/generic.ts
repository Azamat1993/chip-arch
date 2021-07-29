import { Activable } from "../interfaces/activeable";
import { BaseConfig } from "../interfaces/base-config";
import { Renderable } from "../interfaces/renderable";
import { Point } from "../models/point";
import { PieceService } from "../render/piece.service";
import { ActiveItemService } from "../services/active-item.service";
import { ClickService } from "../services/click.service";

export abstract class Generic<T> implements Activable {
    protected width: number;
    protected height: number;
    protected position: Point;

    protected defaultWidth = 50;
    protected defaultHeight = 50;
    protected defaultPosition = new Point(0, 0);

    protected parent = this;

    constructor(
        protected readonly config: BaseConfig,
        protected readonly renderService: Renderable,
        protected readonly clickService: ClickService,
        protected readonly activeItemService: ActiveItemService,
    ) {
        this.width = config.width || this.defaultWidth;
        this.height = config.height || this.defaultHeight;
        this.position = config.position ? new Point(config.position.x, config.position.y) : this.defaultPosition;
    
        this.clickService.clickPos$.subscribe(this.handleClick.bind(this));
    }

    public move(diffPoint: Point): void {
        if (this.hasParent()) {
            const offsetPoint = this.position.add(diffPoint);
            
            if (this.isInside(offsetPoint, this.getParent())) {
                this.activeItemService.moveCurrentItem(diffPoint);
            }
        } else {
            this.activeItemService.moveCurrentItem(diffPoint);
        }
    }

    public abstract click(point: Point): void;

    public abstract release(point: Point): void;

    protected handleClick(point: Point) {
        if (this.isInside(point, this)) {
            this.activeItemService.setCurrentItem(this);
        }
    }

    protected hasParent() {
        return this.getParent() !== this.parent;
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