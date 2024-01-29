import { CardClassOwnerType } from "../../types/card/CardClassOwnerType";
// ни в коем случае не менять импорт на @, так как тогда convex сломается
export type CardClassObjectType = {
  [key: number]: CardClassOwnerType;
};
