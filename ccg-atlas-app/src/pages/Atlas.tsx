import { useState } from 'react';
import { Card, PlacedCard, Position } from '../types';
import { AtlasGrid } from '../components/AtlasGrid';
import { CardSelector } from '../components/CardSelector';
import { PlacedCardInfo } from '../components/PlacedCardInfo';
import './Atlas.css';

interface AtlasProps {
  cards: Card[];
}

export function Atlas({ cards }: AtlasProps) {
  const [placedCards, setPlacedCards] = useState<PlacedCard[]>([]);

  const handlePlaceCard = (placedCard: PlacedCard) => {
    // Удаляем карту с той же позиции, если она есть
    const filtered = placedCards.filter(
      pc => !(pc.position.x === placedCard.position.x && pc.position.y === placedCard.position.y)
    );
    setPlacedCards([...filtered, placedCard]);
  };

  const handleRemoveCard = (position: Position) => {
    setPlacedCards(placedCards.filter(
      pc => !(pc.position.x === position.x && pc.position.y === position.y)
    ));
  };

  const handleClearAll = () => {
    if (confirm('Удалить все карты с атласа?')) {
      setPlacedCards([]);
    }
  };

  return (
    <div className="page">
      <div className="page-container-wide">
        <div className="page-header">
          <div>
            <h1 className="page-title">Атлас карт</h1>
            <p className="page-description">
              Перетащите карты на атлас, чтобы рассчитать их характеристики в зависимости от позиции.
            </p>
          </div>
          {placedCards.length > 0 && (
            <button onClick={handleClearAll} className="btn btn-danger">
              Очистить атлас
            </button>
          )}
        </div>

        <div className="atlas-layout">
          <div className="atlas-sidebar">
            <CardSelector cards={cards} onDragStart={() => {}} />
          </div>

          <div className="atlas-main">
            <div className="atlas-wrapper">
              <AtlasGrid
                placedCards={placedCards}
                onPlaceCard={handlePlaceCard}
                onRemoveCard={handleRemoveCard}
              />
            </div>
            <div className="atlas-info">
              <div className="info-box">
                <h3 className="info-box-title">Как использовать атлас</h3>
                <ul className="info-list">
                  <li>Перетащите карту из списка слева на любую клетку атласа</li>
                  <li>Характеристики автоматически пересчитаются</li>
                  <li>Переместите карту в другую клетку, чтобы пересчитать</li>
                  <li>Дважды кликните на карту, чтобы удалить её</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="atlas-sidebar">
            <PlacedCardInfo placedCards={placedCards} />
          </div>
        </div>
      </div>
    </div>
  );
}
