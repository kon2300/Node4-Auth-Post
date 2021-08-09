<template>
  <textarea
    class="textarea"
    :type="type"
    :name="name"
    :placeholder="placeholder"
    @input="$emit('update:modelValue', $event.target.value)"
    @change="$emit('change', $event.target.value)"
  />
</template>

<script>
export default {
  name: 'BaseFormTextarea',
  props: {
    type: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
  },
  emits: ['update:modelValue', 'change'],
}
</script>

<style></style>
