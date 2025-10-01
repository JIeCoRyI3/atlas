import { PlacedCard } from '../types';
import { getCharacteristicLabel, getCharacteristicColor } from '../utils/calculations';
import './PlacedCardInfo.css';

interface PlacedCardInfoProps {
  placedCards: PlacedCard[];
}

export function PlacedCardInfo({ placedCards }: PlacedCardInfoProps) {
  if (placedCards.length === 0) {
    return (
      <div className="placed-info">
        <h3 className="info-title">Размещенные карты</h3>
        <div className="empty-info">
          <p className="text-secondary">
            Карты еще не размещены на атласе
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="placed-info">
      <h3 className="info-title">Размещенные карты ({placedCards.length})</h3>
      <div className="placed-info-cards">
        {placedCards.map((placedCard, index) => (
          <div key={index} className="info-card">
            <div className="info-card-header">
              <h4 className="info-card-name">{placedCard.card.name}</h4>
              <span className="info-card-coords">
                ({placedCard.position.x > 0 ? '+' : ''}{placedCard.position.x}, 
                 {placedCard.position.y > 0 ? '+' : ''}{placedCard.position.y})
              </span>
            </div>
            
            <div 
              className="info-card-description"
              dangerouslySetInnerHTML={{ __html: placedCard.calculatedDescription }}
            />
            
            <details className="info-card-details">
              <summary className="info-card-summary">Детали расчёта</summary>
              <div className="info-card-values">
                {placedCard.card.ranges.map((range, idx) => {
                  const key = `${range.characteristic}_${idx}`;
                  const value = placedCard.calculatedValues[key];
                  const color = getCharacteristicColor(range.characteristic);
                  
                  return (
                    <div key={key} className="info-value">
                      <span className="info-value-label">
                        {getCharacteristicLabel(range.characteristic)}
                      </span>
                      <span className="info-value-range">
                        {range.minValue} - {range.maxValue}
                      </span>
                      <span 
                        className="info-value-result"
                        style={{ backgroundColor: color, color: 'white' }}
                      >
                        → {value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
}
