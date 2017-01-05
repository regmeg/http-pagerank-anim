import React, { Component } from 'react';


class DNSLookupTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      visibilityClassNames: this._getVisibilityArray(0),
      arrowIndex: 0,
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

    this._getVisibilityArray = this._getVisibilityArray.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), 250);
  }

  componentWillUnmount() {
    //clear timer when we change pages.
    clearInterval(this.interval);
  }

  _getVisibilityArray(index){
    var visibility = {
      'www.google.com': 'invisible',
      'www.facebook.com': 'invisible',
      'en.wikipedia.org': 'invisible',
      'www.soton.ac.uk': 'invisible',
      'whatweekisit.soton.ac.uk': 'invisible',
      'imgur.com': 'invisible',
      'www.giggles.com': 'invisible',
    };

    var key_at_element = Object.keys(visibility)[index];
    visibility[key_at_element] = 'visible';
    return visibility;
  }

  tick() {
    this.setState(prevState => ({
      arrowIndex: prevState.arrowIndex + 1,
      visibilityClassNames: this._getVisibilityArray(prevState.arrowIndex),
    }));

    if(this.state.arrowIndex === Object.keys(this.state.visibilityClassNames).length) {
      clearInterval(this.interval);
      //TODO: make blinky and invoke next event.
    }
  }

  render(){
    var items = [];
    for(var key in this.dnslist){
      items.push(
        <div>
          <span id={key} className={this.state.visibilityClassNames[key]}>➜</span><span>{key} - {this.dnslist[key]}</span>
        </div>
      )
    }

    return(
        <div>
          {items.map(function(lis){return (lis);})}
        </div>
    );
  }
}

export default DNSLookupTable;
