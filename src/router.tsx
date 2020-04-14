import * as React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Container from '@/page/container/container';
import TV from '@/page/tv/tv';
import Movie from '@/page/movies/movies';
import Time from '@/component/time';

export default class RouteConfig extends React.Component {
    render() {
        return (
            <div>
                <HashRouter>
                    <Switch>
                        <Route path="/" exact component={Container}></Route>
                        <Route path="/tv" component={TV}></Route>
                        <Route path="/movie" component={Movie}></Route>
                        <Route path="/time" component={Time}></Route>
                    </Switch>
                </HashRouter>
            </div>
        )
    }
}
