/**
Google Home page component
**/
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import { VelocityTransitionGroup, VelocityComponent, velocityHelpers } from 'velocity-react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Animations from './Animations';
import server from '../static/img/server_blue.png';
import '../static/css/GoogleHome.css';
import { getAnimationState, setAnimationState, removeAnimationState, forceAnimationState}  from './GlobalAppState';

const initialState = {
  currentAppState: 0,
  searchbar_class: 'Google-searchbar Google-searchInput-blur',
  serverLogo_class: 'server-logo',
  inputValue: '',
  displayValue: 'Press search',
  GoogleLogoOut: null,
  GoogleSearchBarTransform: null,
  SearchIconAnimation: null,
  HideElemAnim: null,
  RenderServerLogo: null,
  ServerImgEnterAnim: null,
};


//Define the main App component
export default class GoogleHome extends Component {

//define the constuctor of the isntance. In fact, there is no a need for a constructor, if arrow functions and local class properties are defined on their own, babel will transpile those exactlt the same way and bind them automatically. But that approach is still considered somewhat experimental.
  constructor(props) {
    super(props);
    //set states
    this.state = initialState;

    //bind custom methods to refer to this object. If they were defined as = () => {} arrow functions, this would have had been bound to the instance automatically by Babel.
    //Somme functions dont really need to bound, as they will be called in the right scope due to the invocation patern within the object, but just in case they will be used different, they were bound as well.
    this._handleKeyDownandSetState = this._handleKeyDownandSetState.bind(this);
    this._handleChange = this._handleChange.bind(this);

    this._changeParentClassToFocus = this._changeParentClassToFocus.bind(this);
    this._changeParentClassToFocusInit = this._changeParentClassToFocus.bind(this);
    this._changeParentClassToBlur  = this._changeParentClassToBlur.bind(this);
    this._changeParentClassToBlurInit  = this._changeParentClassToBlur.bind(this);
    this._changeParentClassToFire  = this._changeParentClassToFire.bind(this);
    this._changeServerLogoClassToStill   = this._changeServerLogoClassToStill.bind(this);
    this._changeServerLogoClassToScaling = this._changeServerLogoClassToScaling.bind(this);
    this._changeParentClassToMoveFurther = this._changeParentClassToMoveFurther.bind(this);
    this._changeParentClassToFlcikerFurther = this._changeParentClassToFlcikerFurther.bind(this);

    this._triggerSearch        = this._triggerSearch.bind(this);
    this._triggerSearchReverse = this._triggerSearchReverse.bind(this);
    this._spwanServer          = this._spwanServer.bind(this);
    this._spwanServerReverse   = this._spwanServerReverse.bind(this);
    this._firePacket           = this._firePacket.bind(this);
    this._flashServer          = this._flashServer.bind(this);

    this.dummyFunc = this.dummyFunc.bind(this);
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
          //set the max state here
          const maxAppSate = 3;
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

            //based on state perform animation or animation reversal, as well as reverse animation
            switch(nextState) {

                 case 0:

                   // "initial state - reset everything"
                     this.setState(initialState);

                     // if we come back from a bigger state, reverse that bigger state animation
                     if (currentState > nextState) {
                       this._triggerSearchReverse();
                       //if we come from a smaller state, it is a bug, log an error.
                     } else if (nextState > currentState) {
                        console.error(`Cannot come from a smaller state to the 0 state. next AppState is: ${nextState}, current Appstate is : ${currentState}`);
                     }
                     break;

                 case 1: // "search_triggered"
                       // if we come back from a bigger state, reverse that bigger state animation
                       if (currentState > nextState) {
                         this._spwanServerReverse();
                         //if we come from a smaller state, apply the animation of this state
                       } else if (nextState > currentState) {
                         this._triggerSearch();
                       }
                       break;
                 case 2: // "Server spawned"
                       // if we come back from a bigger state, reverse that bigger state animation
                       if (currentState > nextState) {
                         this._spwanServer_reverse();
                         //if we come from a smaller state, apply the animation of this state
                       } else if (nextState > currentState) {
                         this._spwanServer();
                       }
                     break;

                case maxAppSate: //Fire the packet and move to the next view
                        // if we come back from a bigger state, reverse that bigger state animation
                        if (currentState > nextState) {
                          console.error(`Cannot come from a bigger state to the maxAppState. next AppState is: ${nextState}, current Appstate is : ${currentState}`);
                        } else if (nextState > currentState) {
                          //fire packaet
                          this._firePacket();
                          setTimeout(() => {     this.props.moveGlobalState('next');    }, 100);
                        }
                        break;
                 default:
                     console.error(`Unknown currentAppState has been triggered, next AppState is: ${nextState}, current Appstate is :${currentState}`);
       }

       //set the state enevtually
        this.setState({ currentAppState: nextState});
  }

/***************************************************************************************
//Fcunctions for changing classes
****************************************************************************************/
  _changeParentClassToFocus () {
    this.setState({ searchbar_class: 'Google-searchbar Google-searchInput-focus'});
   }

   _changeParentClassToBlur () {
     this.setState({ searchbar_class: 'Google-searchbar Google-searchInput-blur'});
    }

    _changeParentClassToFire () {
      this.setState({ searchbar_class: 'Google-searchbar Google-searchInput-fire flicker'});
     }


   _changeParentClassToFlcikerFurther() {
        this.setState({ searchbar_class: 'Google-searchbar Google-searchInput-launch-final flicker-further'});
     }

   _changeParentClassToMoveFurther() {
     this.setState({ searchbar_class: 'Google-searchbar Google-searchInput-launch-final flicker-in-move'});
    }



     _changeServerLogoClassToStill () {
       this.setState({ serverLogo_class: 'server-logo'});
      }

      _changeServerLogoClassToScaling() {
        this.setState({ serverLogo_class: 'server-logo scale'});
       }

/***************************************************************************************
//Fcunctions for triggering animation and reverses
****************************************************************************************/
    _triggerSearch () {
      this._changeParentClassToFocus = this.dummyFunc.bind(this);
      this._changeParentClassToBlur = this.dummyFunc.bind(this);
      this.setState({
        currentAppState: 1,
        GoogleLogoOut: Animations.GoogleLogoOut,
        GoogleSearchBarTransform: Animations.GoogleSearchBarTransform,
        HideElemAnim: Animations.HideElemAnim,
        SearchIconAnimation: Animations.SearchIconAnimation,
      });
      //set timeout for drawing the flame
      const _this = this;
      setTimeout(() => {_this._changeParentClassToFire();}, 400);
      //pus the term to parent
      this.props.saveSearch(this.state.inputValue);
    }

    _triggerSearchReverse () {
      this._changeParentClassToFocus = this._changeParentClassToFocusInit.bind(this);
      this._changeParentClassToBlur = this._changeParentClassToBlurInit.bind(this);
      this.setState({
        GoogleSearchBarTransform: 'reverse',
        GoogleLogoOut: 'reverse',
        HideElemAnim: 'reverse',
        SearchIconAnimation: 'reverse',
      });
      //reverse drawing the flame - unecessary, as it is reset with the initialState
    }

    _spwanServer () {
      this.setState({RenderServerLogo: true});
      const _this = this;
      setTimeout(() => {_this.setState({ServerImgEnterAnim: Animations.ServerImgEnterAnim});}, 10);
      setTimeout(() => {_this._changeServerLogoClassToScaling();}, 1480);
    }

    _spwanServerReverse () {
      this.setState({ServerImgEnterAnim: 'reverse'});
      this._changeServerLogoClassToStill();
      const _this = this;
      setTimeout(() => {
        _this.setState({RenderServerLogo: null});
        forceAnimationState(true); //force animation state, as it wont finish due to render set to null
      }, 200);

    }

    _firePacket() {
      console.log('firing packet');
      this._changeParentClassToMoveFurther();
      this._changeServerLogoClassToStill();
      //setTimeout(() => {     _this._changeParentClassToFlcikerFurther();    }, 200);
    }

    _flashServer() {
      this.setState({
        ServerImgEnterAnim: Animations.FlashServer,
      });
    }

    dummyFunc() {
      this.dummy = this.dummy;
    }

/***************************************************************************************
//Mict Custom functions
****************************************************************************************/
//function capturing what is put into the search bar
    _handleChange (event) {
      //console.log(`event.target.value} is ${event.target.value}}`);
      this.setState({ inputValue: event.target.value});
    }


 //Render everying
  render() {
    return (
      <div className="GoogleHome">

        <VelocityComponent animation={this.state.GoogleLogoOut} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);} }>

          <div className="Google-logo" >
            <div className="logo-subtext">{'UK'}</div>
          </div>

        </VelocityComponent>

        <VelocityComponent animation={this.state.GoogleSearchBarTransform} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);} }>

          <div className={this.state.searchbar_class}>

            <VelocityComponent animation={this.state.HideElemAnim} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);} }>

              <input type="text" className="Google-searchInput" onFocus={this._changeParentClassToFocus} onBlur={this._changeParentClassToBlur} onChange={this._handleChange}/>

            </VelocityComponent>

            <VelocityComponent animation={this.state.HideElemAnim} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);} }>

              <span className="speach"/>

            </VelocityComponent>

            <VelocityComponent animation={this.state.SearchIconAnimation} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);} }>

              <span className="search" onClick={this._triggerSearch} ><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></span>

            </VelocityComponent>

          </div>

        </VelocityComponent>

        {/*f card set to display, display it, if not, return null.*/}
        {this.state.RenderServerLogo
            ?(
              <VelocityComponent animation={this.state.ServerImgEnterAnim} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}} >
                <img src={server} className={this.state.serverLogo_class} alt="logo" />
              </VelocityComponent>
             )
            : null}
      </div>
    );
  }
}

//define propTypes
GoogleHome.propTypes = {
  moveGlobalState: React.PropTypes.func,
  saveSearch: React.PropTypes.func,
};

GoogleHome.defaultProps = {
  moveGlobalState: null,
  saveSearch: null,
};
