export default {
  data() {
    return {
      loading: {
        table: false,
      },
      table: {
        items: [],
        totalCount: 0,
        page: 1,
        itemsPerPage: 10,
        options: {},
        isSearched: false,
        itemsPerPageOptions: [5, 10, 15, 50],
      },
    };
  },
  watch: {
    "loading.table": {
      handler(val) {
        if (val) this.$eventBus.$emit("searchStarted");
        else this.$eventBus.$emit("searchFinished");
      },
    },
  },
  methods: {
    optionsUpdated(value) {
      const { page, itemsPerPage } = value;
      if (page > 0 || itemsPerPage > 0) {
        this.handleOptionsChanged({
          page: page,
          itemsPerPage: itemsPerPage,
        });
        this.$emit("getTable", this.table);
      }
    },
    handleOptionsChanged(item) {
      if (
        this.table.page != item.page ||
        this.table.itemsPerPage != item.itemsPerPage
      ) {
        this.table.page = item.page;
        this.table.itemsPerPage = item.itemsPerPage;
        this.fetchItems();
      }
    },
  },
};
