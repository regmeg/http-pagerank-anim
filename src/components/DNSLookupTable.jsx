import React, { Component } from 'react';


class DNSLookupTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      searching: true,
      refreshRate: 250,
    };

    this.dnslist = {
      'www.google.com': '74.125.206.105',
      'www.facebook.com': '157.240.1.35',
      'en.wikipedia.org': '91.198.174.192',
      'www.soton.ac.uk': '152.78.118.51',
      'whatweekisit.soton.ac.uk': '152.78.129.43',
      'imgur.com': '151.101.60.193',
      'www.giggles.com': '42.42.42.42',
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

  render(){
    var items = [];
    for(var key in this.dnslist){
        items.push(<li>{key} - {this.dnslist[key]}</li>)
    }

    return(
      <ul>
        {items.map(function(lis){return (lis);})}
      </ul>
    );
  }
}

export default DNSLookupTable;
