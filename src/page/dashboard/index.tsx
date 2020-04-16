import * as React from 'react';
import * as conf from '@/conf/elecodiConf';
import Config from '@/component/config';
import Movies from './movies';
import TV from './tv';
import { Link, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Input, Row, Col } from 'antd';

const { Header, Sider, Content, Footer } = Layout;

interface Props {

}
class State {
    visible: boolean
    collapsed: boolean
}

export default class Dashboard extends React.Component<Props, State> {
    state: State = {
        visible: false,
        collapsed: false
    }
    componentDidMount() {
        let config = conf.getConfig();
        if (Object.values(config).length == 0) {
            this.setState({
                visible: true
            })
        }
    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
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
        const { visible, collapsed } = this.state;
        console.log(collapsed)
        return (
            <Layout>
                <Header className="header-wrapper">
                    <div>
                        <span className="collapse" onClick={this.toggleCollapsed}><i className="iconfont icon-zhedie"></i></span>
                        <span className="logo-name">ELECODI</span>
                    </div>
                    <div>
                        <Input.Search placeholder="搜索" />
                        <i className="iconfont icon-config" onClick={this.onOpenConfig}></i>
                    </div>
                </Header>
                <Layout className="content-wrapper">
                    <Sider width={200} className="sider-con" collapsed={collapsed} collapsedWidth={50}>
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['movies']}
                            inlineCollapsed={collapsed}>
                            <Menu.Item key="movies">
                                <Link to="/movies">
                                    <i className="iconfont icon-movie"></i>
                                    <span style={{ marginLeft: '10px' }}>电影</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="tv">
                                <Link to="/tv">
                                    <i className="iconfont icon-tv_icon"></i>
                                    <span style={{ marginLeft: '10px' }}>剧集</span>
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
