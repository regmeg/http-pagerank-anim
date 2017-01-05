import React, { Component } from 'react';


class SelfFulfillingTextBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      labeltext: props.label || null,
      fulltext: props.text,
      fillspeed: props.speed || 150,
      showbutton: props.showbutton,
      lettersToShow: 1,
      currentText: '',
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), this.state.fillspeed);
  }

  tick() {
    this.setState(prevState => ({
      lettersToShow: prevState.lettersToShow + 1,
      currentText: prevState.fulltext.substring(0, prevState.lettersToShow),
    }));
    if (this.state.lettersToShow > this.state.fulltext.length) {
      clearInterval(this.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
        {this.state.showbutton ?
        <input type="submit" value="Submit" />
        : null}
      </form>
    );
  }
}

export default SelfFulfillingTextBox;
