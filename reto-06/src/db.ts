import Dexie, { type Table } from 'dexie';

export interface Fruta {
  id?: number;
  nombre: string;
  favorita: boolean;
  createdAt?: string;
}

class MiAppDB extends Dexie {
  frutas!: Table<Fruta, number>;

  constructor() {
    super('MiAppDB');
    this.version(1).stores({
      frutas: '++id, nombre, favorita, createdAt',
    });
  }
}

const db = new MiAppDB();
export default db;