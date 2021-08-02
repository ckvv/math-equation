<template>
  <div class="k-input">
    <div class="k-input-label">{{label}}</div>
    <input class="k-input-content" type="text" :placeholder="placeholder" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"/>
  </div>
</template>
<script>
export default {
  props: ['modelValue', 'label', 'placeholder'],
  emits: ['update:modelValue'],
}
</script>
<style lang="scss">
  .k-input {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .k-input-label {
      width: 4.5rem;
      text-align: left;
    }
    .k-input-content {
      height: 2rem;
      width: 16rem;
    }
  }
</style>