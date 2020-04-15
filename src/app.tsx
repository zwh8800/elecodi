import "reflect-metadata";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Dashboard from '@/page/dashboard';
import "@/assets/style/index.scss";

ReactDOM.render((
    <HashRouter>
        <Switch>
            <Route path="/" component={Dashboard}></Route>
        </Switch>
    </HashRouter>
), document.querySelector('#app'));
