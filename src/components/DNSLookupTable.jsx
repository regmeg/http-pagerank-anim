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
    
  }

  render(){
    var items = [];
    for(var key in this.dnslist){
        items.push(

          <div>{key} - {this.dnslist[key]}</div>

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
