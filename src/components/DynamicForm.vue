<script setup lang="ts">
import BasicButton from '@/components/UI/BasicButton.vue';
import LoadingIndicator from '@/components/UI/LoadingIndicator.vue';
import { computed, defineEmits, defineProps } from 'vue';
import { Form, Field, ErrorMessage, configure } from 'vee-validate';
import FormField from '@/types/formField';
import { useStore } from 'vuex';

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

const store = useStore();
const isLoading = computed((): boolean => store.state.authModule.isLoading);

const onSubmit = (values: object) => {
  emit('submitHandler', values);
}

const onInput = (e) => {
  const target = e.target as HTMLInputElement;
  const parent = target.closest('.input-element') as HTMLElement;
  target.value ? parent?.classList.add('not-empty') : parent?.classList.remove('not-empty')
}
</script>

<template>
  <Form
    class="form"
    :validation-schema="props.validationSchema"
    @submit="onSubmit"
  >
    <transition name="fade">
      <LoadingIndicator
        v-if="isLoading"
      />
    </transition>

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
@import '@/assets/scss/variables.scss';

.form {
  position: relative;

  .lds-ellipsis {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;

    &__background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba($color-default-white, 0.5);
      backdrop-filter: blur(2px);
    }
  }
}
</style>
