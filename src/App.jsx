/**
Main application for the Interactive Presentation
**/
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import { VelocityTransitionGroup, VelocityComponent } from 'velocity-react';
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Animations from './components/Animations';
import GoogleHome from './components/GoogleHome';
import GoogleWebGraph from './components/GoogleWebGraph';
import GoogleSearchResults from './components/GoogleSearchResults';
import './static/css/App.css';
import { getAnimationState, setAnimationState, removeAnimationState, forceAnimationState}  from './components/GlobalAppState';

//Define the main App component
class App extends Component {

//define the constuctor of the isntance
  constructor(props) {
    super(props);

    this.state = {
      maxAppSate: 2,
      currentGloabalState: 0,
      localTimesAccesedCntr:null,
      currentView: null,
      tranistionName: 'background-flash',
      searchTerm: null,
    };

    //bind methods
    this._handleGlobalStateChange = this._handleGlobalStateChange.bind(this);
    this._saveSearch = this._saveSearch.bind(this);

  }
    //define something just before component mounts
  componentWillMount(){
    const TimesAccesedCntr = new Array(this.state.maxAppSate + 1);
    TimesAccesedCntr.fill(0);
    this.setState({
      currentView:<GoogleHome key={'GoogleHome'} saveSearch={this._saveSearch} moveGlobalState = {this._handleGlobalStateChange} />,
    localTimesAccesedCntr: TimesAccesedCntr,
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
        const maxAppSate = this.state.maxAppSate;
        const localTimesAccesedCntr = this.state.localTimesAccesedCntr;
        //save last state
        const currentState = this.state.currentGloabalState;
        let nextState;
        let key;

        //set the new state based on dirrection
        if      (direction === 'previous') {
            nextState = (currentState <= 0) ? 0 : currentState - 1;
        } else if (direction === 'next') {
            nextState = (currentState >= maxAppSate) ? maxAppSate : currentState + 1;
        }


          console.log(`next GlobalState is: ${nextState}, current GlobalState is: ${currentState}`);
          //based on state decide which view to generate
          switch(nextState) {

               case 0:
                   //forceAnimationState(true);
                   key = 'GoogleHome';
                   // if we come back from a bigger state, set the initial view
                   if (currentState > nextState) {
                     this.setState({
                       currentView: <GoogleHome key={key}  saveSearch={this._saveSearch} moveGlobalState = {this._handleGlobalStateChange} />,
                     //tranistionName: "",
                   });
                     //if we come from a smaller state, it is a bug, log an error.
                   } else if (nextState > currentState) {
                      console.error(`Cannot come from a smaller state to the 0 state. next GlobalState is: ${nextState}, current GlobalState is : ${currentState}`);
                   }
                   break;
            case 1:
                       //forceAnimationState(true);
                       key =  `GoogleWebGraph_${localTimesAccesedCntr[nextState]}`;
                       this.setState({
                         currentView: <GoogleWebGraph key={key} keyString={key} searchTerm={this.state.searchTerm} moveGlobalState ={this._handleGlobalStateChange} />,
                         //tranistionName: "",
                       });
                     break;
              case maxAppSate:
                      key = 'GoogleSearchResults';
                      //if we come from a bigger state, it is a bug, log an error.
                      if (currentState > nextState) {
                        console.error(`Cannot come from a bigger state to the maxAppState. next GlobalState is: ${nextState}, current GlobalState is : ${currentState}`);
                      // if we come back from a smaller state, trigger the next view
                      } else if (nextState > currentState) {
                        //forceAnimationState(true);
                        this.setState({
                          currentView: <GoogleSearchResults  key={key} searchTerm={this.state.searchTerm} moveGlobalState = {this._handleGlobalStateChange} />,
                          //tranistionName: "",
                        });
                      }
                      break;
               default:
                   console.error(`Unknown currentAppState has been triggered, next AppState is: ${nextState}, current Appstate is :${currentState}`);
     }

     //update the state iteself
     this.setState({ currentGloabalState: nextState});
     localTimesAccesedCntr[nextState] += 1;
     console.log('localTimesAccesedCntr is');
     console.log(this.state.localTimesAccesedCntr);
}

_saveSearch(term){
  //console.log(`saveing term ${term}`);
  this.setState({ searchTerm: term});
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
