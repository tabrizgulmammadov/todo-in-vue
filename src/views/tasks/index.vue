<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <d-page
    :title="$t('tasks.page-heading')"
    :searchToggle="searchToggle"
    @closeSearch="handleCloseSearch"
    @submitSearch="handleSubmitSearch"
  >
    <template slot="actions">
      <v-btn
        depressed
        large
        class="mr-3 mb-1 mb-sm-0"
        :class="searchToggle ? 'primary--text' : ''"
        @click="searchToggle = !searchToggle"
      >
        <v-icon left> mdi-tune </v-icon>
        <span class="subtitle-2 text-none">{{
          $t("tasks.button.search-toggle")
        }}</span>
      </v-btn>
      <v-btn
        color="success"
        depressed
        large
        @click="handleOpenAddOrEditModal()"
        class="mb-1 mb-sm-0"
      >
        <v-icon left> mdi-plus </v-icon>
        <span class="subtitle-2 text-none">{{
          $t("tasks.button.create-item")
        }}</span>
      </v-btn>
    </template>
    <template slot="search">
      <Search :tags="tags"></Search>
    </template>
    <template slot="content">
      <List
        @editItem="handleOpenAddOrEditModal"
        @deleteItem="handleOpenDeleteModal"
      ></List>
      <AddOrEdit
        v-if="openAddOrEditModal"
        :modal="openAddOrEditModal"
        :item="selectedItem"
        @closeModal="handleCloseAddOrEditModal"
        @submitModal="handleSubmitAddOrEditModal"
      ></AddOrEdit>
      <Delete
        v-if="openDeleteModal"
        :modal="openDeleteModal"
        :item="selectedItem"
        @closeModal="handleCloseDeleteModal"
        @submitModal="handleSubmitDeleteModal"
      ></Delete>
    </template>
  </d-page>
</template>

<script>
import List from "./List.vue";
import Search from "./Search.vue";
import AddOrEdit from "./AddOrEdit.vue";
import Delete from "./Delete.vue";

export default {
  components: {
    List,
    Search,
    AddOrEdit,
    Delete,
  },
  data() {
    return {
      searchToggle: false,
      openAddOrEditModal: false,
      openDeleteModal: false,
      selectedItem: null,
      tags: [],
    };
  },
  methods: {
    handleCloseSearch() {
      this.$eventBus.$emit("fetchTasks", true);
    },
    handleSubmitSearch() {
      this.$eventBus.$emit("fetchTasks");
    },
    handleOpenAddOrEditModal(item = null) {
      this.openAddOrEditModal = true;
      this.selectedItem = item;
    },
    handleCloseAddOrEditModal() {
      this.openAddOrEditModal = false;
    },
    async handleSubmitAddOrEditModal() {
      await this.fetchAllTags();
      this.$eventBus.$emit("fetchTasks");
    },
    handleOpenDeleteModal(item = null) {
      this.openDeleteModal = true;
      this.selectedItem = item;
    },
    handleCloseDeleteModal() {
      this.openDeleteModal = false;
    },
    handleSubmitDeleteModal() {
      this.$eventBus.$emit("fetchTasks");
    },
    fetchAllTags() {
      window.API.fetchAllTags()
        .then((response) => {
          this.tags = response;
        })
        .catch(() => this.showFetchRequestErrorMessage());
    },
  },
  async mounted() {
    await this.fetchAllTags();
  },
};
</script>
