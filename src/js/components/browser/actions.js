import * as t from './actionTypes';

export const resize = (width, height) => {
  return {
    type: t.RESIZE,
    width,
    height
  };
};

// The off screen height + view port height (used to see how many pixels the user has seen)
export const captureOffScreenVPHeight = (height) => {
  return {
    type: t.CAPTURE_OSVP_HEIGHT,
    heightOfDOMSeen: height
  };
};
