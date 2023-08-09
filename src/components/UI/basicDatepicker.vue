<template>
  <div class="datepicker-element">
    <p>
      {{ label }}
    </p>
    <VueDatePicker :model-value="value" @update:model-value="updateDate" :name="name" :id="id"></VueDatePicker>
    <span
      class="error"
      id="`${id}-error`"
      aria-live="assertive"
      role="alert"
    >
        {{ errorMessage }}
      </span>
  </div>
</template>

<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { defineComponent } from 'vue';
import {useField} from 'vee-validate';

export default defineComponent({
  name: 'basicDatepicker',

  components: {
    VueDatePicker
  },

  props: {
    modelValue: {
      type: Date,
      default: new Date(Date.now()),
    },
    id: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    }
  },

  setup(props) {
    const { value, errors, errorMessage, handleChange } = useField(props.name, {
      initialValue: props.modelValue,
      valueProp: props.modelValue
    });

    const updateDate = (e: Date) => {
      handleChange(e, true)
    }

    return {
      errors, errorMessage,
      value,
      updateDate
    }
  }
});

  // data() {
  //   return {
  //     date: '',
  //   };
  // },
  //
  // mounted() {
  //   this.setInitialDate()
  // },
  //
  // methods: {
  //   setInitialDate() {
  //     this.date = this.modelValue ? this.modelValue : Date.now();
  //   },
  //
  //   updateDate(e) {
  //     this.date = e;
  //     this.$emit('update:modelValue', e.getTime());
  //   },
  // }
</script>

<style lang="scss">
@import '@/assets/scss/variables.scss';

select {
  margin-left: 15px;
}

.dp__input {
  border-radius: 8px;
  border: 2px solid $color-heather;
  transition: border-color $trans-default;

  &:hover {
    border-color: $color-juniper;
  }
}
</style>
