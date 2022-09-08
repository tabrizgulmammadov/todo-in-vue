<template>
  <div class="d-flex align-center justify-center" :class="`pa-${padding}`">
    <v-progress-circular
      :size="size"
      indeterminate
      :width="2"
      color="primary"
    ></v-progress-circular>
  </div>
</template>
<script>
export default {
  props: {
    size: {
      type: Number || String,
      default: 30,
    },
    padding: {
      type: Number || String,
      default: 1,
    },
  },
};
</script>
