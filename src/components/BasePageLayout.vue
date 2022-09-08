<template>
  <section class="d-page" :class="{ 'details-opened': openDetails }">
    <div class="d-page__header">
      <v-row align="center">
        <v-col cols="12" sm="4">
          <div class="d-flex align-center">
            <slot name="heading"></slot>
            <h1 class="text-h6 font-weight-bold">{{ title }}</h1>
          </div>
        </v-col>
        <v-col cols="12" sm="8" class="mt-3 mt-sm-0">
          <div
            class="d-flex align-center justify-start justify-sm-end flex-wrap"
          >
            <slot name="actions"></slot>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="d-page__main">
      <v-fade-transition mode="in-out">
        <section class="d-page__search" v-if="searchToggle">
          <v-form
            ref="form"
            v-model="isFormValid"
            lazy-validation
            @submit.prevent="submitSearch"
          >
            <div class="d-page__search--body">
              <slot name="search"></slot>
            </div>
            <div class="d-page__search--footer mt-2">
              <v-row>
                <v-col cols="12">
                  <div class="d-flex align-center justify-end">
                    <v-btn
                      class="text-none body-2 font-weight-medium mr-3"
                      depressed
                      @click="closeSearch"
                      :loading="loading"
                    >
                      {{ $t("defaults.search-clear-button") }}
                    </v-btn>
                    <v-btn
                      type="submit"
                      color="primary"
                      class="text-none body-2 font-weight-medium"
                      depressed
                      :loading="loading"
                    >
                      {{ $t("defaults.search-submit-button") }}
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </div>
          </v-form>
        </section>
      </v-fade-transition>
      <div class="d-page__content" :class="contentClass">
        <slot name="content"></slot>
        <v-navigation-drawer
          v-if="openDetails"
          @input="handleDetails"
          :value="openDetails"
          fixed
          right
          width="280"
          :style="'top: 56px'"
        >
          <div class="d-details--header">
            <div
              class="d-flex align-center justify-space-between px-2 py-3 border-bottom"
            >
              <span class="subtitle-2">{{ detailsTitle }}</span>
              <v-btn color="gray darken-2" icon small @click="closeDetails">
                <v-icon size="18"> mdi-close</v-icon>
              </v-btn>
            </div>
          </div>
          <div class="d-details--body">
            <slot name="details"></slot>
          </div>
        </v-navigation-drawer>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isFormValid: true,
      loading: false,
    };
  },
  props: {
    title: String,
    searchToggle: {
      type: Boolean,
      default: false,
    },
    openDetails: {
      type: Boolean,
      default: false,
    },
    detailsTitle: {
      type: String,
      default: function () {
        return this.$t("defaults.details-heading");
      },
    },
    contentClass: {
      type: String,
    },
  },
  methods: {
    handleDetails(val) {
      if (!val) this.closeDetails();
    },
    closeSearch() {
      this.$emit("closeSearch");
    },
    submitSearch() {
      const isFormValid = this.$refs.form.validate();
      if (isFormValid) {
        this.$emit("submitSearch");
      }
    },
    closeDetails() {
      this.$emit("closeDetails");
    },
    searchStarted() {
      this.loading = true;
    },
    searchFinished() {
      this.loading = false;
    },
  },
  created() {
    this.$eventBus.$on("searchStarted", this.searchStarted);
    this.$eventBus.$on("searchFinished", this.searchFinished);
  },
  beforeDestroy() {
    this.$eventBus.$off("searchStarted", this.searchStarted);
    this.$eventBus.$off("searchFinished", this.searchFinished);
  },
};
</script>

<style lang="scss">
.d-page {
  &.details-opened {
    width: calc(100% - 280px);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 12px 16px;
    border-bottom: 1px solid var(--v-gray-lighten2) !important;
    min-height: 68px;
  }
  &__search {
    background: var(--v-gray-lighten5);
    padding: 16px;
    border-bottom: 1px solid var(--v-gray-lighten2);
  }

  &__content {
    overflow: auto;
    padding: 16px;
  }

  &__details {
    top: 56px;
  }
}
</style>
