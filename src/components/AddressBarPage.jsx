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
import laptopImg from '../static/img/laptop.png';
import serverImg from '../static/img/server_blue.png';

import { getAnimationState, setAnimationState, removeAnimationState, forceAnimationState}  from './GlobalAppState';


class AddressBarPage extends Component {

  constructor(props) {
    super(props);

    this.initialState = {
      currentAppState: props.currentAppState,
      addressBarAnimation: Animations.AddressBarIn,

      showDNSResponseLine: props.currentAppState==1,
      showGetPacket: false,
      showLaptop: false,
      showServer: false,
      showResponsePacket: false,
      showRendered: false,
      animateTextBox: props.currentAppState==0,
    };

    this.state = this.initialState;

    this.packet_table_data = {
      'source': "12.34.56.78",
      'destination': "74.125.206.94",
      'sequence number': "1",
      'checksum': "59bcc3ad6775562f845953cf01624225",
      '...': '...',
    }
    //super special because we want newlines and all that jazz
    this.packet_table_data_data = [
      "GET / HTTP/1.1",
      "User-Agent: Chrome/55.0.2883.87 (X11; Linux x86_64)",
      "Host: www.google.co.uk",
      "Accept: */*",
    ]


    this.packet_table_data_response = {
      'source': "74.125.206.94",
      'destination': "12.34.56.78",
      'sequence number': "1",
      'checksum': "12.34.56.78",
      '...': '...',
    }

    this.packet_table_data_response_data = [
      "HTTP/1.1 200 OK",
      "Date: Tue, 10 Jan 2016 12:00:21 GMT",
      "Server: nginx/1.11.7",
      "Last-Modified: Tue, 10 Jan 2016 11:45:16 GMT",
      "Content-Length: 88",
      "Content-Type: text/html",
      "Connection: keep-alive",
      "",
      "<html>",
      " <body>",
      "   <h1>Hello, World!</h1>",
      " </body>",
      "</html>",
    ]

    this._handleKeyDownandSetState = this._handleKeyDownandSetState.bind(this);
  }

  //Add listeners for the window keyEvents. Bind function sets this in the _handleKeyDown to be this from the App instance, otherwise it is going to be in the window scope, or somewhere else.
  componentWillMount() {
    window.addEventListener('keydown', this._handleKeyDownandSetState, false);
  }

  //listener have to be removed after the View component has unmounted, otherwise the state of unmounted component will be still triggered, which can break the app and throw errors.
  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleKeyDownandSetState, false);
  }

  _handleKeyDownandSetState (event){
    // if animation still in progress. just return
    if (getAnimationState() === false || (event.keyCode !== 37 && event.keyCode !== 39)) return;
        //set the max state here
        const maxAppSate = 6;

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

        console.log(`[AddressBarPage] next AppState is: ${nextState}, current Appstate is: ${currentState}`);

        //based on state perform animation or animation reversal, as well as reverse animation
        this.setState(this.initialState);
        switch(nextState) {
            case 0:
                // if we come back from a bigger state, reverse that bigger state animation
                if (currentState > nextState) {
                    console.log("Thou shalt exit this screen to previous");
                    this.setState(
                      {
                        showDNSResponseLine: false,
                      });
                    this.props.moveGlobalState('previous');
                } else if (nextState > currentState) {
                    console.error(`Cannot come from a smaller state to the 0 state. next AppState is: ${nextState}, current Appstate is : ${currentState}`);
                }
                break;
            case 1:
                if (currentState > nextState) {
                    //backward
                    console.log("middle back");
                    this.setState(
                      {
                        addressBarAnimation: Animations.AddressBarDownSome,
                        packetAnimation: Animations.AddressBarDownSome,
                        showDNSResponseLine: true,
                      });
                } else if (nextState > currentState) {
                    //forward
                    this.props.moveGlobalState('next');
                }
                break;
            case 2:

                    //http packet shown by state change to 2 already.
                    this.setState(
                      {
                        addressBarAnimation: Animations.AddressBarUpSome,
                        packetAnimation: Animations.AddressBarUpSome,
                        showGetPacket: true,
                        showLaptop: true,
                        showServer: false,
                        showDNSResponseLine: false,
                      });
                    
                
                break;
            case 3:

                    this.setState(
                      {
                        addressBarAnimation: Animations.AddressBarUpSome,
                        packetAnimation: Animations.AddressBarUpSome,
                        showGetPacket: true,
                        showLaptop: false,
                        showServer: true,
                        showDNSResponseLine: false,
                      });
                
                break;
            case 4:

                    this.setState(
                      {
                        addressBarAnimation: Animations.AddressBarUpSome,
                        packetAnimation: Animations.AddressBarUpSome,
                        showResponsePacket: true,
                        showLaptop: false,
                        showServer: true,
                        showDNSResponseLine: false,
                      });
                
                break;
            case 5:
                  //forward
                  this.setState(
                    {
                      addressBarAnimation: Animations.AddressBarUpSome,
                      packetAnimation: Animations.AddressBarUpSome,
                      showResponsePacket: true,
                      showLaptop: true,
                      showServer: false,
                      showDNSResponseLine: false,
                    });
              
              break;
            case maxAppSate: //do final animations (if any) and move to next screen.
                if (currentState > nextState) {
                    console.error(`Cannot come from a bigger state to the maxAppState. next AppState is: ${nextState}, current Appstate is : ${currentState}`);
                } else if (nextState > currentState) {
                    console.log("thou shalt exit screen to nexx");
                    this.setState(
                    {
                      addressBarAnimation: Animations.AddressBarDownSome,
                      packetAnimation: Animations.AddressBarDownSome,
                      showRendered: true,
                      showResponsePacket: false,
                    });
                   this.props.moveGlobalState('next');
                    //this.props.moveGlobalState('next');
                }
                break;
            default:
                console.error(`Unknown currentAppState has been triggered, next AppState is: ${nextState}, current Appstate is :${currentState}`);
        }
    //set the state enevtually - shitty workaround to hide the suddently appearing box in screenstate 2.
    this.setState({ currentAppState: nextState});
  }

  render() {

    //generate get packet:
    var packet_table_render = [];
    var packet_table_render_data = [];

    for(var key in this.packet_table_data){
        packet_table_render.push(
            <tr><td><b>{key}</b></td><td>:</td><td>{this.packet_table_data[key]}</td></tr>
        )
    }
    //done with the basic list, now the inner table that represents http:
    for (var http_key in this.packet_table_data_data){
      packet_table_render_data.push(
        <tr><td>{this.packet_table_data_data[http_key]}</td></tr>
      )
    }

    //generate response packet:
    //generate response packet:
    var packet_table_render_response = [];
    var packet_table_render_data_response = [];

    for(var key_response in this.packet_table_data_response){
        packet_table_render_response.push(
            <tr><td><b>{key_response}</b></td><td>:</td><td>{this.packet_table_data_response[key_response]}</td></tr>
        )
    }
    //done with the basic list, now the inner table that represents http:
    for (var http_key_response in this.packet_table_data_response_data){
      packet_table_render_data_response.push(
        <tr><td>{this.packet_table_data_response_data[http_key_response]}</td></tr>
      )
    }
    
    return (
      <div>
      <div className="addressBarContainer">
        <VelocityComponent animation={this.state.addressBarAnimation}
                           begin={(elem) => {setAnimationState(elem);}}
                           complete={(elem) => {removeAnimationState(elem);}}>
            <AddressBar text="https://www.google.co.uk/" animationClassName={this.state.addressBarAnimationClass} withAnimation={this.state.animateTextBox}/>

        </VelocityComponent>
      </div>
        <VelocityComponent animation={this.state.packetAnimation}
                     begin={(elem) => {setAnimationState(elem);}}
                     complete={(elem) => {removeAnimationState(elem);}}>
        <div className="centralizer">
          <div className="imagealigner">
          <VelocityTransitionGroup enter={{animation: "fadeIn"}}>
          {(this.state.showLaptop) &&
            <img src={laptopImg} className="leftrightimages"/>
          }
          </VelocityTransitionGroup>
          </div>
          {this.state.showGetPacket &&
            <table className="httppacket">
              {packet_table_render}
              <tr><td><b>data</b></td><td>:</td><td>{packet_table_render_data}</td></tr>
            </table>
          }
          {this.state.showResponsePacket &&
            <table className="httppacket">
              {packet_table_render_response}
              <tr><td><b>data</b></td><td>:</td><td>{packet_table_render_data_response}</td></tr>
            </table>
          }
          <div className="imagealigner">
          <VelocityTransitionGroup enter={{animation: "fadeIn"}} >
          {this.state.showServer &&
            <img src={serverImg} className="leftrightimages"/>
          }
          </VelocityTransitionGroup>
          </div>
          {this.state.showDNSResponseLine && 
            <div className="centralizer">
              <div className="belowbar">
                www.google.co.uk - 74.125.206.94
              </div>
            </div>
          }
        </div>
      </VelocityComponent>
      
      

      
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
