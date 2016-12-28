/**
Google Home page component
**/
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import { VelocityTransitionGroup, VelocityComponent, velocityHelpers } from 'velocity-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Animations from './Animations';
import AddressBar from './AddressBar';
import '../static/css/GoogleHome.css';
import { getAnimationState, setAnimationState, removeAnimationState, forceAnimationState}  from './GlobalAppState';

const initialState = {
  currentAppState: 0,
  searchbar_class: 'Google-searchbar Google-searchInput-blur',
  serverLogo_class: 'server-logo',
  inputValue: '',
  displayValue: 'Press search',
};


//Define the main App component
class AddressBarPage extends Component {

//define the constuctor of the isntance. In fact, there is no a need for a constructor, if arrow functions and local class properties are defined on their own, babel will transpile those exactlt the same way and bind them automatically. But that approach is still considered somewhat experimental.
  constructor(props) {
    super(props);
    //set states
    this.state = initialState;

    //bind custom methods to refer to this object. If they were defined as = () => {} arrow functions, this would have had been bound to the instance automatically by Babel.
    //Somme functions dont really need to bound, as they will be called in the right scope due to the invocation patern within the object, but just in case they will be used different, they were bound as well.
    this._handleKeyDownandSetState = this._handleKeyDownandSetState.bind(this);
  }



  //Add listeners for the window keyEvents. Bind function sets this in the _handleKeyDown to be this from the App instance, otherwise it is going to be in the window scope, or somewhere else.
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

/***************************************************************************************
//Custom function for handling keyEvents and updating state and animation based on it.
****************************************************************************************/
//function for handling keyevents and state of the presentation - a state machine
    _handleKeyDownandSetState (event){
        // if animation still in progress. just return
        if (getAnimationState() === false || (event.keyCode !== 37 && event.keyCode !== 39)) return;
          //set the max state here
          const maxAppSate = 3;
          //save last state
          const currentState = this.state.currentAppState;
          let nextState;
          //set the new state
          //37 is if back arrow is pressed. 39 if foward key. Add or remove state corespondingly
          if (event.keyCode === 37) {
              nextState = (currentState <= 0) ? 0 : currentState - 1;
          } else if (event.keyCode === 39) {
              nextState = (currentState >= maxAppSate) ? maxAppSate : currentState + 1;
          }


            console.log(`next AppState is: ${nextState}, current Appstate is: ${currentState}`);

            //based on state perform animation or animation reversal, as well as reverse animation
            switch(nextState) {
              //TODO: figure out states and animations.
            }

       //set the state enevtually
      this.setState({ currentAppState: nextState});
  }

 //Render everying
  render() {
    return (
      <AddressBar text="https://www.giggles.com/"/>
    );
  }
}

export default AddressBarPage;
