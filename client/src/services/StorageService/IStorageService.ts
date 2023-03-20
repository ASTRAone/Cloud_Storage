interface IStorageService extends Omit<Storage, 'length' | 'key'> {
  getLength: () => number;
  getKey: (index: number) => string | null;
}

export type { IStorageService };
