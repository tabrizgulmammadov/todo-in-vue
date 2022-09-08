import * as taskServices from "./task";
import * as tagServices from "./tag";

export default {
  ...taskServices,
  ...tagServices,
};
