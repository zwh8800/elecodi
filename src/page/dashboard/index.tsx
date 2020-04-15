import * as React from 'react';
import * as conf from '@/conf/elecodiConf';
import Config from '@/component/config';
import { Layout, Menu, Icon } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

class DashboardState {
    visible: boolean
}

export default class Dashboard extends React.Component {
    state: DashboardState = {
        visible: false
    }
    componentDidMount() {
        let config = conf.getConfig();
        if (Object.values(config).length === 0) {
            this.setState({
                visible: true
            })
        }
    }
    onCloseConfig = () => {
        this.setState({
            visible: false
        })
    }
    render() {
        const { visible } = this.state;
        return (
            <Layout>
                <Sider width={256} style={{ minHeight: '100vh', color: 'white' }}>
                    <div style={{ height: '32px', background: 'rgba(255,255,255,.2)', margin: '16px'}}/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['movies']}>
                        <Menu.Item key="movies">
                            <Icon type="pie-chart" />
                            <span>movies</span>
                        </Menu.Item>
                        <Menu.Item key="tv">
                            <Icon type="pie-chart" />
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
                <Config visible={visible} closeConfig={this.onCloseConfig}/>
            </Layout>
        )
    }
}