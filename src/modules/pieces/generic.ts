import { BaseConfig } from "../interfaces/base-config";
import { Renderable } from "../interfaces/renderable";
import { Point } from "../models/point";
import { PieceService } from "../render/piece.service";

export abstract class Generic<T> {
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
    ) {
        this.width = config.width || this.defaultWidth;
        this.height = config.height || this.defaultHeight;
        this.position = config.position ? new Point(config.position.x, config.position.y) : this.defaultPosition;
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
}