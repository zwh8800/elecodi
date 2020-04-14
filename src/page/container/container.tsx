import * as React from 'react';
import { Menu, Button } from 'antd';

export default class Container extends React.Component {
    render() {
        return <div>
            <Button>sdfsdfsdf</Button>
            <Menu theme="dark" style={{ width: 256 }}>
                <Menu.Item key="1">
                    <span>Movies</span>
                </Menu.Item>
                <Menu.Item key="2">
                    <span>TV</span>
                </Menu.Item>
            </Menu>
        </div>
    }
}
