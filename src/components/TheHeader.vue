<template>
  <div>
    <v-app-bar outlined app flat color="#FAFAFA" height="56">
      <v-row align="center">
        <v-col cols="12">
          <v-app-bar-nav-icon
            @click="setNavigationDrawer()"
          ></v-app-bar-nav-icon>
        </v-col>
      </v-row>

      <v-toolbar-title></v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    drawer: null,
  }),
  methods: {
    ...mapActions({
      setNavigationDrawer: "Common/setNavigationDrawer",
    }),
  },
};
</script>

<style lang="scss">
.theme--light.v-app-bar.v-toolbar.v-sheet {
  border-bottom: 1px solid var(--v-gray-lighten2) !important;
}
</style>
