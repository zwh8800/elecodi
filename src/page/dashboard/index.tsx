import * as React from 'react';
import * as conf from '@/conf/elecodiConf';
import Config from '@/component/config/config';
import Movies from './movies';
import TV from './tv';
import { Link, Switch, Route } from 'react-router-dom';
import { Layout, Menu, Input } from 'antd';

const { Header, Sider, Content } = Layout;

interface Props {

}
class State {
    configInvalid: boolean = true;
    configOpened: boolean = false;
    collapsed: boolean = false;
}

export default class Dashboard extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = new State();
    }

    componentDidMount() {
        this.setState({
            configInvalid: !conf.isValid()
        })
    }
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
    onOpenConfig = () => {
        this.setState({
            configOpened: true
        })
    }
    onCloseConfig = () => {
        this.setState({
            configOpened: false,
            configInvalid: !conf.isValid()
        })
    }
    render() {
        const { configInvalid, configOpened, collapsed } = this.state;
        return (
            <Layout>
                <Header className="header-wrapper">
                    <div className="left">
                        <span className="collapse" onClick={this.toggleCollapsed}><i className="iconfont icon-zhedie"></i></span>
                        <span className="logo">ELECODI</span>
                    </div>
                    <div className="right">
                        <Input.Search placeholder="搜索" className="search" />
                        <i className="iconfont icon-config" onClick={this.onOpenConfig}></i>
                    </div>
                </Header>
                <Layout className="content-wrapper">
                    <Sider width={200} className="sider-con" collapsed={collapsed} collapsedWidth={80}>
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['movies']}
                            inlineCollapsed={collapsed}>
                            <Menu.Item key="movies">
                                <Link to="/movies">
                                    <i className="iconfont icon-movie"></i>
                                    <span className="menu-item-name">电影</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="tv">
                                <Link to="/tv">
                                    <i className="iconfont icon-tv_icon"></i>
                                    <span className="menu-item-name">剧集</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content>
                        <div className="content-con">
                            {
                                configInvalid ? null : <Switch >
                                    <Route path="/" exact component={Movies} />
                                    <Route path="/movies" component={Movies} />
                                    <Route path="/tv" component={TV} />
                                </Switch>
                            }
                        </div>
                    </Content>
                </Layout>
                <Config visible={configOpened || configInvalid} onCloseConfig={this.onCloseConfig} />
            </Layout>
        )
    }
}
