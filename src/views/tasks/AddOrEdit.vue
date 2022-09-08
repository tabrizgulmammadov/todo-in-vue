<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <d-modal
    :title="editMode ? $t('tasks.edit.title') : $t('tasks.create.title')"
    :modal="modal"
    @submitModal="handleSubmitModal"
    @closeModal="handleCloseModal"
    :isSubmitting="isSubmitting"
  >
    <template slot="body">
      <d-loading v-if="loading.page"></d-loading>
      <v-form
        v-else
        ref="form"
        v-model="isFormValid"
        lazy-validation
        @submit.prevent="handleSubmitModal"
      >
        <v-row>
          <v-col cols="12" class="mb-3">
            <v-text-field
              :label="$t('tasks.create.form.name')"
              hide-details="auto"
              filled
              type="text"
              v-model.trim="form.name"
              :rules="rules.name"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" class="mb-3">
            <v-combobox
              :label="$t('tasks.create.form.tags')"
              hide-details="auto"
              filled
              v-model="form.tags"
              :items="tags"
              multiple
              chips
              :rules="rules.tags"
            >
              <template v-slot:selection="data">
                <v-chip
                  :key="JSON.stringify(data.item)"
                  v-bind="data.attrs"
                  :input-value="data.selected"
                  :disabled="data.disabled"
                  @click:close="data.parent.selectItem(data.item)"
                >
                  <v-avatar
                    class="accent white--text"
                    left
                    v-text="data.item.slice(0, 1).toUpperCase()"
                  ></v-avatar>
                  {{ data.item }}
                </v-chip>
              </template>
            </v-combobox>
          </v-col>
          <v-col cols="12" sm="12" md="12" v-if="editMode">
            <v-checkbox
              :label="$t('tasks.create.form.status')"
              hide-details="auto"
              v-model="form.isCompleted"
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-form>
    </template>
  </d-modal>
</template>

<script>
const initialForm = {
  name: null,
  tags: null,
  isCompleted: false,
};

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
      form: { ...initialForm },
      loading: {
        page: false,
      },
      isFormValid: false,
      isSubmitting: false,
      rules: {
        name: [(v) => !!v || this.$t("defaults.rule.required")],
        tags: [
          (v) => {
            if (!v) {
              return this.$t("defaults.rule.required");
            }

            return true;
          },
        ],
      },
      editMode: false,
      tags: [],
    };
  },
  methods: {
    handleCloseModal() {
      this.$refs.form.reset();
      this.editMode = false;
      this.form = { ...initialForm };
      this.$emit("closeModal");
    },
    createItem() {
      this.isSubmitting = true;
      window.API.insertTask(this.form)
        .then(() => {
          this.$eventBus.$emit("notification", {
            type: "success",
            message: this.$t("tasks.create.alert.created", {
              name: this.form.name,
            }),
          });
          this.$emit("submitModal");
          this.handleCloseModal();
        })
        .catch(() => {
          this.$eventBus.$emit("notification", {
            type: "error",
            message: this.$t("tasks.create.alert.could-not-create"),
          });
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },
    editItem() {
      this.isSubmitting = true;
      window.API.editTask(this.form.id, this.form)
        .then(() => {
          this.$eventBus.$emit("notification", {
            type: "success",
            message: this.$t("tasks.edit.alert.updated", {
              name: this.form.name,
            }),
          });
          this.$emit("submitModal");
          this.handleCloseModal();
        })
        .catch(() => {
          this.$eventBus.$emit("notification", {
            type: "error",
            message: this.$t("tasks.edit.alert.could-not-update"),
          });
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },
    async handleSubmitModal() {
      if (this.$refs.form.validate() && this.isFormValid) {
        if (this.form.id) {
          await this.editItem();
        } else {
          await this.createItem();
        }
      }
    },
    fetchAllTags() {
      window.API.fetchAllTags()
        .then((response) => {
          this.tags = response;
        })
        .catch(() => this.showFetchRequestErrorMessage());
    },
    async getItem(item) {
      if (item && item.id > 0) {
        this.loading.page = true;
        this.editMode = true;
        await window.API.getTaskById(item.id)
          .then((response) => {
            this.form = response;
          })
          .catch(() => this.showFetchRequestErrorMessage())
          .finally(() => (this.loading.page = false));
      }
    },
  },
  async mounted() {
    await this.fetchAllTags();
    await this.getItem(this.item);
  },
};
</script>
