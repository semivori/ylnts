<template>
  <div class="row form-group" :class="{ required: required }">
    <label class="col-form-label col-sm-2">{{ label }}</label>
    <div class="col-sm-6">
      <input
        :value="value"
        @input="$emit('input', $event.target.value)"
        :type="type"
        :required="required"
        class="form-control"
      />
      <div v-if="error" class="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormField",
  props: {
    value: [String, Number],
    label: String,
    required: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: () => "text",
    },
    error: String,
  },
  data() {
    return {
      content: this.value,
    };
  },
};
</script>

<style scoped>
.form-group.required > label:after {
  content: "*";
  color: red;
  position: relative;
  top: 0;
  right: -5px;
}

.error {
  color: red;
}
</style>