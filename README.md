# to-do-vue3

Список Задач позволяет создавать, редактировать и удалять задачи. Предусмотрена возможность фильтрации по названию и сортировки по дате или названию. Просроченные задачи автоматически закрепляются вверху списка

При написании проекта был применен ряд, как мне кажется, "лишних" приемов, или просто написан, но не применен, это вызвано тем что проект учебный и ставит перед собой цель изучение Vue3, а не написание коммерческого приложения. Также накладывает свой отпечаток отсутствие наставника или какого-то курса, который полностью ответил бы на все мои вопросы.

Проект подготовлен по материалам youtube([UlbiTV](https://www.youtube.com/@UlbiTV), [NetNinja](https://www.youtube.com/@NetNinja) и другие), stackoverflow, [vueMastery](https://www.vuemastery.com), документации и пр.

Какие технологии и плагины использовались

*   Vue3
*   Vue CLI
*   Vue router
*   Vuex
*   Pinia решил не использовать
*   _Axios_ до подключения firebase не применяется
*   _Services, Rest API_ до подключения firebase не применяется
*   Seeders
*   Конфигурационные файлы (\_config)
*   Options API/Composition API - в разных ветках
*   Typescript
*   Localstore/_Firebase пока не применял_
*   SCSS
*   @vueform/multiselect для селекта
*   @vuepic/vue-datepicker для выбора даты

Ветки и их особенности

*   main - основная ветка, в ней лежит последняя версия.
*   options-api  → composition-api  → typescript  → firebase(TODO) → testing(TODO ?) названия говорят сами за себя
*   improvement(TODO) - различные улучшения, оптимизации, редизайн.

Что было реализовано в приложении

*   Несколько страниц + динамическая страница edit-task
*   Динамическая перерисовка
*   Динамический navbar
*   Встроенная анимация vue
*   Обработка несуществующих роутов
*   Динамические роуты
*   Состояние приложения сохраняется при перезагрузке, используется LocalStorage/Firebase
*   Динамическое состояние формы (для edit-task)


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Launch dist
```
serve -s dist
```
