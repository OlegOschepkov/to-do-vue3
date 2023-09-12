<script setup lang="ts">
import BasicSvgIcon from '@/components/UI/BasicSvgIcon.vue';
</script>

<template>
  <div class="container container--animation">
    <h1 class="title">
      Главная страница
    </h1>
    <p class="text">
      Что было реализовано в приложении
    </p>
    <ul class="list">
      <li class="list__element">
        Регистрация пользователей. Незарегистрированным пользователям доступна только главная страница и страницы регистрации/входа. Формы регистрации и входа формируются динамически, согласно переданной в props схеме.
      </li>
      <li class="list__element">
        Создание, редактирование и удаление задачи, задачи доступны только самому пользователю. Есть также групповые задачи, доступные всем пользователям, но удалять/менять/завершать эти задачи может только автор. Просроченные задачи подсвечиваются красным и помещаются вверх списка.
      </li>
      <li class="list__element">
        При создании задачи необходимо указать время, описание и важность, валидация предусмотрена.
      </li>
      <li class="list__element">
        Возможность фильтрации по названию и сортировки по дате, названию, важности.
      </li>
      <li class="list__element">
        Динамическая страница редактирования задачи, с динамическим значением полей формы.
      </li>
      <li class="list__element">
        Встроенная анимация vue
      </li>
      <li class="list__element">
        Динамические роуты и обработка несуществующих роутов, routeguard.
      </li>
      <li class="list__element">
        Состояние приложения сохраняется при перезагрузке, используется Firebase
      </li>
    </ul>

    <p class="text">
      Проект подготовлен по материалам youtube(<a href="https://www.youtube.com/@UlbiTV">UlbiTV</a>, <a
        href="https://www.youtube.com/@NetNinja"
      >NetNinja</a> и другие), stackoverflow, <a href="https://medium.com">https://medium.com</a>, <a href="https://www.vuemastery.com">vueMastery</a>, документации и пр.
    </p>

    <p class="text">
      Какие технологии и плагины использовались
    </p>
    <ul class="list">
      <li class="list__element">
        Vue3
      </li>
      <li class="list__element">
        Vue CLI
      </li>
      <li class="list__element">
        Vue router
      </li>
      <li class="list__element">
        Vuex
      </li>
      <li class="list__element">
        Firebase
      </li>
      <li class="list__element">
        <s>Axios</s> так как используется firebase, то axios не применяется
      </li>
      <li class="list__element">
        Seeders
      </li>
      <li class="list__element">
        Options API, с последующим рефактором в пользу Composition API и script setup
      </li>
      <li class="list__element">
        Typescript
      </li>
      <li class="list__element">
        SCSS
      </li>
      <li class="list__element">
        @vueform/multiselect для селекта
      </li>
      <li class="list__element">
        @vuepic/vue-datepicker для выбора даты
      </li>
      <li class="list__element">
        vee-validate+yup для валидации форм
      </li>
    </ul>

    <p class="text">
      Ветки и их особенности
    </p>
    <ul class="list">
      <li class="list__element">
        main - основная ветка, в ней лежит последняя версия.
      </li>
      <li class="list__element">
        <span>options-api&nbsp;<BasicSvgIcon
          name="check-icon"
          width="16"
          height="16"
        />&nbsp;&#8594; composition-api&nbsp;<BasicSvgIcon
          name="check-icon"
          width="16"
          height="16"
        />&nbsp;&#8594; typescript&nbsp;<BasicSvgIcon
          name="check-icon"
          width="16"
          height="16"
        />&nbsp;&#8594; firebase&nbsp;<BasicSvgIcon
          name="check-icon"
          width="16"
          height="16"
        />&nbsp;&#8594; forms&nbsp;<BasicSvgIcon
          name="check-icon"
          width="16"
          height="16"
        />&nbsp;&nbsp;&#8594;script setup&nbsp;<BasicSvgIcon
          name="check-icon"
          width="16"
          height="16"
        />&nbsp;названия говорят сами за себя</span>
      </li>
      <li class="list__element">
        improvement(WIP) - различные улучшения, оптимизации, редизайн.
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';

.list__element {
  span {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  svg {
    fill: $color-emerald;
  }
}

a {
  color: $color-azure;
  text-decoration: none;
  transition: color $trans-default;

  &:active,
  &:hover {
    color: $color-anakiwa;
  }
}

</style>
