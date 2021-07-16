import { Injectable } from "@angular/core";
import { Collidable } from "../interfaces/collideable";

@Injectable({
    providedIn: 'root',
})
export class CollisionService {
    public isCollide(item1: Collidable, item2: Collidable) {
        // @todo
    }
}