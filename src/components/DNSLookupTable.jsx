import React, { Component } from 'react';


class DNSLookupTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      searching: true,
      searchingFor: this.props.searchingFor || 'www.giggles.com',
      refreshRate: 250,
    };

    this.dnslist = [
      'www.google.com',
      'www.facebook.com',
      'en.wikipedia.org',
      'www.soton.ac.uk',
      'whatweekisit.soton.ac.uk',
      'imgur.com',
      this.state.searchingFor,
    ]
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

  render(){
    return(
      <ul>
        {this.dnslist.map(function(name, index){
          return <li key={ index }>{name}</li>;
        })}
      </ul>
    );
  }
}

export default DNSLookupTable;
