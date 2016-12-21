/**
Container for an animated dot
**/
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import { VelocityTransitionGroup, VelocityComponent, velocityHelpers } from 'velocity-react';
import React, { Component } from 'react';
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

// the initial seed
Math.seed = 120;

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
      const helper = velocityHelpers.registerEffect({
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
    });
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
  }

  render(){
    const animation = this.props.animateDots ? this.state.animationHelper : null;
    const refVal = `animatedDot_${this.props.id}`;
    return (
       <VelocityComponent animation={animation} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}} ><div ref={(component) => {this.props.that.animatedDots[this.props.id] = component;}} className={this.props.dotCss}/></VelocityComponent>
    );
  }
}

// //write as a stateless funnciton, as it is simply a pure component
// export default function AnimatedDot(props) {
//   return <VelocityComponent animation={props.animation}><div className="dot"/></VelocityComponent>;
// }

AnimatedDot.propTypes = {
   animateDots: React.PropTypes.bool,
   that:  React.PropTypes.object.isRequired,
   dotCss: React.PropTypes.string.isRequired,
   id: React.PropTypes.number.isRequired,
};

AnimatedDot.defaultProps = {
 animateDots: false,
};
