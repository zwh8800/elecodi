import "reflect-metadata";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch } from 'react-router-dom';
import App from '@/app.tsx';

ReactDOM.render(
    <HashRouter>
        <Switch>
            <App />
        </Switch>
    </HashRouter>, document.querySelector('#app'));
