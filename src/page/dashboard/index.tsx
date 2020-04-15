import * as React from 'react';
import { Layout, Menu } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

export default class Dashboard extends React.Component {
    render() {
        return (
            <Layout>
                <Sider width={256} style={{ minHeight: '100vh', color: 'white' }}>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['movies']}>
                        <Menu.Item key="movies">
                            <span>movies</span>
                        </Menu.Item>
                        <Menu.Item key="tv">
                            <span>tv</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout >
                    <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>Header</Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}