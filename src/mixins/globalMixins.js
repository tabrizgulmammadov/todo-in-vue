export default {
  methods: {
    isEqualObjects(source, target) {
      const sourceKeys = Object.keys(source);
      const targetKeys = Object.keys(target);

      if (sourceKeys.length !== targetKeys.length) {
        return false;
      }

      for (let key of sourceKeys) {
        if (source[key] !== target[key]) {
          return false;
        }
      }

      return true;
    },
    isObjectEmpty(obj) {
      if (!obj) return true;
      return (
        Object.keys(obj).filter((key) => !!obj[key]).length === 0 &&
        obj.constructor === Object
      );
    },
    showFetchRequestErrorMessage() {
      this.$eventBus.$emit("notification", {
        type: "error",
        message: this.$t("defaults.alert.could-not-fetch"),
      });
    },
    fillEmptyData(val) {
      return val ? val : "—";
    },
  },
};
