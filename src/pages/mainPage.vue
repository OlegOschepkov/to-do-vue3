<template>
	<div class="page">
    <h1 class="title">Главная страница</h1>
    <p class="text">Список Задач позволяет создавать, редактировать и удалять задачи. Предусмотрена возможность фильтрации по названию и сортировки по дате или названию. Просроченные задачи автоматически закрепляются вверху списка</p>
    <p class="text">При написании проекта был применен ряд, как мне кажется, "лишних" приемов, или просто написан, но не применен, это вызвано тем что проект учебный и ставит перед собой цель изучение Vue3, а не написание коммерческого приложения. Также накладывает свой отпечаток отсутствие наставника или какого-то курса, который полностью ответил бы на все мои вопросы.</p>
    <p class="text">Проект подготовлен по материалам youtube(<a href="https://www.youtube.com/@UlbiTV">UlbiTV</a>, <a
      href="https://www.youtube.com/@NetNinja">NetNinja</a> и другие), stackoverflow, <a href="https://www.vuemastery.com">vueMastery</a>, документации и пр.</p>
    <p class="text">Какие технологии и плагины использовались</p>
    <ul class="list">
      <li class="list__element">Vue3</li>
      <li class="list__element">Vue CLI</li>
      <li class="list__element">Vue router</li>
      <li class="list__element">Vuex</li>
      <li class="list__element"><s>Pinia</s> решил не использовать</li>
      <li class="list__element"><i>Axios</i> до подключения firebase не применяется</li>
      <li class="list__element"><i>Services, Rest API</i> до подключения firebase не применяется</li>
      <li class="list__element">Seeders</li>
      <li class="list__element">Конфигурационные файлы (_config)</li>
      <li class="list__element">Options API/Composition API - в разных ветках</li>
      <li class="list__element">Typescript</li>
      <li class="list__element">Localstore/<i>Firebase пока не применял</i></li>
      <li class="list__element">SCSS</li>
      <li class="list__element">@vueform/multiselect для селекта</li>
      <li class="list__element">@vuepic/vue-datepicker для выбора даты</li>
    </ul>
    <p class="text">Ветки и их особенности</p>
    <ul class="list">
      <li class="list__element">main - основная ветка, в ней лежит последняя версия.</li>
      <li class="list__element"><span>options-api&nbsp;<svg-icon name="check-icon" width="16" height="16"/>&nbsp;&#8594; composition-api&nbsp;<svg-icon name="check-icon" width="16" height="16"/>&nbsp;&#8594; typescript&nbsp;<svg-icon name="check-icon" width="16" height="16"/>&nbsp;&#8594; firebase&nbsp;<svg-icon name="check-icon" width="16" height="16"/>&nbsp;&#8594; testing(TODO) &#8594; vite (TODO) &#8594; refactor (вероятно будет нужен) &#8594; GraphQL(если смогу настроить бекенд) названия говорят сами за себя</span></li>
      <li class="list__element">improvement(TODO) - различные улучшения, оптимизации, редизайн.</li>
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
    </ul>

  </div>
</template>

<script>
import svgIcon from '@/components/UI/svgIcon.vue';

export default {
  name: "main-page",

  components: {
    svgIcon
  }
}
</script>

<style scoped>
  .list__element span {
    display: flex;
    align-items: center;
  }
</style>
