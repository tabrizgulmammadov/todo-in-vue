<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <v-data-table
      :page="table.page"
      :headers="headers"
      :items="table.items"
      :items-per-page="table.itemsPerPage"
      :loading="loading.table"
      :server-items-length="table.totalCount"
      :footer-props="{
        'items-per-page-options': table.itemsPerPageOptions,
      }"
      :options.sync="table.options"
      v-if="table.items.length > 0 || loading.table"
      class="d-table"
      @update:options="optionsUpdated"
    >
      <template v-slot:[`item.name`]="{ item }">
        <v-tooltip right color="primary">
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              :color="item.isCompleted ? 'primary' : 'error'"
              size="22"
              dark
              v-bind="attrs"
              v-on="on"
            >
              mdi-circle
            </v-icon>
          </template>
          <span>{{
            item.isCompleted
              ? $t("tasks.status.completed")
              : $t("tasks.status.incompleted")
          }}</span>
        </v-tooltip>

        <span class="ml-4">{{ item.name }}</span>
      </template>
      <template v-slot:[`item.tags`]="{ item }">
        <template v-for="(tag, index) in item.tags">
          <v-chip small :key="index" class="ma-1" color="primary" outlined>
            {{ tag }}
          </v-chip>
        </template>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex align-center justify-end">
          <v-tooltip top color="gray darken-2">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="gray darken-2"
                icon
                small
                @click="deleteItem(item)"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon size="18"> mdi-delete </v-icon>
              </v-btn>
            </template>
            <span>{{ $t("tasks.list.table.actions.delete") }}</span>
          </v-tooltip>

          <v-tooltip top color="gray darken-2">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="gray darken-2"
                icon
                small
                @click="addOrEditItem(item)"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon size="18"> mdi-pencil </v-icon>
              </v-btn>
            </template>
            <span>{{ $t("tasks.list.table.actions.edit") }}</span>
          </v-tooltip>
        </div>
      </template>
    </v-data-table>
    <d-page-empty
      @actionClick="addOrEditItem()"
      :text="$t('tasks.list.empty-page')"
      :createButtonText="$t('tasks.button.create-item')"
      v-if="!table.isSearched && table.totalCount == 0 && !loading.table"
    >
    </d-page-empty>
    <d-no-result
      v-if="table.isSearched && table.totalCount == 0 && !loading.table"
    ></d-no-result>
  </div>
</template>

<script>
import tableMixins from "@/mixins/tableMixins";
import { mapActions, mapGetters } from "vuex";

export default {
  mixins: [tableMixins],
  data(vm) {
    return {
      headers: [
        {
          text: vm.$t("tasks.list.table.headers.name"),
          value: "name",
          sortable: false,
        },
        {
          text: vm.$t("tasks.list.table.headers.tags"),
          value: "tags",
          sortable: false,
        },
        { text: "", value: "actions", sortable: false, align: "end" },
      ],
      initialSearchParams: {},
    };
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
    initSearchParams() {
      this.setSearchParams({ ...this.initialSearchParams });
    },
    handleFetchItems(isSearchCleared = false) {
      if (isSearchCleared) this.initSearchParams();

      this.table.options.page = 1;
      this.table.page = 1;
      this.fetchItems();
    },
    addOrEditItem(item = null) {
      this.$emit("editItem", item);
    },
    deleteItem(item = null) {
      this.$emit("deleteItem", item);
    },
    fetchItems() {
      this.loading.table = true;
      this.table.isSearched = !this.isObjectEmpty(this.searchParams);
      window.API.fetchTasks({
        limit: this.table.itemsPerPage,
        offset: (this.table.page - 1) * this.table.itemsPerPage,
        ...this.searchParams,
      })
        .then((response) => {
          this.table.items = response.items;
          this.table.totalCount = response.totalCount;

          if (
            response.totalCount <=
            (this.table.options.page - 1) * this.table.itemsPerPage
          ) {
            this.table.options.page = 1;
          }
        })
        .catch(() => {
          this.showFetchRequestErrorMessage();
        })
        .finally(() => {
          this.loading.table = false;
        });
    },
  },
  created() {
    this.$eventBus.$on("fetchTasks", this.handleFetchItems);
  },
  mounted() {
    this.initSearchParams();
    this.fetchItems();
  },
  beforeDestroy() {
    this.$eventBus.$off("fetchTasks", this.handleFetchItems);
  },
};
</script>
