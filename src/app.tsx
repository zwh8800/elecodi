import * as React from 'react';
import { useState, useEffect } from 'react';
import * as conf from '@/conf/elecodiConf';
import Config from '@/component/config/config';
import { Link, Route } from 'react-router-dom';
import { Layout, Menu, Input } from 'antd';
import routes from './routes';
import "@/assets/style/index.scss";

const { Header, Sider, Content } = Layout;

class MenuItem {
    name: string;
    key: string;
    icon: string;
    link: string;
}

function App() {
    const menus: MenuItem[] = [{
        name: '电影',
        key: 'movie',
        icon: 'icon-movie',
        link: 'movie'
    }, {
        name: '剧集',
        key: 'tv',
        icon: 'icon-tv_icon',
        link: 'tv'
    }];

    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const [selectedMenu, setSelectMenu] = useState('');
    const [configOpened, setConfigOpened] = useState(false);
    const [configInvalid] = useState(!conf.isValid());

    useEffect(() => {
        let currentUrl = location.href;
        let selectedMenu = (menus.find(v => currentUrl.indexOf(v.link) > -1) || { key: '' }).key;
        setSelectMenu(selectedMenu);
    });

    return <Layout>
        <Header className="header-wrapper">
            <div className="left">
                <span className="collapse" onClick={() => setMenuCollapsed(!menuCollapsed)}><i className="iconfont icon-zhedie"></i></span>
                <span className="logo">ELECODI</span>
            </div>
            <div className="right">
                <Input.Search placeholder="搜索" className="search" />
                <i className="iconfont icon-config" onClick={() => setConfigOpened(true)}></i>
            </div>
        </Header>
        <Layout className="content-wrapper">
            <Sider width={200} className="sider-con" collapsed={menuCollapsed} collapsedWidth={80}>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedMenu]}>
                    {
                        menus.map(v => (
                            <Menu.Item key={v.key}>
                                <Link to={`/${v.link}`}>
                                    <i className={`iconfont ${v.icon}`}></i>
                                    <span className="menu-item-name">{v.name}</span>
                                </Link>
                            </Menu.Item>
                        ))
                    }
                </Menu>
            </Sider>
            <Content>
                <div className="content-con">
                    {
                        routes.map((route, i) => {
                            const { path, exact } = route;
                            return (
                                <Route
                                    key={i}
                                    path={path}
                                    exact={exact}
                                    render={(routeProps) => (
                                        <route.component {...routeProps} />
                                    )}
                                />
                            )
                        })
                    }
                </div>
            </Content>
            <Config visible={configOpened || configInvalid} onCloseConfig={() => setConfigOpened(false)} />
        </Layout>
    </Layout>
}

export default App;