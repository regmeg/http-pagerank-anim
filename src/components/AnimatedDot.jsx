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
const _genDotsScatterAnimIn = () => {
      console.log('generating helper');
      return velocityHelpers.registerEffect({
      defaultDuration: 6000,
      calls: [
        [{
          translateX: [
            function() { return _genRand(-screenWidth/2.5, screenWidth/2.5); },
            function() { return _genRand(0, screenWidth); },
          ],
          translateY: [
            function() { return _genRand(-screenHeight/2.75, screenHeight/2.75);  },
            function() { return _genRand(0, screenHeight); },
          ],
          translateZ: [
            function() { return _genRand(translateZMin, translateZMax);  },
            function() { return _genRand(translateZMin, translateZMax); },
          ],
          opacity: [
            function() { return Math.random(); },
            function() { return Math.random() + 0.1; },
          ],
        },1, {
          loop: 1,
          easing: 'easeInOutsine',
        }],
      ],
    });
};

export default class AnimatedDot extends Component{

  constructor(props) {
    super(props);
    this.state = {
      animationHelper:  _genDotsScatterAnimIn(),
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
};

AnimatedDot.defaultProps = {
 animateDots: false,
};
