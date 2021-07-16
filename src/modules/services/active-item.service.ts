import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Activable } from "../interfaces/activeable";
import { ClickService } from "./click.service";

@Injectable({
    providedIn: 'root',
})
export class ActiveItemService {
    private readonly activeItemInterval$ = new Subject<Activable>();
    
    public readonly activeItem$ = this.activeItemInterval$.asObservable();

    constructor(
        private readonly clickService: ClickService,
    ) {}

    public setActiveItem(item: Activable) {
        this.activeItemInterval$.next(item);
    }
}