/**
Main application for the Interactive Presentation
**/
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import { VelocityTransitionGroup, VelocityComponent } from 'velocity-react';
import React, { Component } from 'react';
import Animations from './components/Animations';
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
      firstlyRenderedInitialView: true,
      currentGloabalState: 0,
      currentView: null,
      animation: null,
      enterAnim: null,
    };

    //bind methods
    this._handleGlobalStateChange = this._handleGlobalStateChange.bind(this);

  }
    //define something just before component mounts
  componentWillMount(){
    }

  //define something just after the component has rendered.
  componentDidMount() {
  }


  //Custom functions

//Handle global state - function to jump between view componenets, which are independent of each other.
  _handleGlobalStateChange(direction){
    console.log('calling globalstate');
      // if animation still in progress. just return
      //if (getAnimationState() === false) return;
        //set the max state here
        const maxAppSate = 1;
        //save last state
        const currentState = this.state.currentGloabalState;

        //set the new state based on dirrection
        if      (direction === 'previous') {
            (this.state.currentGloabalState <= 0)
            ? this.setState({ currentGloabalState: 0})
            : this.setState({ currentGloabalState: this.state.currentGloabalState - 1});
        } else if (direction === 'next') {
            (this.state.currentGloabalState >= maxAppSate)
             ?
             this.setState({ currentGloabalState: maxAppSate})
             :
             this.setState({ currentGloabalState: this.state.currentGloabalState + 1});
        }

        const nextState = this.state.currentGloabalState;
        this.setState({ firstlyRenderedInitialView: false});

          console.log(`next GlobalState is: ${nextState}, current GlobalState is: ${currentState}`);

          //based on state decide which view to generate
          switch(nextState) {

               case 0:
                   // if we come back from a bigger state, reverse that bigger state animation
                   if (currentState > nextState) {
                     this.setState({ currentView: <GoogleHome moveGlobalState = {this._handleGlobalStateChange} />});
                     //if we come from a smaller state, it is a bug, log an error.
                   } else if (nextState > currentState) {
                      console.error(`Cannot come from a smaller state to the 0 state. next GlobalState is: ${nextState}, current GlobalState is : ${currentState}`);
                   }
                   break;
              case maxAppSate: //Fire the packet and move to the next view
                      // if we come back from a bigger state, reverse that bigger state animation
                      if (currentState > nextState) {
                        console.error(`Cannot come from a bigger state to the maxAppState. next GlobalState is: ${nextState}, current GlobalState is : ${currentState}`);
                      } else if (nextState > currentState) {
                        this.setState({
                          enterAnim: Animations.BackgroundFlash,
                          currentView:
                        // <VelocityComponent animation={Animations.BackgroundFlash} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);} }>
                        //   <GoogleWebGraph moveGlobalState = {this._handleGlobalStateChange} />
                        // </VelocityComponent>});
                          <GoogleWebGraph moveGlobalState = {this._handleGlobalStateChange} />,
                        });
                        // move to the next view

                      }
                      break;
               default:
                   console.error(`Unknown currentAppState has been triggered, next AppState is: ${nextState}, current Appstate is :${currentState}`);
     }
}

 //Render everying
  render() {
    const ViewToRender = this.state.firstlyRenderedInitialView ? <GoogleHome moveGlobalState={this._handleGlobalStateChange}/> : this.state.currentView;
    return (
      <div>
        <VelocityTransitionGroup enter={this.state.enterAnim}>
          {ViewToRender}
        </VelocityTransitionGroup>
      </div>
    );
  }
}

//define propTypes
App.propTypes = {
};


export default App;
