
import { Injectable } from '@angular/core';
import { Preferences as Storage } from '@capacitor/preferences';
import { BehaviorSubject, Observable } from 'rxjs';


  export interface CoffeeItem {
    id?: number;
    timestamp: string;
    brand: string;
    name: string;
    type?: string;
    countryOfOrigin?: string;
    beanVariety?: string;
    notes?: string;
    rating?: number;
    image?: string;
    brown?: string;
  }

@Injectable({ providedIn: 'root' })
export class CoffeeItemService {
  private readonly STORAGE_KEY = 'coffeeItems';
  private items$ = new BehaviorSubject<CoffeeItem[]>([]);

  constructor() {
    this.loadItems();
  }

  getAll(): Observable<CoffeeItem[]> {
    return this.items$.asObservable();
  }

  async add(item: CoffeeItem): Promise<void> {
    const items = [...this.items$.value];
    // Assign a unique id
    item.id = Date.now();
    items.unshift(item);
    await Storage.set({ key: this.STORAGE_KEY, value: JSON.stringify(items) });
    this.items$.next(items);
  }

  async delete(id: number): Promise<void> {
    const items = this.items$.value.filter(i => i.id !== id);
    await Storage.set({ key: this.STORAGE_KEY, value: JSON.stringify(items) });
    this.items$.next(items);
  }

  private async loadItems() {
    const { value } = await Storage.get({ key: this.STORAGE_KEY });
    const items: CoffeeItem[] = value ? JSON.parse(value) : [];
    this.items$.next(items);
  }
}
