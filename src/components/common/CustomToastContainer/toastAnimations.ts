import { cssTransition } from "react-toastify";

export const slideAnimation = cssTransition({
  enter: "slide-in-top",
  exit: "slide-out-top",
});
