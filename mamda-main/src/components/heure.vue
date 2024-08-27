<template>
  <div class="time-input">
    <label for="time">{{ label }}:</label>
    <input
      id="time"
      type="time"
      :value="time"
      @input="$emit('update:time', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'TimeInput',
  props: {
    label: {
      type: String,
      required: true
    },
    time: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped>
.time-input {
  align-items: center;
  display: flex;
  flex-direction: column;
  width:100%;
  margin-bottom: 0em;
}
.time-input label {
  margin-bottom: 1em;
  font-weight: bold;
}
</style>
