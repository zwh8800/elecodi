import * as React from 'react';
import { Route } from 'react-router-dom';
import Breadcrumb from '@/component/breadcrumb/breadcrumb';
import { RouteItem } from '@/routes';


function TVList(props: {routes: RouteItem[]}) {
    return (
        <React.Fragment>
            <Breadcrumb/>
            {
                    props.routes.map((route, i) => {
                        const { path, exact } = route;
                        return (
                            <Route
                                key={i}
                                path={path}
                                exact={exact}
                                render={(routeProps) => (
                                    <route.component {...routeProps} routes={route.children}/>
                                )}
                            />
                        )
                    })
                }
        </React.Fragment>
    )
}

export default TVList;
