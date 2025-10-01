# 🎮 Команды для работы с проектом

## 📦 Установка

### Первый раз
```bash
cd ccg-atlas-app
npm install
```

## 🚀 Разработка

### Запуск dev-сервера
```bash
npm run dev
```
Откроется: http://localhost:5173

### Остановка
```
Ctrl + C
```

## 🏗️ Сборка

### Сборка для продакшена
```bash
npm run build
```
Результат в папке: `dist/`

### Предпросмотр сборки
```bash
npm run preview
```

## 🔍 Проверка кода

### Запуск линтера
```bash
npm run lint
```

## 🧹 Очистка

### Удалить node_modules
```bash
rm -rf node_modules
```

### Удалить сборку
```bash
rm -rf dist
```

### Полная очистка и переустановка
```bash
rm -rf node_modules dist
npm cache clean --force
npm install
```

## 📊 Информация

### Проверить версию Node.js
```bash
node --version
```
Требуется: v18.0.0 или выше

### Проверить версию npm
```bash
npm --version
```

### Размер проекта
```bash
du -sh node_modules
du -sh dist
```

### Список зависимостей
```bash
npm list --depth=0
```

## 🔧 Полезные команды

### Обновить зависимости
```bash
npm update
```

### Проверить устаревшие пакеты
```bash
npm outdated
```

### Аудит безопасности
```bash
npm audit
```

### Исправить уязвимости
```bash
npm audit fix
```

## 🌐 Развертывание

### Локальный сервер (простой)
```bash
npm run build
cd dist
python3 -m http.server 8000
```
Откроется: http://localhost:8000

### Nginx (пример конфигурации)
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/ccg-atlas-app/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 🐛 Отладка

### Очистить кеш npm
```bash
npm cache clean --force
```

### Переустановить зависимости
```bash
rm -rf node_modules package-lock.json
npm install
```

### Проверить порты
```bash
lsof -i :5173
```

### Убить процесс на порту 5173
```bash
kill -9 $(lsof -t -i:5173)
```

## 📝 Git команды

### Инициализация репозитория
```bash
git init
git add .
git commit -m "Initial commit: CCG Atlas app"
```

### Создать .gitignore (уже есть)
Файл `.gitignore` уже создан и настроен.

### Проверить статус
```bash
git status
```

### Посмотреть изменения
```bash
git diff
```

## 🎯 Быстрый старт (всё в одном)

### Полная установка и запуск
```bash
cd ccg-atlas-app && \
npm install && \
npm run dev
```

### Сборка и проверка
```bash
npm run build && \
npm run preview
```

## 📱 Тестирование на мобильных

### Запуск с доступом по сети
```bash
npm run dev -- --host
```
Затем откройте отображённый network URL на мобильном устройстве.

### Определить IP-адрес
**Linux/macOS:**
```bash
ifconfig | grep "inet "
```

**Windows:**
```cmd
ipconfig
```

## 🔐 Безопасность

### Проверка уязвимостей
```bash
npm audit
```

### Автоматическое исправление
```bash
npm audit fix
```

### Исправление с breaking changes
```bash
npm audit fix --force
```
⚠️ Осторожно: может сломать совместимость

## 📈 Производительность

### Анализ размера сборки
```bash
npm run build -- --mode production
```

### Проверка bundle size
Результаты показываются после сборки:
- JS: ~175 KB (gzip: ~57 KB)
- CSS: ~11 KB (gzip: ~2.5 KB)

## 🔄 Обновление проекта

### Обновить React
```bash
npm install react@latest react-dom@latest
```

### Обновить TypeScript
```bash
npm install typescript@latest --save-dev
```

### Обновить Vite
```bash
npm install vite@latest --save-dev
```

### Обновить всё
```bash
npm update
```

## 💡 Советы

1. **Всегда используйте `npm run dev`** для разработки
2. **Проверяйте сборку** перед деплоем: `npm run build`
3. **Коммитьте часто** во время разработки
4. **Не коммитьте node_modules** (уже в .gitignore)
5. **Тестируйте на разных браузерах**

## 🆘 Помощь

### Документация
- README.md - основная документация
- QUICK_START.md - быстрый старт
- GUIDE.md - полное руководство
- PROJECT_SUMMARY.md - сводка проекта

### Если ничего не работает
```bash
# 1. Проверьте Node.js
node --version  # должно быть ≥18

# 2. Полная переустановка
cd ccg-atlas-app
rm -rf node_modules package-lock.json dist
npm cache clean --force
npm install

# 3. Попробуйте запустить
npm run dev
```

---

**Успешной разработки!** 🚀
