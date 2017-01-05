import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { VelocityTransitionGroup, VelocityComponent, velocityHelpers } from 'velocity-react';

import Animations from './Animations';
import '../static/css/DNSPage.css';
import DNSLookupTable from './DNSLookupTable';
import { getAnimationState, setAnimationState, removeAnimationState, forceAnimationState}  from './GlobalAppState';


class DNSPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tableAnimation: null
    };

    this._handleKeyDownandSetState = this._handleKeyDownandSetState.bind(this);
  }

  componentWillMount() {
    window.addEventListener('keydown', this._handleKeyDownandSetState, false);
  }

  componentDidMount() {
    this.setState({tableAnimation: Animations.DNSTableIn});
  }

  componentWillUnmount() {
    this.setState({tableAnimation: Animations.DNSTableOut});
    window.removeEventListener('keydown', this._handleKeyDownandSetState, false);
  }

  _handleKeyDownandSetState (event){
      // if animation still in progress. just return
      if (getAnimationState() === false || (event.keyCode !== 37 && event.keyCode !== 39)) return;

        //37 is if back arrow is pressed. 39 if foward key. Add or remove state corespondingly
        if (event.keyCode === 37) {
          //this.setState({addressBarAnimation: Animations.AddressBarIn});
            this.props.moveGlobalState('previous');
        } else if (event.keyCode === 39) {
          //this.setState({addressBarAnimation: Animations.AddressBarOut});
            this.props.moveGlobalState('next');
        }
  }

  render() {
    return (
        <VelocityComponent animation={this.state.tableAnimation}
                           begin={(elem) => {setAnimationState(elem);}}
                           complete={(elem) => {removeAnimationState(elem);}}>
          <div className="dnstable">
              <DNSLookupTable/>
          </div>
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
