import React, { Component } from 'react';
import SelfFulfillingTextBox from './SelfFulfillingTextBox';
import '../static/css/AddressBarPage.css';
import addressBar from '../static/img/address_bar.png';


class AddressBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      addressBarText: props.text,
    };
  }

  render(){
    return(
      <div id="addressbar" className="addressbar">
          <SelfFulfillingTextBox text={this.state.addressBarText} showbutton={false} />
      </div>
    )
  }
}

export default AddressBar;
