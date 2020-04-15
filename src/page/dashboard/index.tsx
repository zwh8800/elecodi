import * as React from 'react';
import * as conf from '@/conf/elecodiConf';
import Config from '@/component/config';
import Movies from './movies';
import TV from './tv';
import { Link, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Input } from 'antd';

const { Header, Sider, Content } = Layout;

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
    onOpenConfig = () => {
        this.setState({
            visible: true
        })
    }
    onCloseConfig = () => {
        this.setState({
            visible: false
        })
    }
    render() {
        const { visible } = this.state;
        return (
            <Layout className="container">
                <Sider width={256} style={{ minHeight: '100vh', color: 'white' }}>
                    <div className="home_title">
                        <i className="iconfont icon-home" style={{ fontSize: '25px' }}></i>
                        <span className="name">EleCodi</span>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['movies']}>
                        <Menu.Item key="movies">
                            <Link to="/movies">
                                <i className="iconfont icon-movie"></i>
                                <span style={{ marginLeft: '10px' }}>movies</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="tv">
                            <Link to="/tv">
                                <i className="iconfont icon-tv_icon"></i>
                                <span style={{ marginLeft: '10px' }}>tv</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout >
                    <Header className="header">
                        <Input.Search
                            placeholder="input search text"
                            style={{ width: 200 }}
                        />
                        <i className="iconfont icon-config" onClick={this.onOpenConfig}></i>
                    </Header>
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <Switch>
                                <Route path="/movies" component={Movies} />
                                <Route path="/tv" component={TV} />
                            </Switch>
                        </div>
                    </Content>
                </Layout>
                <Config visible={visible} closeConfig={this.onCloseConfig} />
            </Layout>
        )
    }
}