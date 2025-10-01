import { Card } from '../types';
import { CardForm } from '../components/CardForm';
import { CardList } from '../components/CardList';
import './Collection.css';

interface CollectionProps {
  cards: Card[];
  onAddCard: (card: Card) => void;
  onDeleteCard: (id: string) => void;
}

export function Collection({ cards, onAddCard, onDeleteCard }: CollectionProps) {
  return (
    <div className="page">
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Коллекция карт</h1>
          <p className="page-description">
            Создавайте карты с уникальными характеристиками. Добавьте диапазоны значений для каждой характеристики.
          </p>
        </div>

        <div className="collection-layout">
          <div className="form-section-wrapper">
            <div className="card">
              <h2 className="section-heading">Создать новую карту</h2>
              <CardForm onSave={onAddCard} />
            </div>
          </div>

          <div className="list-section-wrapper">
            <h2 className="section-heading mb-3">Ваши карты</h2>
            <CardList cards={cards} onDelete={onDeleteCard} />
          </div>
        </div>
      </div>
    </div>
  );
}
