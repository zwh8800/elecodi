import "reflect-metadata";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Dashboard from '@/page/dashboard';
// import Config from '@/component/config';
// import 'antd/dist/antd.css';

ReactDOM.render((
    <HashRouter>
        <Switch>
            <Route path="/" exact component={Dashboard}></Route>
            {/* <Route path="/config" component={Config}></Route> */}
        </Switch>
    </HashRouter>
), document.querySelector('#app'));
