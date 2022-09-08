import { Translations } from "../plugins/translations";

import AppLayout from "@/layouts/AppLayout.vue";
import Tasks from "@/views/tasks/index.vue";

const routes = [
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "/tasks",
        component: Tasks,
        name: "Tasks",
        beforeEnter: Translations.routeMiddleware,
      },
    ],
  },
];

export default routes;
