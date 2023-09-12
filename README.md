# to-do-vue3

### Файл конфига firebase (src/firebase/index.ts) не включен в репо по соображениям безопасности

## Что было реализовано в приложении

*   Регистрация пользователей. Незарегистрированным пользователям доступна только главная страница и страницы регистрации/входа. Формы регистрации и входа формируются динамически, согласно переданной в props схеме.
*   Создание, редактирование и удаление задачи, задачи доступны только самому пользователю. Есть также групповые задачи, доступные всем пользователям, но удалять/менять/завершать эти задачи может только автор. Просроченные задачи подсвечиваются красным и помещаются вверх списка.
*   При создании задачи необходимо указать время, описание и важность, валидация предусмотрена.
*   Возможность фильтрации по названию и сортировки по дате, названию, важности.
*   Динамическая страница редактирования задачи, с динамическим значением полей формы.
*   Встроенная анимация vue
*   Динамические роуты и обработка несуществующих роутов, routeguard.
*   Состояние приложения сохраняется при перезагрузке, используется Firebase

Проект подготовлен по материалам youtube([UlbiTV](https://www.youtube.com/@UlbiTV), [NetNinja](https://www.youtube.com/@NetNinja) и другие), stackoverflow, [https://medium.com](https://medium.com), [vueMastery](https://www.vuemastery.com), документации и пр.

Какие технологии и плагины использовались

*   Vue3
*   Vue CLI
*   Vue router
*   Vuex
*   Firebase
*   Axios так как используется firebase, то axios не применяется
*   Seeders
*   Options API, с последующим рефактором в пользу Composition API и script setup
*   Typescript
*   SCSS
*   @vueform/multiselect для селекта
*   @vuepic/vue-datepicker для выбора даты
*   vee-validate+yup для валидации форм

Ветки и их особенности

*   main - основная ветка, в ней лежит последняя версия.
*   options-api  → composition-api  → typescript  → firebase  → forms   →script setup  названия говорят сами за себя
*   improvement(WIP) - различные улучшения, оптимизации, редизайн.

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
