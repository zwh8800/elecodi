import "reflect-metadata";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Route from './router';

ReactDOM.render(React.createElement(Route), document.querySelector('#app'));