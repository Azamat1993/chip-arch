import { Injectable } from "@angular/core";
import { Generic } from "../pieces/generic";
import { MapService } from "./map.service";

@Injectable({
    providedIn: 'root',
})
export class PieceMapService extends MapService<string, Generic<any>> {
}