import { IStorageService } from './IStorageService';

class StorageService implements IStorageService {
  private storage: Storage;
  private static instance: StorageService;

  private constructor(storage: Storage) {
    this.storage = storage;
  }

  static getInstance(storage: Storage = window.localStorage): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService(storage);
    }

    return StorageService.instance;
  }

  parseValue<T = string>(value: string | null): T | null {
    try {
      return value ? (JSON.parse(value) as T) : null;
    } catch {
      return null;
    }
  }

  setItem(key: string, value: unknown): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getItem<T = string>(key: string): T | null {
    const value = this.storage.getItem(key);
    return this.parseValue<T>(value);
  }

  removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  clear(): void {
    this.storage.clear();
  }

  getKey(index: number): string | null {
    const value = this.storage.key(index);
    return this.parseValue(value);
  }

  getLength(): number {
    return this.storage.length;
  }
}

export { StorageService };
