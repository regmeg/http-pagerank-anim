/**
Main application for the Interactive Presentation
**/
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import { VelocityTransitionGroup, VelocityComponent } from 'velocity-react';
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Animations from './components/Animations';
import AddressBarPage from './components/AddressBarPage';
import DNSPage from './components/DNSPage';
import GoogleHome from './components/GoogleHome';
import GoogleWebGraph from './components/GoogleWebGraph';
import './static/css/App.css';
import { getAnimationState, setAnimationState, removeAnimationState, forceAnimationState}  from './components/GlobalAppState';

//Define the main App component
class App extends Component {

//define the constuctor of the isntance
  constructor(props) {
    super(props);

    this.state = {
      currentGloabalState: 0,
      currentView: null,
      tranistionName: 'background-flash',
    };

    //bind methods
    this._handleGlobalStateChange = this._handleGlobalStateChange.bind(this);

  }
    //define something just before component mounts
  componentWillMount(){
    this.setState({
      currentView:<AddressBarPage moveGlobalState = {this._handleGlobalStateChange}/>,
    });
  }

  //define something just after the component has rendered.
  componentDidMount() {
  }



  //Custom functions

//Handle global state - function to jump between view componenets, which are independent of each other.
  _handleGlobalStateChange(direction){
    console.log('calling globalstate');
        //set the max state here
        const maxAppSate = 2;
        //save last state
        const currentState = this.state.currentGloabalState;
        let nextState;

        //set the new state based on dirrection
        if      (direction === 'previous') {
            nextState = (currentState <= 0) ? 0 : currentState - 1;
        } else if (direction === 'next') {
            nextState = (currentState >= maxAppSate) ? maxAppSate : currentState + 1;
        }


          console.log(`[APP] next GlobalState is: ${nextState}, current GlobalState is: ${currentState}`);

          //based on state decide which view to generate
          switch(nextState) {

               case 0:
                   // if we come back from a bigger state, set the initial view
                   if (currentState > nextState) {
                     this.setState({
                       currentView: <AddressBarPage key={'AddressBarPage'} moveGlobalState = {this._handleGlobalStateChange} />,
                     //tranistionName: "",
                   });
                     //if we come from a smaller state, it is a bug, log an error.
                   } else if (nextState > currentState) {
                      console.error(`Cannot come from a smaller state to the 0 state. next GlobalState is: ${nextState}, current GlobalState is : ${currentState}`);
                   }
                   break;
              case 1:
                   // if we come back from a bigger state, set the initial view
                   if (currentState > nextState) {
                     this.setState({
                       currentView: <AddressBarPage key={'AddressBarPage'} moveGlobalState = {this._handleGlobalStateChange} />,
                     //tranistionName: "",
                   });
                   } else if (nextState > currentState) {
                      this.setState({
                       currentView: <DNSPage key={'DNSPage'} moveGlobalState = {this._handleGlobalStateChange} />,});
                   }
                   break;
              case maxAppSate:
                      //if we come from a bigger state, it is a bug, log an error.
                      if (currentState > nextState) {
                        console.error(`Cannot come from a bigger state to the maxAppState. next GlobalState is: ${nextState}, current GlobalState is : ${currentState}`);
                      // if we come back from a smaller state, trigger the next view
                      } else if (nextState > currentState) {
                        this.setState({
                          currentView:
                           <GoogleWebGraph  key={'GoogleWebGraph'} moveGlobalState = {this._handleGlobalStateChange} />,
                          //tranistionName: "",
                        });
                      }
                      break;
               default:
                   console.error(`Unknown currentAppState has been triggered, next AppState is: ${nextState}, current Appstate is :${currentState}`);
     }

     //update the state iteself
     this.setState({ currentGloabalState: nextState});
}

 //Render everying
  render() {
    return (
        <div>
          {/*define a React transition continaier for when component enters, leaves or just appears.*/}
          <ReactCSSTransitionGroup
            transitionName={this.state.tranistionName}
            transitionAppear
            transitionAppearTimeout={500}
            transitionEnter
            transitionEnterTimeout={500}
            transitionLeave
            transitionLeaveTimeout={500}>
              {this.state.currentView}
           </ReactCSSTransitionGroup>
      </div>
    );
  }
}

//define propTypes
App.propTypes = {
};


export default App;
