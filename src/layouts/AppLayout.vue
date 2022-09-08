<template>
  <main class="h-100">
    <TheSidebar />
    <TheHeader />
    <v-main class="h-100">
      <router-view />
    </v-main>
  </main>
</template>

<script>
import TheSidebar from "@/components/TheSidebar.vue";
import TheHeader from "@/components/TheHeader.vue";

export default {
  components: { TheSidebar, TheHeader },
};
</script>
