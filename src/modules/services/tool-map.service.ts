import { Injectable } from "@angular/core";
import { TOOLS } from "../enums/tools";
import { Tool } from "../interfaces/tool";

@Injectable({
    providedIn: 'root',
})
export class ToolMapService {
    public tools = new Map<TOOLS, Tool>();

    public register(toolName: TOOLS, tool: Tool) {
        if (this.tools.has(toolName)) {
            throw new Error(`Tool with ${toolName} already registered!`);
        }
        this.tools.set(toolName, tool);
    }

    public get(toolName: TOOLS) {
        if (!this.tools.has(toolName)) {
            throw new Error(`Tool with ${toolName} has not been registered!`);
        }
        return this.tools.get(toolName);
    }

    public getRegisteredTools() {
        return Array.from(this.tools.entries());
    }
}