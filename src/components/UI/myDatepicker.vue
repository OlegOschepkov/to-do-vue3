<template>
  <div class="datepicker-element">
    <p>
      {{ label }}
    </p>
    <VueDatePicker :model-value="date" @update:model-value="updateDate"></VueDatePicker>
  </div>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  name: 'my-datepicker',

  components: {
    VueDatePicker
  },

  props: {
    modelValue: {
      type: [String, Number],
      default: '',
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

  data() {
    return {
      date: '',
    };
  },

  mounted() {
    this.setInitialDate()
  },

  methods: {
    setInitialDate() {
      this.date = this.modelValue ? this.modelValue : Date.now();
    },

    updateDate(e) {
      this.date = e;
      this.$emit('update:modelValue', e.getTime());
    },
  }
}
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
