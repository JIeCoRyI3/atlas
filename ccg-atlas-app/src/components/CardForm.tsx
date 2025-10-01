import { useState } from 'react';
import { Card, CharacteristicRange, Characteristic } from '../types';
import { getCharacteristicLabel } from '../utils/calculations';
import './CardForm.css';

interface CardFormProps {
  onSave: (card: Card) => void;
  initialCard?: Card;
}

export function CardForm({ onSave, initialCard }: CardFormProps) {
  const [name, setName] = useState(initialCard?.name || '');
  const [ranges, setRanges] = useState<CharacteristicRange[]>(
    initialCard?.ranges || []
  );

  const addRange = () => {
    const newRange: CharacteristicRange = {
      id: crypto.randomUUID(),
      characteristic: 'quality',
      minValue: 1,
      maxValue: 8
    };
    setRanges([...ranges, newRange]);
  };

  const updateRange = (id: string, field: keyof CharacteristicRange, value: any) => {
    setRanges(ranges.map(range =>
      range.id === id ? { ...range, [field]: value } : range
    ));
  };

  const removeRange = (id: string) => {
    setRanges(ranges.filter(range => range.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Введите название карты');
      return;
    }
    if (ranges.length === 0) {
      alert('Добавьте хотя бы один диапазон характеристик');
      return;
    }

    const card: Card = {
      id: initialCard?.id || crypto.randomUUID(),
      name: name.trim(),
      ranges
    };

    onSave(card);
    
    // Сброс формы только если это новая карта
    if (!initialCard) {
      setName('');
      setRanges([]);
    }
  };

  const characteristics: Characteristic[] = ['quality', 'quantity', 'cost', 'power'];

  return (
    <form onSubmit={handleSubmit} className="card-form">
      <div className="form-group">
        <label className="label" htmlFor="card-name">
          Название карты
        </label>
        <input
          id="card-name"
          type="text"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите название карты"
        />
      </div>

      <div className="form-section">
        <div className="flex items-center justify-between mb-2">
          <h3 className="section-title">Характеристики</h3>
          <button
            type="button"
            onClick={addRange}
            className="btn btn-secondary btn-small"
          >
            + Добавить диапазон
          </button>
        </div>

        {ranges.length === 0 && (
          <p className="text-secondary text-small">
            Нажмите "Добавить диапазон" для создания характеристики
          </p>
        )}

        <div className="ranges-list">
          {ranges.map((range, index) => (
            <div key={range.id} className="range-item">
              <div className="range-header">
                <span className="range-number">#{index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeRange(range.id)}
                  className="btn btn-danger btn-small"
                >
                  Удалить
                </button>
              </div>

              <div className="range-fields">
                <div className="form-group">
                  <label className="label">Характеристика</label>
                  <select
                    className="select"
                    value={range.characteristic}
                    onChange={(e) =>
                      updateRange(range.id, 'characteristic', e.target.value as Characteristic)
                    }
                  >
                    {characteristics.map(char => (
                      <option key={char} value={char}>
                        {getCharacteristicLabel(char)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="label">Мин. значение</label>
                  <input
                    type="number"
                    className="input"
                    value={range.minValue}
                    onChange={(e) =>
                      updateRange(range.id, 'minValue', parseFloat(e.target.value))
                    }
                  />
                </div>

                <div className="form-group">
                  <label className="label">Макс. значение</label>
                  <input
                    type="number"
                    className="input"
                    value={range.maxValue}
                    onChange={(e) =>
                      updateRange(range.id, 'maxValue', parseFloat(e.target.value))
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className="btn btn-primary submit-btn">
        {initialCard ? 'Сохранить изменения' : 'Создать карту'}
      </button>
    </form>
  );
}
