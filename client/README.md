# Стэк технологий на проекте(клиент)
```
    TypeScript - типизация
    React - UI Framework
    Redux - state manager
    Formik - Библеотка для работы с формами
    Yup - Валидатор
    React-input-mask - НОС для масок
```

# Структура папок(src)
```
    assets - тут лежат все картинки и фонты

    components - компоненты разбитые по папкам
    components/cart - компоненты корзины
    components/shop - компоненты витрины
    components/welcome - компоненты выбора адреса
    components/lenta - Слайдер свайпер(НОС)
    components/HOC - НОС`ы

    customHooks - Кастомные хуки
    helpers - Переиспользуемые функции
    scss - стили
    
    store - хранилище
    store/actions - экшены
    store/reducers - редюсеры

    types - пользовательские типы
    types/actions - типы для экшенов с перечислениями(enum`ы)
    types/enums - перечисления
    types/props - интерфейсы для пропсов
    types/store/[reducer_name] - типы данных состояния в редюсерах, где [reducer_name] названия редюсера
```
