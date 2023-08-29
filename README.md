# to-do-vue3

# Файл конфига firebase (src/firebase/index.ts) не включен в репо по соображениям безопасности

### Что было реализовано в приложении

*   Список Задач позволяет создавать, редактировать и удалять задачи
*   У задачи надо указать время, описание и важность
*   Предусмотрена возможность фильтрации по названию и сортировки по дате или названию
*   росроченные задачи автоматически закрепляются вверху списка и получают красную тень
*   Несколько страниц + динамическая страница edit-task
*   Встроенная анимация vue
*   Динамические роуты и обработка несуществующих роутов
*   Состояние приложения сохраняется при перезагрузке, используется Firebase
*   Динамическое состояние формы (для edit-task)

Проект подготовлен по материалам youtube([UlbiTV](https://www.youtube.com/@UlbiTV), [NetNinja](https://www.youtube.com/@NetNinja) и другие), stackoverflow, [https://medium.com](https://medium.com), [vueMastery](https://www.vuemastery.com), документации и пр.

### Какие технологии и плагины использовались

*   Vue3
*   Vue CLI
*   Vue router
*   Vuex
*   Pinia решил не использовать
*   Axios так как используется firebase, то axios не применяется
*   Seeders
*   Конфигурационные файлы (\_config)
*   Options API, с последующим рефкатором в пользу Composition API и script setup
*   Typescript
*   Localstore → Firebase
*   SCSS
*   @vueform/multiselect для селекта
*   @vuepic/vue-datepicker для выбора даты
*   vee-validate+yup для валидации формы создания задачи

### Ветки и их особенности

*   main - основная ветка, в ней лежит последняя версия.
*   options-api  → composition-api  → typescript  → firebase  → forms  названия говорят сами за себя
*   improvement(TODO) - различные улучшения, оптимизации, редизайн.


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
