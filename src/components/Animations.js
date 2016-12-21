/**
Components which containts sequqcneus of animations
**/
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import { velocityHelpers } from 'velocity-react';

//Set up sequances of animation
const Animations = {
  // Register helpers, which create animnation objects
  EmptyAnim: velocityHelpers.registerEffect({
    defaultDuration: 800,
    calls: [
      [{
      }, 1, {
      }],
    ],
  }),

  ReactLogoIn: velocityHelpers.registerEffect({
    defaultDuration: 600,
    calls: [
      [{
        translateX: 300,
        rotateZ: '270deg',
        opacity: 0,
      }, 1, {
        easing: 'ease-out',
      }],
    ],
  }),

  ReactLogoOut: velocityHelpers.registerEffect({
    defaultDuration: 600,
    calls: [
      [{
        translateX: -300,
        rotateZ: '-270deg',
        opacity: 1,
      }, 1, {
        easing: 'ease-out',
      }],
    ],
  }),

  GoogleLogoOut: velocityHelpers.registerEffect({
    defaultDuration: 600,
    calls: [
      [{
        translateX: -600,
        rotateZ: '-160deg',
        opacity: 0,
      }, 1, {
        easing: 'ease-in-out',
      }],
    ],
  }),

  GoogleSearchBarTransform: velocityHelpers.registerEffect({
    defaultDuration: 1000,
    calls: [
      [{
        translateX: -300,
        width: 50,
      }, 1, {
        easing: 'ease-in-out',
      }],
    ],
  }),

  HideElemAnim: velocityHelpers.registerEffect({
    defaultDuration: 500,
    calls: [
      [{
        visibility: 'hidden',
        width: 0,
        height: 0,
      }, 1, {
        easing: 'ease-in-out',
      }],
    ],
  }),

  SearchIconAnimation: velocityHelpers.registerEffect({
    defaultDuration: 10,
    calls: [
      [{
        top: 5,
        left: 4,
        'margin-left': 0,
        'margin-right': 0,
      }, 1, {
        easing: 'ease-in-out',
      }],
    ],
  }),

  ServerImgEnterAnim: velocityHelpers.registerEffect({
    defaultDuration: 1400,
    calls: [
      [{
        translateX: -200,
        opacity: 1,
      }, 1, {
        easing: 'ease-in-out',
      }],
    ],
  }),
  DotscontainerAnimation: velocityHelpers.registerEffect({
    defaultDuration: 6000,
    calls: [
      [{
        perspective: [ 600, 50 ],
  			opacity: [ 0.90, 0.75 ],
      }, 1, {
        delay: 5250,
        easing: 'easeInOutsine',
      }],
    ],
  }),

  FlashServer : velocityHelpers.registerEffect({
    defaultDuration: 200,
    calls: [
      [{
        translateX: 200,
        translateY: -200,
        height: '160%',
        width: '160%',
  			opacity: 0.1,
      }, 1, {
        easing: 'ease-out',
      }],
    ],
  }),

  BackgroundFlash: velocityHelpers.registerEffect({
    defaultDuration: 1000,
    calls: [
      [{
        opacity: 0,
      }, 1, {
        easing: 'ease-out',
      }],
    ],
  }),

  SearchResEnter: velocityHelpers.registerEffect({
    defaultDuration: 400,
    calls: [
      [{
        translateY: 100,
        // width: [0, 100],
        // height: [0, 100],
      }, 1, {
        easing: 'ease-out',
      }],
    ],
  }),

};

export {Animations as default} ;
