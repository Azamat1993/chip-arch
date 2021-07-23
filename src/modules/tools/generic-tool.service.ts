import { Activable } from "../interfaces/activeable";
import { Tool } from "../interfaces/tool";
import { Point } from "../models/point";
import { ActiveItemService } from "../services/active-item.service";

export abstract class GenericTool implements Tool {
    public readonly toolName;

    protected activeItem: Activable;

    constructor(protected readonly activeItemService: ActiveItemService) {
        this.activeItemService.current$.subscribe((item: Activable) => {
            this.activeItem = item;
        });
    }

    public onDrag(newPoint: Point) {
        // implement
    }

    public onClick(newPoint: Point) {
        // implement
    }

    public onRelease(newPoint: Point) {
        // implement
    }
}