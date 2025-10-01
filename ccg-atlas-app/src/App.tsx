import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Collection } from './pages/Collection';
import { Atlas } from './pages/Atlas';
import { Card } from './types';
import { getCharacteristicLabel } from './utils/calculations';

const STORAGE_KEY = 'ccg-atlas-cards';

function App() {
  const [cards, setCards] = useState<Card[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsedCards = JSON.parse(saved);
        // Добавляем описание для старых карт, у которых его нет
        return parsedCards.map((card: any) => {
          if (!card.description && card.ranges) {
            const description = card.ranges.map((range: any) => 
              `[${getCharacteristicLabel(range.characteristic)}: ${range.minValue}-${range.maxValue}]`
            ).join(' ');
            return { ...card, description };
          }
          return card;
        });
      }
      return [];
    } catch {
      return [];
    }
  });

  // Сохраняем карты в localStorage при изменении
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  }, [cards]);

  const handleAddCard = (card: Card) => {
    const existingIndex = cards.findIndex(c => c.id === card.id);
    if (existingIndex >= 0) {
      // Обновляем существующую карту
      const newCards = [...cards];
      newCards[existingIndex] = card;
      setCards(newCards);
    } else {
      // Добавляем новую карту
      setCards([...cards, card]);
    }
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/collection" replace />} />
          <Route
            path="/collection"
            element={
              <Collection
                cards={cards}
                onAddCard={handleAddCard}
                onDeleteCard={handleDeleteCard}
              />
            }
          />
          <Route path="/atlas" element={<Atlas cards={cards} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
