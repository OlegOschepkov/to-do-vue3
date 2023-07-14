# to-do-vue3

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


# Справка
## :smth = v-bind:smth
## v-on:click = @click
## @click, @input, @prevent и т.д.
##
## Двухстороннее связывание
```input v-bind="title"``` связываем инпут с title в модели
```input v-bind="title" @input="inputTitle"``` в функции inputTitle меняем значение title в модели
Можно менять напрямую ```input v-bind="title" @input="title=$event.target.value"``` $event - зарезервированное ключевое слово

## Props
В компоненте пишем

```vue
<p class="task-list__date">{{task.date}}</p>

<script>
export default {
  name: "my-task",

  props: {
    task: {
      type: Object,
      required: true
    }
  },
}
</script>
```
В родителе
```vue
<myTask
          v-for="task in tasks"
          :task="task" // или v-bind:task="task"
          :key="task.id"
          @deleteTask="deleteTask"
          @editTask="editTask"
      />
```
#### !Пропсы менять нельзя!

### :name="`${item.lvl} lvl`"
### @click="this.$router.push(`/edit-task/${id}`)"

### передача данных в потомка
```vue
<template>
  <children :id="id" :text="text"/>
</template>

<script >
export default {
  data() {
    return {
      id: 123123,
      text: "foo"
    }
  }
}
</script>
```

## V-Model
Создает двусторонее связывание между моделью и шаблоном. Отличие от v-bind в том, что бинд это односторонее связывание.  У v-model есть модификаторы .lazy (модель обновляется только после change ивента) / .trim/.number, их можно комбинировать  v-model.lazy.trim

```vue
<custom-text-input v-model="value" />

<!-- IS THE SAME AS -->

<custom-text-input
   :modelValue="value"
   @update:modelValue="value = $event"
/>


<!-- We can name v-model, but for our example leave unnamed. :name = prop name -->
<custom-text-input v-model:name="value" />
```

```vue
<!--Компонент-->
<!--CustomTextInput.vue-->

<script setup>
defineProps({
  modelValue: String
})

// defines what events our component emits
defineEmits(['update:modelValue'])
</script>

<template>
  <div>
    <label> First Name </label>
    <input
      type="text"
      placeholder="Input"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>


<!--Родитель-->
<!--Parent.vue-->

<script setup>
import { ref } from 'vue'
import CustomTextInput from './CustomTextInput.vue'

const firstName = ref('')

</script>

<template>
  <custom-text-input v-model="firstName" />
  Name: {{ firstName }}
</template>
```
v-model можно использовать на компоненте многократно v-model='firstName' v-model:lastName='lastName'
Можно создавать кастомные модификаторы

```vue
<script setup>
const props = defineProps({
  modelValue: String,
  lastName: String,
  lastNameModifiers: {
    default: () => ({}),
    'no-whitespace': () => {}
  },
})

// defines what events our component emits
const emit = defineEmits(['update:modelValue', 'update:lastName'])

// handles emitting our formatted event
const emitValue = (evt) => {
  let val = evt.target.value
  if (props.lastNameModifiers['no-whitespace']) {
    val = val.replace(/\s/g, '')
  }
  emit('update:lastName', val)
}
</script>

<template>
  <div>
    <label> First Name </label>
    <input
        type="text"
        placeholder="Input"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
    <label> Last Name </label>
    <input
        type="text"
        placeholder="Input"
        :value="lastName"
        @input="emitValue"
    />
  </div>
</template>
```
#### Если используется v-model:title, то в потомках используем не ModelValue а просто value

### Slot & slot-scope

[//]: # (Вместо этого )

[//]: # (```html)

[//]: # (<template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.name }}</strong> is written in<strong>  {{ option.language }}</strong></template>)

[//]: # (```)

[//]: # (надо писать )

[//]: # (```html)

[//]: # (<template #option="{ option }"><strong>{{ option.name }}</strong> is written in <strong>{{ option.language }}</strong></template>)

[//]: # (```)
Можно использовать несколько слотов
```html
<div class="card__header">
  <slot name="header"></slot>
</div>
<div class="card__footer">
  <slot name="footer"></slot>
</div>
```
вставляем так
```html
<div class="card">
  <template v-slot:header>
    bla-bla
  </template>
  <template v-slot:footer>
    bla-bla
  </template>
</div>
```


### Картинки и кеширование
```js
  data() {
    return {
      img: require('@/assets/images/foo/png')
    }
  }
```
Так картинка закешируется и не будет лишний раз грузить с сервера

### Computed and Watch
Watch - функция отрабатывает в тот момент когда какая то из моделей была изменена, она должна называться так же как и модель за которой она следит.
Computed - функция которая всегда что-то возвращает, и запоминает результат вычислений, она возвращает кешированный результат до тех пор, пока не измениться зависимость (this.todos)
```vue
<script >
watch: {
  someModel(newVal) {
  //  что=то джелаем с newVal
  }
}

<!-- более сложная версия -->
watch: {
  someModel: {
    handler(newVal) {
      <!--   handler непосредтсвенно та функция которая им следит   -->
    },
    <!-- deep позволяет непрерывно следать за моделью, даже если изменения еще не submit -->
    deep: true
  }
}

</script>
```

чтобы воспользоваться Computed надо указать в шаблоне не v-for="task in tasks" а v-for="task in имя-функции-computed"
```vue
<template>
  <ul class="tasks-list">
    <myTask
        v-for="task in sortedTasks"
        :task="task"
        :key="task.id"
        @deleteTask="deleteTask"
        @editTask="editTask"
    />
  </ul>
</template>

<script >
computed: {
  sortedTasks() {
    return [...this.tasks].sort((task1, task2) => {
      return task1[this.selectedSort]?.localeCompare(task2[this.selectedSort])
    })
  }
},
</script>
```


### Динамические классы
```vue
<div class="page" :class="{'current-page' : page === pageNumber}"></div>
```

### intersection API гуглить


### Ref
Позволяет получить узел из Vue
```vue
<template>
  <ul class="tasks-list">
    <myTask
        v-for="task in sortedTasks"
        :task="task"
        :key="task.id"
        fer="foo"
        @deleteTask="deleteTask"
        @editTask="editTask"
    />
  </ul>
</template>


<script >
export default {
  console.log(this.$refs.foo)
}
</script>

```


### Directives
Можно создавать свои директивы, по типу v-model, например v-focus. Это переиспользуемые функциии.
```vue
<my-input v-focus></my-input>
```

### Context

прочитать

### Seeders
Временные данные, файл JSON и свойство должны именоваться как оригинальные данные (tasks). Ими можно заменить моковую data в компонентах. Не забыть делать import в нужном компоненте. Хорошо разгружает код, делает чище.


### Aliases
В URL вместо ID лучше использовать aliases
