<template>
  <section class="pt-8 pt-md-16">
    <v-row align="center" justify="center">
      <v-col cols="12" align="center" justify="center" class="mb-2">
        <img src="@/assets/images/empty-page.svg" alt="Docuport Empty page" />
      </v-col>
      <v-col cols="12" md="4" align="center" justify="center" class="mb-2">
        <p class="mb-0 subtitle-1">
          {{ text }}
        </p>
      </v-col>
      <v-col
        cols="12"
        align="center"
        justify="center"
        class="mb-2"
        v-if="hasCreateButton"
      >
        <v-btn text depressed large color="blue" @click="clickAction">
          <v-icon left> mdi-plus </v-icon>
          <span class="subtitle-2 text-none">{{ createButtonText }}</span>
        </v-btn>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  props: {
    text: String,
    createButtonText: String,
    createButtonPermission: {
      type: String,
      default: "*",
    },
    hasCreateButton: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    clickAction() {
      this.$emit("actionClick");
    },
  },
};
</script>
