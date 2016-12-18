import React, { Component } from 'react';


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

export default SelfFulfillingTextBox;