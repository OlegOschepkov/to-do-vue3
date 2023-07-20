<template>
	<div class="page">
    <h1 class="title">Главная страница</h1>
    <p class="text">Предполагается что задачи не шаряться между пользователями. Ряд приемов применен, или просто написан, но не примернен, "чтобы было", это же учебный проект и ставит перед собой цель изучение Vue3.</p>
    <p class="text">Какие технологии и плагины использовались</p>
    <ul class="list">
      <li class="list__element">Vue3</li>
      <li class="list__element">Vue CLI</li>
      <li class="list__element">Vue router</li>
      <li class="list__element">Vuex</li>
      <li class="list__element">Pinia</li>
      <li class="list__element">Axios</li>
      <li class="list__element">Services, Rest API</li>
      <li class="list__element">Seeders</li>
      <li class="list__element">Конфигурационные файлы (_config)</li>
      <li class="list__element">Options API/Composition API</li>
      <li class="list__element">Typescript</li>
      <li class="list__element">Localstore/Firebase</li>
      <li class="list__element">SCSS</li>
      <li class="list__element">@vueform/multiselect для селекта</li>
      <li class="list__element">@vuepic/vue-datepicker для выбора даты</li>
    </ul>
    <p class="text">Ветки и их особенности</p>
    <ul class="list">
      <li class="list__element">main - основная ветка, в ней лежит последняя версия.</li>
      <li class="list__element">options-api -> composition-api -> typescript -> firebase -> tests названия говорят сами за себя</li>
      <li class="list__element">improvement - различные улучшения, оптимизации, редизайн.</li>
    </ul>
    <p class="text">Что было реализовано в приложении</p>
    <ul class="list">
      <li class="list__element">Несколько страниц + динамическая страница edit-task</li>
      <li class="list__element">Динамическая перерисовка</li>
      <li class="list__element">Динамический navbar</li>
      <li class="list__element">Встроенная анимация vue</li>
      <li class="list__element">Обработка несуществующих роутов</li>
      <li class="list__element">Динамические роуты</li>
      <li class="list__element">Состояние приложения сохраняется при перезагрузке, используется LocalStorage/Firebase</li>
      <li class="list__element">Динамическое состояние формы (для edit-task)</li>
      <li class="list__element"></li>
      <li class="list__element"></li>
      <li class="list__element"></li>
      <li class="list__element"></li>
      <li class="list__element"></li>
      <li class="list__element"></li>
      <li class="list__element"></li>
    </ul>

<!--     launch server - serve -s dist-->

  </div>
</template>

<script>
export default {
  name: "main-page"
}
</script>

<style scoped>

</style>
