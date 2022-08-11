import { atom } from "recoil";

export const selected_panel = atom({
  key: "selected_panel",
  default: {
    isShowing: false,
    panel: null,
  },
});
