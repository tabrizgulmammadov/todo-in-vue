<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <d-modal-confirmation
    :title="$t('tasks.delete.title')"
    :text="modalConfirmationText"
    :modal="modal"
    @submitModal="handleSubmitModal"
    @closeModal="handleCloseModal"
    :isSubmitting="isSubmitting"
  >
  </d-modal-confirmation>
</template>

<script>
export default {
  props: {
    modal: {
      type: Boolean,
      required: true,
    },
    item: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      isSubmitting: false,
    };
  },
  computed: {
    modalConfirmationText() {
      return this.$t("tasks.delete.text", {
        name: this.item.name,
      });
    },
  },
  methods: {
    handleCloseModal() {
      this.$emit("closeModal");
    },
    handleSubmitModal() {
      this.isSubmitting = true;
      window.API.deleteTask(this.item.id)
        .then(() => {
          this.$eventBus.$emit("notification", {
            type: "success",
            message: this.$t("tasks.delete.alert.deleted", {
              name: this.item.name,
            }),
          });
          this.$emit("submitModal");
          this.handleCloseModal();
        })
        .catch(() => {
          this.$eventBus.$emit("notification", {
            type: "error",
            message: this.$t("tasks.delete.alert.could-not-delete"),
          });
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },
  },
};
</script>
