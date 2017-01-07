/**
Google Home page component
**/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { VelocityTransitionGroup, VelocityComponent, velocityHelpers } from 'velocity-react';

import Animations from './Animations';
import AddressBar from './AddressBar';
import DNSLookupTable from './DNSLookupTable';
import '../static/css/AddressBarPage.css';

import { getAnimationState, setAnimationState, removeAnimationState, forceAnimationState}  from './GlobalAppState';


//Define the main App component
class AddressBarPage extends Component {

  constructor(props) {
    super(props);
    //set states
    this.state = {
      phase: this.props.phase,
      addressBarAnimation: Animations.AddressBarIn,
    };


    //bind custom methods to refer to this object. If they were defined as = () => {} arrow functions,
    //this would have had been bound to the instance automatically by Babel.
    
    //Some functions dont really need to bound, as they will be called in the right scope 
    //due to the invocation patern within the object, but just in case they will be used different,
    // they were bound as well.
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

        //37 is if back arrow is pressed. 39 if foward key. Add or remove state corespondingly
        if (event.keyCode === 37) {
          this.setState({addressBarAnimation: Animations.AddressBarIn});
          this.props.moveGlobalState('previous');
        } else if (event.keyCode === 39) {
          this.setState({addressBarAnimation: Animations.AddressBarOut});
          this.props.moveGlobalState('next');
        }
  }

 //Render everying
  render() {
    return (
      <div>
      <div className="addressBarContainer">
        <VelocityComponent animation={this.state.addressBarAnimation}
                           begin={(elem) => {setAnimationState(elem);}}
                           complete={(elem) => {removeAnimationState(elem);}}>
            <AddressBar text="https://www.giggles.com/" animationClassName={this.state.addressBarAnimationClass} withAnimation={this.state.phase !== 'postdns'}/>

        </VelocityComponent>
      </div>
      {this.state.phase === "postdns" && 
          <div className="centralizer">
          <div className="dnsresult">
            www.giggles.com - 42.42.42.42
          </div>
          </div>
      }
      </div>
      
    );
  }
}

AddressBarPage.propTypes = {
  moveGlobalState: React.PropTypes.func,
};

AddressBarPage.defaultProps = {
  moveGlobalState: null,
};

export default AddressBarPage;
