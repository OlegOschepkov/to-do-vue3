<script setup lang="ts">
import BasicSvgIcon from '@/components/UI/BasicSvgIcon.vue';
</script>

<template>
  <div class="container container--animation">
    <h1 class="title">Главная страница</h1>
    <p class="text">Что было реализовано в приложении</p>
    <ul class="list">
      <li class="list__element">Список Задач позволяет создавать, редактировать и удалять задачи</li>
      <li class="list__element">У задачи надо указать время, описание и важность</li>
      <li class="list__element">Предусмотрена возможность фильтрации по названию и сортировки по дате или названию</li>
      <li class="list__element">росроченные задачи автоматически закрепляются вверху списка и получают красную тень</li>
      <li class="list__element">Несколько страниц + динамическая страница edit-task</li>
      <li class="list__element">Встроенная анимация vue</li>
      <li class="list__element">Динамические роуты и обработка несуществующих роутов</li>
      <li class="list__element">Состояние приложения сохраняется при перезагрузке, используется Firebase</li>
      <li class="list__element">Динамическое состояние формы (для edit-task)</li>
    </ul>

    <p class="text">Проект подготовлен по материалам youtube(<a href="https://www.youtube.com/@UlbiTV">UlbiTV</a>, <a
      href="https://www.youtube.com/@NetNinja">NetNinja</a> и другие), stackoverflow, <a href="https://medium.com">https://medium.com</a>, <a href="https://www.vuemastery.com">vueMastery</a>, документации и пр.</p>

    <p class="text">Какие технологии и плагины использовались</p>
    <ul class="list">
      <li class="list__element">Vue3</li>
      <li class="list__element">Vue CLI</li>
      <li class="list__element">Vue router</li>
      <li class="list__element">Vuex</li>
      <li class="list__element"><s>Pinia</s> решил не использовать</li>
      <li class="list__element"><s>Axios</s> так как используется firebase, то axios не применяется</li>
      <li class="list__element">Seeders</li>
      <li class="list__element">Конфигурационные файлы (_config)</li>
      <li class="list__element">Options API, с последующим рефкатором в пользу Composition API и script setup</li>
      <li class="list__element">Typescript</li>
      <li class="list__element"><s>Localstore</s>&nbsp;&#8594;&nbsp;Firebase</li>
      <li class="list__element">SCSS</li>
      <li class="list__element">@vueform/multiselect для селекта</li>
      <li class="list__element">@vuepic/vue-datepicker для выбора даты</li>
      <li class="list__element">vee-validate+yup для валидации формы создания задачи</li>
    </ul>

    <p class="text">Ветки и их особенности</p>
    <ul class="list">
      <li class="list__element">main - основная ветка, в ней лежит последняя версия.</li>
      <li class="list__element"><span>options-api&nbsp;<BasicSvgIcon name="check-icon" width="16" height="16"/>&nbsp;&#8594; composition-api&nbsp;<BasicSvgIcon name="check-icon" width="16" height="16"/>&nbsp;&#8594; typescript&nbsp;<BasicSvgIcon name="check-icon" width="16" height="16"/>&nbsp;&#8594; firebase&nbsp;<BasicSvgIcon name="check-icon" width="16" height="16"/>&nbsp;&#8594; forms&nbsp;<BasicSvgIcon name="check-icon" width="16" height="16"/>&nbsp;названия говорят сами за себя</span></li>
      <li class="list__element">improvement(TODO) - различные улучшения, оптимизации, редизайн.</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables.scss';

.list__element {
  span {
    display: flex;
    align-items: center;
  }

  svg {
    fill: $color-emerald;
  }
}
</style>
