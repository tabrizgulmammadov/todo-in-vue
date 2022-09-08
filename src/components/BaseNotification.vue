<template>
  <div v-if="notifications.length > 0" class="todo-tasks-notifications">
    <v-snackbar
      v-for="(notification, index) in notifications.filter(
        (item) => item.status
      )"
      :key="notification.message + Math.random()"
      v-model="notification.status"
      :timeout="notification.duration"
      :value="true"
      bottom
      :color="notification.type"
      right
      multi-line
      absolute
      text
      outlined
      max-width="380"
      :style="`bottom: ${index * 88 + 8}px; top: auto`"
    >
      <div class="d-flex align-start">
        <v-icon
          :color="notification.type"
          class="mr-3"
          v-html="getIcon(notification.type)"
        ></v-icon>
        <span class="body-1">{{ notification.message }}</span>
      </div>
      <template v-slot:action="{ attrs }">
        <v-icon
          :color="notification.type"
          v-bind="attrs"
          @click="notification.status = false"
          >mdi-close</v-icon
        >
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notifications: [],
    };
  },
  methods: {
    newNotification({ type, message, duration = 4000, ...rest }) {
      this.notifications.push({
        status: true,
        duration,
        type,
        message,
        ...rest,
      });
    },
    getIcon(type) {
      switch (type) {
        case "success":
          return "mdi-checkbox-marked-circle";
        case "info":
          return "mdi-information";
        case "warning":
          return "mdi-alert-outline";
        case "error":
          return "mdi-alert-octagon-outline";
        default:
          return "";
      }
    },
  },
  created() {
    this.$eventBus.$on("notification", this.newNotification);
  },
  beforeDestroy() {
    this.$eventBus.$off("notification", this.newNotification);
  },
};
</script>

<style>
.todo-tasks-notifications {
  z-index: 10000;
}
</style>
