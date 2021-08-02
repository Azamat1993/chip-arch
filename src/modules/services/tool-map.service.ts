import { Injectable } from "@angular/core";
import { TOOLS } from "../enums/tools";
import { Tool } from "../interfaces/tool";
import { MapService } from "./map.service";

@Injectable({
    providedIn: 'root',
})
export class ToolMapService extends MapService<TOOLS, Tool> {
}