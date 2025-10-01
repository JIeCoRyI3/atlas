import { Card, PlacedCard, Position } from '../types';
import { calculateCardValues, generateCalculatedDescription } from '../utils/calculations';
import './AtlasGrid.css';

interface AtlasGridProps {
  placedCards: PlacedCard[];
  onPlaceCard: (placedCard: PlacedCard) => void;
  onRemoveCard: (position: Position) => void;
  draggedCard: Card | null;
  onDragStart: (card: Card) => void;
}

export function AtlasGrid({ placedCards, onPlaceCard, onRemoveCard, draggedCard, onDragStart }: AtlasGridProps) {

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, x: number, y: number) => {
    e.preventDefault();
    
    if (!draggedCard) return;

    const position: Position = { x, y };
    
    // Проверяем, есть ли уже карта в этой позиции
    const existingCard = placedCards.find(
      pc => pc.position.x === x && pc.position.y === y
    );

    if (existingCard) {
      if (!confirm('В этой клетке уже есть карта. Заменить?')) {
        return;
      }
      onRemoveCard(position);
    }

    const calculatedValues = calculateCardValues(draggedCard.ranges, position);
    const calculatedDescription = generateCalculatedDescription(
      draggedCard.description,
      draggedCard.ranges,
      calculatedValues
    );
    const placedCard: PlacedCard = {
      card: draggedCard,
      position,
      calculatedValues,
      calculatedDescription
    };

    onPlaceCard(placedCard);
  };

  const getCardAtPosition = (x: number, y: number): PlacedCard | undefined => {
    return placedCards.find(pc => pc.position.x === x && pc.position.y === y);
  };

  // Генерируем сетку 8x8 (координаты от -4 до 4, без 0)
  const grid: JSX.Element[] = [];
  for (let y = -4; y <= 4; y++) {
    if (y === 0) continue; // Пропускаем 0
    for (let x = -4; x <= 4; x++) {
      if (x === 0) continue; // Пропускаем 0
      const placedCard = getCardAtPosition(x, y);
      
      grid.push(
        <div
          key={`${x},${y}`}
          className={`grid-cell ${placedCard ? 'has-card' : ''}`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, x, y)}
          data-x={x}
          data-y={y}
        >
          {placedCard && (
            <div className="placed-card-wrapper">
              <div
                className="placed-card"
                draggable
                onDragStart={() => onDragStart(placedCard.card)}
              >
                <div className="placed-card-name">{placedCard.card.name}</div>
                <div className="placed-card-coords">
                  ({x > 0 ? '+' : ''}{x}, {y > 0 ? '+' : ''}{y})
                </div>
              </div>
              <button
                className="delete-card-btn"
                onClick={() => {
                  if (confirm(`Удалить карту "${placedCard.card.name}"?`)) {
                    onRemoveCard(placedCard.position);
                  }
                }}
                title="Удалить карту"
              >
                ×
              </button>
            </div>
          )}
        </div>
      );
    }
  }

  return (
    <div className="atlas-container">
      <div className="atlas-labels">
        <div className="label-top">Стоимость →</div>
        <div className="label-bottom">← Сила</div>
        <div className="label-left">Качество →</div>
        <div className="label-right">← Количество</div>
      </div>
      <div className="atlas-grid">
        {grid}
      </div>
    </div>
  );
}
