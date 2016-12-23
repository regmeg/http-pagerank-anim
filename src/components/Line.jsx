import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import { VelocityTransitionGroup, VelocityComponent, velocityHelpers } from 'velocity-react';
import React, {Component} from 'react';
import { getAnimationState, setAnimationState, removeAnimationState, forceAnimationState}  from './GlobalAppState';

export default class Line extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animationHelper: null,
    };
  }

  render() {
    let from = this.props.from;
    let to = this.props.to;
    if (to.x < from.x) {
      from = this.props.to;
      to = this.props.from;
    }

    const len = Math.sqrt(Math.pow(from.x - to.x, 2) + Math.pow(from.y - to.y, 2));
    const angle = Math.atan((to.y - from.y) / (to.x - from.x));

    const style = {
      position: 'absolute',
      transform: `translate(${from.x - (0.5 * len * (1 - Math.cos(angle)))}px, ${from.y + (0.5 * len * Math.sin(angle))}px) rotate(${angle}rad)`,
      width: `${len}px`,
      height: `${0}px`,
      borderBottom: this.props.style || '1px solid black',
      zIndex: -500,
    };

    return(
          <div style={style}/>
    );
  }
}


Line.propTypes = {
  from: React.PropTypes.shape({
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
  }).isRequired,
  to: React.PropTypes.shape({
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
  }).isRequired,
  style: React.PropTypes.string,
};

Line.defaultProps = {
    style: null,
    animation: null,
};
