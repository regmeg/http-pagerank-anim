/**
Container for the google web graph animation
**/
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import { VelocityTransitionGroup, VelocityComponent, velocityHelpers } from 'velocity-react';
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Line from './Line';
import logo from '../static/img/logo.svg';
import '../static/css/GoogleWebGraph.css';
import { getAnimationState, setAnimationState, removeAnimationState, forceAnimationState}  from './GlobalAppState';
import Animations from './Animations';
import AnimatedDot from './AnimatedDot';

const dotsCount = 30;
const lines = [];
const initialState = {
  currentAppState: 0,
  animation: null,

};
//Define the main App component
export default class GoogleSearchResults extends Component {
//define the constuctor of the isntance
  constructor(props) {
    super(props);
    //define states
    this.state = initialState;
    //define instance vars
    this.animatedDots = [];
    this.lines = [];

    //bind methods
    this._handleKeyDownandSetState = this._handleKeyDownandSetState.bind(this);
    this._popSearchResults =   this._popSearchResults.bind(this);
    this._popSearchResultsReverse =   this._popSearchResultsReverse.bind(this);

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
        // if animation still in progress. or wrong key is pressed
        if (getAnimationState() === false || (event.keyCode !== 37 && event.keyCode !== 39)) return;
          //set the max state here
          const maxAppSate = 3;
          //save last state
          const currentState = this.state.currentAppState;
          let nextState;

          //set the new state
          //37 is if back arrow is pressed. 39 if foward key. Add or remove state corespondingly
          if      (event.keyCode === 37) {
              nextState = (currentState <= 0) ? 0 : currentState - 1;
          } else if (event.keyCode === 39) {
              nextState = (currentState >= maxAppSate) ? maxAppSate : currentState + 1;
          }

            console.log(`next AppState is: ${nextState}, current Appstate is: ${currentState}`);
            //set the state eventually
             this.setState({ currentAppState: nextState});

            //based on state perform animation or animation reversal, as well as reverse animation
            switch(nextState) {

                 case 0: //state for simply jumping to the previous view
                     // if we come back from a bigger state
                     if (currentState > nextState) {
                       //move to the previous view
                       this.props.moveGlobalState('previous');
                       //if we come from a smaller state, it is a bug, log an error.
                     } else if (nextState > currentState) {
                        console.error(`Cannot come from a smaller state to the 0 state. next AppState is: ${nextState}, current Appstate is : ${currentState}`);
                     }
                     break;


                  case 1: // Initail graph animation has finished
                         // if we come back from a bigger state, reverse that bigger state animation
                         if (currentState > nextState) {
                          this._popSearchResultsReverse();
                           //if we come from a smaller state, apply the animation of this state
                         } else if (nextState > currentState) {//wont get here, as at state zero reverse is going to happen, this state is not going to be set.
                           // this._spwanServer_reverse();
                         }
                       break;

                case maxAppSate: //trigger last animation and fire next state
                        // if we come back from a bigger state, reverse that bigger state animation

                        if (currentState > nextState) {
                          console.error(`Cannot come from a bigger state to the maxAppState. next AppState is: ${nextState}, current Appstate is : ${currentState}`);
                        } else if (nextState > currentState) {
                          this._exitSearchResults();
                          // move to the next view
                          this.props.moveGlobalState('next');
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

  _popSearchResults() {
        this.setState({ SearchResEnter: Animations.SearchResEnter});
  }

  _popSearchResultsReverse() {
        this.setState({ SearchResEnter: 'reverse'});
  }




 //Render everying
  render() {
    return (
              <VelocityComponent animation={this.state.animation} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}}>
                <div>{this.props.searchTerm}</div>
              </VelocityComponent>
    );
  }
}
//define propTypes
GoogleSearchResults.propTypes = {
  moveGlobalState: React.PropTypes.func,
  searchTerm: React.PropTypes.string,
};

GoogleSearchResults.defaultProps = {
  moveGlobalState: null,
  searchTerm: 'how to pass in CS',
};
