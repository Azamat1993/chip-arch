import { PIECE_TYPE } from "../enums/piece-type";
import { Activable } from "../interfaces/activeable";
import { BaseConfig } from "../interfaces/base-config";
import { Generic } from "../pieces/generic";
import { GenericSocket } from "../pieces/generic-socket";
import { ActiveItemService } from "../services/active-item.service";

export abstract class GenericSocketFactory {
    protected focusedItem: Generic<any>;

    constructor(
        protected readonly activeItemService: ActiveItemService,
    ) {
        this.activeItemService.focused$.subscribe((item: Generic<any>) => {
            this.focusedItem = item;
        });
    }

    public abstract create<T>(config?: BaseConfig): GenericSocket<T>;

    protected canBeCreated() {
        return this.focusedItem?.getType() === PIECE_TYPE.GATE;
    }
}