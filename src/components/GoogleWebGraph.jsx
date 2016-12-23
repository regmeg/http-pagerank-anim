/**
Container for the google web graph animation
**/
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import { VelocityTransitionGroup, VelocityComponent, velocityHelpers } from 'velocity-react';
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Line from './Line';
import logo from '../static/img/logo.svg';
import '../static/css/GoogleWebGraph.css';
import { getAnimationState, setAnimationState, removeAnimationState, forceAnimationState}  from './GlobalAppState';
import Animations from './Animations';
import AnimatedDot from './AnimatedDot';

const dotsCount = 30;
const lines = [];
const initialState = {
  currentAppState: 1,
  renderLayout:null,
  flashAnim: null,
  dotCss: 'dot',
  renderLines: false,
  linesEnterLogo: null,
  SearchResEnter: null,
  dotsAnimation: null,
};
//Define the main App component
export default class GoogleWebGraph extends Component {
//define the constuctor of the isntance
  constructor(props) {
    super(props);
    //define states
    this.state = initialState;
    //define instance vars
    this.animatedDots = [];
    this.lines = [];

    //bind methods
    this._handleKeyDownandSetState = this._handleKeyDownandSetState.bind(this);

    this._exapandTheGraph = this._exapandTheGraph.bind(this);
    this._removeFlash = this._removeFlash.bind(this);
    this._drawLines = this._drawLines.bind(this);
    this._popSearchResults =   this._popSearchResults.bind(this);
    this._popSearchResultsReverse =   this._popSearchResultsReverse.bind(this);
    this._animateDotJump  = this._animateDotJump.bind(this);
    this._hingligthDots = this._hingligthDots.bind(this);
    this._hingligthDotsReverse = this._hingligthDotsReverse.bind(this);

    this._moveFractionReverse = this._moveFractionReverse.bind(this);
    this._moveFraction = this._moveFraction.bind(this);
  }

/*
Add listeners for the window keyEvents.
*/
  componentWillMount() {
    window.addEventListener('keydown', this._handleKeyDownandSetState, false);

  }

  //define something just after the component has rendered.
  componentDidMount() {
    this._exapandTheGraph();
    setTimeout(() => {     this._removeFlash();    }, 140);
    setTimeout(() => {     this._drawLines();    }, 12000);

  }

//listener have to be removed after the View component has unmounted, otherwise the state of unmounted component will be still triggered, which can break the app and throw errors.
  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleKeyDownandSetState, false);
  }

//CUstom functions
/***************************************************************************************
//Custom function for handling keyEvents and updating state and animation based on it.
****************************************************************************************/
//function for handling keyevents and state of the presentation - a state machine
    _handleKeyDownandSetState (event){
        // if animation still in progress. or wrong key is pressed
        if (getAnimationState() === false || (event.keyCode !== 37 && event.keyCode !== 39)) return;
          //set the max state here
          const maxAppSate = 7;
          //save last state
          const currentState = this.state.currentAppState;
          let nextState;

          //set the new state
          //37 is if back arrow is pressed. 39 if foward key. Add or remove state corespondingly
          if      (event.keyCode === 37) {
              nextState = (currentState <= 0) ? 0 : currentState - 1;
          } else if (event.keyCode === 39) {
              nextState = (currentState >= maxAppSate) ? maxAppSate : currentState + 1;
          }

            console.log(`next AppState is: ${nextState}, current Appstate is: ${currentState}`);
            //set the state eventually
             this.setState({ currentAppState: nextState});

            //based on state perform animation or animation reversal, as well as reverse animation
            switch(nextState) {

                 case 0: //state for simply jumping to the previous view
                     // if we come back from a bigger state
                     if (currentState > nextState) {
                       //move to the previous view
                       this.props.moveGlobalState('previous');
                       //if we come from a smaller state, it is a bug, log an error.
                     } else if (nextState > currentState) {
                        console.error(`Cannot come from a smaller state to the 0 state. next AppState is: ${nextState}, current Appstate is : ${currentState}`);
                     }
                     break;


                  case 1: // Initail graph animation has finished
                         // if we come back from a bigger state, reverse that bigger state animation
                         if (currentState > nextState) {
                          this._popSearchResultsReverse();
                           //if we come from a smaller state, apply the animation of this state
                         } else if (nextState > currentState) {//wont get here, as at state zero reverse is going to happen, this state is not going to be set.
                           // this._spwanServer_reverse();
                         }
                       break;

                       case 2: // Search results enter
                              // if we come back from a bigger state, reverse that bigger state animation
                              if (currentState > nextState) {
                                this._animateDotJumpReverse(); //animate set reverse and get to state 1
                                //if we come from a smaller state, apply the animation of this state
                              } else if (nextState > currentState) {
                                this._popSearchResults();
                              }
                            break;

                       case 3: // Jump around Dots
                              // if we come back from a bigger state, reverse that bigger state animation
                              if (currentState > nextState) {
                                this._hingligthDotsReverse();
                               // this._spwanServer_reverse();
                                //if we come from a smaller state, apply the animation of this state
                              } else if (nextState > currentState) {
                                this._animateDotJump();
                              }
                            break;

                            case 4: // Jump around Dots
                                   // if we come back from a bigger state, reverse that bigger state animation
                                   if (currentState > nextState) {
                                     this._moveFractionReverse();
                                     //if we come from a smaller state, apply the animation of this state
                                   } else if (nextState > currentState) {
                                     this._hingligthDots();
                                   }
                                 break;
                           case 5: // Move fraction to the search result list
                                  // if we come back from a bigger state, reverse that bigger state animation
                                  if (currentState > nextState) {
                                   this._changeFractionToLinkReverse();
                                    //if we come from a smaller state, apply the animation of this state
                                  } else if (nextState > currentState) {
                                    this._moveFraction();
                                  }
                                break;
                                case 6: // Move fraction to the search result list
                                       // if we come back from a bigger state, reverse that bigger state animation
                                       if (currentState > nextState) {
                                        // this._spwanServer_reverse();
                                         //if we come from a smaller state, apply the animation of this state
                                       } else if (nextState > currentState) {
                                         this._changeFractionToLink();
                                       }
                                     break;

                case maxAppSate: //trigger last animation and fire next state
                        // if we come back from a bigger state, reverse that bigger state animation

                        if (currentState > nextState) {
                          console.error(`Cannot come from a bigger state to the maxAppState. next AppState is: ${nextState}, current Appstate is : ${currentState}`);
                        } else if (nextState > currentState) {
                          this._exitSearchResults();
                          // move to the next view
                          this.props.moveGlobalState('next');
                        }
                        break;
                 default:
                     console.error(`Unknown currentAppState has been triggered, next AppState is: ${nextState}, current Appstate is :${currentState}`);
       }

  }

  /***************************************************************************************
  //Fcunctions for changing classes
  ****************************************************************************************/

  /***************************************************************************************
  //Fcunctions for triggering animation and reverses
  ****************************************************************************************/
  _exapandTheGraph() {
    this.setState({ renderLayout: true, dotsAnimation: 'initial-animation' });
  }

  _removeFlash() {
    //console.log('removing flash bg');
    this.setState({ flashAnim: Animations.BackgroundFlash });
  }

  _drawLines() {
    //get specsStart
    const specs = [];
    for (let i = 0; i < dotsCount; i+=1) {
      specs.push(this.animatedDots[i].getBoundingClientRect());
    }
    //generate lines
      for (let i = 0; i < dotsCount; i+=1) {
      const dotStart = this.animatedDots[i];
      const specsStart = specs[i];
          for (let j = i+1; j < dotsCount; j+=1) {
            const dotFinish = this.animatedDots[j];
            const specsFinish = specs[j];
            lines.push(<Line animation={this.state.linesEnterLogo} key={(dotsCount*(i+1))+(j+1)} from={{x:specsStart.right-(specsStart.width/2),y:specsStart.bottom-(specsStart.width/2)}} to={{x:specsFinish.right-(specsStart.width/2),y:specsFinish.bottom-(specsStart.width/2)}}/>);

          }
      }

      this.setState({ linesRen: lines });

  }

  _popSearchResults() {
        this.setState({ SearchResEnter: Animations.SearchResEnter});
  }

  _popSearchResultsReverse() {
        this.setState({ SearchResEnter: 'reverse'});
  }

  _animateDotJump() {
      this.setState({dotsAnimation: 'jump-dots'});
  }
  _animateDotJumpReverse()
  {
    this.setState({dotsAnimation: 'nothin'});
    this._popSearchResultsReverse();
    this.setState({ currentAppState: 1});
  }


  _hingligthDots() {
    this.setState({dotsAnimation: 'highlight-dots'});
  }

  _hingligthDotsReverse() {
    this.setState({ dotsAnimation: 'reverse-highlight'});
  }

  _moveFraction() {
    //console.log('moving fraction');
    this.setState({dotsAnimation: 'move-fraction'});
  }

  _moveFractionReverse() {
    //console.log('reversing fraction');
   this.setState({dotsAnimation: 'reverse-move-fraction'});
  }

  _changeFractionToLink() {
    //console.log('moving fraction');
    this.setState({dotsAnimation: 'fraction-to-links'});
  }
  _changeFractionToLinkReverse() {
    //console.log('moving fraction');
    this.setState({dotsAnimation: 'reverse-fraction-to-links'});
  }

  _exitSearchResults() {
        this.setState({ SearchResEnter: Animations.existSearchRes,
                        dotsAnimation: 'exit-fraction-links'});
  }



 //Render everying
  render() {
    //Animations
    const containerAnim = this.state.renderLayout ? Animations.DotscontainerAnimation : null;
    //const containerAnim = null;
    //and generate dots
    const _this = this;
    const dotsHtml = [];
                      // {renderLines ? {this.lines: null }
    for (let i = 0; i < dotsCount; i+=1) {
      dotsHtml.push(<AnimatedDot dotsAnimation={this.state.dotsAnimation} dotCss={this.state.dotCss} that={_this} id={i} key={i}/>);
    }
    return (
              <VelocityComponent animation={containerAnim} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}}>
                <div className="dot_container">
                  <VelocityComponent animation={this.state.flashAnim} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}}>
                  <div  className="flash_container flash"/>
                  </VelocityComponent>
                  <ReactCSSTransitionGroup
                    transitionName="line-flash"
                    transitionAppear
                    transitionAppearTimeout={800}
                    transitionEnter
                    transitionEnterTimeout={800}
                    transitionLeave
                    transitionLeaveTimeout={300}>
                      {this.state.linesRen}
                      {dotsHtml}
                   </ReactCSSTransitionGroup>
                   <VelocityComponent animation={this.state.SearchResEnter} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}} >
                     <div className="searcRes">
                       <div className="search">
                         <div>{this.props.searchTerm}</div><span className="searchmin"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></span>
                       </div>
                       <div className="list">
                         <ul>
                           {/*<li>{'item 1'}</li>
                         <li>{'item 2'}</li>*/}
                        </ul>
                      </div>
                    </div>
                   </VelocityComponent>
                 </div>
              </VelocityComponent>
    );
  }
}
//define propTypes
GoogleWebGraph.propTypes = {
  moveGlobalState: React.PropTypes.func,
  searchTerm: React.PropTypes.string,
};

GoogleWebGraph.defaultProps = {
  moveGlobalState: null,
  searchTerm: 'how to pass in CS',
};
