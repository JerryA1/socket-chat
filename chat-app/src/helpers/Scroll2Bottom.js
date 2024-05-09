import { animateScroll } from "react-scroll";

// ----------------------------------------------------------------------

export const scroll2Bottom = (id) => {
  setTimeout(() => {
    animateScroll.scrollToBottom({ containerId: id, duration: 0 });
  }, 10);
};

export const scroll2BottomAnimate = (id) => {
  setTimeout(() => {
    animateScroll.scrollToBottom({ containerId: id, duration: 250 });
  }, 10);
};
