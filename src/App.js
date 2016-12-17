/**
Main application for the Interactive Presentation
**/
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import { VelocityTransitionGroup, VelocityComponent, velocityHelpers } from 'velocity-react';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//Set up sequances of animation
let Animations = {
  // Register these with UI Pack so that we can use stagger later.
  In: velocityHelpers.registerEffect({
    calls: [
      [{
        translateX: 300,
        rotateZ: "270deg",
      }, 1, {
        easing: 'ease-out',
        display: 'block',
      }]
    ],
  }),

  Out: velocityHelpers.registerEffect({
    calls: [
      [{
        translateX: -300,
        rotateZ: "-270deg",
      }, 1, {
        easing: 'ease-out',
        display: 'block',
      }]
    ],
  }),
};

class SelfFulfillingTextBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      labeltext: props.label,
      fullText: props.text,
      lettersToShow: 1,
    }
  }

  tick() {
    this.setState((prevState) => ({
      lettersToShow: prevState.lettersToShow + 1,
      currentText: prevState.fullText.substring(0, prevState.lettersToShow),
    }));
    if (this.state.lettersToShow > this.state.fullText.length) {
      clearInterval(this.interval)
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 150);
  }

  handleSubmit(event){

  }


  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          {this.state.labeltext}
          <input type="text" value={this.state.currentText} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

//Define the main App component
class App extends Component {

//define the constuctor of the isntance
  constructor(props) {
    super(props);
    this.state = {
      randomNum: Math.random()
    };
  }

  //Add listeners for the window keyEvents. Bind function sets this in the _handleKeyDown to be this from the App instance, otherwise it is going to be in the window scope, or somewhere else.
  componentWillMount() {
    window.addEventListener("keydown", this._handleKeyDown.bind(this), false);
  }

  //define something just after the component has rendered.
  componentDidMount() {

  }

  //Custom functions

  _handleKeyDown (event){
      //37 is if back arrow is pressed. 39 if foward key
      if      (event.keyCode === 37) this.setState({ animation: Animations.Out});
      else if (event.keyCode === 39) this.setState({ animation: Animations.In});
   }

 //Render everying
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <VelocityComponent animation={this.state.animation} duration={600}>
            <img src={logo} className="App-logo" alt="logo" />
          </VelocityComponent>
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          Try pressing back and forth arrow keys.
        </p>
        <p className="App-intro">
          Random num is {this.state.randomNum}, checking if state is lost.
        </p>
        <SelfFulfillingTextBox label="Search" text="something new here"/>
        <SelfFulfillingTextBox label="Try again" text="something another here"/>
      </div>
    );
  }
}

export default App;
