import * as React from 'react';
import { Menu } from 'antd';

export default class Container extends React.Component {
    render() {
        return <div>
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