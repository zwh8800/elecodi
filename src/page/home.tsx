import * as React from 'react';
import { RouteItem } from '@/routes';

interface Props {
    routes: RouteItem[]
}

class State {

}

export default class Home extends React.Component<Props, State> {
    render() {
        return <div>Home</div>
    }
}