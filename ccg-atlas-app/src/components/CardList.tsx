import { Card } from '../types';
import { getCharacteristicLabel } from '../utils/calculations';
import './CardList.css';

interface CardListProps {
  cards: Card[];
  onDelete: (id: string) => void;
}

export function CardList({ cards, onDelete }: CardListProps) {
  if (cards.length === 0) {
    return (
      <div className="empty-state">
        <p className="text-secondary">Карты еще не созданы. Создайте первую карту выше.</p>
      </div>
    );
  }

  // Функция для генерации описания из ranges
  const generateDescription = (card: Card): string => {
    const parts: string[] = [];
    card.ranges.forEach(range => {
      parts.push(`[${getCharacteristicLabel(range.characteristic)}: ${range.minValue}-${range.maxValue}]`);
    });
    return parts.join(' ');
  };

  return (
    <div className="card-list">
      {cards.map(card => (
        <div key={card.id} className="card-item">
          <div className="card-item-header">
            <h3 className="card-item-title">{card.name}</h3>
            <button
              onClick={() => {
                if (confirm(`Удалить карту "${card.name}"?`)) {
                  onDelete(card.id);
                }
              }}
              className="btn btn-danger btn-small"
            >
              Удалить
            </button>
          </div>
          
          <div className="card-item-description">
            {generateDescription(card)}
          </div>

          <div className="card-item-stats">
            <span className="text-secondary text-small">
              Характеристик: {card.ranges.length}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
