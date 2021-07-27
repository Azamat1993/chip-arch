import { BaseConfig } from "./base-config";

export interface Renderable {
    render(config?: BaseConfig): void;
}