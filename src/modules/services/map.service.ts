export abstract class MapService<K, V> {
    public items = new Map<K, V>();

    public register(toolName: K, tool: V) {
        if (this.items.has(toolName)) {
            throw new Error(`Tool with ${toolName} already registered!`);
        }
        this.items.set(toolName, tool);
    }

    public get(toolName: K) {
        if (!this.items.has(toolName)) {
            throw new Error(`Tool with ${toolName} has not been registered!`);
        }
        return this.items.get(toolName);
    }

    public getRegisteredItems() {
        return Array.from(this.items.entries());
    }
}