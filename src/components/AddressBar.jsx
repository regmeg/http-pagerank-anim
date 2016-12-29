import React, { Component } from 'react';
import SelfFulfillingTextBox from './SelfFulfillingTextBox';
import '../static/css/AddressBarPage.css';
import addressBar from '../static/img/address_bar.png';


class AddressBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      addressBarText: props.text,
      animationClassName: props.animationClassName,
    };
    this.animateOut = this.animateOut.bind(this);
    this.animateIn = this.animateIn.bind(this);
  }

  animateOut() {
    console.log("Sliding out");
    this.setState({animationClassName: "slideOut"});
  }

  animateIn() {
    console.log("Sliding in");
    this.setState({animationClassName: "slideIn"});
  }

  render(){
    return(
      <div className="addressbar">
          <SelfFulfillingTextBox text={this.state.addressBarText} showbutton={false} />
      </div>
    )
  }
}

export default AddressBar;
