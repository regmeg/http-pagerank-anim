/**
Applications main entry point, which is used for bundling everying together
**/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GoogleHome from './components/GoogleHome';
import GoogleWebGraph from './components/GoogleWebGraph';
import GoogleSearchResults from './components/GoogleSearchResults';
import './static/css/main.css';

ReactDOM.render(React.createElement(App), document.getElementById('root'));
