import { Card } from '../types';
import './CardSelector.css';

interface CardSelectorProps {
  cards: Card[];
  onDragStart: (card: Card) => void;
}

export function CardSelector({ cards, onDragStart }: CardSelectorProps) {
  if (cards.length === 0) {
    return (
      <div className="card-selector">
        <h3 className="selector-title">Доступные карты</h3>
        <div className="empty-selector">
          <p className="text-secondary">
            Нет доступных карт. Создайте карты в разделе "Коллекция".
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="card-selector">
      <h3 className="selector-title">Доступные карты</h3>
      <p className="selector-hint text-secondary text-small">
        Перетащите карту на атлас
      </p>
      <div className="selector-cards">
        {cards.map(card => (
          <div
            key={card.id}
            className="selector-card"
            draggable
            onDragStart={() => onDragStart(card)}
          >
            <div className="selector-card-name">{card.name}</div>
            <div className="selector-card-description">
              {card.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
