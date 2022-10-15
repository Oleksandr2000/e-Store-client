export const BottomAnimation = {
  hidden: {
    y: 0,
    opacity: 0,
  },
  visible: (custom: any) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.3 },
  }),
};

export const TopAnimation = {
  hidden: {
    y: 0,
    opacity: 0,
  },
  visible: (custom: any) => ({
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.3 },
  }),
};

export const LeftAnimation = {
  hidden: {
    x: -200,
    opacity: 0,
  },
  visible: (custom: any) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.3 },
  }),
};

export const RightAnimation = {
  hidden: {
    x: 200,
    opacity: 0,
  },
  visible: (custom: any) => ({
    x: 0,
    opacity: 1,
    transition: { delay: custom * 0.3 },
  }),
};

export const OpacityAnimation = {
  hidden: {
    opacity: 0,
  },
  visible: (custom: any) => ({
    opacity: 1,
    transition: { delay: custom * 0.3 },
  }),
};
