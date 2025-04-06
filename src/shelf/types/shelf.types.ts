export enum ShelfType {
  DAIRY = 'dairy',
  BAKERY = 'bakery',
  PRODUCE = 'produce',
  MEAT = 'meat',
  VEGETABLES = 'vegetables',
  GENERAL = 'general',
  WALL = 'wall',
}

export enum ShelfSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export interface ShelfDataRequest {
  id: string;
  type: string;
  position: Position3D;
  rotation: number;
  size: string;
  interactions: number;
}

export interface StoreSize {
  width: number;
  length: number;
  height: number;
}

export interface StoreLayoutRequest {
  storeSize: StoreSize;
  shelves: ShelfDataRequest[];
  createdAt: string;
}

// Keep legacy interfaces for backward compatibility
export interface ShelfPosition {
  coordinateX: number;
  coordinateY: number;
  width: number;
  height: number;
}

export interface ShelfData {
  id: number;
  name: string;
  type: ShelfType;
  size: ShelfSize;
  capacity: number;
  storeId: number;
  sectionId?: number;
  position: ShelfPosition;
}
