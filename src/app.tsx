import * as React from 'react';
import { useState } from 'react';
import * as conf from '@/conf/elecodiConf';
import Config from '@/component/config/config';
import { Link, Route } from 'react-router-dom';
import { Layout, Menu, Input } from 'antd';
import routes from './routes';
import "@/assets/style/index.scss";

const { Header, Sider, Content } = Layout;

const App = () => {
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const [configVisible, setConfigVisible] = useState(false);
    const [configInvalid] = useState(!conf.isValid());

    return <Layout>
        <Header className="header-wrapper">
            <div className="left">
                <span className="collapse" onClick={() => setMenuCollapsed(!menuCollapsed)}><i className="iconfont icon-zhedie"></i></span>
                <span className="logo">ELECODI</span>
            </div>
            <div className="right">
                <Input.Search placeholder="搜索" className="search" />
                <i className="iconfont icon-config" onClick={() => setConfigVisible(true)}></i>
            </div>
        </Header>
        <Layout className="content-wrapper">
            <Sider width={200} className="sider-con" collapsed={menuCollapsed} collapsedWidth={80}>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['movies']}
                    inlineCollapsed={menuCollapsed}>
                    <Menu.Item key="movie">
                        <Link to="/movie">
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
                        routes.map((route, i) => {
                            const { path, exact, children } = route;
                            return (
                                <Route
                                    key={i}
                                    path={path}
                                    exact={exact}
                                    render={(routeProps) => (
                                        <route.component routes={children} {...routeProps} />
                                    )}
                                />
                            )
                        })
                    }
                </div>
            </Content>
            <Config visible={configVisible || configInvalid} onCloseConfig={() => setConfigVisible(false)} />
        </Layout>
    </Layout>
}

export default App;