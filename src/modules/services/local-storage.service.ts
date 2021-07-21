import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    private readonly keyPrefix = 'chip_arch_123';

    public set<T>(key: string, item: T) {
        const fullKey = this.getKey(key);

        try {
            localStorage.setItem(fullKey, this.serialize<T>(item));
        } catch (e) {
            console.error('error occured while setting item with key', key, e);
        }
    }

    public get<R>(key: string) {
        const fullKey = this.getKey(key);

        try {
            const result = localStorage.getItem(fullKey);
            return this.deserialize<R>(result);
        } catch(e) {
            console.error('error occured while getting item with key', key, e);
        }

        return null;
    }

    private getKey(key: string) {
        return `${this.keyPrefix}_${key}`;
    }

    private serialize<T>(item: T): string {
        return JSON.stringify(item);
    }

    public deserialize<R>(serializedItem: string): R {
        return JSON.parse(serializedItem);
    }
}