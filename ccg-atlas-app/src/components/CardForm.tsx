import { useState, useRef } from 'react';
import { Card, CharacteristicRange, Characteristic } from '../types';
import { getCharacteristicLabel } from '../utils/calculations';
import './CardForm.css';

interface CardFormProps {
  onSave: (card: Card) => void;
  initialCard?: Card;
}

export function CardForm({ onSave, initialCard }: CardFormProps) {
  const [name, setName] = useState(initialCard?.name || '');
  const [description, setDescription] = useState(() => {
    if (initialCard) {
      return generateDescriptionFromRanges(initialCard.ranges);
    }
    return '';
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showCharacteristicModal, setShowCharacteristicModal] = useState(false);
  const [selectedCharacteristic, setSelectedCharacteristic] = useState<Characteristic>('quality');
  const [minValue, setMinValue] = useState(1);
  const [maxValue, setMaxValue] = useState(8);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Введите название карты');
      return;
    }

    // Парсим характеристики из описания
    const ranges = parseRangesFromDescription(description);
    
    if (ranges.length === 0) {
      alert('Добавьте хотя бы одну характеристику в описание');
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
      setDescription('');
    }
  };

  const handleAddCharacteristic = () => {
    const characteristicText = `[${getCharacteristicLabel(selectedCharacteristic)}: ${minValue}-${maxValue}]`;
    
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const cursorPos = textarea.selectionStart;
      const textBefore = description.substring(0, cursorPos);
      const textAfter = description.substring(cursorPos);
      
      const newDescription = textBefore + characteristicText + textAfter;
      setDescription(newDescription);
      
      // Устанавливаем курсор после вставленного текста
      setTimeout(() => {
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = cursorPos + characteristicText.length;
      }, 0);
    } else {
      setDescription(description + characteristicText);
    }
    
    setShowCharacteristicModal(false);
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
          <label className="label">Описание карты</label>
          <button
            type="button"
            onClick={() => setShowCharacteristicModal(true)}
            className="btn btn-secondary btn-small"
          >
            + Добавить характеристику
          </button>
        </div>

        <textarea
          ref={textareaRef}
          className="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Введите описание карты. Нажмите 'Добавить характеристику' чтобы встроить характеристики в текст."
          rows={10}
        />
        
        <p className="text-secondary text-small mt-1">
          Характеристики в описании отображаются в формате: [Название: мин-макс]
        </p>
      </div>

      {showCharacteristicModal && (
        <div className="modal-overlay" onClick={() => setShowCharacteristicModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Добавить характеристику</h3>
            
            <div className="form-group">
              <label className="label">Характеристика</label>
              <select
                className="select"
                value={selectedCharacteristic}
                onChange={(e) => setSelectedCharacteristic(e.target.value as Characteristic)}
              >
                {characteristics.map(char => (
                  <option key={char} value={char}>
                    {getCharacteristicLabel(char)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="label">Мин. значение</label>
                <input
                  type="number"
                  className="input"
                  value={minValue}
                  onChange={(e) => setMinValue(parseFloat(e.target.value))}
                />
              </div>

              <div className="form-group">
                <label className="label">Макс. значение</label>
                <input
                  type="number"
                  className="input"
                  value={maxValue}
                  onChange={(e) => setMaxValue(parseFloat(e.target.value))}
                />
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                onClick={() => setShowCharacteristicModal(false)}
                className="btn btn-secondary"
              >
                Отмена
              </button>
              <button
                type="button"
                onClick={handleAddCharacteristic}
                className="btn btn-primary"
              >
                Добавить
              </button>
            </div>
          </div>
        </div>
      )}

      <button type="submit" className="btn btn-primary submit-btn">
        {initialCard ? 'Сохранить изменения' : 'Создать карту'}
      </button>
    </form>
  );
}

// Функция для генерации описания из существующих ranges (для редактирования)
function generateDescriptionFromRanges(ranges: CharacteristicRange[]): string {
  return ranges.map(range => 
    `[${getCharacteristicLabel(range.characteristic)}: ${range.minValue}-${range.maxValue}]`
  ).join(' ');
}

// Функция для парсинга характеристик из описания
function parseRangesFromDescription(description: string): CharacteristicRange[] {
  const ranges: CharacteristicRange[] = [];
  
  // Регулярное выражение для поиска паттерна [Характеристика: мин-макс]
  const pattern = /\[(Качество|Количество|Стоимость|Сила):\s*(-?\d+(?:\.\d+)?)\s*-\s*(-?\d+(?:\.\d+)?)\]/g;
  
  let match;
  while ((match = pattern.exec(description)) !== null) {
    const characteristicLabel = match[1];
    const minValue = parseFloat(match[2]);
    const maxValue = parseFloat(match[3]);
    
    // Преобразуем метку обратно в тип Characteristic
    const characteristicMap: Record<string, Characteristic> = {
      'Качество': 'quality',
      'Количество': 'quantity',
      'Стоимость': 'cost',
      'Сила': 'power'
    };
    
    const characteristic = characteristicMap[characteristicLabel];
    if (characteristic) {
      ranges.push({
        id: crypto.randomUUID(),
        characteristic,
        minValue,
        maxValue
      });
    }
  }
  
  return ranges;
}
