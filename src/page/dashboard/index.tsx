import * as React from 'react';
import * as conf from '@/conf/elecodiConf';
import Config from '@/component/config';
import Movies from './movies';
import TV from './tv';
import { Link, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Input, Row, Col } from 'antd';

const { Header, Sider, Content, Footer } = Layout;

class DashboardState {
    visible: boolean
}

export default class Dashboard extends React.Component {
    state: DashboardState = {
        visible: false
    }
    componentDidMount() {
        let config = conf.getConfig();
        if (Object.values(config).length == 0) {
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
            <Layout>
                <Header className="header-wrapper">
                    <Row>
                        <Col>
                            <div className="logo-con">
                                <i className="iconfont icon-home"></i>
                                <span className="logo-name">EleCodi</span>
                            </div>
                        </Col>
                        <Col>
                            <Input.Search
                                placeholder="input search text"
                                style={{ width: 200 }}
                            />
                            <i className="iconfont icon-config" onClick={this.onOpenConfig}></i>
                        </Col>
                    </Row>
                </Header>
                <Layout className="content-wrapper">
                    <Sider width={256} className="sider-con">
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
                    <Content className="content-con">
                        <Switch>
                            <Route path="/movies" component={Movies} />
                            <Route path="/tv" component={TV} />
                        </Switch>
                    </Content>
                </Layout>
                <Config visible={visible} onCloseConfig={this.onCloseConfig} />
            </Layout>
        )
    }
}
