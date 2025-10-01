// Характеристики карты
export type Characteristic = 'quality' | 'quantity' | 'cost' | 'power';

// Диапазон значений для характеристики
export interface CharacteristicRange {
  id: string;
  characteristic: Characteristic;
  minValue: number;
  maxValue: number;
}

// Карта
export interface Card {
  id: string;
  name: string;
  ranges: CharacteristicRange[];
}

// Позиция на атласе
export interface Position {
  x: number; // от -4 до 3
  y: number; // от -4 до 3
}

// Размещенная карта на атласе
export interface PlacedCard {
  card: Card;
  position: Position;
  calculatedValues: CalculatedValues;
}

// Рассчитанные значения
export interface CalculatedValues {
  [key: string]: number; // характеристика -> рассчитанное значение
}

// Состояние приложения
export interface AppState {
  cards: Card[];
  placedCards: PlacedCard[];
}
