import { Activable } from "../interfaces/activeable";
import { BaseConfig } from "../interfaces/base-config";
import { GenericSocket } from "../pieces/generic-socket";
import { ActiveItemService } from "../services/active-item.service";

export abstract class GenericSocketFactory {
    protected activeItem: Activable;

    constructor(
        protected readonly activeItemService: ActiveItemService,
    ) {
        this.activeItemService.current$.subscribe((item: Activable) => {
            this.activeItem = item;
        });
    }

    public abstract create<T>(config: BaseConfig): GenericSocket<T>;
}