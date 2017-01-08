import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { VelocityTransitionGroup, VelocityComponent, velocityHelpers } from 'velocity-react';

import Animations from './Animations';
import DNSLookupTable from './DNSLookupTable';
import { getAnimationState, setAnimationState, removeAnimationState, forceAnimationState}  from './GlobalAppState';


class DNSPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentAppState: this.props.currentAppState,
      tableAnimation: null
    };

    this._handleKeyDownandSetState = this._handleKeyDownandSetState.bind(this);
  }

  componentWillMount() {
    window.addEventListener('keydown', this._handleKeyDownandSetState, false);
  }

  componentDidMount() {
    this.setState({tableAnimation: Animations.DNSTableIn});
    this._dnsTable.set_searching(this.state.currentAppState==0)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleKeyDownandSetState, false);
  }

  _handleKeyDownandSetState (event){
    // if animation still in progress. just return
    if (getAnimationState() === false || (event.keyCode !== 37 && event.keyCode !== 39)) return;
        //set the max state here
        const maxAppSate = 2;

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

        console.log(`[DNSLOOKUPTABLE] next AppState is: ${nextState}, current Appstate is: ${currentState}`);

        //based on state perform animation or animation reversal, as well as reverse animation
        switch(nextState) {
            case 0:
                //this.setState(initialState);
                // if we come back from a bigger state, reverse that bigger state animation
                if (currentState > nextState /*|| (currentState==nextState && nextState==0)*/) {
                    //backwards
                    console.log("Thou shalt exit this screen to previous");
                    this.props.moveGlobalState('previous');
                } else if (nextState > currentState) {
                    console.error(`Cannot come from a smaller state to the 0 state. next AppState is: ${nextState}, current Appstate is : ${currentState}`);
                    //forward
                }
                break;
            case 1:
                if (currentState > nextState) {
                    //backward
                    console.log("case1/backward");
                    this._dnsTable.set_searching(true);
                } else if (nextState > currentState) {
                    //forward
                    console.log("case1/forward");
                    this._dnsTable.set_searching(false);
                    
                }
                break;
            case maxAppSate: //do final animations (if any) and move to next screen.
                if (currentState > nextState) {
                    console.error(`Cannot come from a bigger state to the maxAppState. next AppState is: ${nextState}, current Appstate is : ${currentState}`);
                } else if (nextState > currentState) {
                    console.log("thou shalt exit screen to nexxt");
                    this.setState({tableAnimation: Animations.DNSTableOut});
                    setTimeout(() => {     this.props.moveGlobalState('next');    }, 100);
                    //this.props.moveGlobalState('next');
                }
                break;
            default:
                console.error(`Unknown currentAppState has been triggered, next AppState is: ${nextState}, current Appstate is :${currentState}`);
        }
    //set the state enevtually
    this.setState({ currentAppState: nextState});
  }

  render() {
    return (
        <VelocityComponent animation={this.state.tableAnimation}
                           begin={(elem) => {setAnimationState(elem);}}
                           complete={(elem) => {removeAnimationState(elem);}}>
          
              <DNSLookupTable ref={(dnsTable) => { this._dnsTable = dnsTable; }}/>
          
      </VelocityComponent>
    );
  }
}

DNSPage.propTypes = {
  moveGlobalState: React.PropTypes.func,
};

DNSPage.defaultProps = {
  moveGlobalState: null,
};

export default DNSPage;
