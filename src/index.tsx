import "reflect-metadata";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch } from 'react-router-dom';
import App from '@/app.tsx';
import routes from './routes';

ReactDOM.render(
    <HashRouter>
        <Switch>
            <App routes={routes}/>
        </Switch>
    </HashRouter>, document.querySelector('#app'));
