import { Position, Characteristic, CharacteristicRange, CalculatedValues } from '../types';

/**
 * Получить значение характеристики на основе позиции на атласе
 * Атлас 8x8, координаты от -4 до 4 (без 0)
 * 
 * Quality: слева направо (x: -4 = 0, -3 = 1, ..., -1 = 3, 1 = 4, ..., 4 = 7)
 * Quantity: справа налево (x: 4 = 0, 3 = 1, ..., 1 = 3, -1 = 4, ..., -4 = 7)
 * Cost: сверху вниз (y: -4 = 0, -3 = 1, ..., -1 = 3, 1 = 4, ..., 4 = 7)
 * Power: снизу вверх (y: 4 = 0, 3 = 1, ..., 1 = 3, -1 = 4, ..., -4 = 7)
 */
export function getCharacteristicValue(
  characteristic: Characteristic,
  position: Position
): number {
  switch (characteristic) {
    case 'quality':
      // Слева направо: -4 -> 0, -3 -> 1, ..., -1 -> 3, 1 -> 4, ..., 4 -> 7
      return position.x < 0 ? position.x + 4 : position.x + 3;
    
    case 'quantity':
      // Справа налево: 4 -> 0, 3 -> 1, ..., 1 -> 3, -1 -> 4, ..., -4 -> 7
      return position.x > 0 ? 4 - position.x : 3 - position.x;
    
    case 'cost':
      // Сверху вниз: -4 -> 0, -3 -> 1, ..., -1 -> 3, 1 -> 4, ..., 4 -> 7
      return position.y < 0 ? position.y + 4 : position.y + 3;
    
    case 'power':
      // Снизу вверх: 4 -> 0, 3 -> 1, ..., 1 -> 3, -1 -> 4, ..., -4 -> 7
      return position.y > 0 ? 4 - position.y : 3 - position.y;
    
    default:
      return 0;
  }
}

/**
 * Рассчитать значение для диапазона на основе позиции
 */
export function calculateRangeValue(
  range: CharacteristicRange,
  position: Position
): number {
  const characteristicIndex = getCharacteristicValue(range.characteristic, position);
  
  // Интерполируем значение из диапазона
  // Index 0-7 соответствует позициям на оси
  const step = (range.maxValue - range.minValue) / 7;
  const value = range.minValue + (step * characteristicIndex);
  
  return Math.round(value * 10) / 10; // Округляем до 1 знака после запятой
}

/**
 * Рассчитать все значения для карты на основе позиции
 */
export function calculateCardValues(
  ranges: CharacteristicRange[],
  position: Position
): CalculatedValues {
  const values: CalculatedValues = {};
  
  ranges.forEach((range, index) => {
    const key = `${range.characteristic}_${index}`;
    values[key] = calculateRangeValue(range, position);
  });
  
  return values;
}

/**
 * Получить отображаемое имя характеристики
 */
export function getCharacteristicLabel(characteristic: Characteristic): string {
  const labels: Record<Characteristic, string> = {
    quality: 'Качество',
    quantity: 'Количество',
    cost: 'Стоимость',
    power: 'Сила'
  };
  return labels[characteristic];
}

/**
 * Генерировать описание с конкретными рассчитанными значениями
 */
export function generateCalculatedDescription(
  description: string,
  ranges: CharacteristicRange[],
  calculatedValues: CalculatedValues
): string {
  let result = description;
  
  ranges.forEach((range, index) => {
    const key = `${range.characteristic}_${index}`;
    const value = calculatedValues[key];
    
    // Создаем паттерн для поиска [Характеристика: мин-макс]
    const label = getCharacteristicLabel(range.characteristic);
    const pattern = new RegExp(`\\[${label}:\\s*${range.minValue}\\s*-\\s*${range.maxValue}\\]`, 'g');
    
    // Заменяем на конкретное значение
    result = result.replace(pattern, value.toString());
  });
  
  return result;
}
