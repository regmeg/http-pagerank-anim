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
    defaultDuration: 800,
    calls: [
      [{
        translateY: 650,
        // width: [0, 100],
        // height: [0, 100],
      }, 1, {
        easing: 'ease-out',
      }],
    ],
  }),

   FlashRed: velocityHelpers.registerEffect({
     defaultDuration: 100,
     calls: [
       [{
        backgroundColor: '#ff0000',
       }, 1, {
         easing: 'ease-out',
         loop: 5,
       }],
     ],
   }),

   HighlightDots: velocityHelpers.registerEffect({
     defaultDuration: 700,
     calls: [
       [{
        backgroundColor: '#EEB211',
       }, 1, {
         easing: 'ease-out',
       }],
     ],
   }),

   ChangeColortoGreen: velocityHelpers.registerEffect({
    defaultDuration: 700,
    calls: [
      [{
       color:'#006621',
      }, 1, {
        easing: 'ease-out',
        //delay: delay*450,
      }],
    ],
  }),

  existSearchRes: velocityHelpers.registerEffect({
   defaultDuration: 650,
   calls: [
     [{
      translateX: '200%',
      translateZ: 600,
     }, 1, {
       easing: 'ease-out',
       //delay: delay*450,
     }],
   ],
 }),

 existSearchResLinks: velocityHelpers.registerEffect({
  defaultDuration: 600,
  calls: [
    [{
     translateX: '150%',
     translateZ: 2000,
    }, 1, {
      easing: 'ease-out',
      //delay: delay*450,
    }],
  ],
}),

changeZIndex: velocityHelpers.registerEffect({
 defaultDuration: 2,
 calls: [
   [{
     zIndex: -500,
   }, 1, {
     easing: 'ease-out',
   }],
 ],
}),




LinkFadeOut: velocityHelpers.registerEffect({
 defaultDuration: 500,
 calls: [
   [{
     translateX: 400,
     opacity: 0,
   }, 1, {
     easing: 'ease-out',
   }],
 ],
}),

LinkFadeIn: velocityHelpers.registerEffect({
 defaultDuration: 500,
 calls: [
   [{
     opacity: 1,
     translateX: 0,
   }, 1, {
     easing: 'ease-out',
   }],
 ],
}),

LinkImFadeIn: velocityHelpers.registerEffect({
 defaultDuration: 500,
 calls: [
   [{
     opacity: 1,
     translateX: 480,
   }, 1, {
     easing: 'ease-out',
   }],
 ],
}),
LinkImFadeOut: velocityHelpers.registerEffect({
 defaultDuration: 500,
 calls: [
   [{
     translateX: 0,
     opacity: 0,
   }, 1, {
     easing: 'ease-out',
   }],
 ],
}),

TiggerLink : velocityHelpers.registerEffect({
    defaultDuration: 150,
    calls: [
      [{
        scaleX: 0.9,
        // translateY: 10,
      }, 1, {
        easing: 'spring',
        loop: 2,
      }],
    ],
  }),

  TiggerLinkLeft : velocityHelpers.registerEffect({
      defaultDuration: 350,
      calls: [
        [{
          translateX: 160,
          translateY: -13,
          opacity: 1,
        }, 1, {
          easing: 'spring',
        }],
      ],
    }),
  TiggerLinkRight : velocityHelpers.registerEffect({
      defaultDuration: 350,
      calls: [
        [{
          translateX: -396,
          translateY: -13,
          opacity: 1,
        }, 1, {
          easing: 'spring',
        }],
      ],
    }),

    MoveSearchWindow: velocityHelpers.registerEffect({
        defaultDuration: 500,
        calls: [
          [{
            translateX: -1024,
          }, 1, {
            easing: 'ease-in',
          }],
        ],
      }),

      MoveTheLink: velocityHelpers.registerEffect({
          defaultDuration: 600,
          calls: [
            [{
              translateX: 1024,
            }, 1, {
              easing: 'ease-in',
            }],
          ],
        }),

        TranslateLink: velocityHelpers.registerEffect({
            defaultDuration: 400,
            calls: [
              [{
                translateX: -850,
                translateY: [-13, -13],
              }, 1, {
                easing: 'ease-in',
                delay: 320,
              }],
            ],
          }),

          TrasnlateServer: velocityHelpers.registerEffect({
              defaultDuration: 400,
              calls: [
                [{
                  translateX: -850,
                }, 1, {
                  easing: 'ease-in',
                  delay: 320,
                }],
              ],
            }),

        TargetLinkAnimF: velocityHelpers.registerEffect({
            defaultDuration: 800,
            calls: [
              [{
                translateX: 60,
                translateY: 500,
                opacity: 0,
                rotateZ: -90,
              }, 1, {
                easing: 'ease-in',
              }],
            ],
          }),

        TargetLinkAnimS: velocityHelpers.registerEffect({
            defaultDuration: 800,
            calls: [
              [{
                translateX: -180,
                translateY: 500,
                opacity: 0,
                rotateZ: -90,
              }, 1, {
                easing: 'ease-in',
              }],
            ],
          }),

          BlinkTopRing: velocityHelpers.registerEffect({
              defaultDuration: 100,
              calls: [
                [{
                  // color: 'blue',
                  scaleY: -20,
                }, 1, {
                  easing: 'ease-in',
                  loop: 4,
                }],
              ],
            }),

        BlinkMidRing: velocityHelpers.registerEffect({
            defaultDuration: 100,
            calls: [
              [{
                  // color: 'blue',
                  scaleY: -20,
              }, 1, {
                easing: 'ease-in',
                loop: 4,
              }],
            ],
          }),

        BlinkBotRing: velocityHelpers.registerEffect({
            defaultDuration: 100,
            calls: [
              [{
                // color: 'blue',
                scaleY: -20,
              }, 1, {
                easing: 'ease-in',
                loop: 4,
              }],
            ],
          }),

          // {right: '-830px', top: '0px', position:'absolute', height: '98%', width: '65%', opacity: 1, transform: perspective(50px) rotateX(-20deg) }

        PopDocument: velocityHelpers.registerEffect({
            defaultDuration: 400,
            calls: [
              [{
                top: 400,
                opacity: 1,
              }, 1, {
                easing: 'ease-out',
              }],
              [{
                top: -20,
                right: -830,
                height: '98%',
                width: '65%',
                opacity: 1,
                perspective: [50, 0],
                rotateX: [-20, 0],
              }, 1, {
                easing: 'ease-out',
                delay: 350,
              }],
            ],
          }),

};

export {Animations as default} ;
