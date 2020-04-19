import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps { }

class State {

}

export default class Tv extends React.Component<State, Props> {
    render() {
        return <div>Tv</div>
    }
}