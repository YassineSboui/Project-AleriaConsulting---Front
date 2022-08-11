import { atom } from "recoil";
export const modal = atom({
  key: "modalContent",
  default: { isShowing: false, content: {} },
});
