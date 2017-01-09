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
import '../static/css/GoogleSearchResults.css';
import { getAnimationState, setAnimationState, removeAnimationState, forceAnimationState}  from './GlobalAppState';
import searcRes from './ResultData';
import Animations from './Animations';
import AnimatedDot from './AnimatedDot';
import link from '../static/img/a_link.png';
import linkLeftFirst from '../static/img/link-left-first.png';
import linkLeftSecond from '../static/img/link-left-second.png';
import linkRightFirst from '../static/img/link-right-first.png';
import linkRightSecond from '../static/img/link-right-second.png';
import longLink from '../static/img/longlink.png';
import server from '../static/img/server_red.png';
import serverRingBott from '../static/img/server_red_ring_bot.png';
import serverRingMid from '../static/img/server_red_ring_mid.png';
import serverRingTop from '../static/img/server_red_ring_top.png';

const dotsCount = 30;
const lines = [];
const initialState = {
  currentAppState: 1,
  animation: null,
  linkAnim: null,
  serverAnim: null,
  serverTopRingCss: 'link_imLeft',
  serverMidRingCss: 'link_imLeft',
  serverBotRingCss: 'link_imLeft',
  genIframe: null,

};
//Define the main App component
export default class GoogleSearchResults extends Component {
//define the constuctor of the isntance
  constructor(props) {
    super(props);
    //define states
    this.state = initialState;
    //define instance vars
    //this.searcResults = [];
    //bind methods
    this._handleKeyDownandSetState = this._handleKeyDownandSetState.bind(this);
    this._showLink =   this._showLink.bind(this);
    this._showLinkInit =   this._showLink.bind(this);
    this._showLinkReverse =   this._showLinkReverse.bind(this);
    this._showLinkReverseInit =   this._showLinkReverse.bind(this);
    this._OpenLink = this._OpenLink.bind(this);
    this._OpenLinkInit = this._OpenLink.bind(this);
    this._generateDocument = this._generateDocument.bind(this);
    this._OpenLinkReverse = this._OpenLinkReverse.bind(this);
    this._generateDocument = this._generateDocument.bind(this);
    this._generateDocumentReverse = this._generateDocumentReverse.bind(this);
    this._popDocument = this._popDocument.bind(this);
    this._popDocumentReverse = this._popDocumentReverse.bind(this);
    this._SrcollFrame = this._SrcollFrame.bind(this);

  }

/*
Add listeners for the window keyEvents.
*/
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

//CUstom functions
/***************************************************************************************
//Custom function for handling keyEvents and updating state and animation based on it.
****************************************************************************************/
//function for handling keyevents and state of the presentation - a state machine
    _handleKeyDownandSetState (event){
        // if animation still in progress. or wrong key is pressed
        if (getAnimationState() === false || (event.keyCode !== 37 && event.keyCode !== 39)) return;
          //set the max state here
          const maxAppSate = 4;
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
                        setTimeout(() => { this._showLinkReverse(  {   currentTarget:{  id:'res_2_id' } } ); }, 510 );
                        this._OpenLinkReverse( {   currentTarget:{  id:'res_2_id' } } );
                           //if we come from a smaller state, apply the animation of this state
                         } else if (nextState > currentState) {//wont get here, as at state zero reverse is going to happen, this state is not going to be set.
                           // this._spwanServer_reverse();
                         }
                       break;

                   case 2: // Initail graph animation has finished
                         // if we come back from a bigger state, reverse that bigger state animation
                         if (currentState > nextState) {
                          this._generateDocumentReverse();
                           //if we come from a smaller state, apply the animation of this state
                         } else if (nextState > currentState) {//wont get here, as at state zero reverse is going to happen, this state is not going to be set.
                           this._showLink(  {   currentTarget:{  id:'res_2_id' } } );
                           setTimeout(() => { this._OpenLink(
                             {
                               currentTarget:{
                                id:'res_2_id',
                                getElementsByClassName: () => (
                                  [
                                  {href:'http://faso.com/fineartviews/45871/failed-at-computer-science-succeeded-at-life'},
                                  ]
                                ),
                              },
                            },
                           );
                         }, 510);
                         }
                       break;

                       case 3: // Initail graph animation has finished
                             // if we come back from a bigger state, reverse that bigger state animation
                           if (currentState > nextState) {
                             this._popDocumentReverse();
                             //if we come from a smaller state, apply the animation of this state
                           } else if (nextState > currentState) {//wont get here, as at state zero reverse is going to happen, this state is not going to be set.
                             this._generateDocument();
                           }
                          break;

                case maxAppSate: //finish of the presentation, nowhere to move next

                        if (currentState > nextState) {
                          console.error(`Cannot come from a bigger state to the maxAppState. next AppState is: ${nextState}, current Appstate is : ${currentState}`);
                        } else if (nextState > currentState) {
                          this._popDocument();
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

  _showLink(e) {
        console.log('showing link');
        const imId = `${e.currentTarget.id}Im`;
        this.setState({[e.currentTarget.id]: Animations.LinkFadeOut, [imId]:Animations.LinkImFadeIn});
        forceAnimationState(true);
  }

  _showLinkReverse(e) {
      console.log('showing link reverse');
      const imId = `${e.currentTarget.id}Im`;
      this.setState({[e.currentTarget.id]: Animations.LinkFadeIn, [imId]:Animations.LinkImFadeOut});
      forceAnimationState(true);
  }

  _OpenLink(e) {
    this._showLink =   this._DummyFunc.bind(this);
    this._showLinkReverse =   this._DummyFunc.bind(this);
    this._OpenLink = this._DummyFunc.bind(this);
    console.log('opening link');
    console.log(e.currentTarget.getElementsByClassName('followLinks'));
    const imId = `${e.currentTarget.id}Im`;
    const idImLeftF = `${e.currentTarget.id}ImLeftF`;
    const idImRightF = `${e.currentTarget.id}ImRightF`;
    const idImLeftS = `${e.currentTarget.id}ImLeftS`;
    const idImRightS = `${e.currentTarget.id}ImRightS`;
    const idImLong = `${e.currentTarget.id}ImLong`;
    this.setState({currentAppState: 2, targetLink: e.currentTarget.getElementsByClassName('followLinks')[0].href, [imId]:Animations.TiggerLink, [idImLeftF]:Animations.TiggerLinkLeft, [idImRightF]:Animations.TiggerLinkRight, [idImLong]: {opacity:1} });
    setTimeout(() => {       this.setState({[idImLeftS]:Animations.TiggerLinkLeft , [idImRightS]:Animations.TiggerLinkRight }); }, 400);
    setTimeout(() => {       this.setState({ animation:Animations.MoveSearchWindow, [idImLong]:Animations.TranslateLink, serverAnim: Animations.TrasnlateServer, serverAnimTopRing: Animations.TrasnlateServer, serverAnimMidRing: Animations.TrasnlateServer, serverAnimBotRing: Animations.TrasnlateServer});    }, 700);

  }

  _OpenLinkReverse(e) {
    console.log('opening link reverse');
    const imId = `${e.currentTarget.id}Im`;
    const idImLeftF = `${e.currentTarget.id}ImLeftF`;
    const idImRightF = `${e.currentTarget.id}ImRightF`;
    const idImLeftS = `${e.currentTarget.id}ImLeftS`;
    const idImRightS = `${e.currentTarget.id}ImRightS`;
    const idImLong = `${e.currentTarget.id}ImLong`;
    this.setState({[idImLeftF]:'reverse', [idImRightF]:'reverse', [idImLong]: 'reverse' , [idImLeftS]: 'reverse', [idImRightS]: 'reverse',  animation:'reverse', serverAnim:'reverse', serverAnimTopRing: 'reverse', serverAnimMidRing: 'reverse', serverAnimBotRing: 'reverse'});
    this._showLink =   this._showLinkInit.bind(this);
    this._showLinkReverse =   this._showLinkReverseInit.bind(this);
    this._OpenLink = this._OpenLinkInit.bind(this);
  }

  _DummyFunc() {
    this.dummy = this.dummy;
  }

  _generateDocument() {
    console.log('generate documetn');
    this.setState({TargetLinkAnimF: Animations.TargetLinkAnimF, TargetLinkAnimS: Animations.TargetLinkAnimS});
    setTimeout(() => {       this.setState({serverTopRingCss: 'RotateHue3 link_imLeft', serverMidRingCss: 'RotateHue2 link_imLeft', serverBotRingCss: 'RotateHue1 link_imLeft'}); }, 400);
  }

  _generateDocumentReverse() {
    console.log('generate document reverse');
    this.setState({TargetLinkAnimF: 'reverse', TargetLinkAnimS: 'reverse', serverTopRingCss: 'link_imLeft', serverMidRingCss: 'link_imLeft', serverBotRingCss: 'link_imLeft'});

  }

  _popDocument() {
    console.log('pop document');
    this.setState({genIframe: true});
    const target = 'targetRenderFrame';
    setTimeout(() => { this.setState({iframeAnim: Animations.PopDocument}); window.frames[`${target}`].scrollTo(0,50); }, 450);
    setTimeout(() => { this._SrcollFrame(); forceAnimationState(true); }, 1000);
    //setTimeout(() => {       this.setState({serverTopRingCss: 'RotateHue3 link_imLeft', serverMidRingCss: 'RotateHue2 link_imLeft', serverBotRingCss: 'RotateHue1 link_imLeft'}); }, 400);
  }

  _popDocumentReverse() {
    console.log('pop document reverse');
     this.setState({iframeAnim: 'reverse'});
     setTimeout(() => {    this.setState({genIframe: null}); forceAnimationState(true); }, 350);
  }

  _SrcollFrame() {
    const scrollDest = 250;
    let scrollY = 0;
    let scrollX = 0;
    const target = 'targetRenderFrame';
    const scrollXfunc = (i) => {scrollX = i+1; window.frames[`${target}`].scrollTo(scrollX,scrollY); };
    const scrollYfunc = (i) => {scrollY = i+1; window.frames[`${target}`].scrollTo(scrollX,scrollY); };
    for (let i = 0; i < scrollDest; i += 1) {
      setTimeout(scrollXfunc, 350+(i*3), i);
    }
    for (let i = 0; i < scrollDest; i += 1) {
      setTimeout(scrollYfunc, 850+(i*3), i);
    }
    this.dummy = this.dummy;
  }

 //Render everying
  render() {
    const searcResults = searcRes.map(
      (el,ind) => {
        const key = `res_${ind}`;
        const id = `res_${ind}_id`;
        const idIm = `res_${ind}_idIm`;
        const idImLeftF = `res_${ind}_idImLeftF`;
        const idImRightF = `res_${ind}_idImRightF`;
        const idImLeftS = `res_${ind}_idImLeftS`;
        const idImRightS = `res_${ind}_idImRightS`;
        const idImLong = `res_${ind}_idImLong`;
        const state = this.state[id];
        const stateIm = this.state[idIm];
        const StateImLeftF = this.state[idImLeftF];
        const StateImRightF = this.state[idImRightF];
        const StateImLeftS = this.state[idImLeftS];
        const StateImRightS = this.state[idImRightS];
        const stateImLong = this.state[idImLong];

        const linkLeftF = (
      <VelocityComponent  animation={StateImLeftF} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}} >
        <img src={linkLeftFirst} className="link_imLeft" alt="link" style={{left: '-80px'}}/>
      </VelocityComponent>
    );
        const linkLeftS = (
      <VelocityComponent  animation={StateImLeftS} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}} >
        <img src={linkLeftSecond} className="link_imLeft" alt="link" style={{left: '-160px'}}/>
      </VelocityComponent>
    );

      const linkRightF = (
          <VelocityComponent  animation={StateImRightF} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}} >
            <img src={linkRightFirst} className="link_imRight" alt="link" style={{right: '-201px', opacity: 0}}/>
          </VelocityComponent>
        );

        const linkRightS = (
      <VelocityComponent  animation={StateImRightS} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}} >
        <img src={linkRightSecond} className="link_imRight" alt="link" style={{right: '-396px', opacity: 0}}/>
      </VelocityComponent>
    );
        const linkIm = (
          <VelocityComponent  animation={stateIm} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}} >
            <img src={link} className="link_im" alt="link" />
          </VelocityComponent>
        ); //className={this.state.serverLogo_class}

        const longLinkIm = (
          <VelocityComponent  animation={stateImLong} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}} >
            <img src={longLink} className="link_imLong" alt="link" style={{right: '-1024px'}}/>
          </VelocityComponent>
        );

        if (ind === 2) {
          return (
            <div className="clickableLink"  id={id} onClick={this._OpenLink} onMouseEnter={this._showLink} onMouseLeave={this._showLinkReverse} key={key} >
              {linkLeftS}{linkLeftF}{linkIm}{linkRightF}{linkRightS}{longLinkIm}
              <VelocityComponent  animation={state} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}} >
                <div>{el}</div>
              </VelocityComponent>
          </div>);
        }
          return (
            <div className="clickableLink"  id={id} onMouseEnter={this._showLink} onMouseLeave={this._showLinkReverse} key={key} >
              {linkIm}
              <VelocityComponent  animation={state} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}} >
                <div>{el}</div>
              </VelocityComponent>
          </div>);
        },
    );
    return (
          <VelocityComponent  animation={this.state.animation} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}} >
                <div className="GoogleSearchResults">
                  <VelocityComponent  animation={this.state.serverAnim} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}} >
                      <img src={server} className="link_imLeft" alt="link" style={{right: '-1420px', top: '250px', position:'absolute', height: '50%', width: '40%'}}/>
                  </VelocityComponent>
                  <VelocityComponent  animation={this.state.serverAnimTopRing} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}} >
                      <img src={serverRingTop} className={this.state.serverTopRingCss} alt="link" style={{right: '-1420px', top: '250px', position:'absolute', height: '50%', width: '40%'}}/>
                  </VelocityComponent>
                  <VelocityComponent  animation={this.state.serverAnimMidRing} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}} >
                      <img src={serverRingMid} className={this.state.serverMidRingCss} alt="link" style={{right: '-1420px', top: '250px', position:'absolute', height: '50%', width: '40%'}}/>
                  </VelocityComponent>
                  <VelocityComponent  animation={this.state.serverAnimBotRing} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}} >
                      <img src={serverRingBott} className={this.state.serverBotRingCss} alt="link" style={{right: '-1420px', top: '250px', position:'absolute', height: '50%', width: '40%'}}/>
                  </VelocityComponent>

                  <div className="targetLink" style={{right: '-880px', top: '50px', position:'absolute'}}>
                      {this.state.targetLink ? this.state.targetLink.slice(0, 29) : null}
                      <VelocityComponent  animation={this.state.TargetLinkAnimF} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}} >
                        <div className="targetLinks_firstPart">{this.state.targetLink ? this.state.targetLink.slice(29, 35) : null}</div>
                      </VelocityComponent>
                      <VelocityComponent  animation={this.state.TargetLinkAnimS} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}} >
                          <div className="targetLinks_secondPart">{this.state.targetLink ? this.state.targetLink.slice(35) : null}</div>
                      </VelocityComponent>
                  </div>

                  {this.state.genIframe
                  ?
                  (<VelocityComponent  animation={this.state.iframeAnim} begin={(elem) => {setAnimationState(elem);}}  complete={(elem) => {removeAnimationState(elem);}} >
                      <iframe name="targetRenderFrame" src="../static/html/linkTarget.html" scrolling="no" className="targetFrame" alt="link"/>
                  </VelocityComponent>)
                  :
                  null}


                    <div className="Google-logo-results"/>
                    <div className="Google-searchbar-res Google-searchInput-blur">
                        <input type="text" className="Google-searchInput" defaultValue={this.props.searchTerm} />
                        <span className="speach"/>
                        <span className="search"><svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></span>
                    </div>
                    <ul>
                      <li>{'All'}</li>
                      <li>{'Images'}</li>
                      <li>{'Videos'}</li>
                      <li>{'News'}</li>
                      <li>{'More'}</li>
                    </ul>
                    <div className="search-res">

                      <div id="DIV_1">
                        <div id="DIV_2">
                          <div id="DIV_3">
                            <div id="DIV_4">
                              {'About 12,400,000 results'}
                              <nobr id="NOBR_5">
                                {'(0.27 seconds)'}
                              </nobr>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div id="resItemsDIV_1">
                        <div id="resItemsDIV_2">
                          <div id="resItemsDIV_3">
                               {searcResults}
                        </div>
                    </div>
                </div>


            </div>
      </div>
    </VelocityComponent>
    );
  }
}
//define propTypes
GoogleSearchResults.propTypes = {
  moveGlobalState: React.PropTypes.func,
  searchTerm: React.PropTypes.string,
};

GoogleSearchResults.defaultProps = {
  moveGlobalState: null,
  searchTerm: 'how to pass in CS',
};
