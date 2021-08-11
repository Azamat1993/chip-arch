import { Injectable } from "@angular/core";
import { Activable } from "../interfaces/activeable";
import { BaseConfig } from "../interfaces/base-config";
import { Point } from "../models/point";
import { Generic } from "../pieces/generic";
import { InSocket } from "../pieces/in-socket";
import { OutSocket } from "../pieces/out-socket";
import { ActiveItemService } from "../services/active-item.service";
import { ClickService } from "../services/click.service";
import { SettingsService } from "../services/settings.service";
import { UpdatesService } from "../services/updates.service";
import { GenericSocketFactory } from "./generic-socket-factory.service";

@Injectable({
    providedIn: 'root',
})
export class OutSocketFactoryService extends GenericSocketFactory {
    constructor(
        protected readonly clickService: ClickService,
        protected readonly activeItemService: ActiveItemService,
        protected readonly updatesService: UpdatesService,
        protected readonly settingsService: SettingsService,
    ) {
        super(activeItemService);
    }

    public create(config?: BaseConfig) {
        if (this.canBeCreated()) {
            const parentPosition = this.focusedItem.getPosition();
            const parentWidth = this.focusedItem.getWidth();

            const socket = new OutSocket(
                {
                    position: new Point(
                        parentPosition.x + parentWidth,
                        parentPosition.y + (config?.height || 10),
                    ),
                    width: 10,
                    height: 10,
                    ...config
                },
                this.clickService,
                this.activeItemService,
                this.updatesService,
                this.settingsService,
            );

            socket.setParent(this.focusedItem as Generic<any>);

            return socket;
        }
        return null;
    }
}