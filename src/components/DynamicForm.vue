<script setup lang="ts">
import BasicButton from '@/components/UI/BasicButton.vue';
import { defineEmits, defineProps } from 'vue';
import { Form, Field, ErrorMessage, configure } from 'vee-validate';
import FormField from '@/types/formField';

const props = defineProps<{
  schema: FormField[],
  validationSchema: object,
  btnTitle: string
}>();

configure({
  validateOnInput: true,
});

const emit = defineEmits<{
  (event: 'submitHandler', values: object): void;
}>();

const onSubmit = (values: object) => {
  emit('submitHandler', values);
}

const onInput = (e) => {
  const target = e.target;
  const parent = target.closest('.input-element');
  target.value ? parent?.classList.add('not-empty') : parent?.classList.remove('not-empty')
}
</script>

<template>
  <Form
    class="form"
    :validation-schema="props.validationSchema"
    @submit="onSubmit"
  >
    <div
      v-for="{ name, label, children, as, id, ...attrs } in props.schema"
      :key="name"
      class="input-element"
    >
      <label
        :for="name"
      >
        <Field
          :id="name"
          :as="as"
          :name="name"
          v-bind="attrs"
          @input="onInput"
        >
          <template
            v-if="children && children.length"
          >
            <component
              :is="tag"
              v-for="({ tag, text, ...childAttrs }, idx) in children"
              :key="idx"
              v-bind="childAttrs"
            >
              {{ text }}
            </component>
          </template>
        </Field>
        <span
          v-if="label"
          class="input-element__label"
        >
          {{ label }}
        </span>
        <ErrorMessage
          :id="`${id}-error`"
          class="error"
          :name="name"
          aria-live="assertive"
          role="alert"
        />
      </label>
    </div>
    <BasicButton>
      {{ props.btnTitle }}
    </BasicButton>
  </Form>
</template>

<style lang="scss">
</style>
