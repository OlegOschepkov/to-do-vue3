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

const onSubmit = (values) => {
  emit('submitHandler', values);
}
</script>

<template>
  <Form
    class="form"
    :validation-schema="validationSchema"
    @submit="onSubmit"
  >
    <div
      class="input-element"
      v-for="{ name, label, children, as, id, ...attrs } in schema"
      :key="name"
    >
      <label
        :for="name"
      >
        <Field
          :as="as"
          :id="name"
          :name="name"
          v-bind="attrs"
        >
          <template
            v-if="children && children.length"
          >
            <component
              v-for="({ tag, text, ...childAttrs }, idx) in children"
              :key="idx"
              :is="tag"
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
          class="error"
          :name="name"
          :id="`${id}-error`"
          aria-live="assertive"
          role="alert"
        />
      </label>
    </div>

    <BasicButton>
      {{ btnTitle }}
    </BasicButton>
  </Form>
</template>

<style lang="scss">
</style>
