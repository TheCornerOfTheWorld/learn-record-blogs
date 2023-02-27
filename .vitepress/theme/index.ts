// .vitepress/theme/index.js
import { VPTheme } from "@vue/theme";

export default {
  ...VPTheme,
  // override the Layout with a wrapper component that
  // injects the slots
};
