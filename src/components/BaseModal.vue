<template>
  <v-row justify="center">
    <v-dialog
      value="modal"
      persistent
      :maxWidth="maxWidth"
      :retain-focus="false"
      eager
    >
      <div class="d-modal">
        <div class="d-modal__header">
          <div class="d-flex align-center">
            <slot name="prepend-title"></slot>
            <h3 class="text-h6">{{ title }}</h3>
          </div>
        </div>
        <div class="d-modal__body">
          <slot name="body"></slot>
        </div>
        <div class="d-modal__footer">
          <div class="d-flex align-center justify-end">
            <v-btn
              v-if="hasCancelButton"
              class="text-none body-2 font-weight-medium mr-3"
              depressed
              @click="closeModal"
            >
              {{ cancelButtonText }}
            </v-btn>
            <v-btn
              type="submit"
              color="success"
              class="text-none body-2 font-weight-medium"
              depressed
              :loading="isSubmitting"
              :disabled="isSubmitting || isDisabledSaveButton"
              @click="submitModal"
            >
              {{ saveButtonText }}
            </v-btn>
          </div>
        </div>
      </div>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    modal: Boolean,
    saveButtonText: {
      type: String,
      default: function () {
        return this.$t("defaults.modal-save");
      },
    },
    cancelButtonText: {
      type: String,
      default: function () {
        return this.$t("defaults.modal-cancel");
      },
    },
    title: String,
    isSubmitting: {
      type: Boolean,
      default: () => false,
    },
    hasCancelButton: {
      type: Boolean,
      default: () => true,
    },
    maxWidth: {
      type: Number,
      default: 600,
    },
    isDisabledSaveButton: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeModal() {
      this.$emit("closeModal");
    },
    submitModal() {
      this.$emit("submitModal");
    },
  },
  data() {
    return {};
  },
};
</script>
