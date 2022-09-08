import BasePageLayout from "./BasePageLayout.vue";
import BaseNotification from "./BaseNotification.vue";
import BaseEmptyPage from "./BaseEmptyPage.vue";
import BaseNoResultSection from "./BaseNoResultSection.vue";
import BaseModal from "./BaseModal.vue";
import BaseConfirmationModal from "./BaseConfirmationModal.vue";
import BaseLoading from "./BaseLoading.vue";

const components = [
  { name: "d-page", component: BasePageLayout },
  { name: "d-notification", component: BaseNotification },
  { name: "d-page-empty", component: BaseEmptyPage },
  { name: "d-no-result", component: BaseNoResultSection },
  { name: "d-modal", component: BaseModal },
  { name: "d-modal-confirmation", component: BaseConfirmationModal },
  { name: "d-loading", component: BaseLoading },
];

export default components;
