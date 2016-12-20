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
const screenWidth = window.screen.availWidth;
const screenHeight = window.screen.availHeight;
const chromeHeight = screenHeight - (document.documentElement.clientHeight || screenHeight);
//generate movement animation
const translateZMin = -725;
const translateZMax = 600;
const _genRand = (min, max) => (Math.floor(Math.random() * ((max - min) + 1)) + min);
const _genDotsScatterAnimIn = (id) => {
      console.log(`generating helper id: ${id}`);
      const helper = velocityHelpers.registerEffect({
      defaultDuration: 6000,
      calls: [
        [{
          translateX: [
            () => (_genRand(-screenWidth/2.5, screenWidth/2.5)),
            () => (_genRand(0, screenWidth)),
          ],
          translateY: [
            () => (_genRand(-screenHeight/2.75, screenHeight/2.75)),
            () => (_genRand(0, screenHeight)),
          ],
          translateZ: [
            () => (_genRand(translateZMin, translateZMax)),
            () => (_genRand(translateZMin, translateZMax)),
          ],
          opacity: [
            () => (Math.random()),
            () => (Math.random() + 0.1),
          ],
        },1, {
          loop: 1,
          easing: 'easeInOutsine',
        }],
      ],
    });
    return helper;
};

export default class AnimatedDot extends Component{

  constructor(props) {
    super(props);
    this.state = {
      animationHelper:  _genDotsScatterAnimIn(this.props.id),
    };
  }

  render(){
    const animation = this.props.animateDots ? this.state.animationHelper : null;
    return (
       <VelocityComponent animation={animation} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}} ><div className="dot"/></VelocityComponent>
    );
  }
}

// //write as a stateless funnciton, as it is simply a pure component
// export default function AnimatedDot(props) {
//   return <VelocityComponent animation={props.animation}><div className="dot"/></VelocityComponent>;
// }

AnimatedDot.propTypes = {
   animateDots: React.PropTypes.bool,
   id: React.PropTypes.number.isRequired,
};

AnimatedDot.defaultProps = {
 animateDots: false,
};
