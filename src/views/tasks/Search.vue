<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-row>
    <v-col cols="12" sm="6" md="4" class="mb-3">
      <v-text-field
        :label="$t('tasks.search.form.name')"
        hide-details="auto"
        filled
        type="text"
        v-model="searchParams.name"
        clearable
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" md="4" class="mb-3">
      <v-combobox
        :label="$t('tasks.create.form.tags')"
        hide-details="auto"
        filled
        v-model="searchParams.tag"
        :items="tags"
        chips
        clearable
      >
      </v-combobox>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    tags: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    searchParams: {
      handler() {
        this.setSearchParams(this.searchParams);
      },
      immediate: true,
    },
  },
  computed: {
    ...mapGetters({
      searchParams: "SearchParams/getSearchParams",
    }),
  },
  methods: {
    ...mapActions({
      setSearchParams: "SearchParams/setSearchParams",
    }),
  },
};
</script>
