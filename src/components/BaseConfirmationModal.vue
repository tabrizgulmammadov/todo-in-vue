<template>
  <v-row justify="center">
    <v-dialog value="modal" persistent max-width="370px">
      <div class="d-modal">
        <div class="d-modal__header">
          <h3 class="text-h6">{{ title }}</h3>
        </div>
        <div class="d-modal__body">
          <v-row>
            <v-col cols="12" align="center" class="mb-2">
              <img
                src="@/assets/images/modal-delete.svg"
                alt="Docuport confirmation modal"
              />
            </v-col>
            <v-col cols="12">
              <p class="body-1 mb-0 text-center">{{ text }}</p>
            </v-col>
          </v-row>
        </div>
        <div class="d-modal__footer">
          <div class="d-flex align-center justify-end">
            <v-btn
              class="text-none body-2 font-weight-medium mr-3"
              depressed
              @click="closeModal"
            >
              {{ cancelButtonText }}
            </v-btn>
            <v-btn
              type="submit"
              class="text-none body-2 font-weight-medium"
              depressed
              @click="submitModal"
              :loading="isSubmitting"
              :disabled="isSubmitting"
              :color="submitButtonColor"
            >
              {{ submitButtonText }}
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
    submitButtonText: {
      type: String,
      default: function () {
        return this.$t("defaults.modal-remove");
      },
    },
    cancelButtonText: {
      type: String,
      default: function () {
        return this.$t("defaults.modal-cancel");
      },
    },
    title: String,
    text: String,
    isSubmitting: {
      type: Boolean,
      default: false,
    },
    submitButtonColor: {
      type: String,
      default: "error",
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
