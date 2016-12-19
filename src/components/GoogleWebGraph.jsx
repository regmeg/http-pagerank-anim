/**
Container for the google web graph animation
**/
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import { VelocityTransitionGroup, VelocityComponent, velocityHelpers } from 'velocity-react';
import React, { Component } from 'react';
import logo from '../static/img/logo.svg';
import '../static/css/GoogleWebGraph.css';
import { getAnimationState, setAnimationState, removeAnimationState, forceAnimationState}  from './GlobalAppState';
import Animations from './Animations';
import AnimatedDot from './AnimatedDot';

//
const initialState = {
  animation:  null,
  renderLayout:null,
  animateDots: false,
  currentAppState: 0,
};
//Define the main App component
class GoogleWebGraph extends Component {

//define the constuctor of the isntance
  constructor(props) {
    super(props);
    this.state = initialState;

    //bind methods
    this._handleKeyDownandSetState = this._handleKeyDownandSetState.bind(this);
    this._exapandTheGraph = this._exapandTheGraph.bind(this);
  }

/*
Add listeners for the window keyEvents.
*/
  componentWillMount() {
    window.addEventListener('keydown', this._handleKeyDownandSetState, false);
  }

  //define something just after the component has rendered.
  componentDidMount() {

  }

//listener have to be removed after the View component has unmounted, otherwise the state of unmounted component will be still triggered, which can break the app and throw errors.
  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleKeyDownandSetState, false);
  }

//CUstom functions
/***************************************************************************************
//Custom function for handling keyEvents and updating state and animation based on it.
****************************************************************************************/
//function for handling keyevents and state of the presentation - a state machine
    _handleKeyDownandSetState (event){
        // if animation still in progress. just return
        if (getAnimationState() === false) return;
          //set the max state here
          const maxAppSate = 1;
          //save last state
          const currentState = this.state.currentAppState;

          //set the new state
          //37 is if back arrow is pressed. 39 if foward key. Add or remove state corespondingly
          if      (event.keyCode === 37) {
              (this.state.currentAppState <= 0)
              ? this.setState({ currentAppState: 0})
              : this.setState({ currentAppState: this.state.currentAppState - 1});
          } else if (event.keyCode === 39) {
              (this.state.currentAppState >= maxAppSate)
               ?
               this.setState({ currentAppState: maxAppSate})
               :
               this.setState({ currentAppState: this.state.currentAppState + 1});
          }

          const nextState = this.state.currentAppState;

            console.log(`next AppState is: ${nextState}, current Appstate is: ${currentState}`);

            //based on state perform animation or animation reversal, as well as reverse animation
            switch(nextState) {

                 case 0:

                   // "initial state - reset everything"
                     this.setState(initialState);

                     // if we come back from a bigger state, reverse that bigger state animation
                     if (currentState > nextState) {
                       //move to the previous view
                       this.props.moveGlobalState('previous');
                       //this._triggerSearchReverse();
                       //if we come from a smaller state, it is a bug, log an error.
                     } else if (nextState > currentState) {
                        console.error(`Cannot come from a smaller state to the 0 state. next AppState is: ${nextState}, current Appstate is : ${currentState}`);
                     }
                     break;

                case maxAppSate: //Fire the packet and move to the next view
                        // if we come back from a bigger state, reverse that bigger state animation
                        if (currentState > nextState) {
                          console.error(`Cannot come from a bigger state to the maxAppState. next AppState is: ${nextState}, current Appstate is : ${currentState}`);
                        } else if (nextState > currentState) {
                          this._exapandTheGraph();
                          // move to the next view
                        }
                        break;
                 default:
                     console.error(`Unknown currentAppState has been triggered, next AppState is: ${nextState}, current Appstate is :${currentState}`);
       }
  }

  /***************************************************************************************
  //Fcunctions for changing classes
  ****************************************************************************************/

  /***************************************************************************************
  //Fcunctions for triggering animation and reverses
  ****************************************************************************************/
  _exapandTheGraph() {
    this.setState({ renderLayout: true });
  }

 //Render everying
  render() {
    //Animations
    const containerAnim = this.state.renderLayout ? Animations.DotscontainerAnimation : null;
    //and generate dots
    const dotsCount = 170;
    const dotsHtml = [];
    for (let i = 0; i < dotsCount; i+=1) {
      dotsHtml.push(<AnimatedDot animateDots={this.state.renderLayout} id={i} key={i}/>);
    }

    return (
              <VelocityComponent animation={containerAnim} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}}>
                <div className="dot_container">
                    {dotsHtml}
                </div>
              </VelocityComponent>
    );
  }
}
//define propTypes
GoogleWebGraph.propTypes = {
  moveGlobalState: React.PropTypes.func,
};

GoogleWebGraph.defaultProps = {
  moveGlobalState: null,
};

export default GoogleWebGraph;
