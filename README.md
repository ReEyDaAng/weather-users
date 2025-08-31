# Weather Users 🌦️

Full-stack застосунок, який показує випадкових користувачів із [randomuser.me](https://randomuser.me) та локальну погоду для їхнього міста.  
Реалізовано можливість зберігати користувачів у базу (Supabase), переглядати «Saved», а також автоматичне оновлення даних погоди.

ШІ використовувався для хостингу проекту на Railway та виправлення помилок, що з'явилися після цього (проблеми типізації, cors, url, service_role).
Також він використовувався для вивченя Next.js (хоча б до рівня написання проекту зі сторонньою допомогою) та пошуку рішень стилізації сайту.
Знаходилися та виправлялися помилки при роботі з TypeScript.

---

## ⚙️ Технології

### Frontend
- [Next.js 13+ (App Router)](https://nextjs.org/)
- [React Query (TanStack)](https://tanstack.com/query/latest) — кешування й автооновлення даних
- [Tailwind CSS](https://tailwindcss.com/) — стилі та темна/світла тема
- [Zustand](https://zustand-demo.pmnd.rs/) — керування тостами (сповіщеннями)
- TypeScript

### Backend
- [NestJS](https://nestjs.com/)
- [Supabase](https://supabase.com/) — Postgres + REST API
- Власний сервіс `SavedService` для збереження / видалення користувачів

---

## 🚀 Запуск локально

### 1. Клонування
```bash
git clone https://github.com/your-username/weather-users.git
cd weather-users
```

### 2. Налаштування змінних середовища

Створи `.env` файли для **backend** і **frontend**:

#### `apps/server/.env`
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE=your-service-role-key
```

#### `apps/client/.env`
```env
NEXT_PUBLIC_API_BASE=http://localhost:3001   # URL до NestJS API
```

### 3. Встановлення залежностей
```bash
npm install
```

### 4. Запуск у dev-режимі
```bash
# бекенд
cd apps/server
npm run start:dev

# фронтенд
cd apps/client
npm run dev
```

---

## 📦 Функціонал

- **Random Users**: показує список випадкових користувачів із їхніми даними.  
- **Weather**: запит до `/api/weather` → показує погоду за координатами користувача.  
- **Save / Remove**: збереження користувача у Supabase, повідомлення toast.  
- **Already Saved**: при повторній спробі збереження з’являється сповіщення *"Already saved!"*.  
- **Theme Toggle**: перемикач світлої / темної теми, збереження у localStorage.  
- **Toasts**: з’являються в нижньому правому кутку, автоматично зникають через 3s.  
- **Автооновлення погоди**: React Query `refetchInterval = 5m`.

---

## 🌗 Dark / Light Theme
- світла тема — білі картки, чорний текст  
- темна тема — сірі картки, білі тости, кнопки з контрастом  
- перемикач теми завжди у Navbar (праворуч)
