<template>
  <v-navigation-drawer
    v-model="navigationDrawer"
    app
    color="#FAFAFA"
    width="296"
  >
    <div class="app-layout--logo pa-4">
      <router-link to="/">
        <img src="@/assets/images/logo.png" alt="Todo" />
      </router-link>
    </div>
    <div class="menu mr-2">
      <v-list shaped dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <template v-for="(item, i) in items">
            <v-list-group
              :value="checkSubmenuRouteChange(item)"
              :key="i"
              v-if="item.children && item.children.length > 0"
              class="py-x-2"
            >
              <template v-slot:activator>
                <v-list-item-icon class="mr-4">
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    <span class="body-1" v-text="item.text"></span>
                  </v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item
                class="pl-14"
                v-for="(subitem, i) in item.children"
                :key="i"
                link
                :to="subitem.link"
              >
                <v-list-item-title>
                  <span class="body-1" v-text="subitem.text"></span>
                </v-list-item-title>
              </v-list-item>
            </v-list-group>
            <v-list-item :key="i" v-else class="py-x-2" :to="item.link">
              <v-list-item-icon class="mr-4">
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>
                  <span class="body-1" v-text="item.text"></span>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
    </div>
  </v-navigation-drawer>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: (vm) => ({
    selectedItem: 1,
    items: [
      {
        link: "/tasks",
        text: vm.$t("menu.tasks"),
        icon: "mdi-format-list-checks",
      },
    ],
  }),
  computed: {
    navigationDrawer: {
      get: function () {
        return this.$store.getters["Common/getNavigationDrawer"];
      },
      set: function (val) {
        if (val != this.$store.getters["Common/getNavigationDrawer"]) {
          this.setNavigationDrawer();
        }
      },
    },
  },
  watch: {
    "$route.path": {
      handler() {
        this.checkSubmenuRouteChange();
      },
    },
  },
  methods: {
    ...mapActions({
      setNavigationDrawer: "Common/setNavigationDrawer",
    }),
    checkSubmenuRouteChange(item) {
      if (!item) return;

      return item.children.some((i) => i.link === this.$route.path);
    },
  },
};
</script>
