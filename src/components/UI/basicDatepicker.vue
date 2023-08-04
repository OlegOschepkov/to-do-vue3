<template>
  <div class="datepicker-element">
    <p>
      {{ label }}
    </p>
    <VueDatePicker :model-value="date" @update:model-value="updateDate"></VueDatePicker>
  </div>
</template>

<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { defineComponent, ref } from 'vue';

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
  },

  setup(props, {emit}) {
    const date = ref<Date>();

    date.value = props.modelValue as Date ? props.modelValue : new Date(Date.now());

    const updateDate = (e: Date) => {
      date.value = e;
      emit('update:modelValue', e);
    }

    return {
      date,
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
