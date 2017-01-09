/**
Container for an animated dot
**/
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import { VelocityTransitionGroup, VelocityComponent, velocityHelpers } from 'velocity-react';
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../static/css/GoogleWebGraph.css';
import { getAnimationState, setAnimationState, removeAnimationState, forceAnimationState}  from './GlobalAppState';
import Animations from './Animations';

//dont forget absolute
//get screen sizes
const screenWidth = document.body.clientWidth;
const screenHeight = document.body.clientHeight;
//generate movement animation
const translateZMinAnim = -300;
const translateZMaxAnim =  20;
const translateZMinFinal = -50;
const translateZMaxFinal = 300;
const perspectiveWidht = document.body.clientWidth*0.25;
const perspectiveHeight = document.body.clientHeight*0.25;


//good options
//Math.seed = 320;
//Math.seed = 403;
//Math.seed = 955;

// in order to work 'Math.seed' must NOT be undefined,
// so in any case, you HAVE to provide a Math.seed
Math.seededRandom = function randmoize(maxy, miny)  {
    const max = maxy || 1;
    const min = miny || 0;

    Math.seed = ((Math.seed * 9301) + 49297) % 233280;
    const rnd = Math.seed / 233280;

    return min + (rnd * (max - min));
};

//const _genRand = (min, max) => (Math.floor(_random(10) * ((max - min) + 1)) + min);
const _genDotsScatterAnimIn = (id) => {
      //console.log(`generating helper id: ${id}`);
      const helperDefinition = {
      defaultDuration: 3000,
      calls: [
        [{
          translateX: [
            () => (Math.seededRandom (-screenWidth, screenWidth)),
            () => (Math.seededRandom (0+perspectiveWidht, screenWidth-perspectiveWidht)),
          ],
          translateY: [
            () => (Math.seededRandom (-screenHeight, screenHeight)),
            () => (Math.seededRandom (0+perspectiveHeight, screenHeight-perspectiveHeight)),
          ],
           translateZ: [
           () => (Math.seededRandom (translateZMinAnim, translateZMaxAnim)),
           () => (Math.seededRandom (translateZMinFinal, translateZMaxFinal)),
           ],
          opacity: [
            () => (Math.seededRandom()),
            () => (Math.seededRandom(0.6 , 1)),
          ],
        },1, {
          loop: 1,
          easing: 'easeInOutsine',
        }],
      ],
    };
      //console.log(JSON.stringify({helperDefinition}));
      const helper = velocityHelpers.registerEffect(helperDefinition);
      return helper;
};
// const _genChaos1 = x => ( ( (2*Math.sin(3/x))+(3*Math.cos(5/x))+(4*Math.sin(6/x))+(1*Math.cos(3/x)) ) /10);
// const _genChaos2 = y => ( Math.sin( (1/y) * (1/(1-y)) ) );
//
// const _genDotsScatterAnimIn = (i) => {
//       console.log(`generating helper id: ${i}`);
//       const helper = velocityHelpers.registerEffect({
//       defaultDuration: 3000,
//       calls: [
//         [{
//           translateX: [
//             screenWidth*_genChaos1(_genChaos2(i*i)),
//             screenWidth*_genChaos2(_genChaos2(i/i)),
//           ],
//           translateY: [
//             screenHeight*_genChaos1(_genChaos2(i/i)),
//             screenHeight*_genChaos2(_genChaos2(i*i)),
//           ],
//           // translateZ: [
//           //   () => (_genRand(translateZMin, translateZMax)),
//           //   () => (_genRand(translateZMin, translateZMax)),
//           // ],
//           opacity: [
//             () => (Math.random()),
//             () => (Math.random() + 0.1),
//           ],
//         },1, {
//           loop: 1,
//           easing: 'easeInOutsine',
//         }],
//       ],
//     });
//     return helper;
// };

export default class AnimatedDot extends Component{

  constructor(props) {
    super(props);
    this.state = {
      animationHelper:  _genDotsScatterAnimIn(this.props.id),
    };
    this.getMyFraction = this.getMyFraction.bind(this);
    this.getMyFractionAnim = this.getMyFractionAnim.bind(this);

  }

  getMyFractionLink (id) {
    this.state = this.state;
    const fractions = [
    'quora.com/How..',  //4
    'thecsclubindia.c..',  //5
    'superprofs.com/..',  //6
    'cakart.in/blog/e..',  //2
    'commercecafe.n..',  //3
    'youtube.com/w..']; //1
    return fractions[id];
  }

  getMyFraction (id) {
    this.state = this.state;
    const fractions = [0.011, 0.009, 0.002, 0.242, 0.034, 0.512];
    return fractions[id];
  }

  getMyFractionAnim (id, reverse) {
  this.state = this.state;
  let ycord;
  let xcord;
  let delay;
  let fontS;
  const wid = '190%';
  switch(id) {
     case 0://#4 011
        ycord = -115;
        xcord = -209;
        delay = 3;
        fontS = '22px';
      break;
      case 1://#5 009
         ycord = -102;
         xcord = -247;
         delay = 4;
         fontS = '18px';
       break;
       case 2://#6 002
          ycord = 149;
          xcord = -668;
          delay = 5;
          fontS = '23px';
                break;
        case 3://2# 242
           ycord = -35;
           xcord = -395;
           delay = 1;
           fontS = '15.5px';
               break;
         case 4://#3 034
            ycord = 21;
            xcord = -497;
            delay = 2;
            fontS = '23px';
                break;
          case 5:// #1 512
             ycord = 40;
             xcord = -345;
             delay = 0;
             fontS = '14.6px';
                break;
           default:  console.error(`Unknown ${id} attempted to be generated in Fraciton`);
  }
  if (reverse) {xcord = 0; ycord=0;}
  const _genFractionMove = idIn => ( velocityHelpers.registerEffect({
    defaultDuration: 700,
    calls: [
      [{
      //  translateX: xcord,
      top: ycord,
      left: xcord,
       //translateY: ycord,
       fontSize: fontS,
       color:'#5591F5',
       width: wid,
      }, 1, {
        easing: 'ease-out',
        //delay: delay*450,
      }],
    ],
  }) );
  return _genFractionMove(id);
  }

//    this.FractionAnimation = _genFractionMove(id);

  render(){
      this.animation  = (this.props.dotsAnimation === 'nothin') ? null : this.props.dotsAnimation;
    if (this.props.dotsAnimation === 'initial-animation') {
      this.animation = this.state.animationHelper;
      this.delay = 0;
      this.FractionAnimation = null;

    } else if (this.props.dotsAnimation === 'jump-dots') {
      this.animation = Animations.FlashRed;
      this.delay = this.props.id*5;
      this.FractionAnimation = null;
    }
    else if (this.props.dotsAnimation ===  'highlight-dots') {
      this.animation = null;
      this.fraction = null;
      if (this.props.id % 5 === 2) {
        this.animation = Animations.HighlightDots;
        this.fraction = this.getMyFraction ((this.props.id - 2) / 5);}
      this.delay = 0;
      this.FractionAnimation = null;

    } else if (this.props.dotsAnimation === 'reverse-highlight') {
      this.animation = null;
      this.fraction = null;
      if (this.props.id % 5 === 2) {this.animation = 'reverse';}
      this.delay = 0;
      this.FractionAnimation = null;

   } else if (this.props.dotsAnimation === 'move-fraction') {
     this.animation = null;
     this.delay = 0;
     this.FractionAnimation = null;
     if (this.props.id % 5 === 2) {
       this.FractionAnimation = this.getMyFractionAnim((this.props.id - 2) / 5);
     }

   } else if (this.props.dotsAnimation === 'reverse-move-fraction') {
     this.animation = null;
     this.delay = 0;
     this.FractionAnimation = null;
     if (this.props.id % 5 === 2) {
       this.FractionAnimation = this.getMyFractionAnim( ((this.props.id - 2) / 5), true );
     }

   } else if (this.props.dotsAnimation === 'fraction-to-links') {
     this.animation = null;
     this.delay = 0;
     this.FractionAnimation = null;
     if (this.props.id % 5 === 2) {
       this.fraction = this.getMyFractionLink ((this.props.id - 2) / 5);
       this.FractionAnimation = Animations.ChangeColortoGreen;
     }

 } else if (this.props.dotsAnimation === 'reverse-fraction-to-links') {
   this.animation = null;
   this.delay = 0;
   this.FractionAnimation = null;
   if (this.props.id % 5 === 2) {
     this.fraction = this.getMyFraction ((this.props.id - 2) / 5);
     this.FractionAnimation = 'reverse';
   }
 } else if (this.props.dotsAnimation === 'exit-fraction-links') {
   this.animation = Animations.changeZIndex;
   this.delay = 0;
   this.FractionAnimation = null;
  //  if (this.props.id % 5 === 2) {
  //    this.FractionAnimation = Animations.existSearchResLinks;
  //  }

 }
    return (
       <VelocityComponent animation={this.animation} begin={(elem) => {setAnimationState(elem);}} delay={this.delay}  complete={(elem) => {removeAnimationState(elem);}} >
         <div ref={(component) => {this.props.that.animatedDots[this.props.id] = component;}} className={this.props.dotCss}>
          <VelocityComponent animation={this.FractionAnimation} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}} >
             <div className="fraction">
               {this.fraction}
               </div>
           </VelocityComponent>
          </div>
        </VelocityComponent>
    );
  }
}

// //write as a stateless funnciton, as it is simply a pure component
// export default function AnimatedDot(props) {
//   return <VelocityComponent animation={props.animation}><div className="dot"/></VelocityComponent>;
// }

AnimatedDot.propTypes = {
   that:  React.PropTypes.object.isRequired,
   dotCss: React.PropTypes.string.isRequired,
   dotsAnimation: React.PropTypes.string,
   id: React.PropTypes.number.isRequired,
};

AnimatedDot.defaultProps = {
 animateDots: false,
 jumpDots: false,
 dotsReveal: false,
 dotsAnimation: null,
};
